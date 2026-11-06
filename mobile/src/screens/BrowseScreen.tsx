import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import api from "../api/client";
import { useSettings } from "../context/SettingsContext";
import { badgeColor } from "../theme";
import GradientBackground from "../components/GradientBackground";
import TopBar from "../components/TopBar";
import BottomTabBar from "../components/BottomTabBar";
import HeroCarousel from "../components/HeroCarousel";
import type { Content, RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Browse">;

export default function BrowseScreen({ route, navigation }: Props) {
  const { type } = route.params;
  const { palette: p, t } = useSettings();
  const insets = useSafeAreaInsets();

  const [items, setItems] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState("all");

  const titleMap: Record<string, string> = {
    movie: t.latestReleases,
    tv: t.popularSeries,
    music: t.musicTrending,
  };

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get<{ items: Content[] }>("/content", { params: { type } })
      .then((res) => active && setItems(res.data.items))
      .catch(() => active && setItems([]))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [type]);

  const byRating = useMemo(
    () => [...items].sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0)),
    [items],
  );
  const heroSlides = useMemo(() => byRating.slice(0, 5), [byRating]);

  const genres = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.genres?.forEach((g) => set.add(g)));
    return ["all", ...Array.from(set)];
  }, [items]);

  const filtered = genre === "all" ? items : items.filter((i) => i.genres?.includes(genre));
  const goDetail = (id: string) => navigation.navigate("Detail", { id });

  const renderItem = ({ item }: { item: Content }) => (
    <TouchableOpacity
      style={[styles.gCard, { backgroundColor: p.card, borderColor: p.glassBorder }]}
      onPress={() => goDetail(item._id)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.posterUrl }} style={styles.gPoster} />
      <View style={[styles.badge, { backgroundColor: badgeColor(p, item.type) }]}>
        <Text style={styles.badgeText}>{item.type.toUpperCase()}</Text>
      </View>
      <Text style={[styles.gTitle, { color: p.text }]} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={[styles.gMeta, { color: p.textDim }]}>
        {item.releaseYear} ·{" "}
        <Text style={{ color: p.star }}>★ {Number(item.averageRating || 0).toFixed(1)}</Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <TopBar />
        {loading ? (
          <ActivityIndicator color={p.primary} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(i) => i._id}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
            contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
            ListHeaderComponent={
              <View>
                {heroSlides.length > 0 && (
                  <HeroCarousel items={heroSlides} onOpen={goDetail} overline={titleMap[type]} />
                )}
                <View style={styles.titleRow}>
                  <View style={[styles.accent, { backgroundColor: p.primary }]} />
                  <Text style={[styles.pageTitle, { color: p.text }]}>{titleMap[type]}</Text>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chipRow}
                >
                  {genres.slice(0, 8).map((g) => {
                    const active = genre === g;
                    return (
                      <TouchableOpacity
                        key={g}
                        onPress={() => setGenre(g)}
                        style={[
                          styles.chip,
                          {
                            backgroundColor: active ? p.primary : p.glass,
                            borderColor: active ? p.primary : p.glassBorder,
                          },
                        ]}
                      >
                        <Text style={[styles.chipText, { color: active ? "#fff" : p.textDim }]}>
                          {g === "all" ? t.all : g}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            }
            ListEmptyComponent={
              <Text style={[styles.empty, { color: p.textDim }]}>{t.noContent}</Text>
            }
          />
        )}
        <BottomTabBar />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  accent: { width: 4, height: 20, borderRadius: 2 },
  pageTitle: { fontSize: 20, fontWeight: "800" },
  chipRow: { paddingHorizontal: 16, paddingBottom: 14, gap: 10 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  chipText: { fontWeight: "700", fontSize: 13 },
  gCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  gPoster: { width: "100%", aspectRatio: 2 / 3, backgroundColor: "#000" },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "800" },
  gTitle: { fontSize: 14, fontWeight: "700", paddingHorizontal: 10, paddingTop: 8 },
  gMeta: { fontSize: 12, paddingHorizontal: 10, paddingBottom: 10, paddingTop: 2 },
  empty: { textAlign: "center", marginTop: 40 },
});
