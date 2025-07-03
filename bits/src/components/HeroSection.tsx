
import React from 'react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16">
      <div className="text-center max-w-6xl mx-auto px-4">
        {/* Main Title */}
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-yellow-400 to-orange-500 mb-8 drop-shadow-2xl font-cinzel-decorative"
          style={{ 
            textShadow: '0 0 30px rgba(251, 191, 36, 0.8)',
          }}
        >
          BITS TECH FEST 2025
        </h1>
        
        {/* Event Dates */}
        <div className="mb-12">
          <p className="text-2xl md:text-4xl text-amber-200 font-light tracking-wider mb-4 font-cinzel">
            .09.13 – 09.14
          </p>
        </div>
        
        {/* Apply Button - Styled as magical board */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            {/* Street Lamp */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20">
              <div className="w-2 h-12 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full"></div>
              <div className="w-8 h-8 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-full relative group-hover:shadow-yellow-400/60 group-hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-1 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              {/* Lamp light effect */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-radial from-yellow-400/30 via-yellow-400/10 to-transparent rounded-full group-hover:from-yellow-400/50 group-hover:via-yellow-400/20 transition-all duration-300"></div>
            </div>
            
            {/* Wooden Board Button */}
            <button className="relative px-16 py-6 bg-gradient-to-b from-amber-900 to-amber-950 border-4 border-amber-800 text-amber-100 font-bold text-2xl rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-amber-500/25 font-cinzel-decorative">
              <span className="relative z-10 tracking-wider drop-shadow-lg">APPLY</span>
              {/* Wood texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-800/20 to-amber-950/40 rounded-lg"></div>
              {/* Magical glow on hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
