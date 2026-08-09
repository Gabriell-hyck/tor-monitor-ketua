import { useWakatime } from '../../hooks/useWakatime';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

export default function CodingChart() {
  const { stats, loading } = useWakatime();

  if (loading) return <Card><p>Loading...</p></Card>;
  if (!stats) return <Card><p className="text-soft">No data</p></Card>;

  const data = stats.languages.slice(0, 5).map(lang => ({
    name: lang.name,
    hours: +(lang.total_seconds / 3600).toFixed(1),
  }));

  return (
    <Card>
      <h3 className="font-medium mb-4">Coding Hours by Language</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis unit="h" />
          <Tooltip />
          <Bar dataKey="hours" fill="#A8E6CF" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}