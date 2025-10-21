import React from 'react';

const EmptyProjectsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 80 80"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="ep-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A5B4FC" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
       <linearGradient id="ep-grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    
    {/* Base shape with slight gradient */}
    <path d="M15 10 H65 C70 10, 70 10, 70 15 V65 C70 70, 70 70, 65 70 H15 C10 70, 10 70, 10 65 V15 C10 10, 10 10, 15 10 Z" fill="currentColor" fillOpacity="0.1" />
    <path d="M15 10 H65 C70 10, 70 10, 70 15 V65 C70 70, 70 70, 65 70 H15 C10 70, 10 70, 10 65 V15 C10 10, 10 10, 15 10 Z" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" fill="none" strokeDasharray="5 5" />

    {/* Floating Plus Icon */}
    <g transform="translate(28 28)">
      <circle cx="12" cy="12" r="12" className="fill-indigo-500 dark:fill-indigo-600" filter="url(#shadow)"/>
      <path d="M12 7 V17" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M7 12 H17" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </g>
    
    {/* Decorative code symbols */}
    <text x="20" y="60" fontFamily="monospace" fontSize="10" className="fill-current opacity-20 dark:opacity-30">{"</>"}</text>
    <circle cx="60" cy="22" r="3" className="fill-current opacity-20 dark:opacity-30" />
    <path d="M58 58 l5 5 l-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" className="opacity-20 dark:opacity-30" strokeLinecap="round" />

  </svg>
);

export default EmptyProjectsIcon;