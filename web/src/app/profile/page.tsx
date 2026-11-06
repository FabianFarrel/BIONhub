'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSettings } from '@/context/SettingsContext';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const { t, lang, mode, setLang, setMode } = useSettings();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  if (loading || !user) return <div className="page muted">Loading…</div>;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="page" style={{ maxWidth: 720 }}>
      <div className="aura" style={{ top: -80, right: -40, width: 380, height: 380, background: 'var(--glow-primary)' }} />

      {/* Account */}
      <div className="section-head">
        <span className="section-accent" />
        <h3 className="section-title">{t.account}</h3>
      </div>
      <div className="profile-card glass">
        <div className="profile-avatar">{user.name.charAt(0).toUpperCase()}</div>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'Syne, sans-serif' }}>{user.name}</h2>
          <p className="muted" style={{ margin: '4px 0 0' }}>
            {user.email}
          </p>
        </div>
      </div>

      {/* Settings */}
      <div className="section-head">
        <span className="section-accent" />
        <h3 className="section-title">{t.settings}</h3>
      </div>

      <div className="setting-row glass">
        <span style={{ fontWeight: 700 }}>🌐 {t.language}</span>
        <div className="seg">
          <button className={`seg-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>
            EN
          </button>
          <button className={`seg-btn ${lang === 'id' ? 'active' : ''}`} onClick={() => setLang('id')}>
            ID
          </button>
        </div>
      </div>

      <div className="setting-row glass">
        <span style={{ fontWeight: 700 }}>🎨 {t.theme}</span>
        <div className="seg">
          <button className={`seg-btn ${mode === 'light' ? 'active' : ''}`} onClick={() => setMode('light')}>
            ☀ {t.lightMode}
          </button>
          <button className={`seg-btn ${mode === 'dark' ? 'active' : ''}`} onClick={() => setMode('dark')}>
            ☾ {t.darkMode}
          </button>
        </div>
      </div>

      <button className="btn btn-primary btn-block" style={{ marginTop: 20 }} onClick={handleLogout}>
        ⎋ {t.logout}
      </button>
    </div>
  );
}
