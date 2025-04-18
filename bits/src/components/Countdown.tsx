
import React, { useState, useEffect } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90 z-0"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 z-[-1]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 gradient-heading">
          EVENT COUNTDOWN
        </h2>
        <br/>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="glass-card flex flex-col items-center py-6 px-8 relative">
                <span className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">{value}</span>
                <span className="text-sm uppercase tracking-wider text-white/70">{unit}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
            Join us at BITS Pilani Dubai Campus for an unforgettable celebration of technology and innovation.
            Mark your calendar and prepare for the ultimate tech experience!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
