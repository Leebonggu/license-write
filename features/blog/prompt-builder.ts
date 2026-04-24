import { SYSTEM_PROMPT } from "./style-profile";

interface PromptInput {
  businessType: string;
  referenceText?: string;
  requiredPhrases?: string;
  additionalNotes?: string;
  includeSection4: boolean;
}

interface PromptOutput {
  systemPrompt: string;
  userPrompt: string;
}

export function buildPrompt(input: PromptInput): PromptOutput {
  const parts: string[] = [];

  parts.push(`## 업종명\n${input.businessType}`);

  if (input.includeSection4) {
    parts.push(`## 본문 4 포함\n본문 4(추가 정보) 섹션을 반드시 포함해주세요. 해당 업종의 혜택, 관련 인증, 변경등록 절차 등 부가 정보를 다뤄주세요.`);
  } else {
    parts.push(`## 본문 4\n본문 4(추가 정보) 섹션은 생략하세요. 인트로 → 본문1 → 본문2 → 본문3 → 엔딩 구조로 작성하세요.`);
  }

  if (input.referenceText) {
    parts.push(`## 참고 자료\n아래는 이 업종에 대한 참고 자료입니다. 이 내용을 바탕으로 정확한 정보를 글에 반영하세요. 참고 자료의 문체가 아닌, 시스템 프롬프트에 명시된 인허가닷컴 문체를 따라야 합니다.\n\n---\n${input.referenceText}\n---`);
  }

  if (input.requiredPhrases) {
    parts.push(`## 필수 포함 문구\n다음 문구를 글에 자연스럽게 녹여서 반드시 포함해주세요:\n"${input.requiredPhrases}"`);
  }

  if (input.additionalNotes) {
    parts.push(`## 추가 요청사항\n${input.additionalNotes}`);
  }

  parts.push(`위 정보를 바탕으로 네이버 블로그 인허가 정보 글을 작성해주세요.`);

  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt: parts.join("\n\n"),
  };
}
