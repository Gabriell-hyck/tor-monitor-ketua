import { NavLink } from 'react-router-dom';
import { Home, FolderGit2, BarChart3, User, CheckSquare } from 'lucide-react';

const links = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/repos', icon: FolderGit2, label: 'Repos' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
];

export default function Sidebar({ collapsed }) {
  return (
    <aside className={`hidden md:flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-r border-gray-100 dark:border-gray-700 transition-all duration-300 h-screen ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center h-14 px-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-accent font-bold text-sm">D</div>
          {!collapsed && <span className="font-semibold text-dark dark:text-white text-lg">DevDash</span>}
        </div>
      </div>
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? 'bg-primary/30 text-accent' : 'text-soft hover:bg-primary/10 dark:hover:bg-gray-700'
              }`
            }
          >
            <Icon size={20} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}