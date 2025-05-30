
import React from 'react';

interface TextAreaInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={6}
      className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-150 ease-in-out resize-none shadow-md focus:shadow-lg"
      aria-label="Text input for sentiment analysis"
    />
  );
};
    