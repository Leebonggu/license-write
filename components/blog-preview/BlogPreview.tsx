"use client";

import type { LicenseOutput } from "@/features/blog/types";
import { CopyButton } from "@/components/ui/CopyButton";

interface BlogPreviewProps {
  result: LicenseOutput;
}

export function BlogPreview({ result }: BlogPreviewProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-gray-800">생성 결과</h2>

      {/* Title */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-500 block mb-1">추천 제목</span>
          <span className="text-base font-bold text-gray-900">{result.title}</span>
        </div>
        <CopyButton text={result.title} label="제목 복사" />
      </div>

      {/* Char count */}
      <div className={`text-sm px-3 py-2 rounded-lg ${result.charCount >= 4000 ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
        글자 수: <strong>{result.charCount.toLocaleString()}자</strong>
        {result.charCount >= 4000 ? " (4000자 이상 충족)" : " (4000자 미달 - 재생성을 추천합니다)"}
      </div>

      {/* Preview */}
      <div
        className="border rounded-lg p-6 bg-white prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: result.html }}
      />

      {/* Hashtags */}
      {result.hashtags.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-blue-700">추천 해시태그 (SEO 최적화)</span>
            <CopyButton text={result.hashtags.join(" ")} label="전체 복사" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {result.hashtags.map((tag) => (
              <span key={tag} className="text-sm text-blue-700 bg-blue-100 rounded px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Copy Buttons */}
      <div className="flex gap-2 flex-wrap">
        <CopyButton text={result.plainText} label="텍스트 복사" />
        <CopyButton text={result.plainText} richHtml={result.html} label="리치텍스트 복사 (네이버 붙여넣기용)" />
        <CopyButton text={result.html} label="HTML 복사" />
      </div>
    </div>
  );
}
