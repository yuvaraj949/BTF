import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Agenda', path: '/agenda' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Contact', path: '/contact' },
  ];

  // Check if the current path matches the link path
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return location.pathname === path;
  };

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-black/80 shadow-lg backdrop-blur-md border-b border-white/10' 
          : 'py-4 bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/bits.png"
            alt="BITS TechFest Logo"
            className="h-12 w-auto transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_10px_rgba(243,45,0,0.6)]"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm hover:text-orange-500 transition-colors ${
                isActive(link.path) ? 'text-[#f32d00] font-medium' : 'text-white/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Button asChild className="bg-[#f32d00] hover:bg-[#f32d00]/90 ml-4">
            <Link to="/registration">Register</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-b border-white/10 shadow-xl transition-all duration-300 ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`py-2 ${
                isActive(link.path) ? 'text-[#f32d00] font-medium' : 'text-white/80'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <Button asChild className="bg-[#f32d00] hover:bg-[#f32d00]/90 w-full mt-4">
            <Link to="/registration" onClick={() => setIsMenuOpen(false)}>Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;