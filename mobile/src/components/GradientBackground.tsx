import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useSettings } from '../context/SettingsContext';

/**
 * Full-screen background that fakes a vertical gradient using three stacked
 * translucent layers (avoids adding expo-linear-gradient as a dependency).
 * Dark mode gives a subtle red-maroon glow at the top, matching the design.
 */
export default function GradientBackground({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { palette: p } = useSettings();
  return (
    <View style={[styles.root, { backgroundColor: p.bg }, style]}>
      <View
        pointerEvents="none"
        style={[styles.glow, { backgroundColor: p.bgGradientTop, opacity: p.mode === 'dark' ? 0.9 : 0.7 }]}
      />
      <View
        pointerEvents="none"
        style={[styles.glowSoft, { backgroundColor: p.bgGradientTop, opacity: p.mode === 'dark' ? 0.4 : 0.3 }]}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, position: 'relative' },
  glow: {
    position: 'absolute',
    top: -180,
    left: -60,
    right: -60,
    height: 360,
    borderRadius: 300,
    transform: [{ scaleX: 1.4 }],
  },
  glowSoft: {
    position: 'absolute',
    top: 60,
    left: -40,
    right: -40,
    height: 260,
    borderRadius: 300,
  },
  content: { flex: 1 },
});
