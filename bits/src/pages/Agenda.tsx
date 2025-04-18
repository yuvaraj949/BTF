import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Download, BookmarkPlus, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import '../styles/gradients.css';

// Updated agenda data for April 30th
const agenda = [
  {
    id: 1,
    time: "8:00 AM - 8:20 AM",
    title: "Registration & Welcome Breakfast",
    venue: "Main Lobby",
    type: "Registration",
    description: "Check-in and enjoy morning refreshments"
  },
  {
    id: 2,
    time: "8:20 AM - 8:30 AM",
    title: "Lamp Lighting & Opening Remarks",
    venue: "Auditorium",
    type: "Ceremony",
    description: "Traditional lamp lighting and welcome address"
  },
  {
    id: 3,
    time: "8:30 AM - 8:45 AM",
    title: "Keynote: Cosmic Intelligence",
    venue: "Auditorium",
    type: "Keynote",
    description: "Opening keynote on this year's theme"
  },
  // Club Events (Parallel Sessions)
  {
    id: 4,
    time: "8:45 AM - 12:15 PM",
    title: "Crack The Penguin",
    venue: "Auditorium",
    type: "Competition",
    club: "LUG",
    description: "Linux-based technical challenge"
  },
  {
    id: 5,
    time: "8:45 AM - 12:15 PM",
    title: "Clue Connect",
    venue: "Auditorium",
    type: "Competition",
    club: "WIE",
    description: "Technical puzzle-solving competition"
  },
  {
    id: 6,
    time: "8:45 AM - 12:15 PM",
    title: "STEM-Grid Challenge",
    venue: "Auditorium",
    type: "Competition",
    club: "SWE",
    description: "Engineering design challenge"
  },
  {
    id: 7,
    time: "8:45 AM - 12:15 PM",
    title: "Decrypting Challenge",
    venue: "Auditorium",
    type: "Competition",
    club: "Oh-Crop",
    description: "Cryptography and security competition"
  },
  {
    id: 8,
    time: "8:45 AM - 12:15 PM",
    title: "Tech Taboo",
    venue: "Auditorium",
    type: "Competition",
    club: "ACM-W",
    description: "Technology-themed word game for schools"
  },
  {
    id: 9,
    time: "8:45 AM - 12:15 PM",
    title: "Marshmallow Tower Challenge",
    venue: "Auditorium",
    type: "Competition",
    club: "Skyline",
    description: "Creative engineering challenge"
  },
  {
    id: 10,
    time: "8:45 AM - 12:15 PM",
    title: "Luck with Machines",
    venue: "Auditorium",
    type: "Competition",
    club: "AOEE",
    description: "Probability and machine learning challenge"
  },
  {
    id: 11,
    time: "8:45 AM - 12:15 PM",
    title: "Fizz Quiz",
    venue: "Auditorium",
    type: "Competition",
    club: "IEI",
    description: "Technical quiz competition"
  },
  {
    id: 12,
    time: "8:45 AM - 12:15 PM",
    title: "Hydro Purity Quest",
    venue: "Auditorium",
    type: "Competition",
    club: "AiCHE",
    description: "Chemical engineering challenge"
  },
  {
    id: 13,
    time: "8:45 AM - 12:15 PM",
    title: "Blood Grouping",
    venue: "Bio Lab",
    type: "Workshop",
    club: "Chimera",
    description: "Hands-on biology workshop"
  },
  {
    id: 14,
    time: "TBD",
    title: "Satellite Tracking",
    venue: "Ground Station",
    type: "Demonstration",
    club: "Mahasat",
    description: "Live satellite tracking demonstration"
  },
  {
    id: 15,
    time: "10:00 AM - 11:00 AM",
    title: "Space Docking",
    venue: "Ground Station",
    type: "Simulation",
    club: "Supernova",
    description: "Spacecraft docking simulation"
  },
  {
    id: 16,
    time: "9:00 AM - 11:30 AM",
    title: "No-Code Triwizard Hackathon",
    venue: "Lab 332",
    type: "Hackathon",
    club: "MTC",
    description: "No-code development competition"
  },
  {
    id: 17,
    time: "9:00 AM - 10:30 AM",
    title: "Escape The Matrix - CTF",
    venue: "Lab 333",
    type: "Competition",
    club: "ACM",
    description: "Capture the flag cybersecurity challenge"
  },
  // Closing Ceremony
  {
    id: 18,
    time: "12:15 PM - 12:20 PM",
    title: "Welcome & Opening Remarks",
    venue: "Auditorium",
    type: "Ceremony",
    description: "Introduction to closing ceremony"
  },
  {
    id: 19,
    time: "12:20 PM - 12:30 PM",
    title: "Prize Distribution to Winners",
    venue: "Auditorium",
    type: "Ceremony",
    description: "Award ceremony for competition winners"
  },
  {
    id: 20,
    time: "12:30 PM - 12:40 PM",
    title: "Felicitation of Sponsors & Guests",
    venue: "Auditorium",
    type: "Ceremony",
    description: "Acknowledgement of sponsors and special guests"
  },
  {
    id: 21,
    time: "12:40 PM - 12:50 PM",
    title: "Volunteer Acknowledgements",
    venue: "Auditorium",
    type: "Ceremony",
    description: "Recognizing the organizing team and volunteers"
  },
  {
    id: 22,
    time: "12:50 PM - 12:55 PM",
    title: "Vote of Thanks",
    venue: "Auditorium",
    type: "Ceremony",
    description: "Closing remarks and thanks"
  },
  {
    id: 23,
    time: "12:55 PM - 1:00 PM",
    title: "Group Photo & Closing Notes",
    venue: "Auditorium",
    type: "Ceremony",
    description: "Final group photo and event conclusion"
  }
];

// Event types for filtering
const eventTypes = ["All", "Ceremony", "Keynote", "Competition", "Workshop", "Hackathon", "Demonstration", "Simulation", "Registration"];

const Agenda = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [bookmarkedEvents, setBookmarkedEvents] = useState<number[]>([]);

  // Toggle bookmark status
  const toggleBookmark = (eventId: number) => {
    if (bookmarkedEvents.includes(eventId)) {
      setBookmarkedEvents(bookmarkedEvents.filter(id => id !== eventId));
    } else {
      setBookmarkedEvents([...bookmarkedEvents, eventId]);
    }
  };

  // Filter events based on selected type
  const filterEvents = () => {
    if (selectedType === "All") return agenda;
    return agenda.filter(event => event.type === selectedType);
  };

  const filteredEvents = filterEvents();

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="scanline fixed top-0 left-0 pointer-events-none"></div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">
          <span className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">AGENDA</span>
        </h1>
        <p className="text-lg text-center mb-8 max-w-2xl mx-auto">
          BITS Tech Fest 2025 - April 30th Timetable. Plan your day and don't miss the exciting events.
        </p>
        
        {/* Filter and Download Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 glass-card p-4">
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-neon-purple" />
            <select 
              className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {eventTypes.map(type => (
                <option key={type} value={type} className="bg-black text-white">{type}</option>
              ))}
            </select>
          </div>
          
          <Button className="flex items-center gap-2">
            <Download size={16} />
            Download Full Schedule
          </Button>
        </div>
        
        {/* Agenda Items */}
        <div className="space-y-4">
          {filteredEvents.map(event => (
            <div 
              key={event.id} 
              className="glass-card p-4 md:p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="md:w-1/4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-neon-blue" />
                    <span className="text-white font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-neon-green" />
                    <span className="text-white/70">{event.venue}</span>
                  </div>
                </div>
                
                <div className="md:w-3/4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">{event.title}</h3>
                      {event.club && (
                        <p className="text-neon-purple mb-2">Organized by: {event.club}</p>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`ml-2 ${bookmarkedEvents.includes(event.id) ? 'text-neon-orange' : 'text-white/50'}`}
                      onClick={() => toggleBookmark(event.id)}
                    >
                      <BookmarkPlus size={18} />
                    </Button>
                  </div>
                  
                  <p className="text-white/70 mt-2">{event.description}</p>
                  
                  <div className="mt-3 flex gap-2">
                    <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full">
                      {event.type}
                    </span>
                    {event.club && (
                      <span className="inline-block px-3 py-1 bg-neon-purple/20 text-neon-purple text-xs rounded-full">
                        {event.club}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-white/60">No events match your filter criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4 border-white/20 hover:bg-white/5"
                onClick={() => setSelectedType("All")}
              >
                Reset Filter
              </Button>
            </div>
          )}
        </div>
        
        {/* My Schedule Section */}
        {bookmarkedEvents.length > 0 && (
          <div className="mt-12 glass-card p-6">
            <h2 className="text-2xl font-bold mb-6">My Schedule</h2>
            
            <div className="space-y-4">
              {agenda
                .filter(event => bookmarkedEvents.includes(event.id))
                .sort((a, b) => {
                  // Extract start times for comparison (assuming format "HH:MM AM/PM")
                  const timeA = a.time.split(' - ')[0];
                  const timeB = b.time.split(' - ')[0];
                  return timeA.localeCompare(timeB);
                })
                .map(event => (
                  <div key={event.id} className="bg-white/5 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-white/70 mb-1">
                          <Clock size={14} />
                          <span>{event.time}</span>
                          <MapPin size={14} className="ml-2" />
                          <span>{event.venue}</span>
                        </div>
                        <h4 className="font-semibold">{event.title}</h4>
                        {event.club && (
                          <p className="text-sm text-neon-purple">By {event.club}</p>
                        )}
                        <p className="text-sm text-white/70 mt-1">{event.description}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-neon-orange"
                        onClick={() => toggleBookmark(event.id)}
                      >
                        <BookmarkPlus size={18} />
                      </Button>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="mt-6 flex justify-center"> 
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Agenda;