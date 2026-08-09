import Card from '../ui/Card';
import { Star, GitFork, Circle } from 'lucide-react';
import { getRelativeTime } from '../../utils/date';

function getLanguageColor(lang) {
  const colors = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
    HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219',
  };
  return colors[lang] || '#8B8B8B';
}

export default function RepoCard({ repo }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-medium text-dark dark:text-white hover:underline truncate">
          {repo.name}
        </a>
        <span className="text-xs text-soft whitespace-nowrap ml-2">{getRelativeTime(repo.updated_at)}</span>
      </div>
      {repo.description && <p className="text-sm text-soft mt-1 line-clamp-2">{repo.description}</p>}
      <div className="flex items-center gap-4 mt-3 text-sm text-soft">
        {repo.language && (
          <span className="flex items-center gap-1">
            <Circle size={10} fill={getLanguageColor(repo.language)} color={getLanguageColor(repo.language)} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1"><Star size={14} /> {repo.stargazers_count}</span>
        <span className="flex items-center gap-1"><GitFork size={14} /> {repo.forks_count}</span>
      </div>
    </Card>
  );
}