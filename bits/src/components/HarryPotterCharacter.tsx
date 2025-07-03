
import React, { useState } from 'react';

const HarryPotterCharacter = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(true);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {/* Harry Potter Character - Enhanced */}
      <div className="relative">
        <div className="w-20 h-24 relative cursor-pointer transform hover:scale-110 transition-transform duration-300">
          {/* Body */}
          <div className="absolute bottom-0 w-12 h-14 bg-gray-800 rounded-t-lg left-1/2 transform -translate-x-1/2 border-2 border-gray-700"></div>
          
          {/* Gryffindor Robe */}
          <div className="absolute bottom-0 -left-1 w-14 h-12 bg-gradient-to-b from-red-800 to-red-900 rounded-b-lg opacity-90 border-2 border-red-700"></div>
          
          {/* Head */}
          <div className="absolute top-2 w-10 h-10 bg-yellow-200 rounded-full left-1/2 transform -translate-x-1/2 border-2 border-yellow-300"></div>
          
          {/* Hair - messier */}
          <div className="absolute top-1 w-10 h-8 bg-gray-800 rounded-t-full left-1/2 transform -translate-x-1/2"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gray-800 rounded-full"></div>
          
          {/* Glasses */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-3 border-2 border-black rounded-full bg-transparent"></div>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"></div>
          
          {/* Lightning Scar */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 translate-x-1 w-3 h-1 border-l-2 border-red-600 transform rotate-45"></div>
          
          {/* Wand - more detailed */}
          <div className="absolute top-10 -right-2 w-12 h-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full transform rotate-45 shadow-lg"></div>
          <div className="absolute top-9 -right-1 w-2 h-2 bg-amber-400 rounded-full"></div>
          
          {/* Scarf */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-10 bg-gradient-to-b from-red-600 via-yellow-500 to-red-600 opacity-80"></div>
          
          {/* Waving hand */}
          <div className="absolute top-8 -right-3 w-4 h-8 bg-yellow-200 rounded-full animate-bounce border border-yellow-300"></div>
        </div>
        
        {/* Enhanced magical sparks from wand */}
        <div className="absolute top-6 right-1">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
              style={{
                left: `${i * 2}px`,
                top: `${i * 1.2}px`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
          {/* Magic spell effect */}
          <div className="absolute top-2 left-4 text-yellow-400 text-xs font-bold animate-pulse">✨</div>
          <div className="absolute top-0 left-6 text-orange-400 text-xs font-bold animate-pulse">💥</div>
        </div>
      </div>

      {/* Speech Dialog - Updated with "Kaboom!" */}
      {isDialogVisible && (
        <div className="absolute bottom-28 left-0 bg-gradient-to-b from-amber-100 to-amber-200 border-4 border-amber-600 rounded-lg p-4 shadow-2xl max-w-xs relative animate-bounce">
          {/* Dialog content */}
          <div className="text-center">
            <p className="text-amber-900 font-bold text-lg mb-2 font-cinzel">
              ✨ KABOOM! ✨
            </p>
            <p className="text-amber-800 text-sm font-cinzel mb-1">
              🪄 Welcome to BITS Tech Fest! 🏰
            </p>
            <p className="text-amber-700 text-xs font-cinzel">
              Register now and join the magic! ⚡
            </p>
          </div>
          
          {/* Dialog arrow */}
          <div className="absolute bottom-[-12px] left-8 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-amber-600"></div>
          
          {/* Close button */}
          <button 
            onClick={() => setIsDialogVisible(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full text-xs font-bold hover:bg-red-700 transition-colors duration-200"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default HarryPotterCharacter;
