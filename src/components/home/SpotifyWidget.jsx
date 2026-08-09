import { useSpotify } from '../../hooks/useSpotify';
import Card from '../ui/Card';
import { Music } from 'lucide-react';

export default function SpotifyWidget() {
  const { track, loading } = useSpotify();

  if (loading) return <Card><p>Loading...</p></Card>;
  if (!track) return <Card><p className="text-soft">Not playing</p></Card>;

  return (
    <Card>
      <div className="flex items-center gap-3">
        <Music size={20} className="text-accent" />
        <div className="truncate">
          <p className="font-medium truncate">{track.name}</p>
          <p className="text-sm text-soft truncate">{track.artists.map(a => a.name).join(', ')}</p>
        </div>
      </div>
    </Card>
  );
}