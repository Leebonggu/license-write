export type LLMModel = "claude-sonnet" | "claude-haiku" | "gemini-flash";

export interface LLMProvider {
  generateText(userPrompt: string, systemPrompt: string): Promise<string>;
}

export interface LLMKeys {
  anthropicApiKey?: string;
  googleApiKey?: string;
}
