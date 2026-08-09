import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWakaTime } from '../hooks/useWakatime';
import { useGitHubContext } from '../context/GitHubContext';
import ActivityChart from '../components/charts/ActivityChart';
import LanguageDonut from '../components/charts/LanguageDonut';
import CommitFrequency from '../components/analytics/CommitFrequency';
import TopProjects from '../components/analytics/TopProjects';
import GitHubStats from '../components/home/GitHubStats';
import Button from '../components/ui/Button';

const RANGES = [
  { label: '7 Days', value: 'last_7_days' },
  { label: '30 Days', value: 'last_30_days' },
  { label: '6 Months', value: 'last_6_months' },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState('last_7_days');
  const { stats, summaries, loading: wakaLoading, error: wakaError } = useWakaTime(range);
  const { contributions } = useGitHubContext();

  const activityData = summaries?.data?.map(day => ({
    date: new Date(day.range.date).toLocaleDateString('en-US', { weekday: 'short' }),
    hours: +(day.grand_total.total_seconds / 3600).toFixed(1),
  })) ?? [];

  const languageData = stats?.languages?.slice(0, 5).map(lang => ({
    name: lang.name,
    hours: +(lang.total_seconds / 3600).toFixed(1),
  })) ?? [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Analytics</h1>
        <div className="flex gap-2">
          {RANGES.map(r => (
            <Button
              key={r.value}
              variant={range === r.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setRange(r.value)}
            >
              {r.label}
            </Button>
          ))}
        </div>
      </div>

      {wakaError && <p className="text-red-500">WakaTime: {wakaError}</p>}

      <div className="grid md:grid-cols-2 gap-6">
        <ActivityChart data={activityData} />
        <LanguageDonut data={languageData} />
      </div>

      <GitHubStats />

      <div className="grid md:grid-cols-2 gap-6">
        <TopProjects range={range} />
        <CommitFrequency />
      </div>
    </motion.div>
  );
}