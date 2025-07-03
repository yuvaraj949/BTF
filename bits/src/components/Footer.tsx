import React from "react";

const Footer = () => (
  <footer className="w-full bg-black/60 text-yellow-200 py-6 px-4 border-t border-yellow-900/40">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <a href="mailto:btf@dubai.bits-pilani.ac.ae" className="hover:text-yellow-400 underline text-sm">
          btf@dubai.bits-pilani.ac.ae
        </a>
        <a href="https://instagram.com/btf.bitsd" target="_blank" rel="noopener noreferrer" className="ml-2">
          <img src="/instagram.svg" alt="Instagram" className="inline h-6 w-6 hover:scale-110 transition-transform" />
        </a>
      </div>
      <div className="text-xs text-yellow-300 text-center md:text-right">
        &copy; {new Date().getFullYear()} BTF. All rights reserved.<br />
        Made with <span className="text-red-500">♥</span> by BPDC
      </div>
    </div>
  </footer>
);

export default Footer;
