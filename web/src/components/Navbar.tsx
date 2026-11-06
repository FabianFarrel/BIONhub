"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/context/SettingsContext";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import {
  IconHome,
  IconFilm,
  IconTv,
  IconMusic,
  IconDots,
  IconHeart,
  IconSearch,
  IconUser,
  IconChevron,
  IconSettings,
  IconLogout,
  IconLogin,
  IconMoon,
  IconSun,
} from "./Icons";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t, lang, mode, setLang, toggleTheme } = useSettings();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [acctOpen, setAcctOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Transparent at top, solid after scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setAcctOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setAcctOpen(false);
    router.push("/");
  };

  return (
    <header className={`navbar-dyn ${scrolled ? "scrolled" : ""}`}>
      <Link href="/" className="brand">
        <Logo size={40} />
        <span>
          <span className="brand-name">BIONhub</span>
          <br />
          <span className="brand-tag">{t.brandTag}</span>
        </span>
      </Link>

      {/* IDLIX-style menu */}
      <nav className="nav-menu">
        <Link
          href="/"
          className={`nav-item ${pathname === "/" ? "active" : ""}`}
        >
          <IconHome />
          <span className="nav-label">{t.home}</span>
        </Link>
        <Link
          href="/movies"
          className={`nav-item ${pathname === "/movies" ? "active" : ""}`}
        >
          <IconFilm />
          <span className="nav-label">{t.movies}</span>
        </Link>
        <Link
          href="/series"
          className={`nav-item ${pathname === "/series" ? "active" : ""}`}
        >
          <IconTv />
          <span className="nav-label">{t.tv}</span>
        </Link>

        {/* Lainnya / More dropdown */}
        <div className="more-wrap">
          <button className="nav-item" onClick={() => setMoreOpen((o) => !o)}>
            <IconDots />
            <span className="nav-label">
              {lang === "id" ? "Lainnya" : "More"}
            </span>
            <IconChevron size={14} />
          </button>
          {moreOpen && (
            <>
              <div
                className="acct-backdrop"
                onClick={() => setMoreOpen(false)}
              />
              <div className="more-menu">
                <Link
                  href="/music"
                  className="more-link"
                  onClick={() => setMoreOpen(false)}
                >
                  <span className="mi">
                    <IconMusic />
                  </span>{" "}
                  {t.music}
                </Link>
                {user && (
                  <Link
                    href="/favorites"
                    className="more-link"
                    onClick={() => setMoreOpen(false)}
                  >
                    <span className="mi">
                      <IconHeart />
                    </span>{" "}
                    {t.favorites}
                  </Link>
                )}
                {user && (
                  <Link
                    href="/profile"
                    className="more-link"
                    onClick={() => setMoreOpen(false)}
                  >
                    <span className="mi">
                      <IconSettings />
                    </span>{" "}
                    {t.settings}
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </nav>

      <div className="nav-actions">
        {/* Search icon -> opens modal */}
        <button
          className="icon-btn"
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
        >
          <IconSearch />
        </button>

        <button className="icon-btn" onClick={toggleTheme} aria-label="Theme">
          {mode === "dark" ? <IconMoon /> : <IconSun />}
        </button>

        {/* Account dropdown */}
        <div className="acct">
          <button
            className={`acct-trigger ${acctOpen ? "open" : ""}`}
            onClick={() => setAcctOpen((o) => !o)}
          >
            <span className={`acct-ico ${user ? "user" : ""}`}>
              {user ? (
                user.name.charAt(0).toUpperCase()
              ) : (
                <IconUser size={15} />
              )}
            </span>
            {user ? user.name.split(" ")[0] : t.account}
            <IconChevron size={14} className="chev" />
          </button>

          {acctOpen && (
            <>
              <div
                className="acct-backdrop"
                onClick={() => setAcctOpen(false)}
              />
              <div className="acct-menu" role="menu">
                <div className="acct-head">
                  <span className={`av ${user ? "user" : ""}`}>
                    {user ? user.name.charAt(0).toUpperCase() : <IconUser />}
                  </span>
                  <div>
                    <div className="title">{user ? user.name : t.account}</div>
                    <div className="sub">
                      {user ? user.email : t.loginSubtitle}
                    </div>
                  </div>
                </div>

                {!user ? (
                  <div className="acct-auth-row">
                    <Link
                      href="/login"
                      className="acct-btn ghost"
                      onClick={() => setAcctOpen(false)}
                    >
                      <IconLogin size={16} /> {t.login}
                    </Link>
                    <Link
                      href="/register"
                      className="acct-btn primary"
                      onClick={() => setAcctOpen(false)}
                    >
                      {t.signUp}
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="acct-divider" />
                    <Link
                      href="/favorites"
                      className="acct-item"
                      onClick={() => setAcctOpen(false)}
                    >
                      <span className="ai">
                        <IconHeart size={17} />
                      </span>{" "}
                      {t.favorites}
                    </Link>
                    <Link
                      href="/profile"
                      className="acct-item"
                      onClick={() => setAcctOpen(false)}
                    >
                      <span className="ai">
                        <IconSettings size={17} />
                      </span>{" "}
                      {t.settings}
                    </Link>
                  </>
                )}

                <div className="acct-divider" />

                <div className="acct-lang">
                  <div className="acct-lang-label">{t.language}</div>
                  <div className="acct-lang-seg">
                    <button
                      className={`acct-lang-btn ${lang === "id" ? "active" : ""}`}
                      onClick={() => setLang("id")}
                    >
                      🇮🇩 ID
                    </button>
                    <button
                      className={`acct-lang-btn ${lang === "en" ? "active" : ""}`}
                      onClick={() => setLang("en")}
                    >
                      🇬🇧 EN
                    </button>
                  </div>
                </div>

                {user && (
                  <>
                    <div className="acct-divider" />
                    <button className="acct-item danger" onClick={handleLogout}>
                      <span className="ai">
                        <IconLogout size={17} />
                      </span>{" "}
                      {t.logout}
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
