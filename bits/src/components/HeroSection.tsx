
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto z-10">
        <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 mb-6 text-shadow-lg tracking-wider">
          <span className="font-cinzel">BITS TECH FEST</span>
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 text-shadow-lg">
          <span className="font-cinzel">2025</span>
        </h2>
        {/* Event Date Below Year */}
        <div className="mb-8">
          <span className="inline-block bg-yellow-900/80 text-yellow-200 font-bold rounded-lg px-4 py-2 text-lg shadow-md font-cinzel">
            Nov 13–15, 2025
          </span>
        </div>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto font-cinzel">
          Where Technology Meets Magic - Join the most enchanting tech fest of the year
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold px-8 py-4 text-lg magical-glow"
            onClick={() => window.location.href = '/registration'}
          >
            Register Now
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold px-8 py-4 text-lg"
            onClick={() => window.location.href = '/lookup'}
          >
            Check Registration
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
