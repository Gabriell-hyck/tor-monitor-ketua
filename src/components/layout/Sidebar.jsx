import { NavLink, useLocation } from 'react-router-dom';
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
    <aside className={`h-screen bg-white/80 backdrop-blur-md border-r border-gray-100 p-4 flex flex-col gap-2 
      ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 hidden md:flex`}>
      <div className="mb-8 flex items-center gap-2 px-2 h-10">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-accent font-bold text-sm">
          D
        </div>
        {!collapsed && <span className="font-semibold text-dark text-lg">DevDash</span>}
      </div>
      <nav className="flex flex-col gap-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
              ${isActive ? 'bg-primary/30 text-accent' : 'text-soft hover:bg-primary/10'}`
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