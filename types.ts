
export interface SentimentAnalysisResponse {
  sentiment: "Positive" | "Negative" | "Neutral" | string; // Allow string for flexibility
  score: number; // Expected range: -1.0 to 1.0
}
    