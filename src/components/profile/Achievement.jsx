import Card from '../ui/Card';
import { Award, Star, Zap, BookOpen, Calendar } from 'lucide-react';
import { useStreak } from '../../hooks/useStreak';
import { useGitHubContext } from '../../context/GitHubContext';

const badgeIcons = { Award, Star, Zap, BookOpen, Calendar };

export default function Achievements({ user, totalStars }) {
  const { contributions } = useGitHubContext();
  const { bestStreak } = useStreak(contributions);

  const badges = [
    { icon: 'Award', label: 'Long Streak', desc: `${bestStreak} days`, earned: bestStreak > 7 },
    { icon: 'Star', label: 'Star Collector', desc: `${totalStars} stars`, earned: totalStars > 10 },
    { icon: 'BookOpen', label: 'Repo Master', desc: `${user.public_repos} repos`, earned: user.public_repos > 20 },
    { icon: 'Calendar', label: 'Old Timer', desc: `Joined ${new Date(user.created_at).getFullYear()}`, earned: new Date(user.created_at) < new Date('2020-01-01') },
    { icon: 'Zap', label: 'Commit Hero', desc: contributions?.totalContributions || 0, earned: contributions?.totalContributions > 500 },
  ];

  return (
    <Card>
      <h3 className="font-medium mb-4 dark:text-white">Achievements</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {badges.map(b => {
          const Icon = badgeIcons[b.icon];
          return (
            <div key={b.label} className={`p-3 rounded-xl text-center ${b.earned ? 'bg-primary/20' : 'bg-gray-100 dark:bg-gray-700 opacity-60'}`}>
              <Icon className="mx-auto mb-1" size={22} />
              <p className="text-xs font-medium dark:text-white">{b.label}</p>
              <p className="text-xs text-soft">{b.desc}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}