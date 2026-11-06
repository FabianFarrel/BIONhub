'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { palettes, paletteToCssVars, type ThemeMode, type Palette } from '@/lib/theme';
import { translations, type Lang, type Strings } from '@/lib/i18n';

interface SettingsContextValue {
  mode: ThemeMode;
  lang: Lang;
  palette: Palette;
  t: Strings;
  toggleTheme: () => void;
  setMode: (m: ThemeMode) => void;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

const THEME_KEY = 'bionhub_theme';
const LANG_KEY = 'bionhub_lang';

function applyTheme(mode: ThemeMode) {
  if (typeof document === 'undefined') return;
  const vars = paletteToCssVars(palettes[mode]);
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute('data-theme', mode);
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark');
  const [lang, setLangState] = useState<Lang>('en');

  // Load saved preferences and apply theme on mount.
  useEffect(() => {
    const savedMode = (localStorage.getItem(THEME_KEY) as ThemeMode) || 'dark';
    const savedLang = (localStorage.getItem(LANG_KEY) as Lang) || 'en';
    setModeState(savedMode === 'light' ? 'light' : 'dark');
    setLangState(savedLang === 'id' ? 'id' : 'en');
    applyTheme(savedMode === 'light' ? 'light' : 'dark');
  }, []);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    localStorage.setItem(THEME_KEY, m);
    applyTheme(m);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  }, []);

  const toggleTheme = useCallback(
    () => setMode(mode === 'dark' ? 'light' : 'dark'),
    [mode, setMode]
  );
  const toggleLang = useCallback(() => setLang(lang === 'en' ? 'id' : 'en'), [lang, setLang]);

  const value = useMemo<SettingsContextValue>(
    () => ({
      mode,
      lang,
      palette: palettes[mode],
      t: translations[lang],
      toggleTheme,
      setMode,
      toggleLang,
      setLang,
    }),
    [mode, lang, toggleTheme, setMode, toggleLang, setLang]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
