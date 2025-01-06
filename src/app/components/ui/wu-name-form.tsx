"use client";
import React, { useState } from "react";
import { useNameGeneration } from '@/app/hooks/useNameGeneration';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { FormData } from '../../types';

interface WUNameFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isLoading: boolean;
}

export function WUNameForm({ onSubmit, isLoading }: WUNameFormProps) {
  console.log('WUNameForm rendering, isLoading:', isLoading);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submit triggered');
    
    const form = event.currentTarget;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      style: (form.elements.namedItem('style') as HTMLSelectElement).value,
      keywords: (form.elements.namedItem('keywords') as HTMLInputElement)?.value || '',
      purpose: (form.elements.namedItem('purpose') as HTMLInputElement)?.value || '',
      elements: [],
      preference: (form.elements.namedItem('preference') as HTMLSelectElement)?.value || ''
    };
    
    if (!formData.name || !formData.style) {
      alert('Please fill in the required fields');
      return;
    }
    
    console.log('Submitting form data:', formData);
    try {
      await onSubmit(formData);
      console.log('Form submission completed successfully');
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('Failed to generate names. Please try again.');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Wu-Tang Name Generator
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Enter your details to generate your unique Wu-Tang name
      </p>

      <form onSubmit={handleSubmit} className="my-8 space-y-6">
        <div>
          <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Your Name *
          </Label>
          <Input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm" 
            placeholder="Enter your name" 
          />
        </div>

        <div>
          <Label htmlFor="style" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Style Preference *
          </Label>
          <select
            id="style"
            name="style"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
          >
            <option value="">Select a style</option>
            <option value="martial-arts">Martial Arts</option>
            <option value="mystical">Mystical</option>
            <option value="street-wisdom">Street Wisdom</option>
            <option value="philosophical">Philosophical</option>
          </select>
        </div>

        <div>
          <Label htmlFor="keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Keywords (Optional)
          </Label>
          <Input 
            type="text" 
            id="keywords" 
            name="keywords" 
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm" 
            placeholder="Enter keywords separated by commas" 
          />
        </div>

        <div>
          <Label htmlFor="purpose" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Purpose (Optional)
          </Label>
          <Input 
            type="text" 
            id="purpose" 
            name="purpose" 
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm" 
            placeholder="What will you use this name for?" 
          />
        </div>

        <div>
          <Label htmlFor="preference" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Name Style Preference (Optional)
          </Label>
          <select
            id="preference"
            name="preference"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
          >
            <option value="">Select preference</option>
            <option value="aggressive">Aggressive</option>
            <option value="peaceful">Peaceful</option>
            <option value="mysterious">Mysterious</option>
            <option value="powerful">Powerful</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Generating...' : 'Generate Wu-Tang Name'}
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default WUNameForm;
