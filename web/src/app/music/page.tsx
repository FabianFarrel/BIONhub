'use client';

import TypeListView from '@/components/TypeListView';
import { useSettings } from '@/context/SettingsContext';

export default function MusicPage() {
  const { t } = useSettings();
  return <TypeListView type="music" title={t.musicTrending} subtitle={t.musicTrendingSub} />;
}
