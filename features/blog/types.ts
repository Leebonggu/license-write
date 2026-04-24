import type { LLMModel } from "@/features/llm/types";

export interface LicenseInput {
  businessType: string;
  referenceText?: string;
  requiredPhrases?: string;
  additionalNotes?: string;
  includeSection4: boolean;
  model: LLMModel;
}

export interface LicenseOutput {
  title: string;
  html: string;
  plainText: string;
  charCount: number;
}
