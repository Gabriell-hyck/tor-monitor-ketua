import Card from '../ui/Card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { useWakaTime } from '../../hooks/useWakatime';

export default function TechStackRadar() {
  const { stats, loading } = useWakaTime();

  if (loading) return <Card><Skeleton /></Card>;
  if (!stats?.languages) return <Card><p className="text-soft dark:text-white">Connect WakaTime to see tech stack</p></Card>;

  const data = stats.languages.slice(0, 6).map(lang => ({
    language: lang.name,
    hours: +(lang.total_seconds / 3600).toFixed(1),
  }));

  return (
    <Card>
      <h3 className="font-medium mb-4 dark:text-white">Tech Stack</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="language" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis />
          <Radar dataKey="hours" stroke="#2D6A4F" fill="#A8E6CF" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
}

const Skeleton = () => <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />;