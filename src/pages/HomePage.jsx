import { motion } from 'framer-motion';
import { useGitHubContext } from '../context/GitHubContext';
import { useWakaTime } from '../hooks/useWakatime';
import { useStreak } from '../hooks/useStreak';
import { useTasksContext } from '../context/TasksContext';
import GitHubStats from '../components/home/GitHubStats';
import ActivityChart from '../components/charts/ActivityChart';
import LanguageDonut from '../components/charts/LanguageDonut';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import RepoCard from '../components/repos/RepoCard';
import { FolderGit2, Star, Clock, Flame, Calendar } from 'lucide-react';
import { formatNumber } from '../utils/helpers';

function StatsCard({ icon: Icon, label, value, sub, colorClass = 'text-accent' }) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-primary/20 ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-soft">{label}</p>
        <p className="text-2xl font-bold dark:text-white">{value}</p>
        {sub && <p className="text-xs text-soft">{sub}</p>}
      </div>
    </Card>
  );
}

export default function HomePage() {
  const { user, repos, contributions } = useGitHubContext();
  const { stats, summaries } = useWakaTime('last_7_days');
  const { currentStreak, bestStreak } = useStreak(contributions);
  const { tasks } = useTasksContext();

  const totalStars = repos?.reduce((acc, repo) => acc + repo.stargazers_count, 0) ?? 0;
  const codingHours = stats?.total_seconds ? (stats.total_seconds / 3600).toFixed(1) : 0;

  const recentRepos = repos?.slice().sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 5) ?? [];

  const activityData = summaries?.data?.map(day => ({
    date: new Date(day.range.date).toLocaleDateString('en-US', { weekday: 'short' }),
    hours: +(day.grand_total.total_seconds / 3600).toFixed(1),
  })) ?? [];

  const languageData = stats?.languages?.slice(0, 5).map(lang => ({
    name: lang.name,
    hours: +(lang.total_seconds / 3600).toFixed(1),
  })) ?? [];

  const todayTasks = tasks.filter(t => {
    const created = new Date(t.createdAt);
    const today = new Date();
    return created.toDateString() === today.toDateString();
  });

  const topLanguage = stats?.languages?.[0]?.name ?? '-';

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard icon={FolderGit2} label="Repositories" value={user?.public_repos ?? '-'} />
        <StatsCard icon={Star} label="Stars" value={totalStars} />
        <StatsCard icon={Clock} label="Coding Hours" value={`${codingHours}h`} sub="this week" />
        <StatsCard icon={Flame} label="Streak" value={`${currentStreak} days`} sub={`Best: ${bestStreak}`} colorClass="text-orange-500" />
      </div>

      <GitHubStats />

      <div className="grid md:grid-cols-2 gap-6">
        <ActivityChart data={activityData} />
        <LanguageDonut data={languageData} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 dark:text-white">Recent Repositories</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {recentRepos.map(repo => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-medium mb-3 flex items-center gap-2 dark:text-white"><Calendar size={18} /> Today's Tasks</h3>
          {todayTasks.length === 0 ? (
            <p className="text-sm text-soft">No tasks created today.</p>
          ) : (
            <div className="space-y-2">
              {todayTasks.slice(0, 5).map(task => (
                <div key={task.id} className="flex items-center gap-2 text-sm dark:text-white">
                  <span className={`w-2 h-2 rounded-full ${task.completed ? 'bg-green-400' : 'bg-gray-300'}`} />
                  <span className={task.completed ? 'line-through text-soft' : ''}>{task.text}</span>
                  <Badge variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'info'} className="ml-auto">
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card>
          <h3 className="font-medium mb-3 dark:text-white">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-soft">Commits</p><p className="font-semibold text-lg dark:text-white">{formatNumber(contributions?.totalContributions ?? 0)}</p></div>
            <div><p className="text-soft">Top Language</p><p className="font-semibold text-lg dark:text-white">{topLanguage}</p></div>
            <div><p className="text-soft">Pull Requests</p><p className="font-semibold text-lg dark:text-white">0</p></div>
            <div><p className="text-soft">Open Issues</p><p className="font-semibold text-lg dark:text-white">0</p></div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}