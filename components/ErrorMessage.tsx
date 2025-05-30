
import React from 'react';
import { AlertIcon } from './icons/AlertIcon';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div 
      className="w-full flex items-center p-4 bg-red-900/30 border border-red-700 text-red-300 rounded-lg shadow-md"
      role="alert"
    >
      <AlertIcon className="h-6 w-6 mr-3 flex-shrink-0" />
      <div>
        <p className="font-semibold">Error</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};
    