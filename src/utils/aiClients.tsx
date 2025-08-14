import OpenAI from "openai";

// Gemini client
// export const geminiClient = new OpenAI({
//   apiKey: import.meta.env.VITE_GEMINI_API_KEY,
//   dangerouslyAllowBrowser: true,
//   baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
//   defaultHeaders: {
//     "x-stainless-arch": null,
//     "x-stainless-lang": null,
//     "x-stainless-os": null,
//     "x-stainless-package-version": null,
//     "x-stainless-retry-count": null,
//     "x-stainless-runtime": null,
//     "x-stainless-runtime-version": null,
//     "x-stainless-timeout": null,
//   },
// });

// OpenAI client
export const openaiClient = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
  dangerouslyAllowBrowser: true,
});
