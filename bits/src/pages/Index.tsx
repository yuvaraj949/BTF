import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import HeroSection from '../components/HeroSection';
import CountdownTimer from '../components/CountdownTimer';
import BackgroundScene from '../components/BackgroundScene';
import MagicalElements from '../components/MagicalElements';
import Footer from '../components/Footer';

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
    <div className="min-h-screen flex flex-col overflow-hidden bg-gray-900">
      {/* Magical Background */}
      <BackgroundScene isDayTime={isDayTime} scrollY={scrollY} />
      
      {/* Magical Elements Overlay */}
      <MagicalElements isDayTime={isDayTime} />
      
      {/* Harry Potter Character removed as requested */}
      
      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col">
        <NavigationBar />
        <HeroSection />
        <CountdownTimer />
        
        {/* Content to enable scrolling */}
        <div className="bg-gradient-to-b from-transparent to-gray-900/40">
          <div className="text-center text-white max-w-4xl mx-auto px-4 min-h-[60vh] flex flex-col justify-center items-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg font-cinzel">
              Join the Magic
            </h2>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed font-cinzel">
              Embark on a journey of innovation and discovery at the most enchanting tech fest of the year. 
              Where technology meets magic, and ideas come to life.
            </p>
          </div>
          {/* About Section */}
          <div className="max-w-2xl mx-auto py-24 px-4 text-white font-cinzel" id="about">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">About BTF</h1>
            <p className="mb-4 text-lg">
              <b>BTF</b> is Dubai's only tech fest, bringing together innovators, students, and professionals for a unique celebration of technology and creativity. With <span className="text-yellow-400 font-bold">180+ participants</span> in previous editions, BTF stands as the region's premier platform for tech enthusiasts to learn, compete, and network.
            </p>
            <p className="text-lg">
              Hosted at BITS Pilani Dubai Campus, BTF features a variety of events, hackathons, workshops, and presentations, making it a must-attend for anyone passionate about technology in the UAE.
            </p>
          </div>
          {/* Tracks Section */}
          <div className="max-w-2xl mx-auto py-24 px-4 text-white font-cinzel" id="tracks">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">Tracks</h1>
            <p className="mb-4 text-lg">Choose from a variety of competition tracks. <span className='text-yellow-400 font-bold'>180+ participants</span> joined us last year!</p>
            <ul className="space-y-4">
              {[{title: "Artificial Intelligence", description: "Explore the latest in AI, machine learning, and data science."}, {title: "Internet of Things", description: "Innovate with IoT devices, smart systems, and automation."}, {title: "Sustainability", description: "Build solutions for a greener, more sustainable future."}].map((track) => (
                <li key={track.title} className="border border-yellow-400/30 rounded p-4 bg-black/40">
                  <h2 className="text-2xl font-semibold text-yellow-300">{track.title}</h2>
                  <p>{track.description}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* Sponsors Section */}
          <div className="max-w-2xl mx-auto py-24 px-4 text-white font-cinzel" id="sponsors">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">Sponsors</h1>
            <ul className="flex flex-wrap gap-8 items-center justify-center">
              <li className="flex flex-col items-center bg-black/40 rounded p-4">
                <img src="/hpe-aruba-logo.jpeg" alt="HPE Aruba Networking" className="mb-2" />
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
