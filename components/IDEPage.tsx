import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from '@codesandbox/sandpack-react';
import type { SandpackTheme, SandpackFiles } from '@codesandbox/sandpack-react';
import { nightOwl } from '@codesandbox/sandpack-themes';
import type { Theme, Project } from '../types';
import Header from './Header';
import FileExplorer from './FileExplorer';

// This component listens for file changes and triggers the auto-save.
const AutoSaveController: React.FC<{
    onFilesChange: (newFiles: SandpackFiles) => void;
}> = ({ onFilesChange }) => {
    const { sandpack, listen } = useSandpack();
    
    useEffect(() => {
        const unsubscribe = listen((message) => {
            // When a file is changed in the editor, call the save handler.
            if (message.type === 'fs/change') {
                onFilesChange(sandpack.files);
            }
        });
        return unsubscribe;
    }, [sandpack.files, onFilesChange, listen]);

    return null;
};

const customDarkTheme: SandpackTheme = {
  ...nightOwl,
  colors: {
    ...nightOwl.colors,
    accent: '#0072ff',
    surface2: '#2c3e50',
  },
  font: {
    ...nightOwl.font,
    size: '14px',
    lineHeight: '22px',
  }
};

interface IDEPageProps {
    project: Project;
    onFilesChange: (projectId: string, newFiles: SandpackFiles) => void;
    onResetProject: (projectId: string) => void;
    onGoToDashboard: () => void;
    theme: Theme;
    onToggleTheme: () => void;
}

// New component that contains the actual UI and consumes the Sandpack context.
const IDEWorkspace: React.FC<IDEPageProps> = ({ 
    project, 
    onFilesChange, 
    onResetProject, 
    onGoToDashboard, 
    theme, 
    onToggleTheme 
}) => {
    const { sandpack } = useSandpack();
    const [isSaved, setIsSaved] = useState(false);
    const saveTimeoutRef = useRef<number | null>(null);

    // Handler for auto-saving
    const handleAutoSave = useCallback((newFiles: SandpackFiles) => {
        onFilesChange(project.id, newFiles);
    }, [project.id, onFilesChange]);
    
    const handleFilesUpdate = useCallback((newFiles: SandpackFiles) => {
        onFilesChange(project.id, newFiles);
    }, [project.id, onFilesChange]);

    // Handler for the reset button
    const handleResetProject = useCallback(() => {
        onResetProject(project.id);
    }, [project.id, onResetProject]);

    // Handler for the explicit Save button. This is the main fix.
    const handleSaveProject = useCallback(() => {
        // Explicitly save the current state of files from Sandpack.
        onFilesChange(project.id, sandpack.files);
        
        // Provide visual feedback.
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        setIsSaved(true);
        saveTimeoutRef.current = window.setTimeout(() => {
            setIsSaved(false);
        }, 2000);
    }, [project.id, sandpack.files, onFilesChange]);

    useEffect(() => {
        // Cleanup timeout on component unmount
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <AutoSaveController onFilesChange={handleAutoSave} />
            <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <Header 
                    theme={theme} 
                    onToggleTheme={onToggleTheme} 
                    onResetProject={handleResetProject} 
                    onGoToDashboard={onGoToDashboard}
                    onSaveProject={handleSaveProject}
                    isSaved={isSaved}
                />
                <main className="flex flex-1 overflow-hidden p-2 md:p-4 gap-2 md:gap-4">
                    <FileExplorer onFilesUpdate={handleFilesUpdate} />
                    <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-800/50 rounded-lg shadow-md border border-gray-200 dark:border-gray-700/50 overflow-hidden">
                        <SandpackLayout className="flex-1">
                            <SandpackCodeEditor 
                                showTabs
                                closableTabs
                                showLineNumbers
                                showInlineErrors
                                wrapContent
                                style={{ height: '100%' }}
                            />
                            <SandpackPreview style={{ height: '100%' }}/>
                        </SandpackLayout>
                    </div>
                </main>
            </div>
        </>
    );
};


const IDEPage: React.FC<IDEPageProps> = (props) => {
    return (
        <SandpackProvider 
            key={props.project.id} // Add key to force re-initialization when project changes
            template="react" 
            files={props.project.files} 
            theme={props.theme === 'dark' ? customDarkTheme : 'light'}
            options={{
                externalResources: ['https://cdn.tailwindcss.com'],
                activeFile: Object.keys(props.project.files).find(f => f.includes('App')) || Object.keys(props.project.files)[0],
            }}
        >
            <IDEWorkspace {...props} />
        </SandpackProvider>
    );
};

export default IDEPage;