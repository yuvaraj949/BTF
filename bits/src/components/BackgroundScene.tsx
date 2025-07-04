
import React from 'react';
import SmoothMagicalParticles from './SmoothMagicalParticles';

interface BackgroundSceneProps {
  isDayTime: boolean;
  scrollY: number;
}

const BackgroundScene: React.FC<BackgroundSceneProps> = ({ isDayTime, scrollY }) => {
  const parallaxOffset = scrollY * 0.3;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      {/* Dark Night Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-gray-900 to-black" />
      
      {/* Stars */}
      <div className="absolute inset-0 opacity-90 pointer-events-none">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Moon */}
      <div
        className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-2xl"
        style={{
          right: '15%',
          top: `${15 + parallaxOffset * 0.1}%`,
          boxShadow: '0 0 50px rgba(255, 255, 255, 0.3)'
        }}
      />
      
      {/* Hogwarts Castle Silhouette */}
      <div 
        className="absolute bottom-0 w-full h-96 opacity-90"
        style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
      >
        <svg viewBox="0 0 1200 400" className="w-full h-full">
          <defs>
            <linearGradient id="castleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          
          {/* Main Castle Structure - More elaborate Hogwarts style */}
          {/* Central Great Hall */}
          <polygon points="400,400 400,120 450,120 450,80 550,80 550,120 600,120 600,400" fill="url(#castleGradient)" />
          
          {/* Left Wing Towers */}
          <polygon points="100,400 100,180 130,180 130,140 170,140 170,180 200,180 200,400" fill="url(#castleGradient)" />
          <polygon points="220,400 220,200 250,200 250,160 290,160 290,200 320,200 320,400" fill="url(#castleGradient)" />
          
          {/* Right Wing Towers */}
          <polygon points="680,400 680,200 710,200 710,160 750,160 750,200 780,200 780,400" fill="url(#castleGradient)" />
          <polygon points="800,400 800,180 830,180 830,140 870,140 870,180 900,180 900,400" fill="url(#castleGradient)" />
          
          {/* Tall Tower (Astronomy Tower) */}
          <polygon points="950,400 950,100 970,100 970,60 990,60 990,100 1010,100 1010,400" fill="url(#castleGradient)" />
          
          {/* Castle spires */}
          <polygon points="125,140 125,120 135,110 145,120 145,140" fill="url(#castleGradient)" />
          <polygon points="265,160 265,140 275,130 285,140 285,160" fill="url(#castleGradient)" />
          <polygon points="725,160 725,140 735,130 745,140 745,160" fill="url(#castleGradient)" />
          <polygon points="845,140 845,120 855,110 865,120 865,140" fill="url(#castleGradient)" />
          <polygon points="975,60 975,40 985,30 995,40 995,60" fill="url(#castleGradient)" />
          
          {/* Bridge connecting towers */}
          <rect x="320" y="250" width="80" height="30" fill="url(#castleGradient)" />
          <rect x="600" y="250" width="80" height="30" fill="url(#castleGradient)" />
          
          {/* Glowing windows */}
          <rect x="125" y="200" width="8" height="12" fill="#F66200" opacity="0.9" />
          <rect x="145" y="220" width="8" height="12" fill="#F66200" opacity="0.9" />
          <rect x="265" y="220" width="8" height="12" fill="#F66200" opacity="0.9" />
          <rect x="425" y="140" width="10" height="15" fill="#F66200" opacity="0.9" />
          <rect x="465" y="160" width="10" height="15" fill="#F66200" opacity="0.9" />
          <rect x="515" y="140" width="10" height="15" fill="#F66200" opacity="0.9" />
          <rect x="725" y="220" width="8" height="12" fill="#F66200" opacity="0.9" />
          <rect x="845" y="200" width="8" height="12" fill="#F66200" opacity="0.9" />
          <rect x="975" y="120" width="8" height="12" fill="#F66200" opacity="0.9" />
        </svg>
      </div>
      
      {/* Floating magical particles (smooth, scroll-matched, persistent) */}
      <SmoothMagicalParticles scrollY={-scrollY} />
    </div>
  );
};

export default BackgroundScene;
