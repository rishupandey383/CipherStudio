import React from 'react';

const AiImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 500 400"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="ai-grad-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="ai-grad-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00c6ff" />
        <stop offset="100%" stopColor="#0072ff" />
      </linearGradient>
      <filter id="ai-glow">
        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    <rect width="500" height="400" rx="12" fill="url(#ai-grad-bg)" />
    
    {/* Abstract code lines */}
    <rect x="50" y="80" width="180" height="10" rx="5" fill="#475569" />
    <rect x="50" y="100" width="220" height="10" rx="5" fill="#475569" />
    <rect x="50" y="120" width="150" height="10" rx="5" fill="#475569" />
    
    {/* AI Chip */}
    <g transform="translate(300, 150)">
      <rect width="120" height="120" x="0" y="0" rx="10" fill="#334155" filter="url(#ai-glow)" />
      <rect width="80" height="80" x="20" y="20" rx="5" stroke="url(#ai-grad-glow)" strokeWidth="2" fill="none" />
      
      {/* Connections from chip */}
      <path d="M-10 60 H -100" stroke="url(#ai-grad-glow)" strokeWidth="2" />
      <path d="M130 60 H 200" stroke="url(#ai-grad-glow)" strokeWidth="2" />
      <path d="M60 -10 V -80" stroke="url(#ai-grad-glow)" strokeWidth="2" />
      <path d="M60 130 V 200" stroke="url(#ai-grad-glow)" strokeWidth="2" />
    </g>
    
    {/* Transformed code lines */}
    <rect x="50" y="250" width="250" height="10" rx="5" fill="#38BDF8" />
    <rect x="50" y="270" width="300" height="10" rx="5" fill="#A78BFA" />
    <rect x="50" y="290" width="180" height="10" rx="5" fill="#34D399" />
    
    {/* Arrow */}
    <path d="M150 160 C 180 180, 180 200, 150 220" stroke="#64748B" strokeWidth="3" fill="none" strokeDasharray="5,5" />
    <path d="M145 215 L 150 220 L 155 215" stroke="#64748B" strokeWidth="3" fill="none" />
  </svg>
);

export default AiImage;
