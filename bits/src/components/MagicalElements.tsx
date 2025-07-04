
import React from 'react';

interface MagicalElementsProps {
  isDayTime: boolean;
}

const MagicalElements: React.FC<MagicalElementsProps> = ({ isDayTime }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Spider Webs (removed top left and bottom left webs to remove cross marks) */}
      <div className="absolute inset-0">
        {/* Top right corner web */}
        <div className="absolute top-4 right-4 opacity-60">
          <svg width="60" height="60" viewBox="0 0 60 60" className="text-gray-400">
            <path d="M5 5 L55 5 L55 55 L5 55 Z" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3"/>
            <path d="M5 5 L30 30 L55 5" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <path d="M5 55 L30 30 L55 55" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.8"/>
          </svg>
        </div>
      </div>

      {/* Moving Clouds (replacing dragons and witches) */}
      <div className="absolute inset-0">
        {/* Large moving cloud */}
        <svg className="absolute" style={{ left: '10%', top: '12%', animation: 'move-cloud-1 32s linear infinite' }} width="180" height="60" viewBox="0 0 180 60">
          <ellipse cx="60" cy="30" rx="60" ry="22" fill="#e0e7ef" opacity="0.85" />
          <ellipse cx="30" cy="38" rx="28" ry="14" fill="#e0e7ef" opacity="0.7" />
          <ellipse cx="110" cy="38" rx="32" ry="16" fill="#e0e7ef" opacity="0.7" />
          <ellipse cx="90" cy="20" rx="18" ry="10" fill="#f8fafc" opacity="0.8" />
        </svg>
        {/* Small trailing cloud */}
        <svg className="absolute" style={{ left: '38%', top: '18%', animation: 'move-cloud-2 40s linear infinite' }} width="90" height="32" viewBox="0 0 90 32">
          <ellipse cx="30" cy="16" rx="22" ry="10" fill="#e0e7ef" opacity="0.7" />
          <ellipse cx="60" cy="18" rx="12" ry="6" fill="#f8fafc" opacity="0.6" />
        </svg>
        {/* Another cloud for depth */}
        <svg className="absolute" style={{ left: '65%', top: '22%', animation: 'move-cloud-3 54s linear infinite' }} width="120" height="40" viewBox="0 0 120 40">
          <ellipse cx="50" cy="20" rx="40" ry="14" fill="#e0e7ef" opacity="0.8" />
          <ellipse cx="90" cy="24" rx="18" ry="8" fill="#f8fafc" opacity="0.7" />
        </svg>
      </div>
      
      {/* Enhanced floating magical elements */}
      <div className="absolute inset-0">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-60"
            style={{
              left: `${5 + (i * 2.8)}%`,
              top: `${15 + (i * 2.2)}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2.5 + Math.random() * 2}s`
            }}
          >
            <div className="w-2 h-2 bg-amber-400 rounded-full shadow-lg animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagicalElements;
