import OpenAI from "openai";
import { CodeAnalysisResult } from "./types";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const parseAIResponse = (content: string): CodeAnalysisResult => {
  const cleaned = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};
