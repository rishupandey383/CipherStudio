import React from 'react';

const HeroImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 550 400"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#0072ff' }} />
        <stop offset="100%" style={{ stopColor: '#00c6ff' }} />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
        <feOffset dx="0" dy="4" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#shadow)">
      <rect width="550" height="400" rx="12" fill="#1E293B" />
      <rect x="1" y="1" width="548" height="398" rx="11" fill="none" stroke="#334155" strokeWidth="2" />

      {/* Header */}
      <rect y="0" width="550" height="40" rx="12" ry="12" fill="#334155" />
      <circle cx="20" cy="20" r="6" fill="#EF4444" />
      <circle cx="40" cy="20" r="6" fill="#FBBF24" />
      <circle cx="60" cy="20" r="6" fill="#10B981" />

      {/* File Explorer */}
      <rect x="10" y="55" width="120" height="25" rx="4" fill="#334155" />
      <rect x="10" y="90" width="100" height="15" rx="3" fill="#475569" />
      <rect x="10" y="115" width="90" height="15" rx="3" fill="#475569" />
      <rect x="25" y="140" width="85" height="15" rx="3" fill="#64748B" />
      <rect x="10" y="165" width="70" height="15" rx="3" fill="#475569" />

      {/* Code Editor */}
      <rect x="140" y="55" width="390" height="325" rx="4" fill="#0F172A" />

      {/* Code lines */}
      <rect x="155" y="70" width="250" height="12" rx="3" fill="#38BDF8" />
      <rect x="155" y="95" width="320" height="12" rx="3" fill="#A78BFA" />
      <rect x="170" y="120" width="280" height="12" rx="3" fill="#F472B6" />
      <rect x="170" y="145" width="250" height="12" rx="3" fill="#34D399" />
      <rect x="155" y="170" width="100" height="12" rx="3" fill="#A78BFA" />
      
      {/* AI suggestion */}
      <rect x="155" y="210" width="350" height="80" rx="5" fill="url(#hero-grad)" opacity="0.1" />
      <rect x="155" y="210" width="350" height="80" rx="5" fill="none" stroke="url(#hero-grad)" strokeWidth="1.5" />
      <text x="170" y="240" fontFamily="sans-serif" fontSize="14" fill="#A78BFA" fontWeight="bold">AI Suggestion:</text>
      <rect x="170" y="255" width="280" height="10" rx="3" fill="#9CA3AF" />
      <rect x="170" y="270" width="250" height="10" rx="3" fill="#9CA3AF" />
    </g>
  </svg>
);

export default HeroImage;
