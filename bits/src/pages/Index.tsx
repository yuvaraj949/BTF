
import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import HeroSection from '../components/HeroSection';
import CountdownTimer from '../components/CountdownTimer';
import BackgroundScene from '../components/BackgroundScene';
import MagicalElements from '../components/MagicalElements';
import HarryPotterCharacter from '../components/HarryPotterCharacter';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isDayTime, setIsDayTime] = useState(false); // Always night for Hogwarts Legacy theme

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Magical Background */}
      <BackgroundScene isDayTime={isDayTime} scrollY={scrollY} />
      
      {/* Magical Elements Overlay */}
      <MagicalElements isDayTime={isDayTime} />
      
      {/* Harry Potter Character */}
      <HarryPotterCharacter />
      
      {/* Main Content */}
      <div className="relative z-10">
        <NavigationBar />
        <HeroSection />
        <CountdownTimer />
        
        {/* Content to enable scrolling */}
        <div className="h-screen bg-gradient-to-b from-transparent to-gray-900/40 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg font-cinzel">
              Join the Magic
            </h2>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed font-cinzel">
              Embark on a journey of innovation and discovery at the most enchanting tech fest of the year. 
              Where technology meets magic, and ideas come to life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
