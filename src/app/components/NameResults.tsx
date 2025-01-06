'use client';

import React, { useEffect, useState } from 'react';
import { GeneratedName } from '../types';
import { IconCopy } from '@tabler/icons-react';

interface NameResultsProps {
  names: GeneratedName[];
  onRegenerateClick: () => void;
  isLoading: boolean;
  error: Error | null;
}

const NameResults: React.FC<NameResultsProps> = ({ names, onRegenerateClick, isLoading, error }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  useEffect(() => {
    if (copiedIndex !== null) {
      const timer = setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedIndex]);

  const handleCopyClick = async (name: string, index: number) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedIndex(index);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  if (error) {
    return null;
  }

  if (names.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">Your Wu-Tang Names</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {names.map((result, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {result.name}
                  </h3>
                  <button
                    onClick={() => handleCopyClick(result.name, index)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    title="Copy name"
                  >
                    <IconCopy size={20} />
                    {copiedIndex === index && (
                      <span className="absolute ml-2 text-sm text-green-500">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {result.explanation}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={onRegenerateClick}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              Generate New Names
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NameResults;
