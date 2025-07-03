
import React from 'react';

interface MagicalElementsProps {
  isDayTime: boolean;
}

const MagicalElements: React.FC<MagicalElementsProps> = ({ isDayTime }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
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

      {/* Enhanced Realistic Flying Dragons */}
      <div className="absolute inset-0">
        {/* Dragon 1 - Large Red Dragon - More Realistic */}
        <div 
          className="absolute w-32 h-24 opacity-90"
          style={{
            animation: 'fly-dragon-1 20s linear infinite',
            top: '10%'
          }}
        >
          <div className="relative">
            {/* Dragon body - more detailed with shadows */}
            <div className="w-24 h-12 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-full shadow-2xl relative border border-red-500/30"
                 style={{ 
                   background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 40%, #7f1d1d 100%)',
                   boxShadow: '0 8px 32px rgba(185, 28, 28, 0.6), inset 0 2px 4px rgba(248, 113, 113, 0.3)'
                 }}>
              
              {/* Dragon head - more realistic */}
              <div className="absolute -left-4 top-2 w-10 h-8 bg-gradient-to-br from-red-700 to-red-900 rounded-full border border-red-600/40"
                   style={{ boxShadow: '0 4px 16px rgba(153, 27, 27, 0.8)' }}>
                {/* Eyes with glow */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-lg animate-pulse"
                     style={{ boxShadow: '0 0 8px #fbbf24' }}></div>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-lg animate-pulse"
                     style={{ boxShadow: '0 0 8px #fbbf24' }}></div>
                
                {/* Nostrils */}
                <div className="absolute bottom-1 left-3 w-1 h-0.5 bg-red-900 rounded-full"></div>
                <div className="absolute bottom-1 right-3 w-1 h-0.5 bg-red-900 rounded-full"></div>
              </div>
              
              {/* Dragon wings - more realistic with membrane effect */}
              <div className="absolute -top-4 left-4 w-12 h-10 bg-gradient-to-br from-red-500/80 to-red-800/60 rounded-full opacity-90 animate-pulse transform origin-bottom"
                   style={{ 
                     clipPath: 'polygon(0% 100%, 20% 0%, 80% 20%, 100% 80%, 60% 100%)',
                     boxShadow: 'inset 0 2px 8px rgba(127, 29, 29, 0.5)'
                   }}>
                <div className="absolute inset-2 bg-gradient-to-br from-red-400/30 to-transparent rounded-full"></div>
              </div>
              <div className="absolute -top-4 right-4 w-12 h-10 bg-gradient-to-bl from-red-500/80 to-red-800/60 rounded-full opacity-90 animate-pulse transform origin-bottom"
                   style={{ 
                     clipPath: 'polygon(0% 80%, 20% 20%, 80% 0%, 100% 100%, 40% 100%)',
                     boxShadow: 'inset 0 2px 8px rgba(127, 29, 29, 0.5)'
                   }}>
                <div className="absolute inset-2 bg-gradient-to-bl from-red-400/30 to-transparent rounded-full"></div>
              </div>
              
              {/* Dragon tail - segmented and realistic */}
              <div className="absolute -right-5 top-4 w-10 h-5 bg-gradient-to-r from-red-700 to-red-800 rounded-full border border-red-600/30"></div>
              <div className="absolute -right-8 top-5 w-6 h-3 bg-gradient-to-r from-red-800 to-red-900 rounded-full"></div>
              
              {/* Dragon legs with claws */}
              <div className="absolute bottom-1 left-5 w-3 h-4 bg-red-800 rounded-full border border-red-700/50">
                <div className="absolute -bottom-1 left-0 w-1 h-2 bg-gray-800 rounded-full"></div>
                <div className="absolute -bottom-1 right-0 w-1 h-2 bg-gray-800 rounded-full"></div>
              </div>
              <div className="absolute bottom-1 right-5 w-3 h-4 bg-red-800 rounded-full border border-red-700/50">
                <div className="absolute -bottom-1 left-0 w-1 h-2 bg-gray-800 rounded-full"></div>
                <div className="absolute -bottom-1 right-0 w-1 h-2 bg-gray-800 rounded-full"></div>
              </div>
              
              {/* Scales texture */}
              <div className="absolute inset-1 opacity-30">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute w-2 h-1 bg-red-500 rounded-full opacity-60"
                       style={{ 
                         left: `${10 + (i * 8)}%`, 
                         top: `${20 + (i % 2) * 30}%`,
                         transform: `rotate(${i * 15}deg)`
                       }}></div>
                ))}
              </div>
            </div>
            
            {/* Enhanced fire breath with multiple layers */}
            <div className="absolute -left-8 top-5 w-16 h-4 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 rounded-full opacity-90 animate-pulse"
                 style={{ boxShadow: '0 0 20px rgba(234, 88, 12, 0.8)' }}></div>
            <div className="absolute -left-10 top-6 w-12 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute -left-6 top-4 w-4 h-2 bg-yellow-300 rounded-full opacity-80 animate-ping"></div>
          </div>
        </div>
        
        {/* Dragon 2 - Green Dragon - Enhanced Realism */}
        <div 
          className="absolute w-28 h-20 opacity-85"
          style={{
            animation: 'fly-dragon-2 25s linear infinite',
            top: '30%'
          }}
        >
          <div className="relative">
            <div className="w-20 h-10 bg-gradient-to-br from-green-600 via-green-700 to-green-900 rounded-full shadow-2xl relative border border-green-500/30"
                 style={{ 
                   background: 'linear-gradient(135deg, #16a34a 0%, #15803d 40%, #14532d 100%)',
                   boxShadow: '0 8px 32px rgba(34, 197, 94, 0.6), inset 0 2px 4px rgba(134, 239, 172, 0.3)'
                 }}>
              
              <div className="absolute -left-3 top-2 w-8 h-6 bg-gradient-to-br from-green-700 to-green-900 rounded-full border border-green-600/40">
                <div className="absolute top-1 left-1 w-1 h-1 bg-red-400 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-red-400 rounded-full animate-pulse shadow-lg"></div>
              </div>
              
              <div className="absolute -top-3 left-3 w-10 h-8 bg-gradient-to-br from-green-500/80 to-green-800/60 rounded-full opacity-90 animate-pulse"
                   style={{ clipPath: 'polygon(0% 100%, 20% 0%, 80% 20%, 100% 80%, 60% 100%)' }}></div>
              <div className="absolute -top-3 right-3 w-10 h-8 bg-gradient-to-bl from-green-500/80 to-green-800/60 rounded-full opacity-90 animate-pulse"
                   style={{ clipPath: 'polygon(0% 80%, 20% 20%, 80% 0%, 100% 100%, 40% 100%)' }}></div>
              
              <div className="absolute -right-4 top-3 w-8 h-4 bg-gradient-to-r from-green-700 to-green-800 rounded-full border border-green-600/30"></div>
            </div>
          </div>
        </div>

        {/* Dragon 3 - Blue Dragon - Enhanced Realism */}
        <div 
          className="absolute w-30 h-22 opacity-88"
          style={{
            animation: 'fly-dragon-3 30s linear infinite',
            top: '20%'
          }}
        >
          <div className="relative">
            <div className="w-22 h-11 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-full shadow-2xl relative border border-blue-500/30"
                 style={{ 
                   background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 40%, #1e3a8a 100%)',
                   boxShadow: '0 8px 32px rgba(59, 130, 246, 0.6), inset 0 2px 4px rgba(147, 197, 253, 0.3)'
                 }}>
              
              <div className="absolute -left-4 top-2 w-9 h-7 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full border border-blue-600/40">
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse shadow-lg"
                     style={{ boxShadow: '0 0 8px #67e8f9' }}></div>
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse shadow-lg"
                     style={{ boxShadow: '0 0 8px #67e8f9' }}></div>
              </div>
              
              <div className="absolute -top-4 left-4 w-11 h-9 bg-gradient-to-br from-blue-500/80 to-blue-800/60 rounded-full opacity-90 animate-pulse"
                   style={{ clipPath: 'polygon(0% 100%, 20% 0%, 80% 20%, 100% 80%, 60% 100%)' }}></div>
              <div className="absolute -top-4 right-4 w-11 h-9 bg-gradient-to-bl from-blue-500/80 to-blue-800/60 rounded-full opacity-90 animate-pulse"
                   style={{ clipPath: 'polygon(0% 80%, 20% 20%, 80% 0%, 100% 100%, 40% 100%)' }}></div>
              
              <div className="absolute -right-5 top-4 w-9 h-5 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full border border-blue-600/30"></div>
            </div>
            
            {/* Ice breath */}
            <div className="absolute -left-7 top-5 w-14 h-3 bg-gradient-to-r from-blue-300 to-cyan-400 rounded-full opacity-80 animate-pulse"
                 style={{ boxShadow: '0 0 16px rgba(103, 232, 249, 0.6)' }}></div>
          </div>
        </div>
      </div>

      {/* Enhanced Realistic Flying Witches on Broomsticks */}
      <div className="absolute inset-0">
        {/* Witch 1 - More Detailed */}
        <div 
          className="absolute opacity-85"
          style={{
            animation: 'fly-witch-1 35s linear infinite',
            top: '40%'
          }}
        >
          <div className="relative w-20 h-16">
            {/* Enhanced Broomstick with texture */}
            <div className="absolute bottom-3 left-0 w-16 h-2 bg-gradient-to-r from-amber-800 to-amber-900 rounded-full shadow-lg border border-amber-700/50"
                 style={{ boxShadow: '0 4px 12px rgba(146, 64, 14, 0.6)' }}></div>
            <div className="absolute bottom-2 left-14 w-6 h-3 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full opacity-90"
                 style={{ clipPath: 'polygon(0% 50%, 100% 0%, 100% 100%)' }}></div>
            
            {/* Witch body with detailed robes */}
            <div className="absolute bottom-4 left-5 w-4 h-8 bg-gradient-to-b from-purple-800 to-purple-900 rounded-t-lg shadow-lg border border-purple-700/50">
              <div className="absolute inset-1 bg-gradient-to-b from-purple-700/30 to-transparent rounded-t-lg"></div>
            </div>
            
            {/* Witch head with more detail */}
            <div className="absolute bottom-11 left-5 w-4 h-4 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full shadow-md border border-yellow-400/50">
              <div className="absolute top-1 left-1 w-0.5 h-0.5 bg-black rounded-full"></div>
              <div className="absolute top-1 right-1 w-0.5 h-0.5 bg-black rounded-full"></div>
            </div>
            
            {/* Enhanced witch hat */}
            <div className="absolute bottom-14 left-4 w-6 h-5 bg-gradient-to-b from-black to-gray-900 rounded-t-full shadow-xl border border-gray-800/50"
                 style={{ clipPath: 'polygon(20% 100%, 50% 0%, 80% 100%)' }}>
              <div className="absolute top-1 left-2 w-2 h-1 bg-purple-600 rounded-full opacity-60"></div>
            </div>
            
            {/* Flowing cape with wind effect */}
            <div className="absolute bottom-5 left-2 w-8 h-6 bg-gradient-to-r from-purple-800 to-purple-900 rounded-full opacity-80 animate-pulse shadow-lg"
                 style={{ clipPath: 'polygon(0% 20%, 80% 0%, 100% 60%, 20% 100%)' }}></div>
            
            {/* Magic sparkles around witch */}
            <div className="absolute bottom-8 left-8 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-10 left-10 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Witch 2 - Enhanced Detail */}
        <div 
          className="absolute opacity-80"
          style={{
            animation: 'fly-witch-2 40s linear infinite',
            top: '55%'
          }}
        >
          <div className="relative w-18 h-14">
            <div className="absolute bottom-3 left-0 w-14 h-2 bg-gradient-to-r from-amber-700 to-amber-800 rounded-full shadow-lg border border-amber-600/50"></div>
            <div className="absolute bottom-2 left-12 w-5 h-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full opacity-90"
                 style={{ clipPath: 'polygon(0% 50%, 100% 0%, 100% 100%)' }}></div>
            
            <div className="absolute bottom-4 left-4 w-4 h-7 bg-gradient-to-b from-green-800 to-green-900 rounded-t-lg shadow-lg border border-green-700/50">
              <div className="absolute inset-1 bg-gradient-to-b from-green-700/30 to-transparent rounded-t-lg"></div>
            </div>
            
            <div className="absolute bottom-10 left-4 w-4 h-4 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full shadow-md border border-yellow-500/50">
              <div className="absolute top-1 left-1 w-0.5 h-0.5 bg-black rounded-full"></div>
              <div className="absolute top-1 right-1 w-0.5 h-0.5 bg-black rounded-full"></div>
            </div>
            
            <div className="absolute bottom-13 left-3 w-6 h-5 bg-gradient-to-b from-black to-gray-900 rounded-t-full shadow-xl border border-gray-800/50"
                 style={{ clipPath: 'polygon(20% 100%, 50% 0%, 80% 100%)' }}>
              <div className="absolute top-1 left-2 w-2 h-1 bg-green-600 rounded-full opacity-60"></div>
            </div>
            
            <div className="absolute bottom-5 left-1 w-7 h-5 bg-gradient-to-r from-green-800 to-green-900 rounded-full opacity-80 animate-pulse shadow-lg"
                 style={{ clipPath: 'polygon(0% 20%, 80% 0%, 100% 60%, 20% 100%)' }}></div>
          </div>
        </div>
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

      {/* Golden Snitch - Enhanced */}
      <div 
        className="absolute opacity-90"
        style={{
          animation: 'fly-snitch 18s linear infinite',
          top: '65%'
        }}
      >
        <div className="w-5 h-5 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full shadow-xl relative border border-yellow-400/50"
             style={{ boxShadow: '0 0 16px rgba(234, 179, 8, 0.8)' }}>
          {/* Wings - more detailed */}
          <div className="absolute -left-3 top-1 w-4 h-2 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full opacity-90 animate-pulse border border-yellow-400/30"></div>
          <div className="absolute -right-3 top-1 w-4 h-2 bg-gradient-to-bl from-yellow-200 to-yellow-300 rounded-full opacity-90 animate-pulse border border-yellow-400/30"></div>
          {/* Snitch glow */}
          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default MagicalElements;
