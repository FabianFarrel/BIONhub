'use client';

import { useSettings } from '@/context/SettingsContext';

export default function Footer() {
  const { t } = useSettings();
  return (
    <footer className="app-footer">
      BIONhub — {t.brandTag} Hub • {t.movies} • {t.tv} • {t.music} &nbsp;·&nbsp; © 2025 BIONhub
    </footer>
  );
}
