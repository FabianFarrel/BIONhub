"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/context/SettingsContext";
import { badgeVar } from "@/lib/theme";
import type { Content } from "@/lib/types";
import type { AxiosError } from "axios";

function toEmbed(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function DetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { user, refreshUser } = useAuth();
  const { t } = useSettings();

  const [item, setItem] = useState<Content | null>(null);
  const [similar, setSimilar] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(8);
  const [comment, setComment] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ item: Content }>(`/content/${id}`);
      setItem(res.data.item);
      // fetch similar by same type
      const sim = await api.get<{ items: Content[] }>("/content", {
        params: { type: res.data.item.type },
      });
      setSimilar(sim.data.items.filter((c) => c._id !== id).slice(0, 5));
    } catch {
      setError(t.noContent);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (user?.favorites) {
      const ids = user.favorites.map((f) =>
        typeof f === "string" ? f : f._id,
      );
      setIsFavorite(ids.includes(id));
    } else setIsFavorite(false);
  }, [user, id]);

  const toggleFavorite = async () => {
    if (!user) return;
    const res = await api.post<{ favorited: boolean }>(`/favorites/${id}`);
    setIsFavorite(res.data.favorited);
    await refreshUser();
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewMsg("");
    try {
      const res = await api.post<{ item: Content }>(`/content/${id}/reviews`, {
        rating,
        comment,
      });
      setItem(res.data.item);
      setComment("");
      setReviewMsg(t.reviewSaved);
    } catch (err) {
      const axErr = err as AxiosError<{ message?: string }>;
      setReviewMsg(axErr.response?.data?.message || t.reviewError);
    }
  };

  // Decorative star histogram derived from real reviews.
  const histogram = useMemo(() => {
    const buckets = [0, 0, 0, 0, 0]; // 5..1 stars (rating/2 rounded)
    (item?.reviews || []).forEach((r) => {
      const star = Math.max(1, Math.min(5, Math.round(r.rating / 2)));
      buckets[5 - star]++;
    });
    const total = item?.reviews?.length || 0;
    return buckets.map((c) => (total ? Math.round((c / total) * 100) : 0));
  }, [item]);

  if (loading) return <div className="page muted">Loading…</div>;
  if (error) return <div className="page error-text">{error}</div>;
  if (!item) return null;

  const embed = toEmbed(item.trailerUrl);
  const avg = item.averageRating ?? 0;

  return (
    <div className="page-wide detail">
      {/* ---------- Cinematic backdrop hero ---------- */}
      <section className="detail-backdrop">
        <div
          className="bd-img"
          style={{
            backgroundImage: `url(${item.backdropUrl || item.posterUrl})`,
          }}
        />
        <div className="bd-scrim-b" />
        <div className="bd-scrim-l" />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          <div className="breadcrumb">
            <Link href="/">{t.breadcrumbVault}</Link>
            <span>/</span>
            <span className="b-gold">{t.breadcrumbPremiere}</span>
            <span>/</span>
            <span>{item.genres?.[0]}</span>
          </div>

          <div className="detail-grid">
            {/* Poster + specs */}
            <div>
              <div className="dp-poster">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.posterUrl} alt={item.title} />
                <div className="dp-badges">
                  <span className="pc-tag neutral">IMAX 70MM</span>
                  <span className="pc-tag">VIP</span>
                </div>
              </div>
              <div className="dp-specs">
                <div className="dp-spec">
                  <span className="ico">◇</span>
                  <div>
                    <div className="lab">Visual</div>
                    <div className="val">4K UHD HDR10+</div>
                  </div>
                </div>
                <div className="dp-spec">
                  <span className="ico">◍</span>
                  <div>
                    <div className="lab">Audio</div>
                    <div className="val">Dolby Atmos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div>
              <div className="sx-tags" style={{ marginBottom: 8 }}>
                <span
                  className="pc-tag"
                  style={{
                    position: "static",
                    background: badgeVar(item.type),
                  }}
                >
                  {item.type.toUpperCase()}
                </span>
                <span className="sx-info">{item.releaseYear}</span>
                <span className="sep muted">•</span>
                <span className="sx-info">{item.runtime}</span>
                <span className="sx-info" style={{ color: "var(--secondary)" }}>
                  98% Match
                </span>
              </div>

              <h1 className="dh-title">{item.title}</h1>
              <div className="dh-director">
                <span>🎬</span>
                <span>{t.castCreatorsSub.split("&")[0]}</span>
                <span className="on">{item.creator}</span>
              </div>

              {/* Editorial note */}
              <div className="editorial glass" style={{ marginTop: 18 }}>
                <span className="ico">✦</span>
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <strong
                      style={{
                        color: "var(--secondary)",
                        textTransform: "uppercase",
                        fontSize: 13,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {t.editorialNote}
                    </strong>
                    <span className="muted small">
                      ★ {avg.toFixed(1)} / 10 • {item.reviews?.length || 0}{" "}
                      {t.reviews}
                    </span>
                  </div>
                  <p>
                    “{item.overview.slice(0, 160)}
                    {item.overview.length > 160 ? "…" : ""}”
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="detail-actions" style={{ marginTop: 18 }}>
                {embed && (
                  <a href="#trailer" className="btn btn-primary">
                    ▶ {t.watchTrailer}
                  </a>
                )}
                {user ? (
                  <button
                    className={`btn ${isFavorite ? "btn-fav-active" : "btn-glass"}`}
                    onClick={toggleFavorite}
                  >
                    {isFavorite ? `♥ ${t.inFavorites}` : `♡ ${t.addFavorite}`}
                  </button>
                ) : (
                  <Link href="/login" className="btn btn-glass">
                    {t.loginToReview}
                  </Link>
                )}
                <a href="#reviews" className="btn btn-glass">
                  ★ {t.writeReview}
                </a>
              </div>

              {/* Synopsis + spec matrix */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 20,
                  marginTop: 24,
                }}
              >
                <div>
                  <h3
                    className="font-head"
                    style={{ fontSize: 20, marginBottom: 8 }}
                  >
                    {t.synopsis}
                  </h3>
                  <p className="muted" style={{ lineHeight: 1.7 }}>
                    {item.overview}
                  </p>
                  <div className="genre-row" style={{ marginTop: 14 }}>
                    {item.genres?.map((g) => (
                      <span key={g} className="genre-pill">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="specs-matrix">
                  <div
                    style={{
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: 13,
                      marginBottom: 8,
                    }}
                  >
                    {t.specTitle}
                  </div>
                  <div className="srow">
                    <span>Aspect Ratio</span>
                    <span style={{ color: "var(--secondary)" }}>
                      1.90:1 IMAX
                    </span>
                  </div>
                  <div className="srow">
                    <span>Color</span>
                    <span>Dolby Vision</span>
                  </div>
                  <div className="srow">
                    <span>Audio</span>
                    <span>Atmos 7.1 / DTS-X</span>
                  </div>
                  <div className="srow">
                    <span>Rating</span>
                    <span style={{ color: "var(--primary)" }}>
                      ★ {avg.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Trailer ---------- */}
      {embed && (
        <section className="detail-section" id="trailer">
          <div className="shelf-head" style={{ marginBottom: 14 }}>
            <div className="shelf-title-wrap">
              <span className="shelf-bar" />
              <div>
                <h2 className="shelf-title">{t.watchTrailer}</h2>
                <div className="shelf-sub">4K UHD HDR • Dolby Atmos 7.1</div>
              </div>
            </div>
          </div>
          <div className="player-wrap">
            <iframe
              src={embed}
              title={`${item.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* ---------- Cast (decorative, generated from creator) ---------- */}
      <section className="detail-section">
        <div className="shelf-head" style={{ marginBottom: 14 }}>
          <div className="shelf-title-wrap">
            <span className="shelf-bar" />
            <div>
              <h2 className="shelf-title">{t.castCreators}</h2>
              <div className="shelf-sub">{t.castCreatorsSub}</div>
            </div>
          </div>
        </div>
        <div className="cast-grid">
          {buildCast(item).map((c, i) => (
            <div className="cast-card" key={i}>
              <div className="cast-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${item._id}-cast${i}/240/320`}
                  alt={c.name}
                />
              </div>
              <div className="cast-body">
                <div className="cast-name">{c.name}</div>
                <div className="cast-role">{c.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Review hub ---------- */}
      <section className="detail-section" id="reviews">
        <div className="shelf-head" style={{ marginBottom: 14 }}>
          <div className="shelf-title-wrap">
            <span className="shelf-bar gold" />
            <div>
              <div className="sx-overline">{t.verifiedCommunity}</div>
              <h2 className="shelf-title">{t.communityReviews}</h2>
            </div>
          </div>
        </div>

        <div className="review-hub">
          {/* Scorecard + form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="scorecard">
              <div className="score-top">
                <div className="score-big">
                  <span className="num">{avg.toFixed(1)}</span>
                  <span className="lab">{t.outOfStars}</span>
                </div>
                <div>
                  <div className="font-head" style={{ fontSize: 18 }}>
                    ★★★★★
                  </div>
                  <p className="muted small" style={{ margin: "6px 0" }}>
                    {item.reviews?.length || 0} {t.reviews}
                  </p>
                  <span
                    style={{
                      color: "var(--primary)",
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    94% {t.recommendPct}
                  </span>
                </div>
              </div>
              <div className="histogram">
                {histogram.map((pct, i) => (
                  <div className="histo-row" key={i}>
                    <span className="lab">{5 - i} ★</span>
                    <span className="histo-track">
                      <i style={{ width: `${pct}%` }} />
                    </span>
                    <span className="pct">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive review form */}
            {user ? (
              <form className="scorecard" onSubmit={submitReview}>
                <h3
                  className="font-head"
                  style={{ fontSize: 18, marginTop: 0 }}
                >
                  {t.writeReview}
                </h3>
                <div className="star-picker">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={`s ${rating >= s * 2 ? "" : "off"}`}
                      onClick={() => setRating(s * 2)}
                    >
                      ★
                    </span>
                  ))}
                  <span className="muted small" style={{ marginLeft: 8 }}>
                    {rating}/10
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  style={{
                    width: "100%",
                    accentColor: "var(--primary)",
                    margin: "12px 0",
                  }}
                />
                <textarea
                  rows={3}
                  placeholder={t.reviewPlaceholder}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    width: "100%",
                    borderRadius: 12,
                    padding: 12,
                    background: "var(--sc)",
                    color: "var(--on-surface)",
                    border: "1px solid var(--glass-border)",
                    fontFamily: "inherit",
                  }}
                />
                <button className="btn btn-primary" style={{ marginTop: 12 }}>
                  {t.submitReview}
                </button>
                {reviewMsg && (
                  <p className="muted small" style={{ marginTop: 8 }}>
                    {reviewMsg}
                  </p>
                )}
              </form>
            ) : (
              <div className="scorecard">
                <Link href="/login" className="btn btn-primary btn-block">
                  {t.loginToReview}
                </Link>
              </div>
            )}
          </div>

          {/* Feed */}
          <div className="review-feed">
            <div className="review-tabs">
              <div className="tabs">
                <button className="review-tab active">{t.mostPopular}</button>
                <button className="review-tab">{t.newest}</button>
              </div>
              <span className="muted small">
                {item.reviews?.length || 0} {t.reviews}
              </span>
            </div>

            {item.reviews?.length ? (
              item.reviews.map((r) => (
                <div className="rv-card" key={r._id}>
                  <div className="rv-head">
                    <div className="rv-who">
                      <div className="rv-avatar">
                        {r.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="rv-name">{r.userName}</div>
                        <div className="rv-when">Verified viewer</div>
                      </div>
                    </div>
                    <span className="rv-score">★ {r.rating}/10</span>
                  </div>
                  {r.comment && <p className="rv-text">{r.comment}</p>}
                </div>
              ))
            ) : (
              <div className="rv-card muted">{t.noReviews}</div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Similar titles ---------- */}
      {similar.length > 0 && (
        <section className="detail-section">
          <div className="shelf-head" style={{ marginBottom: 14 }}>
            <div className="shelf-title-wrap">
              <span className="shelf-bar" />
              <div>
                <div className="sx-overline">{t.similarTitlesSub}</div>
                <h2 className="shelf-title">{t.similarTitles}</h2>
              </div>
            </div>
          </div>
          <div className="poster-grid">
            {similar.map((s) => (
              <Link
                href={`/content/${s._id}`}
                key={s._id}
                className="poster-card"
                style={{ display: "block" }}
              >
                <div className="pc-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.posterUrl} alt={s.title} loading="lazy" />
                  <div className="pc-scrim" />
                  <span className="pc-rate">
                    ★ {(s.averageRating ?? 0).toFixed(1)}
                  </span>
                </div>
                <div className="pc-body">
                  <div className="pc-title">{s.title}</div>
                  <div className="pc-meta">
                    <span>{s.releaseYear}</span>
                    <span>{s.genres?.[0]}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Build decorative cast list from the content's creator field.
function buildCast(item: Content): { name: string; role: string }[] {
  const base =
    item.creator?.replace(/^(Dir\.|Created by)\s*/i, "") || "Unknown";
  const roles =
    item.type === "music"
      ? ["Composer", "Producer", "Arranger", "Mixing", "Mastering", "Vocals"]
      : [
          "Director",
          "Lead",
          "Supporting",
          "Cinematography",
          "Score",
          "Producer",
        ];
  const names = [
    base,
    "A. Pratama",
    "R. Chastain",
    "T. Hartono",
    "H. Zimmer",
    "L. Nolan",
  ];
  return roles.map((role, i) => ({ role, name: names[i] || `Cast ${i + 1}` }));
}
