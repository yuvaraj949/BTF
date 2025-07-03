import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import events from "../data/events.json";
import Footer from '../components/Footer';

type Event = {
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  location: string;
  shortDescription: string;
  tag: string;
};

export default function Events() {
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
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-yellow-400 mb-4 font-cinzel">
                Events
              </h1>
            </div>
            <ul className="space-y-6">
              {(events as Event[]).map((event) => (
                <li key={event.title + event.date} className="border border-yellow-400/30 rounded p-4 bg-black/40">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-semibold text-yellow-300">{event.title}</h2>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">{event.tag}</span>
                  </div>
                  <div className="text-sm text-gray-300 mb-1">
                    {event.date} | {event.startTime.slice(11,16)} - {event.endTime.slice(11,16)} | {event.location}
                  </div>
                  <p>{event.shortDescription}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
