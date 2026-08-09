import Card from '../ui/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useGitHubEvents } from '../../hooks/useGitHubEvents';
import { useApp } from '../../context/AppContext';

export default function CommitFrequency() {
  const { username } = useApp();
  const { events, loading, error } = useGitHubEvents(username);

  if (loading) return <Card><Skeleton /></Card>;
  if (error) return <Card><p className="text-red-500">Error: {error}</p></Card>;

  const hours = Array(24).fill(0);
  events.filter(e => e.type === 'PushEvent').forEach(e => {
    const hour = new Date(e.created_at).getHours();
    hours[hour]++;
  });

  const data = hours.map((count, hour) => ({
    hour: `${hour}:00`,
    count,
  }));

  return (
    <Card>
      <h3 className="font-medium mb-4 dark:text-white">Commit Frequency by Hour</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="count" fill="#A8E6CF" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-2 text-xs text-soft">
        <span>Morning (5-11)</span>
        <span>Afternoon (12-16)</span>
        <span>Evening (17-4)</span>
      </div>
    </Card>
  );
}

const Skeleton = () => <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />;