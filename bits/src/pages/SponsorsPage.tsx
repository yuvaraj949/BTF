
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Users } from 'lucide-react';
import '../styles/gradients.css';

const SponsorsPage = () => {
  // Sponsorship package details
  const sponsorshipPackages = [
    {
      type: "Title Sponsor",
      price: "AED 50,000",
      color: "bg-gradient-to-r from-amber-500 to-yellow-300",
      textColor: "text-amber-500",
      features: [
        "Exclusive title naming rights (e.g., 'BITS Tech Fest 2025 presented by [Your Company]')",
        "Premium logo placement on all digital & print materials",
        "10 dedicated social media posts",
        "6 reels featuring company products/services",
        "Prime exhibition space (6x4m booth)",
        "5 banners placed at strategic locations",
        "10 complimentary passes for company representatives",
        "On-stage speaking opportunity (20 mins)",
        "Featured in press releases and media coverage",
        "Exclusive access to participant database"
      ]
    },
    {
      type: "Gold Sponsor",
      price: "AED 30,000",
      color: "bg-gradient-to-r from-amber-300 to-yellow-200",
      textColor: "text-amber-400",
      features: [
        "Prominent logo placement on all digital & print materials",
        "7 dedicated social media posts",
        "4 reels featuring company products/services",
        "Premium exhibition space (4x3m booth)",
        "3 banners placed at key locations",
        "7 complimentary passes for company representatives",
        "Panel participation opportunity",
        "Recognition in press releases",
        "Access to opt-in participant database"
      ]
    },
    {
      type: "Silver Sponsor",
      price: "AED 15,000",
      color: "bg-gradient-to-r from-gray-300 to-gray-100",
      textColor: "text-gray-400",
      features: [
        "Logo placement on website and selected materials",
        "4 dedicated social media posts",
        "2 reels featuring company products/services",
        "Standard exhibition space (3x2m booth)",
        "2 banners at event venue",
        "5 complimentary passes for company representatives",
        "Mentioned in select press communications"
      ]
    },
    {
      type: "Associate Sponsor",
      price: "AED 5,000",
      color: "bg-gradient-to-r from-blue-300 to-blue-100",
      textColor: "text-blue-400",
      features: [
        "Logo on website and digital materials",
        "2 dedicated social media posts",
        "Small exhibition space (2x2m booth)",
        "1 banner at event venue",
        "3 complimentary passes for company representatives",
        "Listed as Associate Sponsor in communications"
      ]
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="scanline fixed top-0 left-0 pointer-events-none"></div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">
          <span className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">SPONSORSHIP</span> OPPORTUNITIES
        </h1>
        <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
          Partner with BITS Tech Fest 2025 and showcase your brand to thousands of tech enthusiasts, industry professionals, and future talent.
        </p>
        
        {/* Sponsorship Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {sponsorshipPackages.map((pkg, index) => (
            <div 
              key={index} 
              className="glass-card overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] flex flex-col h-full"
            >
              <div className={`${pkg.color} p-4 text-black text-center`}>
                <h3 className="text-2xl font-bold">{pkg.type}</h3>
                <p className="text-xl font-bold mt-2">{pkg.price}</p>
              </div>
              
              <div className="flex-1 p-6">
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={18} className="text-neon-green mt-1 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 pt-0">
                <Button className="w-full neon-button">Become a Sponsor</Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Why Sponsor Section */}
        <div className="glass-card mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Sponsor <span className="text-neon-purple">BITS Tech Fest</span>?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center h-14 w-14 rounded-full bg-neon-purple/20 text-neon-purple">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Targeted Audience</h3>
              <p className="text-white/70">
                Connect with 5000+ tech enthusiasts, students, and industry professionals who are passionate about innovation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center h-14 w-14 rounded-full bg-neon-green/20 text-neon-green">
                <Badge className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Brand Visibility</h3>
              <p className="text-white/70">
                Showcase your brand in a technology-focused environment and gain recognition as a supporter of tech education.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center h-14 w-14 rounded-full bg-neon-blue/20 text-neon-blue">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Talent Recruitment</h3>
              <p className="text-white/70">
                Opportunity to scout and interact with skilled students and graduates for potential recruitment.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="glass-card text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Interested in becoming a sponsor?</h2>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Download our detailed sponsorship brochure or contact our sponsorship team to discuss custom partnership opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="neon-button mx-2">
            <a 
              href="/documents/BTF Brochure.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              download="BTF Brochure.pdf"
            >
              Download Brochure
            </a>
          </Button>
            <Button asChild variant="outline" className="border-white/20 hover:bg-white/5">
              <a href="mailto:btf.sponsorship@dubai.bits-pilani.ac.in">Contact Sponsorship Team</a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SponsorsPage;
