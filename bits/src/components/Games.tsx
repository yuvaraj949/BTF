
import React, { useEffect, useRef } from 'react';
import GameCard from './GameCard';

const gamesData = [
  {
    title: "Cyberpunk Odyssey",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    category: "RPG",
    description: "Navigate a dystopian future where corporations rule and technology has transformed humanity."
  },
  {
    title: "Neon Racers",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1274&q=80",
    category: "Racing",
    description: "Race through futuristic cities with hover vehicles at breakneck speeds."
  },
  {
    title: "Quantum Strike",
    image: "https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "FPS",
    description: "Tactical team-based shooter with quantum technology altering the rules of combat."
  },
  {
    title: "Void Explorers",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    category: "Adventure",
    description: "Explore procedurally generated planets filled with alien life and ancient mysteries."
  },
  {
    title: "Neon Arena",
    image: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "MOBA",
    description: "Compete in team-based battles with unique heroes in electrifying arenas."
  },
  {
    title: "Digital Legends",
    image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    category: "Strategy",
    description: "Master complex strategy in this digital card game with endless deck possibilities."
  }
];

const Games = () => {
  const gamesRef = useRef<HTMLDivElement>(null);

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

    const gameElements = document.querySelectorAll('.game-card');
    gameElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      gameElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="games" className="py-20 bg-black relative">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-neon-blue/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-neon-purple/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={gamesRef}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
            <span className="animate-glow">FEATURED GAMES</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-[2px] w-24 bg-neon-purple"></span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover our collection of cutting-edge games with stunning visuals
            and immersive gameplay experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamesData.map((game, index) => (
            <div key={index} className="game-card opacity-0">
              <GameCard
                title={game.title}
                image={game.image}
                category={game.category}
                description={game.description}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Games;
