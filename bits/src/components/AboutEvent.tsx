
import React from 'react';
import { ScrollText, Cpu, Rocket, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutEvent = () => {
  return (
    <section id="about" className="py-20 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-[-1]"></div>
      
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
            <span className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">
              ABOUT THE TECH FEST
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-white/80 backdrop-blur-sm glass-card p-6 border-l-4 border-neon-purple animate-fade-in-up">
                <span className="text-neon-purple font-bold">BITS Tech Fest 2025</span> brings together the brightest minds in technology 
                and innovation for a two-day extravaganza at BITS Pilani Dubai Campus. Our theme 
                <span className="text-neon-blue font-bold italic"> "Cosmic Intelligence: Where Algorithms Meet the Stars"</span> explores 
                the intersection of artificial intelligence and space technology.
              </p>
              
              <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-bold mb-4 text-neon-pink">Why Attend?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Cpu className="text-neon-blue shrink-0 mt-1" size={20} />
                    <span>Access cutting-edge tech workshops and competitions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="text-neon-green shrink-0 mt-1" size={20} />
                    <span>Network with industry professionals and tech enthusiasts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Rocket className="text-neon-pink shrink-0 mt-1" size={20} />
                    <span>Showcase your projects and innovations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ScrollText className="text-neon-purple shrink-0 mt-1" size={20} />
                    <span>Learn from expert speakers and thought leaders</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Button asChild className="neon-button">
                  <Link to="/speakers">DISCOVER SPEAKERS</Link>
                </Button>
                <Button asChild variant="outline" className="border-neon-pink/50 hover:bg-neon-pink/10 hover:border-neon-pink">
                  <Link to="/events">VIEW ALL EVENTS</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 perspective-container animate-fade-in-up">
            <div className="relative w-full max-w-md mx-auto aspect-video transform rotate-y-10 rotate-z-6 hover:rotate-y-5 transition-transform duration-500">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-neon-purple/30 via-neon-blue/20 to-neon-pink/30 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]"></div>
              <div className="p-6 relative">
                <h3 className="text-2xl font-bold mb-4 text-white">Event Highlights</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="border-l-2 border-neon-blue pl-3 py-1 hover:text-white transition-colors">
                    <span className="text-neon-blue">Apr 30:</span> Opening Ceremony & Keynote
                  </li>
                  <li className="border-l-2 border-neon-purple pl-3 py-1 hover:text-white transition-colors">
                    <span className="text-neon-purple">Apr 30-May 1:</span> Hackathon (24hr)
                  </li>
                  <li className="border-l-2 border-neon-green pl-3 py-1 hover:text-white transition-colors">
                    <span className="text-neon-green">May 1:</span> Workshops & Tech Expo
                  </li>
                  <li className="border-l-2 border-neon-pink pl-3 py-1 hover:text-white transition-colors">
                    <span className="text-neon-pink">May 10:</span> Finals & Awards Ceremony
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEvent;
