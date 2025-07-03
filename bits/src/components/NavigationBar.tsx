
import React from 'react';

const NavigationBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/lovable-uploads/75563aab-1419-470f-86da-f6c102723c1d.png" 
                alt="BTF Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-yellow-400 font-bold text-xl tracking-wider">BTF 2025</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: 'HOME', href: '/' },
              { name: 'ABOUT', href: '/about' },
              { name: 'TRACKS', href: '/tracks' },
              { name: 'EVENTS', href: '/events' },
              { name: 'SPONSORS', href: '/sponsors' },
              { name: 'CONTACT US', href: '/contactus' },
              { name: 'REGISTER', href: '/registration' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium tracking-wide text-sm"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white hover:text-yellow-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
