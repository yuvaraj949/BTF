
import React from 'react';
import { cn } from '@/lib/utils';

interface GameCardProps {
  title: string;
  image: string;
  category: string;
  description: string;
  index: number;
}

const GameCard: React.FC<GameCardProps> = ({ title, image, category, description, index }) => {
  return (
    <div 
      className="glass-card overflow-hidden group transform transition-all duration-500 hover:scale-[1.03] hover:shadow-lg hover:shadow-neon-purple/30"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden h-52">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-3 right-3 bg-neon-purple/90 text-white text-xs px-2 py-1 rounded-full z-20">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 group-hover:text-neon-purple transition-colors">
          {title}
        </h3>
        <p className="text-white/70 text-sm">
          {description}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-white/50">Available Now</span>
          <button className="text-neon-purple text-sm hover:underline transition-all">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
