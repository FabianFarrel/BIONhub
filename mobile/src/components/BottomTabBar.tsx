import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';
import type { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type TabKey = 'Home' | 'Favorites' | 'Profile';

// Simple text/emoji icons keep us dependency-free.
const icons: Record<TabKey, string> = {
  Home: '⌂',
  Favorites: '♥',
  Profile: '☰',
};

export default function BottomTabBar() {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { palette: p, t } = useSettings();

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'Home', label: t.home },
    { key: 'Favorites', label: t.favorites },
    { key: 'Profile', label: t.profile },
  ];

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: p.glassStrong,
          borderTopColor: p.glassBorder,
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      {tabs.map((tab) => {
        const active = route.name === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => {
              if (!active) navigation.navigate(tab.key);
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.icon, { color: active ? p.primary : p.textFaint }]}>
              {icons[tab.key]}
            </Text>
            <Text style={[styles.label, { color: active ? p.primary : p.textFaint }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  icon: { fontSize: 20, lineHeight: 22 },
  label: { fontSize: 11, fontWeight: '600' },
});
