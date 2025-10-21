import React from 'react';

const ComponentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="url(#component-gradient)"
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <defs>
      <linearGradient id="component-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'var(--brand-teal, #33D1C4)' }} />
        <stop offset="50%" style={{ stopColor: 'var(--brand-violet, #8B5CF6)' }} />
        <stop offset="100%" style={{ stopColor: 'var(--brand-magenta, #D946EF)' }} />
      </linearGradient>
    </defs>
    <path d="M16 20v-4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4"/>
    <path d="M18 4h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/>
    <path d="M6 4H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/>
    <path d="M12 14v.01"/>
  </svg>
);

export default ComponentIcon;