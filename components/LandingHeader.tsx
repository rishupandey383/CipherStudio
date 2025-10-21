import React, { useState, useEffect } from 'react';
import type { Theme } from '../types';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import CipherSchoolsLogo from './icons/CipherSchoolsLogo';
import UserAvatar from './UserAvatar';

interface LandingHeaderProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onGoToDashboard: () => void;
  currentUser: { email: string } | null;
  theme: Theme;
  onToggleTheme: () => void;
}

const navLinks = [
];

const LandingHeader: React.FC<LandingHeaderProps> = ({ 
  onGetStarted, 
  onLogin, 
  onGoToDashboard,
  currentUser,
  theme, 
  onToggleTheme 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header className={`px-4 sm:px-6 lg:px-8 py-3 backdrop-blur-md sticky top-0 z-40 w-full border-b border-gray-200/80 dark:border-gray-800/50 transition-all duration-300 ${
        isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 shadow-md' 
        : 'bg-white/80 dark:bg-gray-900/80'
    }`}>
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#" aria-label="Scroll to top">
            <CipherSchoolsLogo className="h-10 w-auto" />
          </a>
          <div className="hidden md:flex items-center gap-2">
             {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all duration-200"
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </a>
             ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700/60 transition-colors"
            title="Toggle Theme"
            >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>

          {currentUser ? (
             <UserAvatar email={currentUser.email} onClick={onGoToDashboard} />
          ) : (
            <>
              <button onClick={onLogin} className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg border border-transparent hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all">Login</button>
              <button
                onClick={onGetStarted}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-800 animate-violet-glow"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default LandingHeader;