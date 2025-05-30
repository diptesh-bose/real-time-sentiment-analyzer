
import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="none"
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <path d="M12 17.5c2.49 0 4.5-2.01 4.5-4.5S14.49 8.5 12 8.5s-4.5 2.01-4.5 4.5 2.01 4.5 4.5 4.5zm0-7c1.38 0 2.5 1.12 2.5 2.5S13.38 15.5 12 15.5s-2.5-1.12-2.5-2.5S10.62 10.5 12 10.5z"/>
    <path d="M7 12h2v1H7zm8 0h2v1h-2z"/>
  </svg>
);
    