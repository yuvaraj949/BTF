
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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

const registrationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  college: z.string().min(1, 'College name is required'),
  year: z.string().min(1, 'Year of study is required'),
  branch: z.string().min(1, 'Branch is required'),
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

const Registration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');
  const [registrationId, setRegistrationId] = useState('');

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      college: '',
      year: '',
      branch: '',
      github: '',
      linkedin: '',
      portfolio: '',
      skills: '',
      experience: '',
      expectations: '',
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://btf-server-2025.vercel.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: RegistrationResponse = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setResponseMessage(result.message);
        setRegistrationId(result.registrationId || '');
        form.reset();
      } else {
        setSubmitStatus('error');
        setResponseMessage(result.message || 'Registration failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      setResponseMessage('Network error. Please try again later.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavigationBar />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-4 font-cinzel">
              Join BTF 2025
            </h1>
            <p className="text-xl text-gray-300">
              Register for the most magical tech fest of the year
            </p>
          </div>

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

          <Card className="bg-black/40 border-yellow-400/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-yellow-400 font-cinzel">Registration Form</CardTitle>
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-yellow-400">Name *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-gray-800/50 border-yellow-400/30 text-white"
                              placeholder="Your full name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-yellow-400">Email *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              className="bg-gray-800/50 border-yellow-400/30 text-white"
                              placeholder="your.email@example.com"
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-yellow-400">Phone *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-gray-800/50 border-yellow-400/30 text-white"
                              placeholder="Your phone number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="college"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-yellow-400">College *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-gray-800/50 border-yellow-400/30 text-white"
                              placeholder="Your college name"
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
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-yellow-400">Year of Study *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-gray-800/50 border-yellow-400/30 text-white"
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
                          <FormLabel className="text-yellow-400">Branch *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-gray-800/50 border-yellow-400/30 text-white"
                              placeholder="e.g., Computer Science"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-yellow-400">GitHub</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-gray-800/50 border-yellow-400/30 text-white"
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
                          <FormLabel className="text-yellow-400">LinkedIn</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-gray-800/50 border-yellow-400/30 text-white"
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
                          <FormLabel className="text-yellow-400">Portfolio</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-gray-800/50 border-yellow-400/30 text-white"
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
                        <FormLabel className="text-yellow-400">Skills</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            className="bg-gray-800/50 border-yellow-400/30 text-white"
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
                        <FormLabel className="text-yellow-400">Experience</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            className="bg-gray-800/50 border-yellow-400/30 text-white"
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
                        <FormLabel className="text-yellow-400">Expectations</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            className="bg-gray-800/50 border-yellow-400/30 text-white"
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
                          <FormLabel className="text-yellow-400">
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
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-3"
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
        </div>
      </div>
    </div>
  );
};

export default Registration;
