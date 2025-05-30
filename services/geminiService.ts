
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SentimentAnalysisResponse } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable is not set. Sentiment analysis will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "MISSING_API_KEY" });

export const analyzeSentiment = async (text: string): Promise<SentimentAnalysisResponse> => {
  if (!process.env.API_KEY) {
    // Simulate an error if API key is missing, to prevent actual API calls without a key.
    // In a real scenario, this might be handled differently, e.g. by disabling the feature.
    throw new Error("API Key is not configured. Please set the API_KEY environment variable.");
  }

  const prompt = `
You are an expert sentiment analysis AI.
Analyze the sentiment of the following text.
Return your analysis strictly as a JSON object with two keys:
1. "sentiment": A string value, which must be one of "Positive", "Negative", or "Neutral".
2. "score": A numerical value between -1.0 (most negative) and 1.0 (most positive), representing the intensity of the sentiment.

Text to analyze:
---
${text}
---
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        // For real-time analysis, disabling thinking can reduce latency.
        // thinkingConfig: { thinkingBudget: 0 } // Uncomment if lowest latency is critical
      },
    });

    let jsonStr = response.text.trim();
    
    // Remove markdown fences if present
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData = JSON.parse(jsonStr) as SentimentAnalysisResponse;

    // Validate the structure of the parsed data
    if (
      typeof parsedData.sentiment === 'string' &&
      typeof parsedData.score === 'number' &&
      (parsedData.sentiment === "Positive" || parsedData.sentiment === "Negative" || parsedData.sentiment === "Neutral") &&
      parsedData.score >= -1 && parsedData.score <= 1
    ) {
      return parsedData;
    } else {
      console.error("Invalid JSON structure or values from API:", parsedData);
      throw new Error("Received invalid sentiment analysis data format from the API.");
    }
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    if (error instanceof Error) {
      // Check for common API errors or provide a generic message
      if (error.message.includes("API key not valid")) {
        throw new Error("Invalid API Key. Please check your configuration.");
      }
      if (error.message.toLowerCase().includes("quota") || error.message.toLowerCase().includes("rate limit")) {
        throw new Error("API request limit reached. Please try again later.");
      }
    }
    throw new Error("Failed to analyze sentiment due to an API or parsing error.");
  }
};
    