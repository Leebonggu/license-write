import { GoogleGenerativeAI } from "@google/generative-ai";
import type { LLMProvider } from "./types";

export class GeminiProvider implements LLMProvider {
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async generateText(userPrompt: string, systemPrompt: string): Promise<string> {
    const model = this.client.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemPrompt,
      generationConfig: { maxOutputTokens: 8192 },
    });
    const result = await model.generateContent(userPrompt);
    return result.response.text();
  }
}
