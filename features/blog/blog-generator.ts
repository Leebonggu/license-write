import type { LicenseInput, LicenseOutput } from "./types";
import type { LLMProvider } from "@/features/llm/types";
import { buildPrompt } from "./prompt-builder";

function htmlToPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function generateBlogPost(
  input: LicenseInput,
  provider: LLMProvider,
): Promise<LicenseOutput> {
  const { systemPrompt, userPrompt } = buildPrompt({
    businessType: input.businessType,
    referenceText: input.referenceText,
    requiredPhrases: input.requiredPhrases,
    additionalNotes: input.additionalNotes,
    includeSection4: input.includeSection4,
  });

  const raw = await provider.generateText(userPrompt, systemPrompt);

  const titleMatch = raw.match(/\[TITLE\](.*?)\[\/TITLE\]/);
  const title = titleMatch ? titleMatch[1].trim() : `${input.businessType} 등록 요건 및 제출서류 안내`;
  const html = raw.replace(/\[TITLE\].*?\[\/TITLE\]\s*/, "").trim();
  const plainText = htmlToPlainText(html);

  return {
    title,
    html,
    plainText,
    charCount: plainText.length,
  };
}
