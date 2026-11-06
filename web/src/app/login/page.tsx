"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/context/SettingsContext";
import type { AxiosError } from "axios";

const features = [
  {
    ico: "🔁",
    en: ["Synced Screens", "Resume on TV, tablet, phone"],
    id: ["Semua Layar Tersinkron", "Lanjut di TV, tablet, seluler"],
  },
  {
    ico: "🎧",
    en: ["Dolby Atmos & 4K", "Real cinema-grade experience"],
    id: ["Dolby Atmos & 4K", "Sensasi ruang bioskop asli"],
  },
  {
    ico: "⭐",
    en: ["Rate & Review", "Share your thoughts freely"],
    id: ["Rating & Ulasan", "Bagikan pendapatmu bebas"],
  },
  {
    ico: "🔒",
    en: ["Secure Account", "Encrypted authentication"],
    id: ["Akun Aman", "Autentikasi terenkripsi"],
  },
];

export default function LoginPage() {
  const { login } = useAuth();
  const { t, lang } = useSettings();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      const axErr = err as AxiosError<{ message?: string }>;
      setError(axErr.response?.data?.message || t.loginFailed);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div
        className="aura"
        style={{
          top: -100,
          left: -80,
          width: 420,
          height: 420,
          background: "var(--glow-primary)",
        }}
      />
      <div
        className="aura"
        style={{
          bottom: 20,
          right: 40,
          width: 480,
          height: 480,
          background: "var(--glow-secondary)",
        }}
      />

      {/* Left hero */}
      <div className="auth-hero" style={{ position: "relative", zIndex: 1 }}>
        <span className="vip-badge">
          <span className="vip-dot" /> {t.vipBadge}
        </span>
        <h1>
          {lang === "id" ? "Selamat Datang " : "Welcome Back to "}
          <span className="grad">BIONhub</span>
        </h1>
        <p>{t.loginSubtitle}</p>

        <div className="feature-grid">
          {features.map((f, i) => {
            const [title, desc] = lang === "id" ? f.id : f.en;
            return (
              <div className="feature-card" key={i}>
                <div className="feature-ico">{f.ico}</div>
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
        <h2>{t.login}</h2>
        <p className="muted small">{t.loginSubtitle}</p>

        {error && <div className="error-banner">{error}</div>}

        <label>{t.email}</label>
        <div className="input-wrap">
          <span className="ico">@</span>
          <input
            className="field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <label>{t.password}</label>
        <div className="input-wrap">
          <span className="ico">⚿</span>
          <input
            className="field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          className="btn btn-primary btn-block"
          style={{ marginTop: 22 }}
          disabled={submitting}
        >
          ▶ {submitting ? t.loggingIn : t.loginCta}
        </button>

        <p className="auth-switch">
          {t.noAccount} <Link href="/register">{t.signUp}</Link>
        </p>
        <p className="muted small" style={{ textAlign: "center" }}>
          {t.demoHint}
        </p>
      </form>
    </div>
  );
}
