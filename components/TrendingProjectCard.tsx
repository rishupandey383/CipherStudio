import React from 'react';
import type { ProjectTemplate } from '../types';
import RightArrowIcon from './icons/RightArrowIcon';

interface TrendingProjectCardProps {
  template: ProjectTemplate;
  onCreate: (template: ProjectTemplate) => void;
  className?: string;
  style?: React.CSSProperties;
}

const TrendingProjectCard: React.FC<TrendingProjectCardProps> = ({ template, onCreate, className, style }) => {
  return (
    <div 
        className={`group relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-5 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between ${className}`}
        style={style}
    >
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
              <template.icon className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{template.title}</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {template.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm break-words">{template.description}</p>
      </div>
      <button
        onClick={() => onCreate(template)}
        className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:ring-offset-slate-800"
      >
        <span>Use Template</span>
        <RightArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default TrendingProjectCard;