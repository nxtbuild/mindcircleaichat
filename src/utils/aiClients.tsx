import OpenAI from "openai";

// Gemini client
export const geminiClient = new OpenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  dangerouslyAllowBrowser: true,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// OpenAI client
export const openaiClient = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
  dangerouslyAllowBrowser: true,
});
