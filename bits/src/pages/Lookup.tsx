
import React from 'react';
import NavigationBar from '@/components/NavigationBar';
import RegistrationLookup from '@/components/RegistrationLookup';

const Lookup = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavigationBar />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4 font-cinzel">
            Registration Lookup
          </h1>
          <p className="text-xl text-gray-300">
            Check your registration details using your registration ID
          </p>
        </div>

        <RegistrationLookup />
      </div>
    </div>
  );
};

export default Lookup;
