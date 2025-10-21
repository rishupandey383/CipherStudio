import React from 'react';
import ProjectsIcon from './icons/ProjectsIcon';
import TrendingIcon from './icons/TrendingIcon';
import HomeIcon from './icons/HomeIcon';
import CipherSchoolsLogo from './icons/CipherSchoolsLogo';
import type { DashboardView } from './DashboardPage';

interface SidebarProps {
  activeView: DashboardView;
  onNavigate: (view: DashboardView) => void;
  onGoHome: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, onGoHome }) => {
  const navItems = [
    { name: 'Home', view: 'home' as DashboardView, icon: HomeIcon },
    { name: 'Projects', view: 'projects' as DashboardView, icon: ProjectsIcon },
    { name: 'Trending', view: 'trending' as DashboardView, icon: TrendingIcon },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-900 p-4 hidden md:flex flex-col border-r border-gray-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-10 px-2">
        <CipherSchoolsLogo className="h-9 w-auto" />
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              if (item.view === 'home') {
                onGoHome();
              } else {
                onNavigate(item.view);
              }
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 text-left active:scale-95 ${
              activeView === item.view
                ? 'bg-orange-500 text-white shadow'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;