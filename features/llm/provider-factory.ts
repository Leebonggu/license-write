import type { LLMProvider, LLMModel, LLMKeys } from "./types";
import { ClaudeProvider } from "./claude-provider";
import { GeminiProvider } from "./gemini-provider";

export function createProvider(model: LLMModel, keys: LLMKeys): LLMProvider {
  if (model === "gemini-flash") {
    const apiKey = keys.googleApiKey;
    if (!apiKey) throw new Error("GOOGLE_API_KEY가 설정되지 않았습니다.");
    return new GeminiProvider(apiKey);
  }
  const apiKey = keys.anthropicApiKey;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY가 설정되지 않았습니다.");
  return new ClaudeProvider(apiKey, model);
}
