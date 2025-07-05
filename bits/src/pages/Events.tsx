// Events page: Displays agenda and event details for BITS Tech Fest.

/**
 * Renders the Events page, showing a list of all scheduled events for BITS Tech Fest.
 *
 * Features:
 * - Uses NavigationBar and Footer for consistent layout.
 * - Loads event data from a static JSON file.
 * - Each event displays title, tag, date, time, location, and a short description.
 * - Responsive and styled with Tailwind CSS.
 */
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
  // State to track the vertical scroll position (for future UI effects)
  const [scrollY, setScrollY] = useState(0);
  // State for day/night theming (currently always false)
  const [isDayTime] = useState(false);

  // Effect: Listen for scroll events and update scrollY
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY); // Update scrollY on scroll
    window.addEventListener("scroll", handleScroll); // Add scroll listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, []);

  return (
    // Main page container, sets background and flex layout
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Main content area (flex-1 ensures it grows to fill screen) */}
      <main className="flex-1 flex flex-col">
        {/* Top navigation bar (site-wide) */}
        <NavigationBar />
        {/* Main content container, centers and adds padding */}
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="max-w-3xl mx-auto">
            {/* Page title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#F66200] mb-4 font-cinzel">
                Events
              </h1>
            </div>
            {/* List of all events from events.json */}
            <ul className="space-y-6">
              {(events as Event[]).map((event) => (
                // Each event card
                <li
                  key={event.title + event.date}
                  className="border border-[#F66200]/30 rounded p-4 bg-black/40"
                >
                  {/* Event title and tag */}
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-semibold text-[#F66200]">{event.title}</h2>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">
                      {event.tag}
                    </span>
                  </div>
                  {/* Event date, time, and location */}
                  <div className="text-sm text-gray-300 mb-1">
                    {/* Format: 2025-11-13 | 09:00 - 11:00 | Main Hall */}
                    {event.date} | {event.startTime.slice(11,16)} - {event.endTime.slice(11,16)} | {event.location}
                  </div>
                  {/* Short description of the event */}
                  <p>{event.shortDescription}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      {/* Footer with contact/social links */}
      <Footer />
    </div>
  );
}
