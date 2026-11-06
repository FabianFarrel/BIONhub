import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSettings } from "../context/SettingsContext";
import LogoMark from "./LogoMark";

/**
 * Brand header with quick language + theme toggles.
 * Shows a small "BIONhub" logo mark on the left and two pill toggles on the right.
 */
export default function TopBar({ showBrand = true }: { showBrand?: boolean }) {
  const { palette: p, lang, mode, toggleLang, toggleTheme } = useSettings();

  return (
    <View style={styles.row}>
      {showBrand ? (
        <View style={styles.brandWrap}>
          <LogoMark size={30} />
          <Text style={[styles.brand, { color: p.text }]}>
            BION<Text style={{ color: p.primary }}>hub</Text>
          </Text>
        </View>
      ) : (
        <View />
      )}

      <View style={styles.toggles}>
        <TouchableOpacity
          onPress={toggleLang}
          style={[
            styles.pill,
            { backgroundColor: p.glass, borderColor: p.glassBorder },
          ]}
          activeOpacity={0.7}
        >
          <Text style={[styles.pillText, { color: p.text }]}>
            {lang.toUpperCase()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[
            styles.pill,
            { backgroundColor: p.glass, borderColor: p.glassBorder },
          ]}
          activeOpacity={0.7}
        >
          <Text style={[styles.pillText, { color: p.text }]}>
            {mode === "dark" ? "☾" : "☀"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  brandWrap: { flexDirection: "row", alignItems: "center", gap: 8 },
  brand: { fontSize: 19, fontWeight: "800" },
  toggles: { flexDirection: "row", gap: 8 },
  pill: {
    minWidth: 40,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pillText: { fontWeight: "700", fontSize: 14 },
});
