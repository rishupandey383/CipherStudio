import React from 'react';
import type { Project } from '../types';
import FolderIcon from './icons/FolderIcon';
import TrashIcon from './icons/TrashIcon';

interface ProjectCardProps {
    project: Project;
    onSelect: () => void;
    onDelete: () => void;
    className?: string;
    style?: React.CSSProperties;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, onDelete, className, style }) => {
    
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
    };

    const formattedDate = new Date(project.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div 
            className={`group relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 hover:border-blue-400 dark:hover:border-blue-500 transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer flex flex-col justify-between min-h-[180px] ${className}`}
            onClick={onSelect}
            style={style}
        >
            <div>
                <div className="flex items-start justify-between">
                     <div className="p-3 bg-orange-100 dark:bg-orange-500/20 rounded-lg mb-4">
                        <FolderIcon className="w-7 h-7 text-orange-500 dark:text-orange-400" />
                    </div>
                     <button
                        onClick={handleDelete}
                        className="p-2 rounded-full text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4"
                        title="Delete Project"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate tracking-tight">{project.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm break-words line-clamp-2">{project.description || 'No description'}</p>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-4 pt-3 border-t border-gray-100 dark:border-slate-700/50">Created: {formattedDate}</p>
        </div>
    );
};

export default ProjectCard;