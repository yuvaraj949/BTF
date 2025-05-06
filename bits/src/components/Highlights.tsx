import React from 'react';

const Sponsor = () => {
  return (
    <section className="py-8 relative bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-white/70 text-lg mb-4">Powered By</p>
          <img 
            src="@/../hpe.jpeg" 
            alt="Sponsor Logo" 
            className="h-24 md:h-32 transition-all duration-300 hover:opacity-80"
          />
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

export default Sponsor;
