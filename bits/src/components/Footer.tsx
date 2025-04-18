import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black relative border-t border-white/10">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-60 h-60 bg-blue-500/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 gradient-heading mb-0">
              BITS TECHFEST
            </h3>
            <p className="text-white/70 mb-4">
              Cosmic Intelligence: Where Algorithms Meet the Stars
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/bitstechfest" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/70 hover:text-[#009dff] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/bits-tech-fest" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/70 hover:text-[#009dff] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:contact.btf@dubai.bits-pilani.ac.in" 
                className="text-white/70 hover:text-[#009dff] transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/70 hover:text-[#009dff] transition-colors">Home</Link></li>
              <li><Link to="/events" className="text-white/70 hover:text-[#009dff] transition-colors">Events</Link></li>
              <li><Link to="/speakers" className="text-white/70 hover:text-[#009dff] transition-colors">Speakers</Link></li>
              <li><Link to="/agenda" className="text-white/70 hover:text-[#009dff] transition-colors">Agenda</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#009dff] mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:contact.btf@dubai.bits-pilani.ac.in" 
                  className="text-white/70 hover:text-[#009dff] transition-colors"
                >
                  contact.btf@dubai.bits-pilani.ac.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#009dff] flex-shrink-0" />
                <a 
                  href="tel:+971586290281" 
                  className="text-white/70 hover:text-[#009dff] transition-colors"
                >
                  +971 586290281
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#009dff] mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:btf.sponsorship@dubai.bits-pilani.ac.in" 
                  className="text-white/70 hover:text-[#009dff] transition-colors"
                >
                  btf.sponsorship@dubai.bits-pilani.ac.in
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-white/70 hover:text-[#009dff] transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-white/70 hover:text-[#009dff] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-white/70 hover:text-[#009dff] transition-colors">Cookie Policy</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-[#009dff] transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            &copy; BITS Pilani Dubai © 2025. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link 
              to="/team" 
              className="text-white/50 text-sm hover:text-[#009dff] transition-colors"
            >
              Made with ❤️ by BITS Tech Fest Team
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;