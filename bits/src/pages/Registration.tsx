import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from 'lucide-react';
import Modal from '@/components/Modal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const emptyMember = {
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '+971',
  phoneNumber: '',
  college: '',
  educationLevel: 'UG',
};

const Registration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  // Team leader and team name
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState([{ ...emptyMember }]);
  const [teamSize, setTeamSize] = useState(1);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [registrationId, setRegistrationId] = useState('');

  // Modal state
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Handle input for team name and member fields
  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const handleMemberChange = (idx: number, field: string, value: string) => {
    setMembers(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  // Handle team size change
  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(e.target.value, 10);
    setTeamSize(size);
    setMembers(prev => {
      const arr = [...prev];
      while (arr.length < size) arr.push({ ...emptyMember });
      return arr.slice(0, size);
    });
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName,
          members,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Registration failed. Please try again.');
        return;
      }
      setRegistrationId(data.registrationId);
      setStep(3);
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Registration error:', err);
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
          HACKATHON TEAM REGISTRATION
        </h1>
        <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
          Register your team for the BITS Hackathon 2025. Team size: 1–5 members.
        </p>
        {step < 3 && (
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex justify-between mb-2">
              <span className={step >= 1 ? "text-neon-purple" : "text-white/50"}>Team Leader & Team</span>
              <span className={step >= 2 ? "text-neon-purple" : "text-white/50"}>Team Members</span>
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
                <div className="mb-6">
                  <Label htmlFor="teamName" className="text-white mb-2 block">Team Name</Label>
                  <Input
                    id="teamName"
                    name="teamName"
                    placeholder="Enter your team name"
                    className="bg-white/5 border-white/10"
                    value={teamName}
                    onChange={handleTeamNameChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <Label className="text-white mb-2 block">Number of Team Members (including you)</Label>
                  <select
                    className="bg-black border-white/10 px-3 py-2 rounded w-full"
                    value={teamSize}
                    onChange={handleTeamSizeChange}
                  >
                    {[1,2,3,4,5].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Team Leader Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="leaderFirstName" className="text-white mb-2 block">First Name</Label>
                      <Input
                        id="leaderFirstName"
                        name="leaderFirstName"
                        placeholder="John"
                        className="bg-white/5 border-white/10"
                        value={members[0].firstName}
                        onChange={e => handleMemberChange(0, 'firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="leaderLastName" className="text-white mb-2 block">Last Name</Label>
                      <Input
                        id="leaderLastName"
                        name="leaderLastName"
                        placeholder="Doe"
                        className="bg-white/5 border-white/10"
                        value={members[0].lastName}
                        onChange={e => handleMemberChange(0, 'lastName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="leaderEmail" className="text-white mb-2 block">Email</Label>
                      <Input
                        id="leaderEmail"
                        name="leaderEmail"
                        type="email"
                        placeholder="john.doe@example.com"
                        className="bg-white/5 border-white/10"
                        value={members[0].email}
                        onChange={e => handleMemberChange(0, 'email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="leaderCountryCode" className="text-white mb-2 block">Country Code</Label>
                      <Input
                        id="leaderCountryCode"
                        name="leaderCountryCode"
                        placeholder="+971"
                        className="bg-white/5 border-white/10"
                        value={members[0].countryCode}
                        onChange={e => handleMemberChange(0, 'countryCode', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="leaderPhoneNumber" className="text-white mb-2 block">Phone Number</Label>
                      <Input
                        id="leaderPhoneNumber"
                        name="leaderPhoneNumber"
                        placeholder="501234567"
                        className="bg-white/5 border-white/10"
                        value={members[0].phoneNumber}
                        onChange={e => handleMemberChange(0, 'phoneNumber', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="leaderCollege" className="text-white mb-2 block">College/University Name</Label>
                      <Input
                        id="leaderCollege"
                        name="leaderCollege"
                        placeholder="BITS Pilani"
                        className="bg-white/5 border-white/10"
                        value={members[0].college}
                        onChange={e => handleMemberChange(0, 'college', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="leaderEducationLevel" className="text-white mb-2 block">Education Level</Label>
                      <select
                        id="leaderEducationLevel"
                        name="leaderEducationLevel"
                        className="bg-black border-white/10 px-3 py-2 rounded w-full"
                        value={members[0].educationLevel}
                        onChange={e => handleMemberChange(0, 'educationLevel', e.target.value)}
                        required
                      >
                        <option value="UG">UG</option>
                        <option value="PG">PG</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>
                  </div>
                </div>
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
                {[...Array(teamSize - 1)].map((_, idx) => (
                  <div key={idx + 1} className="mb-8">
                    <h3 className="text-lg font-semibold mb-2">{`Team Member ${idx + 2} Details`}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-white mb-2 block">First Name</Label>
                        <Input
                          placeholder="First Name"
                          className="bg-white/5 border-white/10"
                          value={members[idx + 1]?.firstName || ''}
                          onChange={e => handleMemberChange(idx + 1, 'firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">Last Name</Label>
                        <Input
                          placeholder="Last Name"
                          className="bg-white/5 border-white/10"
                          value={members[idx + 1]?.lastName || ''}
                          onChange={e => handleMemberChange(idx + 1, 'lastName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">Email</Label>
                        <Input
                          type="email"
                          placeholder="Email"
                          className="bg-white/5 border-white/10"
                          value={members[idx + 1]?.email || ''}
                          onChange={e => handleMemberChange(idx + 1, 'email', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">Country Code</Label>
                        <Input
                          placeholder="+971"
                          className="bg-white/5 border-white/10"
                          value={members[idx + 1]?.countryCode || ''}
                          onChange={e => handleMemberChange(idx + 1, 'countryCode', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">Phone Number</Label>
                        <Input
                          placeholder="501234567"
                          className="bg-white/5 border-white/10"
                          value={members[idx + 1]?.phoneNumber || ''}
                          onChange={e => handleMemberChange(idx + 1, 'phoneNumber', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">College/University Name</Label>
                        <Input
                          placeholder="BITS Pilani"
                          className="bg-white/5 border-white/10"
                          value={members[idx + 1]?.college || ''}
                          onChange={e => handleMemberChange(idx + 1, 'college', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">Education Level</Label>
                        <select
                          className="bg-white/5 border-white/10 px-3 py-2 rounded w-full"
                          value={members[idx + 1]?.educationLevel || 'UG'}
                          onChange={e => handleMemberChange(idx + 1, 'educationLevel', e.target.value)}
                          required
                        >
                          <option value="UG">UG</option>
                          <option value="PG">PG</option>
                          <option value="PhD">PhD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mb-8">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={agreeTerms}
                      onCheckedChange={checked => setAgreeTerms(!!checked)}
                      required
                    />
                    <Label htmlFor="agreeTerms" className="text-white text-sm">
                      I agree to the Hackathon{' '}
                      <a
                        href="#"
                        className="text-neon-purple hover:underline"
                        onClick={e => {
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
                        onClick={e => {
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
                    disabled={!agreeTerms || isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Registration'}
                  </Button>
                </div>
                {error && (
                  <div className="mt-4 p-3 bg-red-900/30 border border-red-500 rounded-md text-red-300">
                    {error}
                  </div>
                )}
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
                Thank you for registering your team for the BITS Hackathon 2025!
              </p>
              {error && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-md text-red-300">
                  {error}
                </div>
              )}
              <div className="mb-8 p-6 bg-white/5 rounded-lg inline-block">
                <p className="text-lg font-semibold mb-2">May 10, 2025</p>
                <p className="text-white/70">BITS Pilani Dubai Campus</p>
                <p className="text-white/70 mb-4">Dubai, UAE</p>
                <p className="text-sm">Your registration ID: <span className="text-neon-green">
                  {registrationId || 'BTF25-000000'}
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
      <Modal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="Terms & Conditions"
      >
        <div className="space-y-4 text-white/80">
          <ol className="list-decimal pl-5 space-y-2">
            <li>Teams must abide by all hackathon rules and guidelines.</li>
            <li>All information provided must be accurate.</li>
          </ol>
        </div>
      </Modal>
      <Modal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        title="Privacy Policy"
      >
        <div className="space-y-4 text-white/80">
          <ol className="list-decimal pl-5 space-y-2">
            <li>Registration details will be used only for hackathon purposes and kept confidential.</li>
          </ol>
        </div>
      </Modal>
      <Footer />
    </div>
  );

  /*
  // Registrations Closed message (restore this to close registrations again)
  // <div className="bg-black text-white min-h-screen flex flex-col">
  //   <div className="scanline fixed top-0 left-0 pointer-events-none"></div>
  //   <Navbar />
  //   <main className="container mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center">
  //     <div className="max-w-lg w-full flex flex-col items-center">
  //       <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">
  //         HACKATHON TEAM REGISTRATION
  //       </h1>
  //       <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
  //         Register your team for the BITS Hackathon 2025. Team size: 1–5 members.
  //       </p>
  //       <div className="glass-card animation-fade-in p-8 rounded-xl shadow-xl w-full flex flex-col items-center">
  //         <span className="text-2xl font-semibold mb-2 text-neon-purple">Sorry!</span>
  //         <p className="text-lg text-center text-white/90 mb-2">
  //           Registrations are now closed.
  //         </p>
  //         <p className="text-center text-white/60">
  //           Please check back for future events.
  //         </p>
  //       </div>
  //     </div>
  //   </main>
  //   <Footer />
  // </div>
  */
};

export default Registration;
