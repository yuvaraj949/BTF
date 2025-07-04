import React from "react";


const Footer = () => (
  <footer className="w-full bg-black/80 text-[#F66200]/80 py-8 px-4 border-t border-[#F66200]/40 relative z-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
      <div>
        <div className="text-xl font-bold text-orange-400 mb-2 tracking-wide">BITS TECHFEST</div>
        <div className="text-sm text-[#F66200]/60 mb-2">Cosmic Intelligence: Where Algorithms Meet the Stars</div>
        <div className="flex gap-3 mt-2">
          <a href="https://www.instagram.com/bitstechfest/" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.svg" alt="Instagram" className="inline h-6 w-6 hover:scale-110 transition-transform" />
          </a>
          <a href="https://www.linkedin.com/company/bits-tech-fest" target="_blank" rel="noopener noreferrer">
            <img src="/linkedin.svg" alt="LinkedIn" className="inline h-6 w-6 hover:scale-110 transition-transform" />
          </a>
          <a href="mailto:contact.btf@dubai.bits-pilani.ac.in" target="_blank" rel="noopener noreferrer">
            <img src="/mail.svg" alt="Mail" className="inline h-6 w-6 hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
      <div>
        <div className="font-semibold text-[#F66200] mb-2">Quick Links</div>
        <ul className="text-sm space-y-1">
          <li><a href="/" className="hover:text-[#F66200]">Home</a></li>
          <li><a href="/registration" className="hover:text-[#F66200]">Register</a></li>
          <li><a href="/events" className="hover:text-[#F66200]">Agenda</a></li>
        </ul>
      </div>
      <div>
        <div className="font-semibold text-[#F66200] mb-2">Contact Us</div>
        <div className="flex items-center gap-2 text-sm mb-1">
          <img src="/mail.svg" alt="Mail" className="h-5 w-5 inline" />
          <a href="mailto:bitstechfest@dubai.bits-pilani.ac.in" className="hover:text-[#F66200]">bitstechfest@dubai.bits-pilani.ac.in</a>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <svg className="h-5 w-5 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5.75C3 4.784 3.784 4 4.75 4h14.5A1.75 1.75 0 0 1 21 5.75v12.5A1.75 1.75 0 0 1 19.25 20H4.75A1.75 1.75 0 0 1 3 18.25V5.75ZM16.5 8.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 13.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z" /></svg>
          <span>+971 586290281</span>
        </div>
      </div>
      <div>
        <div className="font-semibold text-[#F66200] mb-2">Legal</div>
        <ul className="text-sm space-y-1">
          <li><a href="/contactus" className="hover:text-[#F66200]">Contact Us</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-[#F66200]/40 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-[#F66200]">
      <div>&copy; BITS Pilani Dubai © {new Date().getFullYear()}. All rights reserved.</div>
      <div>Made with <span className="text-red-500">♥</span> by BITS Tech Fest Team</div>
    </div>
  </footer>
);

export default Footer;
