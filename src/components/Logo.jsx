import React from 'react';

export default function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#4f46e5', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="20" fill="url(#logo-grad)" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="8" />
      <path d="M50 20 L50 80 M20 50 L80 50" stroke="white" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}