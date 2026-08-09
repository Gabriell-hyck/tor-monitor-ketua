import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { useSpotifyData } from '../../hooks/useSpotifyData';
import { getRelativeTime } from '../../utils/date';

export default function SpotifySection() {
  const { currentTrack, recentTracks, loading, error } = useSpotifyData();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <h3 className="font-medium mb-4 dark:text-white">Currently Playing</h3>
        {loading ? <Skeleton /> : error ? <p className="text-red-500">{error}</p> : currentTrack ? (
          <div className="flex gap-4">
            <img src={currentTrack.album.images[0]?.url} className="w-20 h-20 rounded-lg" alt={currentTrack.name} />
            <div className="flex-1">
              <p className="font-medium truncate dark:text-white">{currentTrack.name}</p>
              <p className="text-sm text-soft truncate">{currentTrack.artists.map(a => a.name).join(', ')}</p>
              <ProgressBar value={(currentTrack.progress_ms / currentTrack.duration_ms) * 100} className="mt-2" />
            </div>
          </div>
        ) : <p className="text-soft">Not playing</p>}
      </Card>
      <Card>
        <h3 className="font-medium mb-4 dark:text-white">Recently Played</h3>
        {recentTracks.length === 0 && <p className="text-soft">No data</p>}
        <div className="space-y-2">
          {recentTracks.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="text-soft text-xs w-12">{getRelativeTime(item.played_at)}</span>
              <span className="truncate dark:text-white">{item.track.name}</span>
              <span className="text-soft text-xs">{item.track.artists[0].name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

const Skeleton = () => <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />;