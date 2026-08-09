import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGitHubContext } from '../context/GitHubContext';
import Button from '../components/ui/Button';
import RepoCard from '../components/repos/RepoCard';
import { Search } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function ReposPage() {
  const { repos, loading } = useGitHubContext();
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-32 bg-gray-100 dark:bg-gray-700 rounded-2xl" />
      ))}
    </div>
  );

  const languages = [...new Set(repos.map(r => r.language).filter(Boolean))];

  let filtered = repos.filter(repo => {
    const matchSearch = repo.name.toLowerCase().includes(search.toLowerCase());
    const matchLang = langFilter ? repo.language === langFilter : true;
    return matchSearch && matchLang;
  });

  if (sortBy === 'stars') {
    filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else if (sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filtered.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
  }

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedRepos = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">Repositories</h1>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-soft" size={18} />
          <input
            placeholder="Search repos..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 ring-primary/30 outline-none"
          />
        </div>
        <select
          value={langFilter}
          onChange={e => { setLangFilter(e.target.value); setCurrentPage(1); }}
          className="bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm"
        >
          <option value="">All Languages</option>
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}
          className="bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm"
        >
          <option value="updated">Last Updated</option>
          <option value="stars">Stars</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <AnimatePresence>
          {paginatedRepos.map(repo => (
            <motion.div key={repo.id} layout exit={{ opacity: 0 }}>
              <RepoCard repo={repo} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </motion.div>
  );
}