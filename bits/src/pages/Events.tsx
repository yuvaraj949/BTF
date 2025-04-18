import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Calendar, Users, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import '../styles/gradients.css';
import { Link } from 'react-router-dom';

// Updated event data for April 30th (single day event)
const events = [
  {
    id: 1,
    title: "Crack The Penguin",
    club: "LUG",
    date: "April 30, 2025",
    time: "8:45 AM - 12:15 PM",
    venue: "Auditorium",
    description: "Linux-based technical challenge for enthusiasts",
    type: "Competition"
  },
  {
    id: 2,
    title: "Clue Connect",
    club: "WIE",
    date: "April 30, 2025",
    time: "8:45 AM - 12:15 PM",
    venue: "Auditorium",
    description: "Technical puzzle-solving competition",
    type: "Competition"
  },
  {
    id: 3,
    title: "STEM-Grid Challenge",
    club: "SWE",
    date: "April 30, 2025",
    time: "8:45 AM - 12:15 PM",
    venue: "Auditorium",
    description: "Engineering design challenge",
    type: "Competition"
  },
  {
    id: 4,
    title: "Decrypting Challenge",
    club: "Oh-Crop",
    date: "April 30, 2025",
    time: "8:45 AM - 12:15 PM",
    venue: "Auditorium",
    description: "Cryptography and security challenge",
    type: "Competition"
  },
  {
    id: 5,
    title: "Tech Taboo",
    club: "ACM-W",
    date: "April 30, 2025",
    time: "8:45 AM - 12:15 PM",
    venue: "Auditorium",
    description: "Technical communication game",
    type: "Competition"
  },
  {
    id: 6,
    title: "Marshmallow Tower Challenge",
    club: "Skyline",
    date: "April 30, 2025",
    time: "8:45 AM - 12:15 PM",
    venue: "Auditorium",
    description: "Creative engineering challenge",
    type: "Workshop"
  },
  {
    id: 7,
    title: "Luck with Machines",
    club: "AOEE",
    date: "April 30, 2025",
    time: "8:45 AM - 12:15 PM",
    venue: "Auditorium",
    description: "Probability and machine learning activity",
    type: "Workshop"
  },
  {
    id: 8,
    title: "Fizz Quiz",
    club: "IEI",
    date: "April 30, 2025",
    time: "8:45 AM - 12:15 PM",
    venue: "Auditorium",
    description: "Technical quiz competition",
    type: "Competition"
  },
  {
    id: 9,
    title: "Hydro Purity Quest",
    club: "AiCHE",
    date: "April 30, 2025",
    time: "8:45 AM - 12:15 PM",
    venue: "Auditorium",
    description: "Chemical engineering challenge",
    type: "Competition"
  },
  {
    id: 10,
    title: "Blood Grouping",
    club: "Chimera",
    date: "April 30, 2025",
    time: "8:45 AM - 12:15 PM",
    venue: "Bio Lab",
    description: "Hands-on biology activity",
    type: "Workshop"
  },
  {
    id: 11,
    title: "Space Docking",
    club: "Supernova",
    date: "April 30, 2025",
    time: "10:00 AM - 11:00 AM",
    venue: "Ground Station",
    description: "Space technology demonstration",
    type: "Workshop"
  },
  {
    id: 12,
    title: "No-Code Triwizard Hackathon",
    club: "MTC",
    date: "April 30, 2025",
    time: "9:00 AM - 11:30 AM",
    venue: "Lab 332",
    description: "No-code development challenge",
    type: "Hackathon"
  },
  {
    id: 13,
    title: "Escape The Matrix - CTF",
    club: "ACM",
    date: "April 30, 2025",
    time: "9:00 AM - 10:30 AM",
    venue: "Lab 333",
    description: "Capture the flag cybersecurity challenge",
    type: "Competition"
  }
];

// Event types for filtering
const eventTypes = ["All", "Hackathon", "Workshop", "Competition"];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // Filter events based on search term and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.club.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "All" || event.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="scanline fixed top-0 left-0 pointer-events-none"></div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">
          <span className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">CLUB EVENTS</span>
        </h1>
        <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
          Discover the exciting lineup of parallel sessions happening on April 30, 2025 from 8:45 AM to 12:15 PM.
        </p>
        
        {/* Search and Filter Section */}
        <div className="mb-12 glass-card p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
              <Input
                placeholder="Search events, clubs or keywords..."
                className="pl-10 bg-white/5 border-white/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
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
          </div>
        </div>
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <Card key={event.id} className="glass-card transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] overflow-hidden group h-full flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-white">{event.title}</CardTitle>
                  <CardDescription className="text-white/70">{event.club}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Calendar size={14} className="text-neon-blue" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <MapPin size={14} className="text-neon-green" />
                    <span>{event.venue}</span>
                  </div>
                  
                  <p className="text-white/80 text-sm line-clamp-3">{event.description}</p>
                </CardContent>
                
                <CardFooter className="pt-0">
                <Button asChild className="w-full neon-button text-sm py-1 h-8">
                  <Link to="/registration">Register Now</Link>
                </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-white/70">No events match your search criteria</p>
              <Button 
                variant="outline" 
                className="mt-4 border-white/20 hover:bg-white/5"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;