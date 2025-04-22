import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Mail, User, Briefcase, GraduationCap, School, MapPin, Clock } from 'lucide-react';
import Modal from '@/components/Modal'; // Import our custom Modal component

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Actual events from the BITS Tech Fest 2025 timetable
const techFestEvents = [
  { name: "Hunter AI", time: "8:45-10:15 AM", venue: "Auditorium" },
  { name: "Research Paper Presentation", time: "8:45-10:15 AM", venue: "Auditorium" },
  { name: "Crack The Penguin", time: "8:45-10:15 AM", venue: "Auditorium" },
  { name: "Escape The Matrix", time: "9:00-10:30 AM", venue: "Lab 333" },
  { name: "Hydro Purity Quest", time: "9:30-11:00 AM", venue: "Auditorium" },
  { name: "Blood Grouping", time: "9:30-12:00 PM", venue: "Auditorium" },
  { name: "Space Docking", time: "10:00-11:00 AM", venue: "Ground Station" },
  { name: "Clue Connect", time: "10:15-11:45 AM", venue: "Auditorium" },
  { name: "STEM-Grid Challenge", time: "10:15-11:45 AM", venue: "Auditorium" },
  { name: "Debate Competition", time: "10:30-11:30 AM", venue: "Auditorium" },
  { name: "Fizz Quiz", time: "11:00-12:00 PM", venue: "Auditorium" },
  { name: "No-Code Triwizard Hackathon", time: "10:45-12:15 PM", venue: "Lab 333" },
  { name: "Decrypting Challenge", time: "11:45-12:15 PM", venue: "Auditorium" },
  { name: "Tech Taboo", time: "11:45-12:15 PM", venue: "Auditorium" },
  { name: "Marshmallow Tower Challenge", time: "8:45-12:00 PM", venue: "Auditorium" },
  { name: "Satellite Tracking", time: "TBA (Announced Live)", venue: "Ground Station" }
];

// Sort events by start time
const sortedEvents = [...techFestEvents].sort((a, b) => {
  // Handle TBA case
  if (a.time.includes("TBA")) return 1;
  if (b.time.includes("TBA")) return -1;
  
  // Extract start time
  const aStartTime = a.time.split("-")[0];
  const bStartTime = b.time.split("-")[0];
  
  // Convert to comparable format
  const aHour = parseInt(aStartTime.split(":")[0]);
  const bHour = parseInt(bStartTime.split(":")[0]);
  
  if (aHour !== bHour) return aHour - bHour;
  
  // If hours are equal, compare minutes
  const aMinute = parseInt(aStartTime.split(":")[1]);
  const bMinute = parseInt(bStartTime.split(":")[1]);
  
  return aMinute - bMinute;
});

const Registration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    affiliationType: '', // 'university' or 'school' (removed 'company')
    institutionName: '',
    role: '',
    interestedEvents: [] as string[],
    agreeTerms: false,
    registrationId: ""
  });
  
  // Modal state
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleAffiliationChange = (type: string) => {
    setFormData(prev => ({ 
      ...prev, 
      affiliationType: prev.affiliationType === type ? '' : type,
      institutionName: prev.affiliationType === type ? '' : prev.institutionName
    }));
  };

  const handleEventToggle = (event: string) => {
    const currentEvents = [...formData.interestedEvents];
  
    if (currentEvents.includes(event)) {
      setFormData(prev => ({
        ...prev,
        interestedEvents: prev.interestedEvents.filter(e => e !== event)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interestedEvents: [...prev.interestedEvents, event]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
    setIsSubmitting(true);
    
    try {
      // Send data to backend
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Set error message from backend
        setError(data.message || 'Registration failed. Please try again.');
        return;
      }
      
      // Store the registration ID from the backend
      setFormData(prev => ({
        ...prev,
        registrationId: data.registrationId
      }));
      
      // Move to thank you page
      setStep(3);
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="scanline fixed top-0 left-0 pointer-events-none"></div>
    
      <Navbar />
    
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">
          REGISTRATION
        </h1>
        <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
          Register for BITS Tech Fest 2025 and be part of the cosmic intelligence revolution.
        </p>
        
        {/* Registration steps progress bar */}
        {step < 3 && (
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex justify-between mb-2">
              <span className={step >= 1 ? "text-neon-purple" : "text-white/50"}>Personal Details</span>
              <span className={step >= 2 ? "text-neon-purple" : "text-white/50"}>Event Selection</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-neon-purple h-full transition-all duration-500"
                style={{ width: `${(step / 2) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      
        <div className="max-w-3xl mx-auto">
          {step === 1 && (
            <div className="glass-card animation-fade-in p-6">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <Label htmlFor="firstName" className="text-white mb-2 block">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        className="pl-10 bg-white/5 border-white/10"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                
                  <div>
                    <Label htmlFor="lastName" className="text-white mb-2 block">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        className="pl-10 bg-white/5 border-white/10"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        className="pl-10 bg-white/5 border-white/10"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                
                  <div>
                    <Label htmlFor="phone" className="text-white mb-2 block">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+971 50 123 4567"
                      className="bg-white/5 border-white/10"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              
                <div className="mb-6">
                  <Label className="text-white mb-3 block">Affiliation</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="universityCheckbox" 
                        checked={formData.affiliationType === 'university'}
                        onCheckedChange={() => handleAffiliationChange('university')}
                      />
                      <Label htmlFor="universityCheckbox" className="text-white">University</Label>
                    </div>
                  
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="schoolCheckbox" 
                        checked={formData.affiliationType === 'school'}
                        onCheckedChange={() => handleAffiliationChange('school')}
                      />
                      <Label htmlFor="schoolCheckbox" className="text-white">School</Label>
                    </div>
                  </div>
                </div>
              
                {formData.affiliationType && (
                  <div className="mb-6">
                    <Label htmlFor="institutionName" className="text-white mb-2 block">
                      {formData.affiliationType === 'university' ? 'University Name' : 'School Name'}
                    </Label>
                    <div className="relative">
                      {formData.affiliationType === 'university' && 
                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />}
                      {formData.affiliationType === 'school' && 
                        <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />}
                      <Input
                        id="institutionName"
                        name="institutionName"
                        placeholder={
                          formData.affiliationType === 'university' ? 'Enter university name' : 'Enter school name'
                        }
                        className="pl-10 bg-white/5 border-white/10"
                        value={formData.institutionName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                )}
              
                {formData.affiliationType && (
                  <div className="mb-6">
                    <Label htmlFor="role" className="text-white mb-2 block">
                      {formData.affiliationType === 'university' ? 'Student Level / Year' : 'Student Level / Year'}
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      placeholder={
                        formData.affiliationType === 'university' ? 'Undergraduate, Year 2' : 'Grade 10'
                      }
                      className="bg-white/5 border-white/10"
                      value={formData.role}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    className="neon-button"
                    onClick={nextStep}
                  >
                    Next Step
                  </Button>
                </div>
              </form>
            </div>
          )}
        
          {step === 2 && (
            <div className="glass-card animation-fade-in p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Which events would you like to attend?</h3>
                  <p className="text-white/70 mb-4">All events take place on April 30, 2025. Select the events you're interested in attending:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sortedEvents.map(event => (
                      <div key={event.name} className="flex items-start p-4 bg-white/5 rounded-md hover:bg-white/10 transition-colors">
                        <Checkbox 
                          id={event.name.replace(/\s+/g, '')} 
                          checked={formData.interestedEvents.includes(event.name)}
                          onCheckedChange={() => handleEventToggle(event.name)}
                          className="mt-1"
                        />
                        <div className="ml-3 flex-1">
                          <Label htmlFor={event.name.replace(/\s+/g, '')} className="text-white font-medium block">{event.name}</Label>
                          <div className="text-white/60 text-sm mt-1">
                            <div className="flex items-center gap-1">
                              <Clock size={12} className="text-neon-blue" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              
                <div className="mb-8">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="agreeTerms" 
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleCheckboxChange('agreeTerms', checked as boolean)}
                      required
                    />
                    <Label htmlFor="agreeTerms" className="text-white text-sm">
                      I agree to the BITS Tech Fest{' '}
                      <a 
                        href="#" 
                        className="text-neon-purple hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          setTermsModalOpen(true);
                        }}
                      >
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a 
                        href="#" 
                        className="text-neon-purple hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          setPrivacyModalOpen(true);
                        }}
                      >
                        Privacy Policy
                      </a>
                      . I consent to receiving communications about this event.
                    </Label>
                  </div>
                </div>
              
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-white/20 hover:bg-white/5"
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                
                  <Button 
                    type="submit" 
                    className="neon-button"
                    disabled={!formData.agreeTerms || isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Registration'}
                  </Button>
                </div>
              </form>
            </div>
          )}
        
          {step === 3 && (
            <div className="glass-card animation-fade-in text-center p-8">
              <div className="mb-6 text-neon-purple">
                <Calendar size={64} className="mx-auto" />
              </div>
            
              <h2 className="text-2xl font-bold mb-4">Registration Complete!</h2>
            
              <p className="text-white/80 mb-6">
                Thank you for registering for BITS Tech Fest 2025!
              </p>
              {error && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-md text-red-300">
                {error}
              </div>
              )}

            
              <div className="mb-8 p-6 bg-white/5 rounded-lg inline-block">
                <p className="text-lg font-semibold mb-2">April 30, 2025</p>
                <p className="text-white/70">BITS Pilani Dubai Campus</p>
                <p className="text-white/70 mb-4">Dubai, UAE</p>
                <p className="text-sm">Your registration ID: <span className="text-neon-green">
                  {formData.registrationId || 'BTF25-000000'}
                </span></p>
              </div>
            
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild variant="outline" className="border-white/20 hover:bg-white/5">
                  <a href="/">Return to Homepage</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    
      {/* Terms & Conditions Modal */}
      <Modal 
        isOpen={termsModalOpen} 
        onClose={() => setTermsModalOpen(false)} 
        title="Terms & Conditions"
      >
        <div className="space-y-4 text-white/80">
          <ol className="list-decimal pl-5 space-y-2">
            <li>The participants can refer to the rule book for individual events and follow the same.</li>
            <li>The participants shall observe all the safety precautions.</li>
          </ol>
        </div>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal 
        isOpen={privacyModalOpen} 
        onClose={() => setPrivacyModalOpen(false)} 
        title="Privacy Policy"
      >
        <div className="space-y-4 text-white/80">
          <ol className="list-decimal pl-5 space-y-2">
            <li>The registration details will be used only for BTF 2025 Competition purposes and kept confidential.</li>
          </ol>
        </div>
      </Modal>
    
      <Footer />
    </div>
  );
};

export default Registration;
