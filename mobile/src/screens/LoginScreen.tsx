import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";
import GradientBackground from "../components/GradientBackground";
import TopBar from "../components/TopBar";
import LogoMark from "../components/LogoMark";
import { IconMail, IconLock, IconStar, IconPlay } from "../components/Icons";
import type { RootStackParamList } from "../types";
import type { AxiosError } from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const { palette: p, t } = useSettings();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (err) {
      const axErr = err as AxiosError<{ message?: string }>;
      setError(axErr.response?.data?.message || t.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { paddingTop: insets.top + 6 },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <TopBar />

          <View style={styles.brandRow}>
            <LogoMark size={56} />
          </View>

          <View
            style={[
              styles.badge,
              { backgroundColor: p.glass, borderColor: p.glassBorder },
            ]}
          >
            <IconStar size={13} color={p.accent} />
            <Text style={[styles.badgeText, { color: p.accent }]}>
              {t.vipBadge}
            </Text>
          </View>

          <Text style={[styles.title, { color: p.text }]}>{t.welcomeBack}</Text>
          <Text style={[styles.subtitle, { color: p.textDim }]}>
            {t.loginSubtitle}
          </Text>

          <View
            style={[
              styles.card,
              { backgroundColor: p.glass, borderColor: p.glassBorder },
            ]}
          >
            {!!error && (
              <Text
                style={[
                  styles.error,
                  { color: "#ff8a8a", backgroundColor: "rgba(229,9,20,0.12)" },
                ]}
              >
                {error}
              </Text>
            )}

            <Text style={[styles.label, { color: p.textDim }]}>{t.email}</Text>
            <View
              style={[
                styles.inputWrap,
                { backgroundColor: p.bgElev, borderColor: p.glassBorder },
              ]}
            >
              <View style={styles.iconBox}>
                <IconMail size={18} color={p.textFaint} />
              </View>
              <TextInput
                style={[styles.input, { color: p.text }]}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="you@example.com"
                placeholderTextColor={p.textFaint}
              />
            </View>

            <Text style={[styles.label, { color: p.textDim }]}>
              {t.password}
            </Text>
            <View
              style={[
                styles.inputWrap,
                { backgroundColor: p.bgElev, borderColor: p.glassBorder },
              ]}
            >
              <View style={styles.iconBox}>
                <IconLock size={18} color={p.textFaint} />
              </View>
              <TextInput
                style={[styles.input, { color: p.text }]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="••••••"
                placeholderTextColor={p.textFaint}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: p.primary }]}
              onPress={onSubmit}
              disabled={loading}
              activeOpacity={0.85}
            >
              <View style={styles.btnInner}>
                <IconPlay size={15} color="#fff" />
                <Text style={styles.buttonText}>
                  {loading ? t.loggingIn : t.login}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={[styles.switch, { color: p.textDim }]}>
                {t.noAccount}{" "}
                <Text style={{ color: p.primary, fontWeight: "700" }}>
                  {t.signUp}
                </Text>
              </Text>
            </TouchableOpacity>

            <Text style={[styles.demo, { color: p.textFaint }]}>
              {t.demoHint}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    paddingBottom: 40,
  },
  brandRow: { alignItems: "center", marginTop: 18, marginBottom: 2 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 18,
    marginLeft: 4,
  },
  badgeText: { fontSize: 11, fontWeight: "800", letterSpacing: 0.5 },
  iconBox: { width: 18, marginRight: 8, alignItems: "center" },
  btnInner: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 30, fontWeight: "800", marginTop: 16, marginLeft: 4 },
  subtitle: { fontSize: 14, marginBottom: 20, marginLeft: 4 },
  card: { borderRadius: 22, borderWidth: 1, padding: 20 },
  label: { marginTop: 14, marginBottom: 6, fontSize: 13, fontWeight: "600" },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputIcon: { fontSize: 16, marginRight: 8, width: 18, textAlign: "center" },
  input: { flex: 1, paddingVertical: 13, fontSize: 15 },
  button: {
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 22,
    shadowColor: "#e50914",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  switch: { textAlign: "center", marginTop: 20, fontSize: 14 },
  demo: { textAlign: "center", marginTop: 20, fontSize: 12 },
  error: {
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 13,
    marginBottom: 4,
  },
});
