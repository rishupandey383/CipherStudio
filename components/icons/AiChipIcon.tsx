import React from 'react';

const AiChipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24"
    height="24"
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="url(#ai-gradient)"
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <defs>
      <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'var(--brand-teal, #33D1C4)' }} />
        <stop offset="100%" style={{ stopColor: 'var(--brand-violet, #8B5CF6)' }} />
      </linearGradient>
    </defs>
    <path d="M4 8V4h4M4 20v-4h4M16 4h4v4M16 20h4v-4"/>
    <rect width="12" height="12" x="6" y="6" rx="1"/>
    <path d="M12 12h.01"/>
    <path d="M10 6V4M14 6V4M10 20v-2M14 20v-2M6 10H4M6 14H4M20 10h-2M20 14h-2"/>
  </svg>
);

export default AiChipIcon;