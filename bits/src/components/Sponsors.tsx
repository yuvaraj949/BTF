
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

// Sponsor placeholders - these would be replaced with actual sponsor logos
const sponsors = {
  title: [{ name: "Title Sponsor", image: "/placeholder.svg", url: "#" }],
  gold: [
    { name: "Gold Sponsor 1", image: "/placeholder.svg", url: "#" },
    { name: "Gold Sponsor 2", image: "/placeholder.svg", url: "#" },
  ],
  silver: [
    { name: "Silver Sponsor 1", image: "/placeholder.svg", url: "#" },
    { name: "Silver Sponsor 2", image: "/placeholder.svg", url: "#" },
    { name: "Silver Sponsor 3", image: "/placeholder.svg", url: "#" },
  ],
  associate: [
    { name: "Associate Sponsor 1", image: "/placeholder.svg", url: "#" },
    { name: "Associate Sponsor 2", image: "/placeholder.svg", url: "#" },
    { name: "Associate Sponsor 3", image: "/placeholder.svg", url: "#" },
    { name: "Associate Sponsor 4", image: "/placeholder.svg", url: "#" },
  ]
};

const Sponsors = () => {
  return (
    <section className="py-20 relative bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">
          OUR SPONSORS
        </h2>
        
        {/* Title Sponsors */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-center mb-6 text-neon-orange">Title Sponsors</h3>
          <div className="flex justify-center gap-8">
            {sponsors.title.map((sponsor, index) => (
              <a 
                key={index} 
                href={sponsor.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black/50 rounded-lg p-8 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              >
                <img 
                  src={sponsor.image} 
                  alt={sponsor.name} 
                  className="h-24 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" 
                />
              </a>
            ))}
          </div>
        </div>
        
        {/* Gold Sponsors */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-center mb-6 text-neon-orange">Gold Sponsors</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {sponsors.gold.map((sponsor, index) => (
              <a 
                key={index} 
                href={sponsor.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black/50 rounded-lg p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              >
                <img 
                  src={sponsor.image} 
                  alt={sponsor.name} 
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" 
                />
              </a>
            ))}
          </div>
        </div>
        
        {/* Silver Sponsors */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-center mb-6 text-neon-orange">Silver Sponsors</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {sponsors.silver.map((sponsor, index) => (
              <a 
                key={index} 
                href={sponsor.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black/50 rounded-lg p-4 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              >
                <img 
                  src={sponsor.image} 
                  alt={sponsor.name} 
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" 
                />
              </a>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="neon-button">
            <Link to="/sponsors">BECOME A SPONSOR</Link>
          </Button>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-neon-orange/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-neon-purple/5 rounded-full filter blur-[120px]"></div>
      </div>
    </section>
  );
};

export default Sponsors;
