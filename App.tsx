import React, { useState, useCallback, useEffect } from 'react';
import type { Theme, Project, ProjectTemplate, SandpackFiles } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DEFAULT_PROJECT_FILES, DEFAULT_TEST_PROJECT } from './constants';
import LandingPage from './components/LandingPage';
import DashboardPage from './components/DashboardPage';
import IDEPage from './components/IDEPage';
import LoginPage from './components/LoginPage';

type View = 'landing' | 'login' | 'dashboard' | 'ide';

const App: React.FC = () => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', [
    DEFAULT_TEST_PROJECT,
  ]);
  
  // State for session and navigation is now persisted in localStorage
  const [currentUser, setCurrentUser] = useLocalStorage<{ email: string } | null>('currentUser', null);
  const [activeView, setActiveView] = useLocalStorage<View>('activeView', 'landing');
  const [activeProjectId, setActiveProjectId] = useLocalStorage<string | null>('activeProjectId', null);

  // On initial load, check if the user is logged in.
  // If not, force them to the landing page, regardless of the stored activeView.
  useEffect(() => {
    if (!currentUser) {
      setActiveView('landing');
      setActiveProjectId(null);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSelectProject = (projectId: string) => {
    setActiveProjectId(projectId);
    setActiveView('ide');
  };

  const handleLoginSuccess = (email: string) => {
    setCurrentUser({ email });
    // Ensure at least one project exists for a good first experience
    if (projects.length === 0) {
      const newProject: Project = {
        id: `project_${Date.now()}`,
        name: 'My First Project',
        description: 'A fresh start from CipherStudio!',
        createdAt: new Date().toISOString(),
        files: DEFAULT_PROJECT_FILES,
      };
      setProjects([newProject]);
    }
    setActiveView('dashboard');
  };

  const handleGetStarted = () => {
    handleLoginSuccess('demo-user@cipherschools.com');
  };

  const handleGoToLogin = () => {
    setActiveView('login');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    // While the useEffect handles this on reload, setting it here provides immediate feedback
    setActiveView('landing');
    setActiveProjectId(null);
  };

  const handleGoToDashboard = () => {
    setActiveView('dashboard');
    setActiveProjectId(null);
  };
  
  const handleNavigateToLanding = () => {
    setActiveView('landing');
  };

  const handleCreateProject = (name: string, description: string) => {
    const newProject: Project = {
      id: `project_${Date.now()}`,
      name,
      description,
      createdAt: new Date().toISOString(),
      files: DEFAULT_PROJECT_FILES,
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const handleCreateProjectFromTemplate = (template: ProjectTemplate) => {
    const newProject: Project = {
      id: `project_${Date.now()}`,
      name: template.title,
      description: template.description,
      createdAt: new Date().toISOString(),
      files: template.files,
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
    handleSelectProject(newProject.id);
  };

  const handleDeleteProject = (projectId: string) => {
    if (
      window.confirm(
        'Are you sure you want to delete this project? This action cannot be undone.'
      )
    ) {
      setProjects((prevProjects) =>
        prevProjects.filter((p) => p.id !== projectId)
      );
      if (activeProjectId === projectId) {
        handleGoToDashboard();
      }
    }
  };

  const handleFilesChange = useCallback(
    (projectId: string, newFiles: SandpackFiles) => {
      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p.id === projectId ? { ...p, files: newFiles } : p
        )
      );
    },
    [setProjects]
  );

  const handleResetProject = (projectId: string) => {
    const projectToReset = projects.find((p) => p.id === projectId);
    if (
      projectToReset &&
      window.confirm(
        'Are you sure you want to reset all files in this project to their default state?'
      )
    ) {
      handleFilesChange(projectId, DEFAULT_PROJECT_FILES);
      setActiveView('dashboard');
      setTimeout(() => {
        handleSelectProject(projectId);
      }, 50);
    }
  };

  const activeProject = projects.find((p) => p.id === activeProjectId);

  const renderView = () => {
    // This is a failsafe to prevent rendering protected views if state somehow becomes inconsistent.
    if (!currentUser && activeView !== 'landing' && activeView !== 'login') {
      return (
        <LandingPage
          onGetStarted={handleGetStarted}
          onLogin={handleGoToLogin}
          theme={theme}
          onToggleTheme={toggleTheme}
          currentUser={currentUser}
          onGoToDashboard={handleGoToDashboard}
        />
      );
    }

    switch (activeView) {
      case 'landing':
        return (
          <LandingPage
            onGetStarted={handleGetStarted}
            onLogin={handleGoToLogin}
            theme={theme}
            onToggleTheme={toggleTheme}
            currentUser={currentUser}
            onGoToDashboard={handleGoToDashboard}
          />
        );
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} theme={theme} onToggleTheme={toggleTheme} />;
      case 'dashboard':
        return (
          <DashboardPage
            currentUser={currentUser}
            projects={projects}
            onCreateProject={handleCreateProject}
            onCreateProjectFromTemplate={handleCreateProjectFromTemplate}
            onDeleteProject={handleDeleteProject}
            onSelectProject={handleSelectProject}
            onLogout={handleLogout}
            onNavigateToLanding={handleNavigateToLanding}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        );
      case 'ide':
        if (activeProject) {
          return (
            <IDEPage
              project={activeProject}
              onFilesChange={handleFilesChange}
              onResetProject={handleResetProject}
              onGoToDashboard={handleGoToDashboard}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          );
        }
        handleGoToDashboard();
        return null;
      default:
        return (
          <LandingPage
            onGetStarted={handleGetStarted}
            onLogin={handleGoToLogin}
            theme={theme}
            onToggleTheme={toggleTheme}
            currentUser={currentUser}
            onGoToDashboard={handleGoToDashboard}
          />
        );
    }
  };

  return <div className={`${theme} app-container`}>{renderView()}</div>;
};

export default App;