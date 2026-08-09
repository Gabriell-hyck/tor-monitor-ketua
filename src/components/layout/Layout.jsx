import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { Menu } from 'lucide-react';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex items-center gap-4 p-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <button onClick={() => setCollapsed(!collapsed)}><Menu size={22} /></button>
          <span className="font-semibold text-dark">DevDash</span>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}