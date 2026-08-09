import { useWakatime } from '../../hooks/useWakatime';
import Card from '../ui/Card';
import { Clock } from 'lucide-react';

export default function WakatimeCard() {
  const { stats, loading } = useWakatime();

  if (loading) return <Card><p>Loading...</p></Card>;
  if (!stats) return <Card><p className="text-soft">Connect Wakatime</p></Card>;

  const total = stats.total_seconds / 3600;
  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <Clock size={20} className="text-accent" />
        <h3 className="font-medium">This Week</h3>
      </div>
      <p className="text-3xl font-bold text-accent">{total.toFixed(1)}h</p>
      <div className="mt-2 space-y-1">
        {stats.languages.slice(0, 3).map(lang => (
          <div key={lang.name} className="flex justify-between text-sm">
            <span>{lang.name}</span>
            <span className="text-soft">{((lang.total_seconds / 3600).toFixed(1))}h</span>
          </div>
        ))}
      </div>
    </Card>
  );
}