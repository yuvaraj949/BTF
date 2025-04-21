import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';
import '../styles/gradients.css';

const Contact = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="scanline fixed top-0 left-0 pointer-events-none"></div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">
          CONTACT US
        </h1>
        <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
          Have questions about BITS Tech Fest 2025? Get in touch with our team and we'll be happy to help.
        </p>
        
        <div className="max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="glass-card mb-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-neon-purple/20 p-3 rounded-full">
                  <Mail size={20} className="text-neon-purple" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a 
                    href="mailto:contact.btf@dubai.bits-pilani.ac.in" 
                    className="text-white/70 hover:text-neon-purple transition-colors"
                  >
                    contact.btf@dubai.bits-pilani.ac.in
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-neon-blue/20 p-3 rounded-full">
                  <Phone size={20} className="text-neon-blue" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <a 
                    href="tel:+971586290281" 
                    className="text-white/70 hover:text-neon-blue transition-colors"
                  >
                    +971 586290281
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-neon-orange/20 p-3 rounded-full">
                  <MapPin size={20} className="text-neon-orange" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <a
                    href="https://www.google.com/maps/dir//Dubai+Campus+-+Academic+City+-+Dubai+-+United+Arab+Emirates/@25.1314665,55.3376815,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3e5f63ecaf0b7683:0x178903db8ef63bc7!2m2!1d55.420083!2d25.1314893?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-neon-orange transition-colors"
                  >
                    BITS Pilani Dubai Campus,<br />
                    Dubai International Academic City,<br />
                    Dubai, UAE
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card">
            <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
            <p className="text-white/70 mb-6">Stay updated with the latest information about BITS Tech Fest.</p>
            
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/bitstechfest" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-4 rounded-full hover:bg-neon-purple/20 transition-colors group"
              >
                <Instagram size={24} className="group-hover:text-neon-purple transition-colors" />
              </a>
              <a 
                href="https://www.linkedin.com/company/bits-tech-fest" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-4 rounded-full hover:bg-neon-blue/20 transition-colors group"
              >
                <Linkedin size={24} className="group-hover:text-neon-blue transition-colors" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-16 glass-card p-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Location</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1785200727284!2d55.54272595!3d25.22127085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f63ecaf0b7683%3A0x178903db8ef63bc7!2sBITS%20Pilani%20Dubai%20Campus!5e0!3m2!1sen!2sae!4v1620374890561!5m2!1sen!2sae" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="BITS Pilani Dubai Campus Location"
              className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            ></iframe>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
