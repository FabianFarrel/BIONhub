import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";
import { badgeColor } from "../theme";
import GradientBackground from "../components/GradientBackground";
import TopBar from "../components/TopBar";
import BottomTabBar from "../components/BottomTabBar";
import HeroCarousel from "../components/HeroCarousel";
import type { Content, ContentType, RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { palette: p, t } = useSettings();
  const insets = useSafeAreaInsets();

  const [items, setItems] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const FILTERS: { key: string; label: string }[] = [
    { key: "all", label: t.all },
    { key: "movie", label: t.movies },
    { key: "tv", label: t.tv },
    { key: "music", label: t.music },
  ];

  useEffect(() => {
    let active = true;
    setLoading(true);
    const params: Record<string, string> = {};
    if (search.trim()) params.search = search.trim();

    api
      .get<{ items: Content[] }>("/content", { params })
      .then((res) => active && setItems(res.data.items))
      .catch(() => active && setItems([]))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [search]);

  // Derive sections from the fetched list.
  const byRating = useMemo(
    () =>
      [...items].sort(
        (a, b) => (b.averageRating || 0) - (a.averageRating || 0),
      ),
    [items],
  );
  const heroSlides = useMemo(() => byRating.slice(0, 6), [byRating]);
  const recommended = useMemo(() => items.slice(0, 8), [items]);
  const topPicks = useMemo(() => byRating.slice(0, 4), [byRating]);

  const goDetail = (id: string) => navigation.navigate("Detail", { id });
  const goBrowse = (type: ContentType) =>
    navigation.navigate("Browse", { type });

  return (
    <GradientBackground>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <TopBar />

        <ScrollView
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <ActivityIndicator color={p.primary} style={{ marginTop: 50 }} />
          ) : items.length === 0 && !search.trim() ? (
            <Text style={[styles.empty, { color: p.textDim }]}>
              {t.noContent}
            </Text>
          ) : (
            <>
              {/* Big hero carousel (hidden while searching) */}
              {!search.trim() && heroSlides.length > 0 && (
                <HeroCarousel
                  items={heroSlides}
                  onOpen={goDetail}
                  overline={t.spotlight}
                />
              )}

              {/* Search */}
              <View style={styles.searchWrap}>
                <View
                  style={[
                    styles.search,
                    { backgroundColor: p.glass, borderColor: p.glassBorder },
                  ]}
                >
                  <Text style={[styles.searchIcon, { color: p.textFaint }]}>
                    ⌕
                  </Text>
                  <TextInput
                    style={[styles.searchInput, { color: p.text }]}
                    placeholder={t.searchPlaceholder}
                    placeholderTextColor={p.textFaint}
                    value={search}
                    onChangeText={setSearch}
                  />
                </View>
              </View>

              {/* Category chips -> open Browse screen per type */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipRow}
              >
                {FILTERS.filter((f) => f.key !== "all").map((f) => (
                  <TouchableOpacity
                    key={f.key}
                    onPress={() => goBrowse(f.key as ContentType)}
                    style={[
                      styles.chip,
                      { backgroundColor: p.glass, borderColor: p.glassBorder },
                    ]}
                  >
                    <Text style={[styles.chipText, { color: p.textDim }]}>
                      {f.label} ›
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Search results, if searching */}
              {search.trim() ? (
                items.length === 0 ? (
                  <Text style={[styles.empty, { color: p.textDim }]}>
                    {t.noContent}
                  </Text>
                ) : (
                  <View style={styles.grid}>
                    {items.map((item) => (
                      <TouchableOpacity
                        key={item._id}
                        style={[
                          styles.gCard,
                          {
                            backgroundColor: p.card,
                            borderColor: p.glassBorder,
                          },
                        ]}
                        onPress={() => goDetail(item._id)}
                        activeOpacity={0.85}
                      >
                        <Image
                          source={{ uri: item.posterUrl }}
                          style={styles.gPoster}
                        />
                        <View
                          style={[
                            styles.badge,
                            { backgroundColor: badgeColor(p, item.type) },
                          ]}
                        >
                          <Text style={styles.badgeText}>
                            {item.type.toUpperCase()}
                          </Text>
                        </View>
                        <Text
                          style={[styles.gTitle, { color: p.text }]}
                          numberOfLines={1}
                        >
                          {item.title}
                        </Text>
                        <Text style={[styles.gMeta, { color: p.textDim }]}>
                          {item.releaseYear} ·{" "}
                          <Text style={{ color: p.star }}>
                            ★ {Number(item.averageRating || 0).toFixed(1)}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )
              ) : (
                <>
                  {/* Recommended (horizontal) */}
                  <SectionHeader title={t.continueBrowsing} palette={p} />
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.hRow}
                  >
                    {recommended.map((item) => (
                      <TouchableOpacity
                        key={item._id}
                        style={styles.hCard}
                        onPress={() => goDetail(item._id)}
                        activeOpacity={0.85}
                      >
                        <Image
                          source={{ uri: item.posterUrl }}
                          style={styles.hPoster}
                        />
                        <View
                          style={[
                            styles.badge,
                            { backgroundColor: badgeColor(p, item.type) },
                          ]}
                        >
                          <Text style={styles.badgeText}>
                            {item.type.toUpperCase()}
                          </Text>
                        </View>
                        <Text
                          style={[styles.hTitle, { color: p.text }]}
                          numberOfLines={1}
                        >
                          {item.title}
                        </Text>
                        <Text style={[styles.hMeta, { color: p.star }]}>
                          ★ {Number(item.averageRating || 0).toFixed(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  {/* Latest releases (grid 2-col) */}
                  <SectionHeader title={t.latestReleases} palette={p} />
                  <View style={styles.grid}>
                    {items.map((item) => (
                      <TouchableOpacity
                        key={item._id}
                        style={[
                          styles.gCard,
                          {
                            backgroundColor: p.card,
                            borderColor: p.glassBorder,
                          },
                        ]}
                        onPress={() => goDetail(item._id)}
                        activeOpacity={0.85}
                      >
                        <Image
                          source={{ uri: item.posterUrl }}
                          style={styles.gPoster}
                        />
                        <View
                          style={[
                            styles.badge,
                            { backgroundColor: badgeColor(p, item.type) },
                          ]}
                        >
                          <Text style={styles.badgeText}>
                            {item.type.toUpperCase()}
                          </Text>
                        </View>
                        <Text
                          style={[styles.gTitle, { color: p.text }]}
                          numberOfLines={1}
                        >
                          {item.title}
                        </Text>
                        <Text style={[styles.gMeta, { color: p.textDim }]}>
                          {item.releaseYear} ·{" "}
                          <Text style={{ color: p.star }}>
                            ★ {Number(item.averageRating || 0).toFixed(1)}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Top picks (numbered list) */}
                  <SectionHeader title={t.topContent} palette={p} />
                  <View style={{ paddingHorizontal: 16 }}>
                    {topPicks.map((item, idx) => (
                      <TouchableOpacity
                        key={item._id}
                        style={[
                          styles.rankRow,
                          {
                            backgroundColor: p.glass,
                            borderColor: p.glassBorder,
                          },
                        ]}
                        onPress={() => goDetail(item._id)}
                        activeOpacity={0.85}
                      >
                        <Text style={[styles.rankNum, { color: p.textFaint }]}>
                          {String(idx + 1).padStart(2, "0")}
                        </Text>
                        <Image
                          source={{ uri: item.posterUrl }}
                          style={styles.rankPoster}
                        />
                        <View style={{ flex: 1 }}>
                          <Text
                            style={[styles.rankTitle, { color: p.text }]}
                            numberOfLines={1}
                          >
                            {item.title}
                          </Text>
                          <Text
                            style={[styles.rankMeta, { color: p.textDim }]}
                            numberOfLines={1}
                          >
                            {item.creator}
                          </Text>
                        </View>
                        <Text style={[styles.rankStar, { color: p.star }]}>
                          ★ {Number(item.averageRating || 0).toFixed(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </>
          )}
        </ScrollView>

        <BottomTabBar />
      </View>
    </GradientBackground>
  );
}

function SectionHeader({
  title,
  palette,
}: {
  title: string;
  palette: ReturnType<typeof useSettings>["palette"];
}) {
  return (
    <View style={styles.sectionHead}>
      <View
        style={[styles.sectionAccent, { backgroundColor: palette.primary }]}
      />
      <Text style={[styles.sectionTitle, { color: palette.text }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  greetRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 18,
    marginTop: 4,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "800", fontSize: 18 },
  greetHi: { fontSize: 13 },
  greetName: { fontSize: 20, fontWeight: "800" },

  searchWrap: { paddingHorizontal: 18, marginTop: 16 },
  search: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 26,
    paddingHorizontal: 16,
  },
  searchIcon: { fontSize: 20, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15 },

  chipRow: { paddingHorizontal: 18, paddingVertical: 14, gap: 10 },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 22,
    borderWidth: 1,
    marginRight: 10,
  },
  chipText: { fontWeight: "700", fontSize: 13 },

  heroWrap: { paddingHorizontal: 16, marginBottom: 6 },
  hero: {
    height: 230,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  heroImg: { borderRadius: 20 },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(8,6,8,0.45)",
  },
  heroContent: { padding: 18 },
  trendTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  trendText: { color: "#fff", fontSize: 11, fontWeight: "800" },
  heroTitle: { color: "#fff", fontSize: 26, fontWeight: "900" },
  heroMeta: { color: "#eaeaea", fontSize: 13, marginTop: 4 },
  heroBtnRow: { flexDirection: "row", marginTop: 12 },
  heroBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  heroBtnText: { color: "#fff", fontWeight: "800" },

  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    marginTop: 22,
    marginBottom: 12,
  },
  sectionAccent: { width: 4, height: 18, borderRadius: 2 },
  sectionTitle: { fontSize: 18, fontWeight: "800" },

  hRow: { paddingHorizontal: 16, gap: 12 },
  hCard: { width: 130, marginRight: 12 },
  hPoster: {
    width: 130,
    height: 180,
    borderRadius: 14,
    backgroundColor: "#000",
  },
  hTitle: { fontSize: 13, fontWeight: "700", marginTop: 8 },
  hMeta: { fontSize: 12, fontWeight: "700", marginTop: 2 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 12,
  },
  gCard: {
    width: "47%",
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 4,
  },
  gPoster: { width: "100%", aspectRatio: 2 / 3, backgroundColor: "#000" },
  gTitle: {
    fontSize: 14,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  gMeta: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 2,
  },

  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "800" },

  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
  },
  rankNum: { fontSize: 18, fontWeight: "900", width: 28, textAlign: "center" },
  rankPoster: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#000",
  },
  rankTitle: { fontSize: 14, fontWeight: "700" },
  rankMeta: { fontSize: 12, marginTop: 2 },
  rankStar: { fontSize: 13, fontWeight: "800" },

  empty: { textAlign: "center", marginTop: 50 },
});
