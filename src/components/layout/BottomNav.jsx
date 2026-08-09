import { NavLink } from 'react-router-dom';
import { Home, FolderGit2, BarChart3, User, CheckSquare } from 'lucide-react';

const links = [
  { to: '/', icon: Home },
  { to: '/repos', icon: FolderGit2 },
  { to: '/analytics', icon: BarChart3 },
  { to: '/profile', icon: User },
  { to: '/tasks', icon: CheckSquare },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 py-2 flex justify-around z-50">
      {links.map(({ to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `p-2 rounded-xl ${isActive ? 'text-accent bg-primary/30' : 'text-soft'}`
          }
        >
          <Icon size={22} />
        </NavLink>
      ))}
    </nav>
  );
}