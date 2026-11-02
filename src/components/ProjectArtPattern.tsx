import React from 'react';

interface ProjectArtPatternProps {
  type?: 'architectural' | 'minimalist' | 'editorial' | 'geometric';
  imageUrl?: string;
  title: string;
  className?: string;
}

export const ProjectArtPattern: React.FC<ProjectArtPatternProps> = ({
  type = 'architectural',
  imageUrl,
  title,
  className = '',
}) => {
  if (imageUrl) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    );
  }

  // Domain-crafted abstract generative SVG graphics with zero broken images
  return (
    <div className={`relative overflow-hidden w-full h-full flex items-center justify-center ${className}`}>
      {type === 'architectural' && (
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full object-cover text-neutral-800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="600" height="400" fill="currentColor" fillOpacity="0.04" />
          <path
            d="M50 350 L250 50 L450 350 Z"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1.5"
          />
          <path
            d="M150 350 L250 180 L350 350"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <line
            x1="50"
            y1="350"
            x2="550"
            y2="350"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
          <circle cx="480" cy="120" r="45" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
          <line x1="250" y1="50" x2="250" y2="350" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
        </svg>
      )}

      {type === 'editorial' && (
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full object-cover text-neutral-800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="600" height="400" fill="currentColor" fillOpacity="0.03" />
          <rect x="80" y="60" width="200" height="280" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
          <rect x="320" y="60" width="200" height="280" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
          <line x1="110" y1="120" x2="250" y2="120" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
          <line x1="110" y1="150" x2="230" y2="150" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
          <line x1="110" y1="170" x2="210" y2="170" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
          <circle cx="420" cy="200" r="60" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" fill="currentColor" fillOpacity="0.02" />
        </svg>
      )}

      {type === 'geometric' && (
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full object-cover text-neutral-800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="600" height="400" fill="currentColor" fillOpacity="0.04" />
          <g stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.2">
            <line x1="100" y1="80" x2="500" y2="320" />
            <line x1="100" y1="320" x2="500" y2="80" />
            <circle cx="300" cy="200" r="110" strokeWidth="1.5" />
            <circle cx="300" cy="200" r="60" strokeDasharray="3 3" />
            <rect x="230" y="130" width="140" height="140" strokeWidth="1" />
          </g>
        </svg>
      )}

      {type === 'minimalist' && (
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full object-cover text-neutral-800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="600" height="400" fill="currentColor" fillOpacity="0.02" />
          <circle cx="300" cy="200" r="90" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <line x1="120" y1="200" x2="480" y2="200" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
          <line x1="300" y1="70" x2="300" y2="330" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
        </svg>
      )}

      {/* Title subtle watermark in corner */}
      <span className="absolute bottom-4 left-4 text-xs tracking-wider uppercase opacity-40 font-mono">
        {type}
      </span>
    </div>
  );
};
