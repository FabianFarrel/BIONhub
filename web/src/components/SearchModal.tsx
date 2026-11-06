"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useSettings } from "@/context/SettingsContext";
import { badgeVar } from "@/lib/theme";
import { IconSearch } from "@/components/Icons";
import type { Content } from "@/lib/types";

const typeLabel: Record<string, string> = {
  movie: "FILM",
  tv: "TV",
  music: "MUSIC",
};

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const { t } = useSettings();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Autofocus when opened.
  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(id);
  }, []);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Debounced live search.
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }
    const ctrl = new AbortController();
    setLoading(true);
    const id = setTimeout(() => {
      api
        .get<{ items: Content[] }>("/content", {
          params: { search: q },
          signal: ctrl.signal,
        })
        .then((res) => setResults(res.data.items))
        .catch(() => undefined)
        .finally(() => setLoading(false));
    }, 300);
    return () => {
      clearTimeout(id);
      ctrl.abort();
    };
  }, [query]);

  const open = (id: string) => {
    onClose();
    router.push(`/content/${id}`);
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-head">
          <h3>{t.searchTitle}</h3>
          <button className="search-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="search-modal-field">
          <IconSearch size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
          />
          {query && (
            <button
              className="search-clear"
              onClick={() => setQuery("")}
              aria-label="Clear"
            >
              ✕
            </button>
          )}
        </div>

        <div className="search-results">
          {loading && (
            <p className="muted small" style={{ padding: "10px 4px" }}>
              …
            </p>
          )}
          {!loading && query.trim() && results.length === 0 && (
            <p className="muted small" style={{ padding: "10px 4px" }}>
              {t.noContent}
            </p>
          )}
          {results.map((r) => (
            <button
              key={r._id}
              className="search-row"
              onClick={() => open(r._id)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.posterUrl} alt={r.title} className="search-poster" />
              <div className="search-info">
                <div className="search-title">
                  {r.title}{" "}
                  <span className="search-year">({r.releaseYear})</span>
                </div>
                <div className="search-meta">
                  <span
                    className="search-badge"
                    style={{ background: badgeVar(r.type) }}
                  >
                    {typeLabel[r.type]}
                  </span>
                  <span className="search-rate">
                    ★ {(r.averageRating ?? 0).toFixed(1)}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
