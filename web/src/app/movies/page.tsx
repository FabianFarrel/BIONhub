'use client';

import TypeListView from '@/components/TypeListView';
import { useSettings } from '@/context/SettingsContext';

export default function MoviesPage() {
  const { t } = useSettings();
  return <TypeListView type="movie" title={t.latestCinematic} subtitle={t.latestCinematicSub} />;
}
