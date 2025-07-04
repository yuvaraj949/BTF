import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-[#F66200]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group" style={{ fontFamily: 'Cinzel, serif' }}>
            <span className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/favicon.ico" 
                alt="BTF Logo" 
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
              />
            </span>
            <span className="text-[#F66200] font-bold text-xl tracking-wider group-hover:underline">BTF</span>
          </a>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: 'HOME', href: '/' },
              { name: 'ABOUT', href: '/#about' },
              { name: 'TRACKS', href: '/#tracks' },
              { name: 'EVENTS', href: '/events' },
              { name: 'SPONSORS', href: '/#sponsors' },
              { name: 'CONTACT US', href: '/contactus' },
              { name: 'REGISTER', href: '/registration' }
            ].map((item) => {
              const isSection = item.href.startsWith('/#');
              const isHome = item.href === '/';
              const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                if (isSection) {
                  e.preventDefault();
                  const id = item.href.split('#')[1];
                  const el = document.getElementById(id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate(item.href);
                  }
                } else if (isHome) {
                  e.preventDefault();
                  if (location.pathname !== '/') {
                    navigate('/');
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
              };
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-[#F66200] transition-colors duration-300 font-medium tracking-wide text-sm"
                  style={{ fontFamily: 'Cinzel, serif' }}
                  onClick={handleClick}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white hover:text-[#F66200] transition-colors">
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
