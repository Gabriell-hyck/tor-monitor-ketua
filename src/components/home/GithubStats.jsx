import { useGitHubContext } from '../../context/GitHubContext';
import ActivityCalendar from 'react-activity-calendar';
import Card from '../ui/Card';
import { formatNumber } from '../../utils/helpers';

export default function GitHubStats() {
  const { user, contributions, loading, error } = useGitHubContext();

  if (loading) return <Card><p>Loading...</p></Card>;
  if (error) return <Card><p className="text-red-500">Error: {error}</p></Card>;

  // transform contribution data untuk ActivityCalendar
  const calendarData = contributions?.weeks
    ?.flatMap(week => week.contributionDays)
    .map(day => ({
      date: day.date,
      count: day.contributionCount,
      level: Math.min(4, Math.ceil(day.contributionCount / 5)),
    })) ?? [];

  return (
    <div className="grid gap-4">
      <Card>
        <div className="flex items-center gap-4">
          <img src={user.avatar_url} className="w-14 h-14 rounded-full" />
          <div>
            <h2 className="font-semibold text-lg">{user.name || user.login}</h2>
            <p className="text-soft text-sm">@{user.login}</p>
          </div>
        </div>
        <div className="flex gap-6 mt-4 text-sm">
          <div><span className="font-semibold">{formatNumber(user.followers)}</span> followers</div>
          <div><span className="font-semibold">{formatNumber(user.public_repos)}</span> repos</div>
          <div><span className="font-semibold">{contributions?.totalContributions ?? 0}</span> contributions</div>
        </div>
      </Card>

      {calendarData.length > 0 && (
        <Card>
          <h3 className="font-medium mb-3">Contributions</h3>
          <ActivityCalendar
            data={calendarData}
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