
import React, { useEffect, useRef } from 'react';
import { Gamepad2, MonitorPlay, Trophy, Users, Zap, LayoutGrid } from 'lucide-react';

const featureItems = [
  {
    icon: <Gamepad2 className="h-8 w-8" />,
    title: "Immersive Gameplay",
    description: "Experience cutting-edge gameplay mechanics that push the boundaries of what's possible."
  },
  {
    icon: <MonitorPlay className="h-8 w-8" />,
    title: "4K Ultra Graphics",
    description: "Breathtaking visuals with ray tracing and photorealistic environments."
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: "Competitive Tournaments",
    description: "Join weekly tournaments with prizes and climb the global leaderboards."
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Multiplayer Experience",
    description: "Connect with friends and compete against players from around the world."
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Low Latency Gaming",
    description: "Our servers ensure minimal lag for a smooth gaming experience."
  },
  {
    icon: <LayoutGrid className="h-8 w-8" />,
    title: "Cross-Platform",
    description: "Play on any device with full cross-platform support and progression."
  }
];

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureElements = document.querySelectorAll('.feature-item');
    featureElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      featureElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="features" className="py-20 bg-black relative">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-neon-purple/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-neon-green/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={featuresRef}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
            <span className="mb-4 gradient-heading">GAME-CHANGING FEATURES</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Our platform offers everything you need for the ultimate gaming experience.
            These features set us apart from the competition.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <div 
              key={index} 
              className="feature-item opacity-0 glass-card transition-all duration-300 hover:border-neon-purple/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 text-neon-purple">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
