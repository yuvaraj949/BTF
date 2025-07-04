

import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    // Countdown to the start of the event: Nov 13, 2025, 00:00
    const targetDate = new Date('2025-11-13T00:00:00'); // Already correct, but ensure this is the event start
    
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
        {/* Lamp removed as requested */}

        <div className="bg-gradient-to-b from-amber-900 to-amber-950 border-4 border-amber-800 rounded-xl p-6 shadow-2xl transform transition-all duration-300 hover:scale-105 ring-4 ring-yellow-400/60 magical-glow">
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
