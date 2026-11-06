"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/context/SettingsContext";
import { badgeVar } from "@/lib/theme";
import { IconPlay, IconHeart, IconChevron } from "@/components/Icons";
import type { Content } from "@/lib/types";

function seeded(id: string, mod: number, min = 0): number {
  let h = 0;
  for (let i = 0; i < id.length; i++)
    h = (h * 31 + id.charCodeAt(i)) & 0xffffff;
  return min + (h % mod);
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="page muted">Loading…</div>}>
      <HomeInner />
    </Suspense>
  );
}

function HomeInner() {
  const { user } = useAuth();
  const { t, lang } = useSettings();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";

  const [items, setItems] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const params: Record<string, string> = {};
    if (search.trim()) params.search = search.trim();
    api
      .get<{ items: Content[] }>("/content", {
        params,
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
  }, [search]);

  const byRating = useMemo(
    () =>
      [...items].sort(
        (a, b) => (b.averageRating || 0) - (a.averageRating || 0),
      ),
    [items],
  );
  const heroSlides = useMemo(() => byRating.slice(0, 8), [byRating]);
  const movies = useMemo(
    () => items.filter((i) => i.type === "movie"),
    [items],
  );
  const series = useMemo(() => items.filter((i) => i.type === "tv"), [items]);
  const music = useMemo(() => items.filter((i) => i.type === "music"), [items]);

  const movieGenres = useMemo(() => {
    const set = new Set<string>();
    movies.forEach((m) => m.genres?.forEach((g) => set.add(g)));
    return ["all", ...Array.from(set).slice(0, 3)];
  }, [movies]);
  const filteredMovies =
    filter === "all"
      ? movies
      : movies.filter((m) => m.genres?.includes(filter));

  // Auto-rotate hero.
  useEffect(() => {
    if (heroSlides.length < 2 || search.trim()) return;
    const id = setInterval(
      () => setHeroIdx((i) => (i + 1) % heroSlides.length),
      6000,
    );
    return () => clearInterval(id);
  }, [heroSlides.length, search]);

  // Reset hero index if slides change.
  useEffect(() => {
    setHeroIdx(0);
  }, [heroSlides.length]);

  const go = (id: string) => router.push(`/content/${id}`);

  if (loading) return <div className="page muted">Loading…</div>;
  if (error) return <div className="page error-text">{error}</div>;

  // ---- Search results view ----
  if (search.trim()) {
    return (
      <div className="page-wide" style={{ paddingTop: 12 }}>
        <div className="shelf-head">
          <div className="shelf-title-wrap">
            <span className="shelf-bar" />
            <h2 className="shelf-title">“{search}”</h2>
          </div>
        </div>
        {items.length === 0 ? (
          <p className="muted">{t.noContent}</p>
        ) : (
          <div className="poster-grid">
            {items.map((m) => (
              <PosterCard key={m._id} item={m} onClick={() => go(m._id)} />
            ))}
          </div>
        )}
      </div>
    );
  }

  const hero = heroSlides[heroIdx];

  return (
    <div className="page-wide">
      {/* ---------- Full-bleed hero carousel ---------- */}
      {hero && (
        <section className="hero-carousel">
          {/* stacked backgrounds for crossfade */}
          {heroSlides.map((s, i) => (
            <div
              key={s._id}
              className="hero-slide-bg"
              style={{
                backgroundImage: `url(${s.backdropUrl || s.posterUrl})`,
                opacity: i === heroIdx ? 1 : 0,
              }}
            />
          ))}
          <div className="hero-scrim-b" />
          <div className="hero-scrim-l" />

          <div className="hero-content">
            <span
              className="hero-type"
              style={{ background: badgeVar(hero.type) }}
            >
              {hero.type.toUpperCase()}
            </span>
            <div className="hero-tagline">{hero.genres?.[0]}</div>
            <h1 className="hero-big-title">{hero.title}</h1>
            <div className="hero-meta">
              <span className="star">
                <IconPlay size={0} /> ★ {(hero.averageRating ?? 0).toFixed(1)}
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
              {user && (
                <button className="btn btn-glass" onClick={() => go(hero._id)}>
                  <IconHeart size={16} /> {t.addFavorite}
                </button>
              )}
            </div>
          </div>

          {heroSlides.length > 1 && (
            <div className="hero-dots">
              {heroSlides.map((s, i) => (
                <button
                  key={s._id}
                  className={`hero-dot ${i === heroIdx ? "active" : ""}`}
                  onClick={() => setHeroIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ---------- Movies shelf ---------- */}
      {movies.length > 0 && (
        <>
          <div className="shelf-head">
            <div className="shelf-title-wrap">
              <span className="shelf-bar" />
              <div>
                <h2 className="shelf-title">{t.latestCinematic}</h2>
                <div className="shelf-sub">{t.latestCinematicSub}</div>
              </div>
            </div>
            <div className="shelf-controls">
              <div className="filter-pills">
                {movieGenres.map((g) => (
                  <button
                    key={g}
                    className={`filter-pill ${filter === g ? "active" : ""}`}
                    onClick={() => setFilter(g)}
                  >
                    {g === "all" ? t.all : g}
                  </button>
                ))}
              </div>
              <Link href="/movies" className="see-all">
                {t.seeAll ?? "See all"}{" "}
                <IconChevron
                  size={14}
                  style={{ transform: "rotate(-90deg)" }}
                />
              </Link>
            </div>
          </div>
          <div className="poster-grid">
            {filteredMovies.map((m) => (
              <PosterCard key={m._id} item={m} onClick={() => go(m._id)} />
            ))}
          </div>
        </>
      )}

      {/* ---------- Series wide cards ---------- */}
      {series.length > 0 && (
        <>
          <div className="shelf-head">
            <div className="shelf-title-wrap">
              <span className="shelf-bar gold" />
              <div>
                <h2 className="shelf-title">{t.popularSeries}</h2>
                <div className="shelf-sub">{t.popularSeriesSub}</div>
              </div>
            </div>
            <Link href="/series" className="see-all">
              {t.seeAllSeries} →
            </Link>
          </div>
          <div className="wide-grid">
            {series.map((s) => (
              <div
                className="wide-card"
                key={s._id}
                onClick={() => go(s._id)}
                style={{ cursor: "pointer" }}
              >
                <div className="wide-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.backdropUrl || s.posterUrl} alt={s.title} />
                  <div className="scrim" />
                  <div className="wide-badges">
                    <span className="sx-imdb">
                      ★ {(s.averageRating ?? 0).toFixed(1)}
                    </span>
                    <span className="pc-tag">{s.runtime}</span>
                  </div>
                </div>
                <div className="wide-body">
                  <h3 className="wide-title">{s.title}</h3>
                  <p className="wide-desc">{s.overview}</p>
                  <div className="progress-track">
                    <span>{s.genres?.join(" · ")}</span>
                    <span style={{ color: "var(--primary)" }}>
                      {seeded(s._id, 50, 40)}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <i style={{ width: `${seeded(s._id, 50, 40)}%` }} />
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <span
                      className="btn btn-primary"
                      style={{ pointerEvents: "none" }}
                    >
                      <IconPlay size={15} /> {t.watchNowFull}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ---------- Music cards ---------- */}
      {music.length > 0 && (
        <>
          <div className="shelf-head">
            <div className="shelf-title-wrap">
              <span className="shelf-bar violet" />
              <div>
                <h2 className="shelf-title">{t.musicTrending}</h2>
                <div className="shelf-sub">{t.musicTrendingSub}</div>
              </div>
            </div>
            <Link href="/music" className="see-all">
              {t.seeAll ?? "See all"} →
            </Link>
          </div>
          <div className="music-grid">
            {music.map((mu) => (
              <div
                className="music-card"
                key={mu._id}
                onClick={() => go(mu._id)}
                style={{ cursor: "pointer" }}
              >
                <div className="music-top">
                  <div className="music-cover">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mu.posterUrl} alt={mu.title} />
                  </div>
                  <div className="music-info">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className="music-ost">OST</span>
                      <span className="muted small">{mu.runtime}</span>
                    </div>
                    <div className="music-title">{mu.title}</div>
                    <div className="music-artist">{mu.creator}</div>
                  </div>
                </div>
                <div className="waveform">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <i
                      key={i}
                      style={{ height: `${6 + seeded(mu._id + i, 22)}px` }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <span className="muted small">Dolby Atmos Music</span>
                  <span style={{ color: "var(--star)" }}>
                    ★ {(mu.averageRating ?? 0).toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ---------- Connectivity bar ---------- */}
      <div className="connect-bar">
        <div className="connect-left">
          <div className="connect-ico">
            <IconPlay size={26} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <strong className="font-head">BIONhub Screen Connectivity</strong>
              <span className="tag-live">Connected</span>
            </div>
            <div className="muted" style={{ fontSize: 13 }}>
              {lang === "id" ? "Streaming aktif ke: " : "Streaming to: "}
              <span style={{ color: "var(--on-surface)", fontWeight: 600 }}>
                Smart TV 4K • Dolby Atmos AVR
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PosterCard({ item, onClick }: { item: Content; onClick: () => void }) {
  return (
    <div
      className="poster-card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="pc-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.posterUrl} alt={item.title} loading="lazy" />
        <div className="pc-scrim" />
        <span className="pc-tag" style={{ background: badgeVar(item.type) }}>
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
  );
}
