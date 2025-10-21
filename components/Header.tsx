import React from 'react';
import type { Theme } from '../types';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import ResetIcon from './icons/ResetIcon';
import HomeIcon from './icons/HomeIcon';
import CipherSchoolsLogo from './icons/CipherSchoolsLogo';
import SaveIcon from './icons/SaveIcon';
import CheckIcon from './icons/CheckIcon';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onResetProject: () => void;
  onGoToDashboard: () => void;
  onSaveProject: () => void;
  isSaved: boolean;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme, onResetProject, onGoToDashboard, onSaveProject, isSaved }) => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex-shrink-0">
      <div className="flex items-center gap-3">
        <CipherSchoolsLogo className="h-8 w-auto" />
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onSaveProject}
          disabled={isSaved}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 ${
            isSaved
              ? 'bg-green-500 text-white cursor-default'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          title="Save Project"
        >
          {isSaved ? <CheckIcon className="w-5 h-5" /> : <SaveIcon className="w-5 h-5" />}
          <span>{isSaved ? 'Saved!' : 'Save'}</span>
        </button>
        <button
          onClick={onGoToDashboard}
          className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          title="Go to Dashboard"
        >
          <HomeIcon className="w-5 h-5" />
        </button>
        <button
          onClick={onResetProject}
          className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          title="Reset Project"
        >
          <ResetIcon className="w-5 h-5" />
        </button>
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;