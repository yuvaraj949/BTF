import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Download, BookmarkPlus, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import '../styles/gradients.css';

const agenda = [
  // May 9th - Pre-hackathon
  {
    id: 1,
    time: "3:00 PM - 5:00 PM",
    title: "Technical Workshops",
    venue: "Main Hall",
    type: "Workshop",
    description: "Hands-on workshops to prepare participants for the hackathon",
    day: "May 9th"
  },
  {
    id: 2,
    time: "5:00 PM - 5:30 PM",
    title: "Judges Reveal and Keynotes",
    venue: "Auditorium",
    type: "Keynote",
    description: "Introduction of the judging panel and inspirational keynote speeches",
    day: "May 9th"
  },
  {
    id: 3,
    time: "5:30 PM - 6:00 PM",
    title: "Theme Release",
    venue: "Auditorium",
    type: "Ceremony",
    description: "Official announcement of the hackathon theme and problem statements",
    day: "May 9th"
  },
  
  // May 10th - Hackathon Day
  {
    id: 4,
    time: "8:00 AM - 8:30 AM",
    title: "Registration",
    venue: "Main Lobby",
    type: "Registration",
    description: "Check-in and collect your hackathon materials",
    day: "May 10th"
  },
  {
    id: 5,
    time: "8:30 AM - 8:45 AM",
    title: "Inauguration Ceremony",
    venue: "Auditorium",
    type: "Ceremony",
    description: "Official opening of the hackathon event",
    day: "May 10th"
  },
  {
    id: 6,
    time: "9:00 AM - 4:00 PM",
    title: "Hacking Period",
    venue: "Hackathon Floor",
    type: "Hackathon",
    description: "Main coding and development session for all teams",
    day: "May 10th"
  },
  {
    id: 7,
    time: "12:00 PM - 1:00 PM",
    title: "Lunch Break",
    venue: "Cafeteria",
    type: "Break",
    description: "Refreshment break for participants",
    day: "May 10th"
  },
  {
    id: 8,
    time: "3:30 PM - 4:00 PM",
    title: "Stalls Setup",
    venue: "Exhibition Area",
    type: "Preparation",
    description: "Clubs and Associations at BPDC set up their stalls for the exhibition",
    day: "May 10th"
  },
  {
    id: 9,
    time: "4:00 PM - 4:30 PM",
    title: "Submission Deadline",
    venue: "Hackathon Floor",
    type: "Deadline",
    description: "Final code submission and preparation for presentations",
    day: "May 10th"
  },
  {
    id: 10,
    time: "4:30 PM - 6:30 PM",
    title: "Project Pitching & Stall Interaction",
    venue: "Exhibition Area",
    type: "Presentation",
    description: "Teams present their solutions to the judges and interact with the stalls hosted by the clubs at BPDC",
    day: "May 10th"
  },
  {
    id: 11,
    time: "6:30 PM - 7:00 PM",
    title: "Closing Ceremony & Awards",
    venue: "Auditorium",
    type: "Ceremony",
    description: "Announcement of winners and closing remarks",
    day: "May 10th"
  }
];

// Event types for filtering
const eventTypes = ["All", "Ceremony", "Keynote", "Workshop", "Hackathon", "Presentation", "Registration", "Break", "Preparation", "Deadline"];

// Days for tab navigation
const days = ["All Days", "May 9th", "May 10th"];

const Agenda = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDay, setSelectedDay] = useState("All Days");
  const [bookmarkedEvents, setBookmarkedEvents] = useState<number[]>([]);

  // Toggle bookmark status
  const toggleBookmark = (eventId: number) => {
    if (bookmarkedEvents.includes(eventId)) {
      setBookmarkedEvents(bookmarkedEvents.filter(id => id !== eventId));
    } else {
      setBookmarkedEvents([...bookmarkedEvents, eventId]);
    }
  };

  // Filter events based on selected type and day
  const filterEvents = () => {
    let filtered = agenda;
    
    if (selectedType !== "All") {
      filtered = filtered.filter(event => event.type === selectedType);
    }
    
    if (selectedDay !== "All Days") {
      filtered = filtered.filter(event => event.day === selectedDay);
    }
    
    return filtered;
  };

  const filteredEvents = filterEvents();

  // Group events by day for display
  const groupEventsByDay = (events: typeof agenda) => {
    const grouped: Record<string, typeof agenda> = {};
    
    events.forEach(event => {
      if (!grouped[event.day]) {
        grouped[event.day] = [];
      }
      grouped[event.day].push(event);
    });
    
    return grouped;
  };

  const groupedEvents = groupEventsByDay(filteredEvents);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="scanline fixed top-0 left-0 pointer-events-none"></div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">
          <span className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">AGENDA</span>
        </h1>
        <p className="text-lg text-center mb-8 max-w-2xl mx-auto">
          Hackathon 2025 - May 9th & 10th Schedule. Plan your participation and don't miss any important sessions.
        </p>
        
        {/* Day Tabs */}
        <div className="mb-6">
          <Tabs defaultValue="All Days" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 w-full">
              {days.map(day => (
                <TabsTrigger 
                  key={day} 
                  value={day}
                  onClick={() => setSelectedDay(day)}
                  className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple"
                >
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
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
        </div>
        
        {/* Agenda Items Grouped by Day */}
        <div className="space-y-8">
          {Object.keys(groupedEvents).length > 0 ? (
            Object.entries(groupedEvents).map(([day, events]) => (
              <div key={day} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 gradient-text">{day}</h2>
                <div className="space-y-4">
                  {events.map(event => (
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
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-white/60">No events match your filter criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4 border-white/20 hover:bg-white/5"
                onClick={() => {
                  setSelectedType("All");
                  setSelectedDay("All Days");
                }}
              >
                Reset Filters
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
                  // First sort by day
                  if (a.day !== b.day) {
                    return a.day === "May 9th" ? -1 : 1;
                  }
                  // Then sort by time
                  const timeA = a.time.split(' - ')[0];
                  const timeB = b.time.split(' - ')[0];
                  return timeA.localeCompare(timeB);
                })
                .map(event => (
                  <div key={event.id} className="bg-white/5 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-white/70 mb-1">
                          <Calendar size={14} />
                          <span className="text-neon-purple">{event.day}</span>
                          <Clock size={14} className="ml-2" />
                          <span>{event.time}</span>
                          <MapPin size={14} className="ml-2" />
                          <span>{event.venue}</span>
                        </div>
                        <h4 className="font-semibold">{event.title}</h4>
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
