import GitHubStats from '../components/home/GitHubStats';
import WakatimeCard from '../components/home/WakatimeCard';
import SpotifyWidget from '../components/home/SpotifyWidget';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <GitHubStats />
      <div className="grid md:grid-cols-2 gap-4">
        <WakatimeCard />
        <SpotifyWidget />
      </div>
    </div>
  );
}