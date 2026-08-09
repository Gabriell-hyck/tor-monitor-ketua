import Card from '../ui/Card';
import { FolderGit2, Star, Users, GitFork } from 'lucide-react';

export default function StatsRow({ user, totalStars, totalForks }) {
  const stats = [
    { icon: FolderGit2, label: 'Repos', value: user?.public_repos ?? 0 },
    { icon: Star, label: 'Stars', value: totalStars ?? 0 },
    { icon: Users, label: 'Followers', value: user?.followers ?? 0 },
    { icon: GitFork, label: 'Forks', value: totalForks ?? 0 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(s => (
        <Card key={s.label} className="flex items-center gap-3 p-4">
          <s.icon size={22} className="text-accent" />
          <div>
            <p className="text-sm text-soft">{s.label}</p>
            <p className="font-semibold dark:text-white">{s.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}