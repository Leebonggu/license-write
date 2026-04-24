import type { LLMProvider, LLMModel, LLMKeys } from "./types";
import { ClaudeProvider } from "./claude-provider";

export function createProvider(model: LLMModel, keys: LLMKeys): LLMProvider {
  const apiKey = keys.anthropicApiKey;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY가 설정되지 않았습니다.");
  return new ClaudeProvider(apiKey, model);
}
