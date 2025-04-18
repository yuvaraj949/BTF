
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Sponsors from '@/components/Sponsors';
import Highlights from '@/components/Highlights';
import Features from '@/components/Features';
import AboutEvent from '@/components/AboutEvent';
import Countdown from '@/components/Countdown';
import Footer from '@/components/Footer';
import Aurora from '@/components/Aurora';

const Index = () => {
  useEffect(() => {
    // Add scroll listener for parallax effects
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-black text-white min-h-screen relative overflow-x-hidden">
      {/* Aurora background */}
      <Aurora 
        colorStops={["#8B5CF6", "#FF94B4", "#3A29FF"]} 
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      
      {/* Glow effects */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-blue/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <Navbar />
      <Hero />
      <Countdown targetDate="2025-04-30T09:00:00" />
      <Highlights />
      <AboutEvent />
      <Features />
      <Sponsors />
      <Footer />
    </main>
  );
};

export default Index;
