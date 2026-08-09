import { useGitHubContext } from '../../context/GitHubContext';
import ActivityCalendar from 'react-activity-calendar';
import Card from '../ui/Card';

export default function ContributionGraph() {
  const { contributions, loading } = useGitHubContext();

  if (loading) return <Card><Skeleton /></Card>;

  const calendarData = contributions?.weeks
    ?.flatMap(week => week.contributionDays)
    .map(day => ({
      date: day.date,
      count: day.contributionCount,
      level: Math.min(4, Math.ceil(day.contributionCount / 5)),
    })) ?? [];

  return (
    <Card>
      <h3 className="font-medium mb-4 dark:text-white">Yearly Contributions</h3>
      <ActivityCalendar
        data={calendarData}
        colorScheme="light"
        theme={{ light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'] }}
        labels={{ totalCount: '{{count}} contributions' }}
      />
    </Card>
  );
}

const Skeleton = () => <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />;