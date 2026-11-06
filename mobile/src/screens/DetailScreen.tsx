import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Linking,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";
import { badgeColor } from "../theme";
import GradientBackground from "../components/GradientBackground";
import type { Content, RootStackParamList } from "../types";
import type { AxiosError } from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function DetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const { user, refreshUser } = useAuth();
  const { palette: p, t } = useSettings();
  const insets = useSafeAreaInsets();

  const [item, setItem] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [rating, setRating] = useState("8");
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const res = await api.get<{ item: Content }>(`/content/${id}`);
      setItem(res.data.item);
    } catch {
      setItem(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (user?.favorites) {
      const ids = user.favorites.map((f) =>
        typeof f === "string" ? f : f._id,
      );
      setIsFav(ids.includes(id));
    }
  }, [user, id]);

  const toggleFav = async () => {
    const res = await api.post<{ favorited: boolean }>(`/favorites/${id}`);
    setIsFav(res.data.favorited);
    await refreshUser();
  };

  const submitReview = async () => {
    setMsg("");
    const num = Number(rating);
    if (!num || num < 1 || num > 10) {
      setMsg(t.ratingRange);
      return;
    }
    try {
      const res = await api.post<{ item: Content }>(`/content/${id}/reviews`, {
        rating: num,
        comment,
      });
      setItem(res.data.item);
      setComment("");
      setMsg(t.reviewSaved);
    } catch (err) {
      const axErr = err as AxiosError<{ message?: string }>;
      setMsg(axErr.response?.data?.message || t.reviewError);
    }
  };

  if (loading) {
    return (
      <GradientBackground>
        <ActivityIndicator color={p.primary} style={{ marginTop: 80 }} />
      </GradientBackground>
    );
  }
  if (!item) {
    return (
      <GradientBackground>
        <Text style={[styles.empty, { color: p.textDim }]}>{t.noContent}</Text>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero backdrop */}
        <ImageBackground
          source={{ uri: item.backdropUrl || item.posterUrl }}
          style={[styles.hero, { paddingTop: insets.top }]}
        >
          <View style={styles.heroOverlay} />
          <View style={[styles.heroTopRow, { paddingTop: 6 }]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.circleBtn, { backgroundColor: p.glassStrong }]}
            >
              <Text style={{ color: p.text, fontSize: 18 }}>‹</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.heroBottom}>
            <View style={[styles.trendTag, { backgroundColor: p.primary }]}>
              <Text style={styles.trendText}>🔥 #1 {t.trending}</Text>
            </View>
            <View style={styles.heroTitleRow}>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: badgeColor(p, item.type) },
                ]}
              >
                <Text style={styles.badgeText}>{item.type.toUpperCase()}</Text>
              </View>
              <Text style={styles.heroYear}>{item.releaseYear}</Text>
            </View>
            <Text style={styles.heroTitle}>{item.title}</Text>
            <Text style={styles.heroCreator}>{item.creator}</Text>

            {!!item.trailerUrl && (
              <TouchableOpacity
                style={[styles.trailerBtn, { backgroundColor: p.primary }]}
                onPress={() => Linking.openURL(item.trailerUrl)}
                activeOpacity={0.85}
              >
                <Text style={styles.trailerText}>▶ {t.watchTrailer}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>

        <View style={styles.body}>
          {/* Favorite + rating summary */}
          <View style={styles.statRow}>
            <View
              style={[
                styles.scoreCard,
                { backgroundColor: p.glass, borderColor: p.glassBorder },
              ]}
            >
              <Text style={[styles.scoreNum, { color: p.star }]}>
                {Number(item.averageRating || 0).toFixed(1)}
              </Text>
              <Text style={[styles.scoreMax, { color: p.textDim }]}>/10</Text>
            </View>
            {user ? (
              <TouchableOpacity
                style={[
                  styles.favBtn,
                  {
                    backgroundColor: isFav ? p.success : p.glass,
                    borderColor: isFav ? p.success : p.glassBorder,
                  },
                ]}
                onPress={toggleFav}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.favText,
                    { color: isFav ? "#06220f" : p.text },
                  ]}
                >
                  {isFav ? `♥ ${t.inFavorites}` : `♡ ${t.addFavorite}`}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.favBtn,
                  { backgroundColor: p.primary, borderColor: p.primary },
                ]}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={[styles.favText, { color: "#fff" }]}>
                  {t.loginToReview}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Genres */}
          <View style={styles.genreRow}>
            {item.genres?.map((g) => (
              <Text
                key={g}
                style={[
                  styles.genre,
                  { color: p.textDim, borderColor: p.glassBorder },
                ]}
              >
                {g}
              </Text>
            ))}
            {!!item.runtime && (
              <Text
                style={[
                  styles.genre,
                  { color: p.textDim, borderColor: p.glassBorder },
                ]}
              >
                ⏱ {item.runtime}
              </Text>
            )}
          </View>

          {/* Synopsis */}
          <SectionTitle text={t.overview} palette={p} />
          <Text style={[styles.overview, { color: p.text }]}>
            {item.overview}
          </Text>

          {/* Rating form */}
          {user && (
            <>
              <SectionTitle text={t.addRating} palette={p} />
              <View
                style={[
                  styles.reviewForm,
                  { backgroundColor: p.glass, borderColor: p.glassBorder },
                ]}
              >
                <Text style={[styles.label, { color: p.textDim }]}>
                  {t.ratingLabel}
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: p.bgElev,
                      color: p.text,
                      borderColor: p.glassBorder,
                    },
                  ]}
                  value={rating}
                  onChangeText={setRating}
                  keyboardType="number-pad"
                  maxLength={2}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: p.bgElev,
                      color: p.text,
                      borderColor: p.glassBorder,
                      height: 80,
                      textAlignVertical: "top",
                    },
                  ]}
                  value={comment}
                  onChangeText={setComment}
                  placeholder={t.reviewPlaceholder}
                  placeholderTextColor={p.textFaint}
                  multiline
                />
                <TouchableOpacity
                  style={[styles.submit, { backgroundColor: p.primary }]}
                  onPress={submitReview}
                  activeOpacity={0.85}
                >
                  <Text style={styles.submitText}>{t.submitReview}</Text>
                </TouchableOpacity>
                {!!msg && (
                  <Text style={[styles.msg, { color: p.textDim }]}>{msg}</Text>
                )}
              </View>
            </>
          )}

          {/* Reviews */}
          <SectionTitle
            text={`${t.reviews} (${item.reviews?.length || 0})`}
            palette={p}
          />
          {item.reviews?.length ? (
            item.reviews.map((r) => (
              <View
                key={r._id}
                style={[
                  styles.reviewItem,
                  { backgroundColor: p.card, borderColor: p.glassBorder },
                ]}
              >
                <View style={styles.reviewHead}>
                  <Text style={[styles.reviewName, { color: p.text }]}>
                    {r.userName}
                  </Text>
                  <Text style={[styles.reviewStars, { color: p.star }]}>
                    ★ {r.rating}/10
                  </Text>
                </View>
                {!!r.comment && (
                  <Text style={[styles.reviewComment, { color: p.textDim }]}>
                    {r.comment}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <Text style={[styles.overview, { color: p.textDim }]}>
              {t.noReviews}
            </Text>
          )}
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function SectionTitle({
  text,
  palette,
}: {
  text: string;
  palette: ReturnType<typeof useSettings>["palette"];
}) {
  return (
    <View style={styles.sectionHead}>
      <View
        style={[styles.sectionAccent, { backgroundColor: palette.primary }]}
      />
      <Text style={[styles.sectionTitle, { color: palette.text }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 340, justifyContent: "space-between" },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(8,6,8,0.5)",
  },
  heroTopRow: { flexDirection: "row", paddingHorizontal: 16 },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  heroBottom: { padding: 18 },
  trendTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  trendText: { color: "#fff", fontSize: 11, fontWeight: "800" },
  heroTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  heroYear: { color: "#eaeaea", fontWeight: "700" },
  heroTitle: { color: "#fff", fontSize: 30, fontWeight: "900" },
  heroCreator: { color: "#dcdcdc", fontSize: 13, marginTop: 2 },
  trailerBtn: {
    alignSelf: "flex-start",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 14,
  },
  trailerText: { color: "#fff", fontWeight: "800" },

  body: { paddingHorizontal: 16, marginTop: 16 },
  statRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  scoreCard: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  scoreNum: { fontSize: 26, fontWeight: "900" },
  scoreMax: { fontSize: 13, marginBottom: 4, marginLeft: 2 },
  favBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  favText: { fontWeight: "800", fontSize: 14 },

  genreRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 16 },
  genre: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 12,
  },

  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "800" },

  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
    marginBottom: 10,
  },
  sectionAccent: { width: 4, height: 18, borderRadius: 2 },
  sectionTitle: { fontSize: 18, fontWeight: "800" },

  overview: { fontSize: 14, lineHeight: 22 },

  reviewForm: { borderWidth: 1, borderRadius: 16, padding: 14 },
  label: { marginBottom: 6, fontSize: 13, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    marginBottom: 10,
  },
  submit: { borderRadius: 12, paddingVertical: 13, alignItems: "center" },
  submitText: { color: "#fff", fontWeight: "800" },
  msg: { marginTop: 8, fontSize: 13 },

  reviewItem: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  reviewHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  reviewName: { fontWeight: "800" },
  reviewStars: { fontWeight: "800" },
  reviewComment: { fontSize: 13, lineHeight: 20 },

  empty: { textAlign: "center", marginTop: 80 },
});
