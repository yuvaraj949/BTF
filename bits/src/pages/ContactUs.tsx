// Contact Us page: Shows contact information for the event organizers.
import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import Footer from '../components/Footer';

export default function ContactUs() {
  const [scrollY, setScrollY] = useState(0);
  const [isDayTime] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-1 flex flex-col">
        <NavigationBar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#F66200] mb-4 font-cinzel">
                Contact Us
              </h1>
            </div>
            <div className="mb-4 text-lg space-y-2">
              <p>
                <span className="text-[#F66200] font-semibold">Email:</span>
                <span className="text-white"> <a href="mailto:contact.btf@dubai.bits-pilani.ac.in" className="no-underline hover:text-[#F66200]">contact.btf@dubai.bits-pilani.ac.in</a></span>
              </p>
              <p>
                <span className="text-[#F66200] font-semibold">Phone:</span>
                <span className="text-white"> <a href="tel:+971586290281" className="no-underline hover:text-[#F66200]">+971 586290281</a></span>
              </p>
              <p>
                <span className="text-[#F66200] font-semibold">Address:</span><br />
                <span className="text-white">
                  BITS Pilani Dubai Campus,<br />
                  Dubai International Academic City,<br />
                  Dubai, UAE
                </span>
              </p>
            </div>
            <div className="border border-[#F66200]/30 rounded overflow-hidden" style={{height: 300}}>
              <iframe
                title="BITS Pilani Dubai Campus Map"
                src="https://www.google.com/maps?q=BITS+Pilani+Dubai+Campus&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
