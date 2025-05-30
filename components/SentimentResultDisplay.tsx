
import React from 'react';
import { SentimentAnalysisResponse } from '../types';

interface SentimentResultDisplayProps {
  result: SentimentAnalysisResponse;
}

export const SentimentResultDisplay: React.FC<SentimentResultDisplayProps> = ({ result }) => {
  const { sentiment, score } = result;

  let sentimentColorClass = 'text-slate-300';
  let bgColorClass = 'bg-slate-500';
  let borderColorClass = 'border-slate-500';
  let emoji = '😐';

  if (sentiment === 'Positive') {
    sentimentColorClass = 'text-green-400';
    bgColorClass = 'bg-green-500';
    borderColorClass = 'border-green-500';
    emoji = '😊';
  } else if (sentiment === 'Negative') {
    sentimentColorClass = 'text-red-400';
    bgColorClass = 'bg-red-500';
    borderColorClass = 'border-red-500';
    emoji = '😠';
  } else if (sentiment === 'Neutral') {
    sentimentColorClass = 'text-sky-400';
    bgColorClass = 'bg-sky-500';
    borderColorClass = 'border-sky-500';
    emoji = '🤔';
  }

  // Normalize score from -1 to 1 to 0 to 1 for width percentage
  const normalizedScore = (score + 1) / 2;
  const barWidth = `${Math.max(0, Math.min(100, normalizedScore * 100))}%`;

  return (
    <div className="w-full p-6 bg-slate-700/50 rounded-lg shadow-lg border border-slate-600 text-center transition-all duration-300 ease-in-out transform hover:scale-105">
      <div className="flex items-center justify-center mb-3">
        <span className={`text-5xl mr-3 transition-transform duration-300 ${sentiment === 'Positive' ? 'hover:rotate-12' : sentiment === 'Negative' ? 'hover:-rotate-12' : ''}`}>{emoji}</span>
        <p className={`text-3xl font-bold ${sentimentColorClass}`}>{sentiment}</p>
      </div>
      
      <div className="w-full bg-slate-600 rounded-full h-3 my-3 overflow-hidden">
        <div
          className={`h-3 rounded-full ${bgColorClass} transition-all duration-500 ease-out`}
          style={{ width: barWidth }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={-1}
          aria-valuemax={1}
          aria-label={`Sentiment score: ${score.toFixed(2)}`}
        ></div>
      </div>
      <p className={`text-lg font-semibold ${sentimentColorClass}`}>
        Score: {score.toFixed(2)}
      </p>
      <p className="text-xs text-slate-400 mt-1">
        (Score ranges from -1.0 for very negative to 1.0 for very positive)
      </p>
    </div>
  );
};
    