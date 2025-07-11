// Top navigation bar for BITS Tech Fest site. Handles logo, links, and navigation.

/**
 * NavigationBar component
 * - Shows the BITS Tech Fest logo and title
 * - Provides navigation links to all main sections/pages
 * - Responsive: hides links on mobile, shows hamburger if needed
 * - Accepts showLogoTitle prop to animate logo/title in/out
 */
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationBarProps {
  showLogoTitle?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ showLogoTitle = true }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/#about' },
    { name: 'TRACKS', href: '/#tracks' },
    { name: 'EVENTS', href: '/events' },
    { name: 'SPONSORS', href: '/#sponsors' },
    { name: 'CONTACT US', href: '/contactus' },
    { name: 'REGISTER', href: '/registration' }
  ];

  const handleNavClick = (item: { name: string; href: string }, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const isSection = item.href.startsWith('/#');
    const isHome = item.href === '/';
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
    setMobileMenuOpen(false); // Always close mobile menu on link click
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-[#F66200]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title (animated in/out) */}
          <div className="flex items-center transition-all duration-500" style={{ opacity: showLogoTitle ? 1 : 0, transform: showLogoTitle ? 'translateY(0)' : 'translateY(30px)', pointerEvents: showLogoTitle ? 'auto' : 'none' }}>
            <a href="/" className="flex items-center space-x-2 group" style={{ fontFamily: 'Cinzel, serif' }}>
              <span className="w-10 h-10 flex items-center justify-center">
                <img 
                  src="/favicon.ico" 
                  alt="BTF Logo" 
                  className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
                />
              </span>
              <span className="text-[#F66200] font-bold text-xl tracking-wider">BITS TECH FEST</span>
            </a>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-[#F66200] transition-colors duration-300 font-medium tracking-wide text-sm"
                style={{ fontFamily: 'Cinzel, serif' }}
                onClick={e => handleNavClick(item, e)}
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-white hover:text-[#F66200] transition-colors"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden" style={{ backdropFilter: 'blur(2px)' }}>
          <div
            ref={mobileMenuRef}
            className="absolute top-16 right-4 left-4 rounded-lg bg-[#18181b] border border-[#F66200]/30 shadow-lg flex flex-col py-4 px-6 space-y-4 animate-fade-in"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-[#F66200] transition-colors duration-300 font-medium tracking-wide text-base py-2"
                style={{ fontFamily: 'Cinzel, serif' }}
                onClick={e => handleNavClick(item, e)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
