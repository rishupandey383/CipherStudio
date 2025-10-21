import React from 'react';

interface EmptyStateProps {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
    children?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ Icon, title, description, children }) => {
    return (
        <div className="text-center py-16 px-6 bg-gray-50 dark:bg-slate-800/50 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl animate-fade-in-up">
            <div className="flex justify-center mb-6">
                <Icon className="w-20 h-20 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">{description}</p>
            {children && <div className="mt-6">{children}</div>}
        </div>
    );
};

export default EmptyState;