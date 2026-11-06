import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import api from "../api/client";
import { useSettings } from "../context/SettingsContext";
import { badgeColor } from "../theme";
import GradientBackground from "../components/GradientBackground";
import TopBar from "../components/TopBar";
import BottomTabBar from "../components/BottomTabBar";
import type { Content, RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Favorites">;

export default function FavoritesScreen({ navigation }: Props) {
  const { palette: p, t } = useSettings();
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    api
      .get<{ favorites: Content[] }>("/favorites")
      .then((res) => setItems(res.data.favorites))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(load);

  const renderItem = ({ item }: { item: Content }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: p.card, borderColor: p.glassBorder },
      ]}
      onPress={() => navigation.navigate("Detail", { id: item._id })}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.posterUrl }} style={styles.poster} />
      <View
        style={[styles.badge, { backgroundColor: badgeColor(p, item.type) }]}
      >
        <Text style={styles.badgeText}>{item.type.toUpperCase()}</Text>
      </View>
      <Text style={[styles.cardTitle, { color: p.text }]} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={[styles.cardMeta, { color: p.textDim }]}>
        {item.releaseYear || "—"} ·{" "}
        <Text style={{ color: p.star }}>
          ★ {Number(item.averageRating || 0).toFixed(1)}
        </Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <TopBar />
        <View style={styles.titleRow}>
          <View
            style={[styles.sectionAccent, { backgroundColor: p.primary }]}
          />
          <Text style={[styles.pageTitle, { color: p.text }]}>
            {t.yourFavorites}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator color={p.primary} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={items}
            keyExtractor={(i) => i._id}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
            contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
            ListEmptyComponent={
              <Text style={[styles.empty, { color: p.textDim }]}>
                {t.noFavorites}
              </Text>
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
    paddingHorizontal: 18,
    marginTop: 4,
    marginBottom: 14,
  },
  sectionAccent: { width: 4, height: 20, borderRadius: 2 },
  pageTitle: { fontSize: 22, fontWeight: "800" },
  card: { flex: 1, borderWidth: 1, borderRadius: 14, overflow: "hidden" },
  poster: { width: "100%", aspectRatio: 2 / 3, backgroundColor: "#000" },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "800" },
  cardTitle: {
    fontWeight: "700",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  cardMeta: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 2,
  },
  empty: { textAlign: "center", marginTop: 50 },
});
