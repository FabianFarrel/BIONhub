import type { ContentType } from "./types";

export type ThemeMode = "dark" | "light";

export interface Palette {
  mode: ThemeMode;
  // Base background + a subtle gradient tint (glassmorphic red-maroon in dark).
  bg: string;
  bgGradientTop: string;
  bgGradientBottom: string;
  bgElev: string;
  // Glass surfaces (semi-transparent).
  glass: string;
  glassStrong: string;
  card: string;
  border: string;
  glassBorder: string;
  // Text.
  text: string;
  textDim: string;
  textFaint: string;
  // Brand.
  primary: string;
  primaryDim: string;
  accent: string; // gold highlight
  star: string;
  success: string;
  // Content badges.
  movie: string;
  tv: string;
  music: string;
}

export const darkPalette: Palette = {
  mode: "dark",
  bg: "#0b0809",
  bgGradientTop: "#2a1012",
  bgGradientBottom: "#080608",
  bgElev: "#161013",
  glass: "rgba(32, 22, 26, 0.55)",
  glassStrong: "rgba(40, 26, 30, 0.82)",
  card: "rgba(28, 20, 24, 0.7)",
  border: "#2c2024",
  glassBorder: "rgba(255, 255, 255, 0.08)",
  text: "#f6f3f4",
  textDim: "#b7a9ad",
  textFaint: "#7c7074",
  primary: "#e50914",
  primaryDim: "#b00710",
  accent: "#f5c451",
  star: "#f5c451",
  success: "#46d369",
  movie: "#e50914",
  tv: "#2d7ff9",
  music: "#8e44ff",
};

export const lightPalette: Palette = {
  mode: "light",
  bg: "#f5f2f3",
  bgGradientTop: "#fbe9ea",
  bgGradientBottom: "#f2eef0",
  bgElev: "#ffffff",
  glass: "rgba(255, 255, 255, 0.72)",
  glassStrong: "rgba(255, 255, 255, 0.92)",
  card: "rgba(255, 255, 255, 0.9)",
  border: "#e4dcde",
  glassBorder: "rgba(0, 0, 0, 0.06)",
  text: "#1a1416",
  textDim: "#5f5558",
  textFaint: "#938a8d",
  primary: "#e50914",
  primaryDim: "#b00710",
  accent: "#c79a2e",
  star: "#e0a92a",
  success: "#2fa355",
  movie: "#e50914",
  tv: "#2d7ff9",
  music: "#8e44ff",
};

export const palettes: Record<ThemeMode, Palette> = {
  dark: darkPalette,
  light: lightPalette,
};

export const badgeColor = (p: Palette, type: ContentType | string): string => {
  switch (type) {
    case "movie":
      return p.movie;
    case "tv":
      return p.tv;
    case "music":
      return p.music;
    default:
      return p.primary;
  }
};
