import { useGitHubRepos } from '../hooks/useGitHub';
import { useApp } from '../context/AppContext';
import RepoCard from '../components/repos/RepoCard';
import { motion } from 'framer-motion';

export default function ReposPage() {
  const { username } = useApp();
  const { repos, loading } = useGitHubRepos(username);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Repositories</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <motion.div layout className="grid md:grid-cols-2 gap-4">
          {repos.map(repo => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </motion.div>
      )}
    </div>
  );
}