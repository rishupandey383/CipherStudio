import React from 'react';

const StorefrontIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
    <path d="M18 18.7V4H6v14.7" />
    <path d="M4 21h16" />
    <path d="M2 21h2" />
    <path d="M20 21h2" />
    <path d="M12 4v2" />
    <path d="M12 11v-2" />
  </svg>
);

export default StorefrontIcon;
