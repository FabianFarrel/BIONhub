'use client';

import TypeListView from '@/components/TypeListView';
import { useSettings } from '@/context/SettingsContext';

export default function SeriesPage() {
  const { t } = useSettings();
  return <TypeListView type="tv" title={t.popularSeries} subtitle={t.popularSeriesSub} />;
}
