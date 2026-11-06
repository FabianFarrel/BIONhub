import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import GradientBackground from '../components/GradientBackground';
import TopBar from '../components/TopBar';
import BottomTabBar from '../components/BottomTabBar';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen(_props: Props) {
  const { user, logout } = useAuth();
  const { palette: p, t, lang, mode, setLang, setMode } = useSettings();
  const insets = useSafeAreaInsets();

  return (
    <GradientBackground>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <TopBar />
        <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }}>
          {/* Profile header */}
          <View style={[styles.profileCard, { backgroundColor: p.glass, borderColor: p.glassBorder }]}>
            <View style={[styles.avatar, { backgroundColor: p.primary }]}>
              <Text style={styles.avatarText}>
                {(user?.name?.charAt(0) || 'U').toUpperCase()}
              </Text>
            </View>
            <Text style={[styles.name, { color: p.text }]}>{user?.name}</Text>
            <Text style={[styles.email, { color: p.textDim }]}>{user?.email}</Text>
          </View>

          {/* Settings */}
          <Text style={[styles.sectionLabel, { color: p.textDim }]}>{t.settings}</Text>

          {/* Language */}
          <View style={[styles.settingCard, { backgroundColor: p.glass, borderColor: p.glassBorder }]}>
            <Text style={[styles.settingTitle, { color: p.text }]}>🌐  {t.language}</Text>
            <View style={styles.segment}>
              <SegBtn label="EN" active={lang === 'en'} onPress={() => setLang('en')} palette={p} />
              <SegBtn label="ID" active={lang === 'id'} onPress={() => setLang('id')} palette={p} />
            </View>
          </View>

          {/* Theme */}
          <View style={[styles.settingCard, { backgroundColor: p.glass, borderColor: p.glassBorder }]}>
            <Text style={[styles.settingTitle, { color: p.text }]}>🎨  {t.theme}</Text>
            <View style={styles.segment}>
              <SegBtn label={`☀ ${t.lightMode}`} active={mode === 'light'} onPress={() => setMode('light')} palette={p} />
              <SegBtn label={`☾ ${t.darkMode}`} active={mode === 'dark'} onPress={() => setMode('dark')} palette={p} />
            </View>
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={[styles.logoutBtn, { backgroundColor: p.primary }]}
            onPress={logout}
            activeOpacity={0.85}
          >
            <Text style={styles.logoutText}>⎋  {t.logout}</Text>
          </TouchableOpacity>

          <Text style={[styles.footer, { color: p.textFaint }]}>BIONhub · {t.appTagline}</Text>
        </ScrollView>

        <BottomTabBar />
      </View>
    </GradientBackground>
  );
}

function SegBtn({
  label,
  active,
  onPress,
  palette,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  palette: ReturnType<typeof useSettings>['palette'];
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.segBtn,
        {
          backgroundColor: active ? palette.primary : 'transparent',
          borderColor: active ? palette.primary : palette.glassBorder,
        },
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.segText, { color: active ? '#fff' : palette.textDim }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profileCard: { alignItems: 'center', borderWidth: 1, borderRadius: 20, padding: 24 },
  avatar: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 30, fontWeight: '900' },
  name: { fontSize: 20, fontWeight: '800', marginTop: 12 },
  email: { fontSize: 14, marginTop: 2 },

  sectionLabel: { fontSize: 13, fontWeight: '700', marginTop: 24, marginBottom: 10, letterSpacing: 0.5 },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  settingTitle: { fontSize: 15, fontWeight: '700' },
  segment: { flexDirection: 'row', gap: 8 },
  segBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10, borderWidth: 1 },
  segText: { fontWeight: '700', fontSize: 13 },

  logoutBtn: { borderRadius: 14, paddingVertical: 15, alignItems: 'center', marginTop: 16 },
  logoutText: { color: '#fff', fontWeight: '800', fontSize: 15 },

  footer: { textAlign: 'center', marginTop: 24, fontSize: 12 },
});
