import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import HeroSection from '../components/HeroSection';
import CountdownTimer from '../components/CountdownTimer';
import BackgroundScene from '../components/BackgroundScene';
import Footer from '../components/Footer';
import { useLocation } from "react-router-dom";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isDayTime, setIsDayTime] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const heroRef = React.useRef<HTMLDivElement>(null);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setHeroInView(rect.bottom > 575);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-gray-900">
      {/* Background */}
      <BackgroundScene isDayTime={isDayTime} scrollY={scrollY} />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col">
        <NavigationBar showLogoTitle={!heroInView} />
        <HeroSection heroRef={heroRef} showLogoTitle={heroInView} />
        <CountdownTimer />

        {/* About Section */}
        <div className="max-w-2xl mx-auto py-24 px-4 text-white font-cinzel" id="about">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#F66200] text-center">About BTF</h1>
          <p className="mb-4 text-lg">
            <b>BITS Tech Fest (BTF)</b> is one of the UAE’s premier student-led tech events. Hosted by 14 clubs at BITS Pilani Dubai Campus, the 21st edition will be held from <b>12th to 15th November 2025</b>.
          </p>
          <p className="text-lg">
            With over <span className="text-[#F66200] font-bold">500 participants</span> from leading universities and schools across the UAE, the fest includes hands-on workshops, hackathons, and tech debates—encouraging innovation and showcasing real-world AI and autonomous technologies.
          </p>
        </div>

        {/* Tracks Section */}
        <div className="max-w-2xl mx-auto py-24 px-4 text-white font-cinzel" id="tracks">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#F66200] text-center">Tracks</h1>
          <p className="mb-4 text-lg">Explore various competition tracks with real-world applications and creativity at their core.</p>
          <ul className="space-y-4">
            {[
              {
                title: "Artificial Intelligence",
                description: "Projects involving data science, machine learning, and autonomous intelligence."
              },
              {
                title: "Internet of Things",
                description: "Solutions integrating smart systems, automation, and connected devices."
              },
              {
                title: "Sustainability",
                description: "Tech-driven ideas promoting greener and more responsible futures."
              }
            ].map((track) => (
              <li key={track.title} className="border border-[#F66200]/30 rounded p-4 bg-black/40">
                <h2 className="text-2xl font-semibold text-[#F66200]">{track.title}</h2>
                <p>{track.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Sponsors Section */}
        <div className="max-w-2xl mx-auto py-24 px-4 text-white font-cinzel" id="sponsors">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#F66200] text-center">Sponsors</h1>
          <ul className="flex flex-wrap gap-8 items-center justify-center">
            <li className="flex flex-col items-center bg-black/40 rounded p-4">
              <img src="/hpe-aruba-logo.jpeg" alt="HPE Aruba Networking" className="mb-2" />
            </li>
          </ul>
        </div>

        {/* Become a Sponsor Section */}
        <div className="max-w-2xl mx-auto py-16 px-4 text-white font-cinzel" id="become-sponsor">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#F66200] text-center">Become a Sponsor</h2>
          <div className="mb-8 text-center">
          <p className="mb-4 text-lg font-semibold">
            Interested in sponsoring our event? <br/>
            Promote your company and reach a wider audience.<br/>
            Click below to download our sponsorship brochure.
          </p>

            <a
              href="/brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-[#F66200] text-white font-bold rounded shadow hover:bg-[#d94e00] transition-colors duration-200"
            >
              Brochure
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
