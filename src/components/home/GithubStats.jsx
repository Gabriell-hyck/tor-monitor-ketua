import { useGitHubProfile, useGitHubContributions } from '../../hooks/useGitHub';
import { useApp } from '../../context/AppContext';
import ActivityCalendar from 'react-activity-calendar';
import Card from '../ui/Card';
import { formatNumber } from '../../utils/helpers';

export default function GitHubStats() {
  const { username } = useApp();
  const { profile, loading: profileLoading } = useGitHubProfile(username);
  const { data: contributions, loading: contribLoading } = useGitHubContributions(username);

  if (profileLoading || contribLoading) return <Card><p>Loading...</p></Card>;

  return (
    <div className="grid gap-4">
      <Card>
        <div className="flex items-center gap-4">
          <img src={profile.avatarUrl} className="w-14 h-14 rounded-full" />
          <div>
            <h2 className="font-semibold text-lg">{profile.name}</h2>
            <p className="text-soft text-sm">@{profile.login}</p>
          </div>
        </div>
        <div className="flex gap-6 mt-4 text-sm">
          <div><span className="font-semibold">{formatNumber(profile.followers.totalCount)}</span> followers</div>
          <div><span className="font-semibold">{formatNumber(profile.repositories.totalCount)}</span> repos</div>
          <div><span className="font-semibold">{formatNumber(profile.contributionsCollection.contributionCalendar.totalContributions)}</span> contributions</div>
        </div>
      </Card>

      {contributions.length > 0 && (
        <Card>
          <h3 className="font-medium mb-3">Contributions</h3>
          <ActivityCalendar
            data={contributions}
            colorScheme="light"
            theme={{
              light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
            }}
            labels={{ totalCount: '{{count}} contributions in the last year' }}
          />
        </Card>
      )}
    </div>
  );
}