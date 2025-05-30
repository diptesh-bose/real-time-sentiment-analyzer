
import React, { useState, useEffect, useCallback } from 'react';
import { TextAreaInput } from './components/TextAreaInput';
import { SentimentResultDisplay } from './components/SentimentResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { analyzeSentiment } from './services/geminiService';
import { SentimentAnalysisResponse } from './types';
import { DEBOUNCE_DELAY } from './constants';
import { LogoIcon } from './components/icons/LogoIcon';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [debouncedInputText, setDebouncedInputText] = useState<string>('');
  const [sentimentResult, setSentimentResult] = useState<SentimentAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputText(inputText);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [inputText]);

  const fetchSentimentAnalysis = useCallback(async (text: string) => {
    if (text.trim() === '') {
      setSentimentResult(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeSentiment(text);
      setSentimentResult(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setSentimentResult(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSentimentAnalysis(debouncedInputText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputText, fetchSentimentAnalysis]); // fetchSentimentAnalysis is memoized by useCallback

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100 flex flex-col items-center p-4 sm:p-8 selection:bg-sky-500 selection:text-white">
      <header className="w-full max-w-3xl mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <LogoIcon className="h-12 w-12 text-sky-400 mr-3" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-400">
            Real-time Sentiment Analyzer
          </h1>
        </div>
        <p className="text-lg text-slate-400">
          Type your text below and see its sentiment analyzed instantly.
        </p>
      </header>

      <main className="w-full max-w-3xl bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-8">
        <TextAreaInput
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text for sentiment analysis..."
        />

        <div className="mt-6 h-24 flex items-center justify-center">
          {isLoading && <LoadingSpinner />}
          {error && !isLoading && <ErrorMessage message={error} />}
          {!isLoading && !error && sentimentResult && (
            <SentimentResultDisplay result={sentimentResult} />
          )}
          {!isLoading && !error && !sentimentResult && inputText.trim() === '' && (
             <p className="text-slate-500 text-center">Sentiment will appear here once you start typing.</p>
          )}
           {!isLoading && !error && !sentimentResult && inputText.trim() !== '' && debouncedInputText.trim() !== '' && (
             <p className="text-slate-500 text-center">Awaiting analysis results...</p>
          )}
        </div>
      </main>

      <footer className="w-full max-w-3xl mt-12 text-center">
        <p className="text-sm text-slate-500">
          Powered by Gemini API & React. Designed with Tailwind CSS.
        </p>
      </footer>
    </div>
  );
};

export default App;
    