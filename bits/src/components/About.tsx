
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const About = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ 
          backgroundImage: `radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
          transform: `translateY(${offsetY * 0.05}px)`
        }}
      />
      
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url('/grid-pattern.png')`,
          backgroundSize: '100px 100px',
          opacity: 0.2,
          transform: `translateY(${offsetY * 0.1}px)`
        }}
      />
      
      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
              <span className="animate-glow">ABOUT NEON VOID</span>
              <span className="absolute -bottom-2 left-0 h-[2px] w-24 bg-neon-purple"></span>
            </h2>
            
            <p className="text-white/80 mb-6">
              Founded in 2023, Neon Void is a cutting-edge gaming platform created by gamers, for gamers. 
              We're building the future of digital entertainment with immersive worlds that push the 
              boundaries of what's possible.
            </p>
            
            <p className="text-white/80 mb-6">
              Our team comprises industry veterans and fresh talent united by a shared passion for 
              creating unforgettable gaming experiences. We believe in innovation, community, and 
              the transformative power of interactive entertainment.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="glass-card p-4 min-w-[140px]">
                <div className="text-2xl font-bold text-neon-purple">24M+</div>
                <div className="text-sm text-white/70">Active Players</div>
              </div>
              
              <div className="glass-card p-4 min-w-[140px]">
                <div className="text-2xl font-bold text-neon-green">6+</div>
                <div className="text-sm text-white/70">AAA Games</div>
              </div>
              
              <div className="glass-card p-4 min-w-[140px]">
                <div className="text-2xl font-bold text-neon-blue">98%</div>
                <div className="text-sm text-white/70">Positive Reviews</div>
              </div>
            </div>
            
            <Button className="neon-button">
              JOIN OUR TEAM
            </Button>
          </div>
          
          <div className="lg:w-1/2 perspective-container">
            <div 
              className="relative rounded-lg overflow-hidden border border-white/10 transform transition-transform"
              style={{ 
                transform: `translateY(${offsetY * 0.02}px) rotateY(${offsetY * 0.01}deg)`,
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80" 
                alt="Gaming Team" 
                className="w-full h-auto"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
              <div className="absolute inset-0 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Our Gaming Studio</h3>
                  <p className="text-white/70 text-sm">Where imagination meets technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
