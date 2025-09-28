
import React from 'react';

const PlaneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 21h20" />
    <path d="M6.34 16.34 12 10.68l5.66 5.66" />
    <path d="M12 10.68V4l2 2" />
    <path d="m10 6-2-2" />
    <path d="M12 21V11l-4-4-3 3 4 4Z" />
    <path d="M12 21V11l4-4 3 3-4 4Z" />
  </svg>
);

export default PlaneIcon;
