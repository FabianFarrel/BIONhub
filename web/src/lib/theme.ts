// Design tokens derived from the Stitch "Entertainment Hub" design.
// Dark palette uses the exact Material-style tokens from the mock; light is a
// complementary scheme so the theme toggle works across the whole app.

export type ThemeMode = "dark" | "light";

export interface Palette {
  mode: ThemeMode;
  surface: string;
  surfaceDim: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  onSurface: string;
  onSurfaceVariant: string;
  outline: string;
  glassBorder: string;
  primary: string;
  primaryHover: string;
  onPrimary: string;
  secondary: string;
  star: string;
  error: string;
  movie: string;
  tv: string;
  music: string;
  // ambient glow colors
  glowPrimary: string;
  glowSecondary: string;
}

export const darkPalette: Palette = {
  mode: "dark",
  surface: "#121317",
  surfaceDim: "#121317",
  surfaceContainerLowest: "#0d0e12",
  surfaceContainerLow: "#1a1b20",
  surfaceContainer: "#1f1f24",
  surfaceContainerHigh: "#292a2e",
  surfaceContainerHighest: "#343439",
  onSurface: "#e3e2e8",
  onSurfaceVariant: "#e9bcb6",
  outline: "#af8782",
  glassBorder: "rgba(255,255,255,0.08)",
  primary: "#e50914",
  primaryHover: "#ff334b",
  onPrimary: "#fff7f6",
  secondary: "#ffd65b",
  star: "#ffd65b",
  error: "#ffb4ab",
  movie: "#e50914",
  tv: "#2d7ff9",
  music: "#8e44ff",
  glowPrimary: "rgba(229,9,20,0.15)",
  glowSecondary: "rgba(231,185,0,0.10)",
};

export const lightPalette: Palette = {
  mode: "light",
  surface: "#f6f3f4",
  surfaceDim: "#ede8ea",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#ffffff",
  surfaceContainer: "#f1ebed",
  surfaceContainerHigh: "#e9e1e4",
  surfaceContainerHighest: "#e2d8db",
  onSurface: "#1a1416",
  onSurfaceVariant: "#5f5558",
  outline: "#8a7e81",
  glassBorder: "rgba(0,0,0,0.08)",
  primary: "#e50914",
  primaryHover: "#c0000c",
  onPrimary: "#ffffff",
  secondary: "#b8860b",
  star: "#e0a92a",
  error: "#ba1a1a",
  movie: "#e50914",
  tv: "#2d7ff9",
  music: "#8e44ff",
  glowPrimary: "rgba(229,9,20,0.10)",
  glowSecondary: "rgba(231,185,0,0.08)",
};

export const palettes: Record<ThemeMode, Palette> = {
  dark: darkPalette,
  light: lightPalette,
};

// Convert a palette to CSS custom properties applied on <html data-theme>.
export function paletteToCssVars(p: Palette): Record<string, string> {
  return {
    "--surface": p.surface,
    "--surface-dim": p.surfaceDim,
    "--sc-lowest": p.surfaceContainerLowest,
    "--sc-low": p.surfaceContainerLow,
    "--sc": p.surfaceContainer,
    "--sc-high": p.surfaceContainerHigh,
    "--sc-highest": p.surfaceContainerHighest,
    "--on-surface": p.onSurface,
    "--on-surface-variant": p.onSurfaceVariant,
    "--outline": p.outline,
    "--glass-border": p.glassBorder,
    "--primary": p.primary,
    "--primary-hover": p.primaryHover,
    "--on-primary": p.onPrimary,
    "--secondary": p.secondary,
    "--star": p.star,
    "--error": p.error,
    "--movie": p.movie,
    "--tv": p.tv,
    "--music": p.music,
    "--glow-primary": p.glowPrimary,
    "--glow-secondary": p.glowSecondary,
  };
}

export const badgeVar = (type: string): string => {
  if (type === "tv") return "var(--tv)";
  if (type === "music") return "var(--music)";
  return "var(--movie)";
};
