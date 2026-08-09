import Card from '../ui/Card';
import { Star, GitFork, Circle } from 'lucide-react';
import { getRelativeTime } from '../../utils/helpers';

export default function RepoCard({ repo }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <a href={repo.url} target="_blank" rel="noreferrer" className="font-medium text-dark hover:underline">
          {repo.name}
        </a>
        <span className="text-xs text-soft">{getRelativeTime(repo.updatedAt)}</span>
      </div>
      {repo.description && <p className="text-sm text-soft mt-1 line-clamp-2">{repo.description}</p>}
      <div className="flex items-center gap-4 mt-3 text-sm text-soft">
        {repo.primaryLanguage && (
          <span className="flex items-center gap-1">
            <Circle size={10} fill={repo.primaryLanguage.color} color={repo.primaryLanguage.color} />
            {repo.primaryLanguage.name}
          </span>
        )}
        <span className="flex items-center gap-1"><Star size={14} /> {repo.stargazerCount}</span>
        <span className="flex items-center gap-1"><GitFork size={14} /> {repo.forkCount}</span>
      </div>
    </Card>
  );
}