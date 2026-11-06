"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/context/SettingsContext";
import Logo from "@/components/Logo";
import {
  IconDevices,
  IconFilm,
  IconStar,
  IconHeadphones,
  IconUser,
  IconMail,
  IconLock,
} from "@/components/Icons";
import type { AxiosError } from "axios";

const features = [
  {
    Ico: IconDevices,
    en: ["Multi-Screen Sync", "Phone, tablet, laptop & Smart TV"],
    id: ["Sinkronisasi Layar", "HP, tablet, laptop & Smart TV"],
  },
  {
    Ico: IconFilm,
    en: ["Thousands of Titles", "Movies, series, and music"],
    id: ["Ribuan Tontonan", "Film, serial, dan musik"],
  },
  {
    Ico: IconStar,
    en: ["Personal Favorites", "Build your own watchlist"],
    id: ["Favorit Pribadi", "Bangun daftar tontonanmu"],
  },
  {
    Ico: IconHeadphones,
    en: ["Dolby & IMAX Sound", "Premiere-grade spatial audio"],
    id: ["Dolby & IMAX Sound", "Audio spasial kelas premiere"],
  },
];

export default function RegisterPage() {
  const { register } = useAuth();
  const { t, lang } = useSettings();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError(t.passwordTooShort);
      return;
    }
    setSubmitting(true);
    try {
      await register(name, email, password);
      router.push("/");
    } catch (err) {
      const axErr = err as AxiosError<{ message?: string }>;
      setError(axErr.response?.data?.message || t.registerFailed);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div
        className="aura"
        style={{
          top: -120,
          left: -60,
          width: 460,
          height: 460,
          background: "var(--glow-primary)",
        }}
      />
      <div
        className="aura"
        style={{
          bottom: 10,
          right: 60,
          width: 440,
          height: 440,
          background: "var(--glow-secondary)",
        }}
      />

      {/* Left hero */}
      <div className="auth-hero" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <Logo size={48} />
          <span
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 24,
            }}
          >
            BION<span style={{ color: "var(--primary)" }}>hub</span>
          </span>
        </div>
        <span className="vip-badge">
          <span className="vip-dot" /> {t.vipBadge}
        </span>
        <h1>
          <span className="grad">{t.createTitle}</span>
        </h1>
        <p>{t.registerSubtitle}</p>

        <div className="feature-grid">
          {features.map((f, i) => {
            const [title, desc] = lang === "id" ? f.id : f.en;
            const Ico = f.Ico;
            return (
              <div className="feature-card" key={i}>
                <div className="feature-ico">
                  <Ico size={22} />
                </div>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right form card */}
      <form className="auth-card glass" onSubmit={handleSubmit}>
        <h2>{t.signUp}</h2>
        <p className="muted small">{t.registerSubtitle}</p>

        {error && <div className="error-banner">{error}</div>}

        <label>{t.name}</label>
        <div className="input-wrap">
          <span className="ico">
            <IconUser size={18} />
          </span>
          <input
            className="field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            required
          />
        </div>

        <label>{t.email}</label>
        <div className="input-wrap">
          <span className="ico">
            <IconMail size={18} />
          </span>
          <input
            className="field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@domain.com"
            required
          />
        </div>

        <label>{t.password}</label>
        <div className="input-wrap">
          <span className="ico">
            <IconLock size={18} />
          </span>
          <input
            className="field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.passwordHint}
            required
          />
        </div>

        <button
          className="btn btn-primary btn-block"
          style={{ marginTop: 22 }}
          disabled={submitting}
        >
          {submitting ? t.creating : `${t.registerCta}  →`}
        </button>

        <p className="auth-switch">
          {t.haveAccount} <Link href="/login">{t.login}</Link>
        </p>
      </form>
    </div>
  );
}
