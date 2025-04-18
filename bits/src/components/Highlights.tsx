
import React from 'react';
import { Award, Calendar, School, Users } from 'lucide-react';

const highlightItems = [
  {
    icon: Calendar,
    title: "20+",
    description: "Exciting Tech Events",
  },
  {
    icon: Users,
    title: "5000+",
    description: "Expected Attendees",
  },
  {
    icon: Award,
    title: "15+",
    description: "Participating Clubs",
  },
  {
    icon: School,
    title: "30+",
    description: "Schools & Universities",
  }
];

const Highlights = () => {
  return (
    <section id="highlights" className="py-20 relative bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-heading">
          QUICK HIGHLIGHTS
        </h2>
        <br/>
      
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlightItems.map((item, index) => (
            <div 
              key={index}
              className="glass-card flex flex-col items-center text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]"
            >
              <div className="mb-4 text-neon-purple">
                <item.icon size={48} />
              </div>
              <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-green/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-neon-blue/5 rounded-full filter blur-[120px]"></div>
      </div>
    </section>
  );
};

export default Highlights;
