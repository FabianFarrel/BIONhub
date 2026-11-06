import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { palettes, type Palette, type ThemeMode } from '../theme';
import { translations, type Lang, type Strings } from '../i18n/translations';

interface SettingsContextValue {
  mode: ThemeMode;
  lang: Lang;
  palette: Palette;
  t: Strings;
  toggleTheme: () => void;
  setMode: (m: ThemeMode) => void;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
  ready: boolean;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

const THEME_KEY = 'bionhub_theme';
const LANG_KEY = 'bionhub_lang';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark');
  const [lang, setLangState] = useState<Lang>('en');
  const [ready, setReady] = useState(false);

  // Load saved preferences once.
  useEffect(() => {
    (async () => {
      try {
        const [savedMode, savedLang] = await Promise.all([
          AsyncStorage.getItem(THEME_KEY),
          AsyncStorage.getItem(LANG_KEY),
        ]);
        if (savedMode === 'dark' || savedMode === 'light') setModeState(savedMode);
        if (savedLang === 'en' || savedLang === 'id') setLangState(savedLang);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    AsyncStorage.setItem(THEME_KEY, m).catch(() => undefined);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    AsyncStorage.setItem(LANG_KEY, l).catch(() => undefined);
  }, []);

  const toggleTheme = useCallback(
    () => setMode(mode === 'dark' ? 'light' : 'dark'),
    [mode, setMode]
  );
  const toggleLang = useCallback(
    () => setLang(lang === 'en' ? 'id' : 'en'),
    [lang, setLang]
  );

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
      ready,
    }),
    [mode, lang, toggleTheme, setMode, toggleLang, setLang, ready]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
