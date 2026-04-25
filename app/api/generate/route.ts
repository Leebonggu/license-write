import { NextResponse } from "next/server";
import { createProvider } from "@/features/llm/provider-factory";
import { generateBlogPost } from "@/features/blog/blog-generator";
import type { LicenseInput } from "@/features/blog/types";

export async function POST(request: Request) {
  const body = await request.json();
  const { businessType, referenceText, requiredPhrases, additionalNotes, includeSection4, model, section1Title, section2Title, section3Title, section4Title } = body;

  if (!businessType) {
    return NextResponse.json({ error: "분야명을 입력해주세요." }, { status: 400 });
  }

  try {
    const provider = createProvider(model ?? "claude-sonnet", {
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      googleApiKey: process.env.GOOGLE_API_KEY,
    });

    const input: LicenseInput = {
      businessType,
      referenceText,
      requiredPhrases,
      additionalNotes,
      includeSection4: includeSection4 ?? false,
      model: model ?? "claude-sonnet",
      section1Title,
      section2Title,
      section3Title,
      section4Title,
    };

    const result = await generateBlogPost(input, provider);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "글 생성에 실패했습니다";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
