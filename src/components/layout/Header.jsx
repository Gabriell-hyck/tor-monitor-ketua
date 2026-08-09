import { useApp } from '../../context/AppContext';
import { Sun, Moon } from 'lucide-react';
import { formatDate } from '../../utils/date';

export default function Header() {
  const { theme, toggleTheme } = useApp();
  const today = formatDate(new Date(), { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-dark dark:text-white">Dashboard</h2>
        <p className="text-sm text-soft">{today}</p>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-xl hover:bg-primary/10 transition-colors text-soft hover:text-dark dark:hover:text-white"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}