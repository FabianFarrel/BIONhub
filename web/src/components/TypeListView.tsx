"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useSettings } from "@/context/SettingsContext";
import { badgeVar } from "@/lib/theme";
import { IconPlay } from "@/components/Icons";
import type { Content, ContentType } from "@/lib/types";

// A full browse page for a single content type (movie / tv / music):
// backdrop hero of the top item + genre filter chips + poster grid. Real data.
export default function TypeListView({
  type,
  title,
  subtitle,
}: {
  type: ContentType;
  title: string;
  subtitle: string;
}) {
  const { t } = useSettings();
  const router = useRouter();
  const [items, setItems] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [genre, setGenre] = useState("all");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    api
      .get<{ items: Content[] }>("/content", {
        params: { type },
        signal: controller.signal,
      })
      .then((res) => {
        setItems(res.data.items);
        setError("");
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name !== "CanceledError")
          setError("Could not load content. Is the backend running?");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [type]);

  const byRating = useMemo(
    () =>
      [...items].sort(
        (a, b) => (b.averageRating || 0) - (a.averageRating || 0),
      ),
    [items],
  );
  const hero = byRating[0];

  const genres = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.genres?.forEach((g) => set.add(g)));
    return ["all", ...Array.from(set)];
  }, [items]);

  const filtered =
    genre === "all" ? items : items.filter((i) => i.genres?.includes(genre));
  const go = (id: string) => router.push(`/content/${id}`);

  if (loading) return <div className="page muted">Loading…</div>;
  if (error) return <div className="page error-text">{error}</div>;

  return (
    <div className="page-wide">
      {/* Full-bleed hero backdrop of the top-rated item */}
      {hero && (
        <section className="hero-carousel" style={{ minHeight: "72vh" }}>
          <div
            className="hero-slide-bg"
            style={{
              backgroundImage: `url(${hero.backdropUrl || hero.posterUrl})`,
              opacity: 1,
            }}
          />
          <div className="hero-scrim-b" />
          <div className="hero-scrim-l" />

          <div className="hero-content">
            <span className="hero-type" style={{ background: badgeVar(type) }}>
              {type.toUpperCase()}
            </span>
            <div className="hero-tagline">{hero.genres?.[0]}</div>
            <h1 className="hero-big-title">{hero.title}</h1>
            <div className="hero-meta">
              <span className="star">
                ★ {(hero.averageRating ?? 0).toFixed(1)}
              </span>
              <span>{hero.releaseYear}</span>
              <span>•</span>
              <span>{hero.runtime}</span>
              <span>•</span>
              {hero.genres?.slice(0, 3).map((g) => (
                <span key={g} className="chip-genre">
                  {g}
                </span>
              ))}
            </div>
            <p className="hero-desc">{hero.overview}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={() => go(hero._id)}>
                <IconPlay size={16} /> {t.watchNowFull}
              </button>
              <button className="btn btn-glass" onClick={() => go(hero._id)}>
                {t.moreDetail}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Title + genre filters */}
      <div className="shelf-head">
        <div className="shelf-title-wrap">
          <span className="shelf-bar" />
          <div>
            <h2 className="shelf-title">{title}</h2>
            <div className="shelf-sub">{subtitle}</div>
          </div>
        </div>
        {genres.length > 1 && (
          <div className="shelf-controls">
            <div className="filter-pills">
              {genres.slice(0, 6).map((g) => (
                <button
                  key={g}
                  className={`filter-pill ${genre === g ? "active" : ""}`}
                  onClick={() => setGenre(g)}
                >
                  {g === "all" ? t.all : g}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="muted">{t.noContent}</p>
      ) : (
        <div className="poster-grid">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="poster-card"
              onClick={() => go(item._id)}
              style={{ cursor: "pointer" }}
            >
              <div className="pc-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.posterUrl} alt={item.title} loading="lazy" />
                <div className="pc-scrim" />
                <span
                  className="pc-tag"
                  style={{ background: badgeVar(item.type) }}
                >
                  {item.type.toUpperCase()}
                </span>
                <span className="pc-rate">
                  ★ {(item.averageRating ?? 0).toFixed(1)}
                </span>
                <div className="pc-play">
                  <span className="pc-play-btn">
                    <IconPlay size={22} />
                  </span>
                </div>
              </div>
              <div className="pc-body">
                <div className="pc-title">{item.title}</div>
                <div className="pc-meta">
                  <span>{item.genres?.[0]}</span>
                  <span>
                    {item.releaseYear} • {item.runtime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
