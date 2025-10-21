import React from 'react';

const CipherSchoolsLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 160 28"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    aria-label="CipherStudio Logo"
  >
    <g>
      {/* Background circle */}
      <circle cx="14" cy="14" r="14" fill="#2D3748" />
      
      {/* Orange 'C' shape. This is a path for a thick arc with a gap. */}
      <path
        d="M24.3,19.2 A11,11 0 1,1 24.3,8.8 L20.5,11.1 A7,7 0 1,0 20.5,16.9 Z"
        fill="#F39C12"
      />
      
      {/* White ';' parts that sit in the gap */}
      <g fill="#FFFFFF">
        {/* The dot part of the semicolon */}
        <rect x="20" y="9.2" width="3.5" height="3" rx="1" />
        {/* The comma part of the semicolon */}
        <path d="M20.2,14 H23.5 C23.5,15.5, 22,17, 20.2,17.5 Z" />
      </g>
    </g>

    <text
      fontFamily="sans-serif"
      fontSize="16"
      fontWeight="600"
      className="fill-[#34495E] dark:fill-gray-200"
      x="38"
      y="19"
    >
      CipherStudio
    </text>
  </svg>
);

export default CipherSchoolsLogo;