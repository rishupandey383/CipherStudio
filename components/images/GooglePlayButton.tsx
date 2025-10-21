import React from 'react';

const GooglePlayButton: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 160 48"
    {...props}
    aria-label="Get it on Google Play"
  >
    {/* Background */}
    <rect width="160" height="48" rx="8" fill="#000" />
    <rect width="159" height="47" x="0.5" y="0.5" rx="7.5" fill="none" stroke="#555" strokeWidth="1" />

    {/* Logo */}
    <g transform="translate(18, 11) scale(1.1)">
      <polygon points="3.1,24.0 14.7,13.0 3.1,2.0" fill="#4285F4" />
      <polygon points="3.1,2.0 14.7,13.0 20.3,9.7 11.6,0.8" fill="#34A853" />
      <polygon points="3.1,24.0 11.6,25.2 20.3,16.3 14.7,13.0" fill="#FBBC05" />
      <polygon points="20.3,16.3 14.7,13.0 20.3,9.7" fill="#EA4335" />
    </g>

    {/* Text */}
    <text x="52" y="20" fontFamily="'Inter', sans-serif" fontSize="9" fill="#FFFFFF" letterSpacing="0.5">
      GET IT ON
    </text>
    <text x="52" y="38" fontFamily="'Inter', sans-serif" fontSize="16" fill="#FFFFFF" fontWeight="600" letterSpacing="0.2">
      Google Play
    </text>
  </svg>
);

export default GooglePlayButton;
