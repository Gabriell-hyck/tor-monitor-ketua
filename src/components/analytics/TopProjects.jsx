import Card from '../ui/Card';
import { useWakaTime } from '../../hooks/useWakatime';

export default function TopProjects({ range }) {
  const { stats, loading, error } = useWakaTime(range);

  if (loading) return <Card><Skeleton /></Card>;
  if (error) return <Card><p className="text-red-500">Error: {error}</p></Card>;

  const projects = stats?.projects?.slice(0, 5) || [];

  return (
    <Card>
      <h3 className="font-medium mb-4 dark:text-white">Top Projects</h3>
      {projects.length === 0 && <p className="text-soft">No data</p>}
      <div className="space-y-3">
        {projects.map(proj => (
          <div key={proj.name} className="flex justify-between text-sm dark:text-white">
            <span>{proj.name}</span>
            <span className="text-soft">{Math.round(proj.total_seconds / 3600)}h</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

const Skeleton = () => <div className="space-y-3"><div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-3/4" /><div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/2" /></div>;