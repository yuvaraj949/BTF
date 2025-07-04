
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Search, User, Mail, Phone, GraduationCap } from 'lucide-react';

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  branch: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  skills?: string;
  experience?: string;
  expectations?: string;
}

const RegistrationLookup = () => {
  const [registrationId, setRegistrationId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [error, setError] = useState('');

  const handleLookup = async () => {
    if (!registrationId.trim()) {
      setError('Please enter a registration ID');
      return;
    }

    setIsLoading(true);
    setError('');
    setRegistrationData(null);

    try {
      const response = await fetch(`https://btf-server-2025.vercel.app/api/registration/${registrationId}`);
      
      if (response.ok) {
        const data = await response.json();
        setRegistrationData(data);
      } else {
        setError('Registration not found or invalid ID');
      }
    } catch (error) {
      setError('Network error. Please try again later.');
      console.error('Lookup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-black/40 border-[#F66200]/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-[#F66200] font-cinzel">Registration Lookup</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your registration ID to view your details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              value={registrationId}
              onChange={(e) => setRegistrationId(e.target.value)}
              placeholder="Enter Registration ID"
              className="bg-gray-800/50 border-[#F66200]/30 text-white"
            />
            <Button 
              onClick={handleLookup}
              disabled={isLoading}
              className="bg-[#F66200] hover:bg-orange-700 text-black"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {error && (
            <Alert className="mt-4 border-red-500 bg-red-500/10">
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {registrationData && (
        <Card className="bg-black/40 border-[#F66200]/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-[#F66200] font-cinzel flex items-center">
              <User className="mr-2 h-5 w-5" />
              Registration Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-[#F66200]">
                  <User className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Name</span>
                </div>
                <p className="text-white">{registrationData.name}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-[#F66200]">
                  <Mail className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Email</span>
                </div>
                <p className="text-white">{registrationData.email}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-[#F66200]">
                  <Phone className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Phone</span>
                </div>
                <p className="text-white">{registrationData.phone}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-[#F66200]">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span className="font-semibold">College</span>
                </div>
                <p className="text-white">{registrationData.college}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="font-semibold text-[#F66200]">Year</span>
                <p className="text-white">{registrationData.year}</p>
              </div>

              <div className="space-y-2">
                <span className="font-semibold text-[#F66200]">Branch</span>
                <p className="text-white">{registrationData.branch}</p>
              </div>
            </div>

            {(registrationData.github || registrationData.linkedin || registrationData.portfolio) && (
              <div className="space-y-2">
                <span className="font-semibold text-[#F66200]">Links</span>
                <div className="space-y-1">
                  {registrationData.github && (
                    <p className="text-white">GitHub: <a href={registrationData.github} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{registrationData.github}</a></p>
                  )}
                  {registrationData.linkedin && (
                    <p className="text-white">LinkedIn: <a href={registrationData.linkedin} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{registrationData.linkedin}</a></p>
                  )}
                  {registrationData.portfolio && (
                    <p className="text-white">Portfolio: <a href={registrationData.portfolio} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{registrationData.portfolio}</a></p>
                  )}
                </div>
              </div>
            )}

            {registrationData.skills && (
              <div className="space-y-2">
                <span className="font-semibold text-[#F66200]">Skills</span>
                <p className="text-white">{registrationData.skills}</p>
              </div>
            )}

            {registrationData.experience && (
              <div className="space-y-2">
                <span className="font-semibold text-[#F66200]">Experience</span>
                <p className="text-white">{registrationData.experience}</p>
              </div>
            )}

            {registrationData.expectations && (
              <div className="space-y-2">
                <span className="font-semibold text-[#F66200]">Expectations</span>
                <p className="text-white">{registrationData.expectations}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RegistrationLookup;
