/**
 * Registration page
 * Provides the registration form for BITS Tech Fest.
 * Handles form validation, submission, and confirmation.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '../components/Footer';

const registrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  affiliationType: z.enum(['university', 'school', 'company'], { required_error: 'Affiliation type is required' }),
  institutionName: z.string().min(1, 'Institution name is required'),
  role: z.string().optional(),
  year: z.string().optional(),
  branch: z.string().optional(),
  class: z.string().optional(),
  interestedEvents: z.array(z.string()).optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  skills: z.string().optional(),
  experience: z.string().optional(),
  expectations: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationResponse {
  success: boolean;
  message: string;
  registrationId?: string;
}

// Add zod schema for hackathon registration
const hackathonMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  degree: z.string().min(1, 'Degree is required'),
});
const hackathonSchema = z.object({
  teamName: z.string().min(1, 'Team name is required'),
  leaderName: z.string().min(1, 'Leader name is required'),
  university: z.string().min(1, 'University is required'),
  leaderEmail: z.string().email('Invalid email'),
  leaderPhone: z.string().min(1, 'Phone is required'),
  leaderDegree: z.string().min(1, 'Degree is required'),
  teammatesCount: z.number().min(0).max(4),
  teammates: z.array(hackathonMemberSchema).max(4),
  agreeTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
});
type HackathonFormData = z.infer<typeof hackathonSchema>;

const Registration = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [registrationType, setRegistrationType] = useState<'workshop' | 'hackathon' | null>(null);
  const [hackathonSubmitting, setHackathonSubmitting] = useState(false);
  const [hackathonStatus, setHackathonStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hackathonMessage, setHackathonMessage] = useState('');
  const [hackathonTeamId, setHackathonTeamId] = useState('');

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      affiliationType: 'university',
      institutionName: '',
      role: '',
      year: '',
      branch: '',
      class: '',
      interestedEvents: [],
      github: '',
      linkedin: '',
      portfolio: '',
      skills: '',
      experience: '',
      expectations: '',
      agreeTerms: false,
    },
  });

  const hackathonForm = useForm<HackathonFormData>({
    resolver: zodResolver(hackathonSchema),
    defaultValues: {
      teamName: '',
      leaderName: '',
      university: '',
      leaderEmail: '',
      leaderPhone: '',
      leaderDegree: '',
      teammatesCount: 0,
      teammates: [],
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Clean up payload for API
    const payload: any = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      affiliationType: data.affiliationType,
      institutionName: data.institutionName,
      role: data.role || '',
      interestedEvents: data.interestedEvents || [],
      agreeTerms: data.agreeTerms,
    };
    if (data.affiliationType === 'university') {
      payload.year = data.year;
      payload.branch = data.branch;
    }
    if (data.affiliationType === 'school') {
      payload.class = data.class;
    }
    // Add optional fields
    if (data.github) payload.github = data.github;
    if (data.linkedin) payload.linkedin = data.linkedin;
    if (data.portfolio) payload.portfolio = data.portfolio;
    if (data.skills) payload.skills = data.skills;
    if (data.experience) payload.experience = data.experience;
    if (data.expectations) payload.expectations = data.expectations;

    try {
      const response = await fetch('https://btf-server-2025.vercel.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Log status and response for debugging
      console.log('API response status:', response.status);
      let result: RegistrationResponse | null = null;
      let errorText = '';
      try {
        result = await response.json();
      } catch (jsonErr) {
        errorText = await response.text();
        console.error('Failed to parse JSON:', jsonErr, 'Raw response:', errorText);
      }

      if (!response.ok) {
        setSubmitStatus('error');
        setResponseMessage(
          `Server error (${response.status}): ${result?.message || errorText || 'Unknown error.'}`
        );
        console.error('Server error:', response.status, result, errorText);
        return;
      }

      // Accept both the old and new API response formats
      const isSuccess = (result && (result.success === true || (response.status === 201 && result.registrationId && result.message && result.message.toLowerCase().includes('success'))));
      if (isSuccess) {
        setSubmitStatus('success');
        setResponseMessage(result.message);
        setRegistrationId(result.registrationId || '');
        form.reset();
        console.log('Registration API result:', result);
        // Force redirect to pass page immediately (absolute path for Vercel)
        window.location.href = `${window.location.origin}/pass/${result.registrationId}`;
      } else {
        setSubmitStatus('error');
        setResponseMessage(result?.message || 'Registration failed');
        console.error('Registration failed:', result);
      }
    } catch (error) {
      setSubmitStatus('error');
      setResponseMessage('Network error. Please try again later.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHackathonSubmit = async (data: HackathonFormData) => {
    setHackathonSubmitting(true);
    setHackathonStatus('idle');
    try {
      const response = await fetch('https://btf-server-2025.vercel.app/api/hackathon-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      let result = null;
      let errorText = '';
      try {
        result = await response.json();
      } catch (jsonErr) {
        errorText = await response.text();
      }
      if (!response.ok) {
        setHackathonStatus('error');
        setHackathonMessage(result?.message || errorText || 'Unknown error.');
        return;
      }
      if (result && result.success && result.teamId) {
        setHackathonStatus('success');
        setHackathonMessage(result.message);
        setHackathonTeamId(result.teamId);
        hackathonForm.reset();
        window.location.href = `${window.location.origin}/pass/${result.teamId}`;
      } else {
        setHackathonStatus('error');
        setHackathonMessage(result?.message || 'Registration failed');
      }
    } catch (error) {
      setHackathonStatus('error');
      setHackathonMessage('Network error. Please try again later.');
    } finally {
      setHackathonSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-gray-900">
      <main className="flex-1 flex flex-col">
        <NavigationBar />
        
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#F66200] mb-4 font-cinzel">
                Join BTF 2025
              </h1>
              <p className="text-xl text-gray-300">
                Register for the most magical tech fest of the year
              </p>
            </div>

            {/* Step 1: Ask for registration type */}
            {registrationType === null && (
              <div className="mb-8 flex flex-col items-center gap-6">
                {/* Info box */}
                <div className="w-full max-w-xl bg-[#181818] border-l-4 border-[#F66200] text-left text-gray-200 p-4 rounded shadow mb-4">
                  <div className="font-semibold text-[#F66200] mb-1">Important Information</div>
                  <ul className="list-disc pl-5 text-sm">
                    <li>If you register for <b>Engenity</b>, you can also attend the workshop and events on 12th Nov.</li>
                    <li><b>Engenity</b> is <span className="text-[#F66200] font-semibold">only for university students</span>.</li>
                    <li>The <b>workshop and events</b> are open to <span className="text-[#F66200] font-semibold">both school and university students</span>.</li>
                  </ul>
                </div>
                <div className="text-lg text-gray-200 mb-2">What do you want to register for?</div>
                <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                  <Button
                    className="w-full md:w-64 bg-[#F66200] hover:bg-orange-700 text-black font-bold py-3"
                    onClick={() => setRegistrationType('workshop')}
                  >
                    Workshop & Events (12th Nov)
                  </Button>
                  <Button
                    className="w-full md:w-64 bg-[#F66200] hover:bg-orange-700 text-black font-bold py-3"
                    onClick={() => setRegistrationType('hackathon')}
                  >
                    Hackathon Engenity (15th Nov)
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Show the appropriate form */}
            {registrationType === 'workshop' && (
              <>
                {submitStatus === 'success' && (
                  <Alert className="mb-6 border-green-500 bg-green-500/10">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-400">
                      {responseMessage}
                      {registrationId && (
                        <div className="mt-2 font-semibold">
                          Registration ID: {registrationId}
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {submitStatus === 'error' && (
                  <Alert className="mb-6 border-red-500 bg-red-500/10">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <AlertDescription className="text-red-400">
                      {responseMessage}
                    </AlertDescription>
                  </Alert>
                )}

                <Card className="bg-black/40 border-[#F66200]/20 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-[#F66200] font-cinzel">Registration Form</CardTitle>
                    <CardDescription className="text-gray-400">
                      Fill in your details to join the magical journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#F66200]">First Name *</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                    placeholder="Your first name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#F66200]">Last Name *</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                    placeholder="Your last name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#F66200]">Email *</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="email"
                                    className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                    placeholder="your.email@example.com"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#F66200]">Phone *</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                    placeholder="Your phone number"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="affiliationType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#F66200]">Affiliation Type *</FormLabel>
                                <FormControl>
                                  <select
                                    {...field}
                                    className="bg-gray-800/50 border-[#F66200]/30 text-white rounded px-3 py-2 w-full"
                                  >
                                    <option value="university">University/College</option>
                                    <option value="school">School</option>
                                    <option value="company">Company</option>
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="institutionName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#F66200]">
                                  {form.watch('affiliationType') === 'university' ? 'College Name *' : form.watch('affiliationType') === 'school' ? 'School Name *' : 'Company Name *'}
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                    placeholder={form.watch('affiliationType') === 'university' ? 'Your college name' : form.watch('affiliationType') === 'school' ? 'Your school name' : 'Your company name'}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Show year/branch for university, class for school */}
                        {form.watch('affiliationType') === 'university' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="year"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[#F66200]">Year of Study *</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                      placeholder="e.g., 2nd Year"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="branch"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[#F66200]">Branch *</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                      placeholder="e.g., Computer Science"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                        {form.watch('affiliationType') === 'school' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="class"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[#F66200]">Class *</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                      placeholder="e.g., 12th Grade"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="github"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#F66200]">GitHub</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                    placeholder="GitHub profile URL"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="linkedin"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#F66200]">LinkedIn</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                    placeholder="LinkedIn profile URL"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="portfolio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#F66200]">Portfolio</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                    placeholder="Portfolio website URL"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="skills"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#F66200]">Skills</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                  placeholder="List your technical skills..."
                                  rows={3}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#F66200]">Experience</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                  placeholder="Tell us about your projects and experience..."
                                  rows={3}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="expectations"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#F66200]">Expectations</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  className="bg-gray-800/50 border-[#F66200]/30 text-white"
                                  placeholder="What do you expect from BTF 2025?"
                                  rows={3}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="agreeTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-[#F66200]">
                                  I agree to the terms and conditions *
                                </FormLabel>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-[#F66200] hover:bg-orange-700 text-black font-bold py-3"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Registering...
                            </>
                          ) : (
                            'Register for BTF 2025'
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
                <Button className="mt-4" variant="outline" onClick={() => setRegistrationType(null)}>&larr; Back</Button>
              </>
            )}
            {registrationType === 'hackathon' && (
              <Card className="bg-black/40 border-[#F66200]/20 backdrop-blur-md mt-8">
                <CardHeader>
                  <CardTitle className="text-[#F66200] font-cinzel">Engenity Hackathon Team Registration</CardTitle>
                  <CardDescription className="text-gray-400">
                    Register your team for Engenity Hackathon (max 5 members including leader)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {hackathonStatus === 'success' && (
                    <Alert className="mb-6 border-green-500 bg-green-500/10">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertDescription className="text-green-400">
                        {hackathonMessage}
                        {hackathonTeamId && (
                          <div className="mt-2 font-semibold">Team ID: {hackathonTeamId}</div>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                  {hackathonStatus === 'error' && (
                    <Alert className="mb-6 border-red-500 bg-red-500/10">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-red-400">{hackathonMessage}</AlertDescription>
                    </Alert>
                  )}
                  <Form {...hackathonForm}>
                    <form onSubmit={hackathonForm.handleSubmit(handleHackathonSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={hackathonForm.control} name="teamName" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#F66200]">Team Name *</FormLabel>
                            <FormControl><Input {...field} className="bg-gray-800/50 border-[#F66200]/30 text-white" placeholder="Team name" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={hackathonForm.control} name="university" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#F66200]">University *</FormLabel>
                            <FormControl><Input {...field} className="bg-gray-800/50 border-[#F66200]/30 text-white" placeholder="University name" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={hackathonForm.control} name="leaderName" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#F66200]">Leader Name *</FormLabel>
                            <FormControl><Input {...field} className="bg-gray-800/50 border-[#F66200]/30 text-white" placeholder="Leader name" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={hackathonForm.control} name="leaderEmail" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#F66200]">Leader Email *</FormLabel>
                            <FormControl><Input {...field} className="bg-gray-800/50 border-[#F66200]/30 text-white" placeholder="Leader email" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={hackathonForm.control} name="leaderPhone" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#F66200]">Leader Phone *</FormLabel>
                            <FormControl><Input {...field} className="bg-gray-800/50 border-[#F66200]/30 text-white" placeholder="Leader phone" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <FormField control={hackathonForm.control} name="leaderDegree" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#F66200]">Leader Degree *</FormLabel>
                          <FormControl>
                            <select {...field} className="bg-gray-800/50 border-[#F66200]/30 text-white rounded px-3 py-2 w-full">
                              <option value="">Select degree</option>
                              <option value="BTech">BTech</option>
                              <option value="MTech">MTech</option>
                              <option value="BSc">BSc</option>
                              <option value="MSc">MSc</option>
                              <option value="PhD">PhD</option>
                              <option value="Other">Other</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={hackathonForm.control} name="teammatesCount" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#F66200]">Number of Teammates (excluding leader, max 4)</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} max={4} {...field} value={field.value} onChange={e => {
                              const val = Math.max(0, Math.min(4, Number(e.target.value)));
                              field.onChange(val);
                              // Update teammates array length
                              const arr = hackathonForm.getValues('teammates');
                              if (arr.length < val) {
                                hackathonForm.setValue('teammates', arr.concat(Array(val - arr.length).fill({ name: '', email: '', phone: '', degree: '' })));
                              } else if (arr.length > val) {
                                hackathonForm.setValue('teammates', arr.slice(0, val));
                              }
                            }} className="bg-gray-800/50 border-[#F66200]/30 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      {/* Teammate fields */}
                      {Array.from({ length: hackathonForm.watch('teammatesCount') || 0 }).map((_, idx) => (
                        <div key={idx} className="border border-[#F66200]/30 rounded-lg p-4 mb-2 bg-gray-800/30">
                          <div className="font-semibold text-[#F66200] mb-2">Teammate {idx + 1}</div>
                          {/* Row 1: Name and Email */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                            <FormField control={hackathonForm.control} name={`teammates.${idx}.name`} render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#F66200]">Name *</FormLabel>
                                <FormControl><Input {...field} className="bg-gray-800/50 border-[#F66200]/30 text-white" placeholder="Name" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={hackathonForm.control} name={`teammates.${idx}.email`} render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#F66200]">Email *</FormLabel>
                                <FormControl><Input {...field} className="bg-gray-800/50 border-[#F66200]/30 text-white" placeholder="Email" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                          {/* Row 2: Phone and Degree */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={hackathonForm.control} name={`teammates.${idx}.phone`} render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#F66200]">Phone *</FormLabel>
                                <FormControl><Input {...field} className="bg-gray-800/50 border-[#F66200]/30 text-white" placeholder="Phone" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={hackathonForm.control} name={`teammates.${idx}.degree`} render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#F66200]">Degree *</FormLabel>
                                <FormControl>
                                  <select {...field} className="bg-gray-800/50 border-[#F66200]/30 text-white rounded px-3 py-2 w-full">
                                    <option value="">Select degree</option>
                                    <option value="BTech">BTech</option>
                                    <option value="MTech">MTech</option>
                                    <option value="BSc">BSc</option>
                                    <option value="MSc">MSc</option>
                                    <option value="PhD">PhD</option>
                                    <option value="Other">Other</option>
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                        </div>
                      ))}
                      <FormField control={hackathonForm.control} name="agreeTerms" render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-[#F66200]">I agree to the terms and conditions *</FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="submit" disabled={hackathonSubmitting} className="w-full bg-[#F66200] hover:bg-orange-700 text-black font-bold py-3">
                        {hackathonSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Registering...</>) : 'Register Team for Engenity'}
                      </Button>
                    </form>
                  </Form>
                  <Button className="mt-4" variant="outline" onClick={() => setRegistrationType(null)}>&larr; Back</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Registration;
