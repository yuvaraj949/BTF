
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 71,
    hours: 8,
    minutes: 34
  });

  useEffect(() => {
    const targetDate = new Date('2025-09-13T00:00:00');
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Magical Frame */}
      <div className="relative group">
        {/* Street Lamp for countdown */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-2 h-12 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full"></div>
          <div className="w-8 h-8 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-full relative group-hover:shadow-yellow-400/60 group-hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-1 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-radial from-yellow-400/30 via-yellow-400/10 to-transparent rounded-full group-hover:from-yellow-400/50 group-hover:via-yellow-400/20 transition-all duration-300"></div>
        </div>

        <div className="bg-gradient-to-b from-amber-900 to-amber-950 border-4 border-amber-800 rounded-xl p-6 shadow-2xl transform transition-all duration-300 hover:scale-105">
          <div className="text-center">
            <div className="text-amber-300 font-semibold text-sm mb-3 tracking-wider font-cinzel">
              UNTIL BITS TECH FEST
            </div>
            <div className="flex space-x-4 text-white">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-400 font-cinzel-decorative">
                  {timeLeft.days}
                </div>
                <div className="text-xs text-amber-300 uppercase tracking-wide font-cinzel">Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-400 font-cinzel-decorative">
                  {timeLeft.hours}
                </div>
                <div className="text-xs text-amber-300 uppercase tracking-wide font-cinzel">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-400 font-cinzel-decorative">
                  {timeLeft.minutes}
                </div>
                <div className="text-xs text-amber-300 uppercase tracking-wide font-cinzel">Minutes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
