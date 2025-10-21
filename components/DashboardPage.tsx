import React from 'react';
import type { Theme, Project, ProjectTemplate } from '../types';
import { AI_STORY_GENERATOR_FILES, ECOMMERCE_STOREFRONT_FILES, PORTFOLIO_3D_FILES } from '../constants';
import Sidebar from './Sidebar';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import ProjectCard from './ProjectCard';
import CreateProjectModal from './CreateProjectModal';
import AddIcon from './icons/AddIcon';
import TrendingProjectCard from './TrendingProjectCard';
import AiBotIcon from './icons/AiBotIcon';
import StorefrontIcon from './icons/StorefrontIcon';
import CubeIcon from './icons/CubeIcon';
import LogoutIcon from './icons/LogoutIcon';
import EmptyState from './EmptyState';
import EmptyProjectsIcon from './icons/EmptyProjectsIcon';

export type DashboardView = 'home' | 'projects' | 'trending';

const templates: ProjectTemplate[] = [
    {
        id: 'ai-story-generator',
        title: 'AI Story Generator',
        description: 'A simple React app that uses an AI model to generate short stories based on a user prompt.',
        icon: AiBotIcon,
        tags: ['React', 'AI', 'useState'],
        files: AI_STORY_GENERATOR_FILES,
    },
    {
        id: 'ecommerce-storefront',
        title: 'E-commerce Storefront',
        description: 'A basic e-commerce product grid with "Add to Cart" functionality. A great starting point for a shopping site.',
        icon: StorefrontIcon,
        tags: ['React', 'E-commerce', 'State Management'],
        files: ECOMMERCE_STOREFRONT_FILES,
    },
    {
        id: '3d-portfolio-item',
        title: 'Interactive 3D Item',
        description: 'Showcase a 3D model using React Three Fiber. The cube rotates and responds to user interaction.',
        icon: CubeIcon,
        tags: ['React', 'Three.js', 'R3F'],
        files: PORTFOLIO_3D_FILES,
    },
];

interface DashboardPageProps {
  currentUser: { email: string } | null;
  projects: Project[];
  onCreateProject: (name: string, description: string) => void;
  onCreateProjectFromTemplate: (template: ProjectTemplate) => void;
  onDeleteProject: (projectId: string) => void;
  onSelectProject: (projectId: string) => void;
  onLogout: () => void;
  onNavigateToLanding: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  currentUser,
  projects,
  onCreateProject,
  onCreateProjectFromTemplate,
  onDeleteProject,
  onSelectProject,
  onLogout,
  onNavigateToLanding,
  theme,
  onToggleTheme,
}) => {
  const [activeView, setActiveView] = React.useState<DashboardView>('projects');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'projects':
        return (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
              <div>
                 <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">Welcome back!</h1>
                 <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your projects or start a new one.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 mt-4 sm:mt-0 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 animate-glow"
              >
                <AddIcon className="w-4 h-4" />
                <span>New Project</span>
              </button>
            </div>
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={project.id}
                            project={project}
                            onSelect={() => onSelectProject(project.id)}
                            onDelete={() => onDeleteProject(project.id)}
                            className="opacity-0 animate-fade-in-up"
                            style={{ animationDelay: `${index * 75}ms` }}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    Icon={EmptyProjectsIcon}
                    title="No Projects Yet"
                    description="Get started by creating your first project or exploring a template."
                >
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-slate-900"
                    >
                        <AddIcon className="w-4 h-4" />
                        <span>Create Project</span>
                    </button>
                </EmptyState>
            )}
          </div>
        );
      case 'trending':
        return (
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 tracking-tight">Trending Templates</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template, index) => (
                        <TrendingProjectCard 
                            key={template.id}
                            template={template}
                            onCreate={onCreateProjectFromTemplate}
                            className="opacity-0 animate-fade-in-up"
                            style={{ animationDelay: `${index * 75}ms` }}
                        />
                    ))}
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-slate-900 font-sans ${theme}`}>
      <Sidebar activeView={activeView} onNavigate={setActiveView} onGoHome={onNavigateToLanding} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
            <div className="flex-1">
                 {currentUser && (
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                        {currentUser.email}
                    </span>
                 )}
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={onToggleTheme}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
                    title="Toggle Theme"
                >
                    {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                </button>
                 <button
                    onClick={onLogout}
                    className="flex items-center gap-2 p-2 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
                    title="Logout"
                >
                    <LogoutIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-slate-900 p-6 md:p-8">
          <div key={activeView} className="animate-slide-in-right">
            {renderContent()}
          </div>
        </main>
      </div>
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={onCreateProject} 
      />
    </div>
  );
};

export default DashboardPage;