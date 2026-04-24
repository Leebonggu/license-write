import Anthropic from "@anthropic-ai/sdk";
import type { LLMProvider } from "./types";

export class ClaudeProvider implements LLMProvider {
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model: "claude-sonnet" | "claude-haiku") {
    this.client = new Anthropic({ apiKey });
    this.model = model === "claude-haiku" ? "claude-haiku-4-5-20251001" : "claude-sonnet-4-20250514";
  }

  async generateText(userPrompt: string, systemPrompt: string): Promise<string> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 8192,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    return response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n");
  }
}
