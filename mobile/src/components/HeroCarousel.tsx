import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSettings } from "../context/SettingsContext";
import { badgeColor } from "../theme";
import type { Content } from "../types";

const { width } = Dimensions.get("window");

// Large full-bleed backdrop hero that auto-rotates through top items,
// mirroring the web Home hero. Tap -> open detail; dots to switch.
export default function HeroCarousel({
  items,
  onOpen,
  overline,
}: {
  items: Content[];
  onOpen: (id: string) => void;
  overline: string;
}) {
  const { palette: p, t } = useSettings();
  const [idx, setIdx] = useState(0);

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (items.length < 2) return;
    timer.current = setInterval(
      () => setIdx((i) => (i + 1) % items.length),
      5000,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [items.length]);

  useEffect(() => {
    setIdx(0);
  }, [items.length]);

  if (!items.length) return null;
  const hero = items[idx];

  return (
    <ImageBackground
      source={{ uri: hero.backdropUrl || hero.posterUrl }}
      style={styles.hero}
    >
      {/* dark overlay so text is readable over the backdrop */}
      <View style={styles.scrimDark} />
      <View style={[styles.scrimBottom, { backgroundColor: p.bg }]} />

      <View style={styles.content}>
        <View
          style={[
            styles.typeTag,
            { backgroundColor: badgeColor(p, hero.type) },
          ]}
        >
          <Text style={styles.typeText}>{hero.type.toUpperCase()}</Text>
        </View>
        <Text style={styles.overline}>{overline}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {hero.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={[styles.metaStar, { color: p.star }]}>
            ★ {Number(hero.averageRating || 0).toFixed(1)}
          </Text>
          <Text style={styles.metaDim}>
            {" "}
            · {hero.releaseYear} · {hero.genres?.slice(0, 2).join(", ")}
          </Text>
        </View>
        <Text style={styles.desc} numberOfLines={2}>
          {hero.overview}
        </Text>
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.btnPrimary, { backgroundColor: p.primary }]}
            onPress={() => onOpen(hero._id)}
            activeOpacity={0.85}
          >
            <Text style={styles.btnPrimaryText}>▶ {t.watchNow}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnGlass,
              { backgroundColor: p.glassStrong, borderColor: p.glassBorder },
            ]}
            onPress={() => onOpen(hero._id)}
            activeOpacity={0.85}
          >
            <Text style={[styles.btnGlassText, { color: p.text }]}>
              {t.moreDetail}
            </Text>
          </TouchableOpacity>
        </View>

        {items.length > 1 && (
          <View style={styles.dots}>
            {items.map((s, i) => (
              <TouchableOpacity
                key={s._id}
                onPress={() => setIdx(i)}
                hitSlop={8}
              >
                <View
                  style={[
                    styles.dot,
                    i === idx
                      ? { width: 24, backgroundColor: p.primary }
                      : { width: 8, backgroundColor: "rgba(255,255,255,0.4)" },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  hero: {
    width,
    height: 520,
    justifyContent: "flex-end",
  },
  scrimDark: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(8,6,8,0.45)",
  },
  scrimBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
    opacity: 0.85,
  },
  content: { padding: 20, paddingBottom: 26 },
  typeTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 7,
    marginBottom: 10,
  },
  typeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  overline: {
    color: "#f5c451",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    flexWrap: "wrap",
  },
  metaStar: { fontSize: 14, fontWeight: "800" },
  metaDim: { color: "#dcdcdc", fontSize: 13 },
  desc: { color: "#e6e6e6", fontSize: 14, lineHeight: 20, marginTop: 10 },
  btnRow: { flexDirection: "row", gap: 12, marginTop: 16 },
  btnPrimary: { paddingHorizontal: 22, paddingVertical: 12, borderRadius: 12 },
  btnPrimaryText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  btnGlass: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  btnGlassText: { fontWeight: "700", fontSize: 14 },
  dots: { flexDirection: "row", gap: 7, marginTop: 20 },
  dot: { height: 8, borderRadius: 999 },
});
