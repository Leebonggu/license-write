"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { GeneratingOverlay } from "@/components/ui/GeneratingOverlay";
import { BlogPreview } from "@/components/blog-preview/BlogPreview";
import type { LicenseOutput } from "@/features/blog/types";
import type { LLMModel } from "@/features/llm/types";

export function BlogForm() {
  const [businessType, setBusinessType] = useState("");
  const [referenceText, setReferenceText] = useState("");
  const [requiredPhrases, setRequiredPhrases] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [includeSection4, setIncludeSection4] = useState(false);
  const [model, setModel] = useState<LLMModel>("claude-sonnet");
  const [section1Title, setSection1Title] = useState("");
  const [section2Title, setSection2Title] = useState("");
  const [section3Title, setSection3Title] = useState("");
  const [section4Title, setSection4Title] = useState("");

  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [result, setResult] = useState<LicenseOutput | null>(null);
  const [error, setError] = useState("");

  const resultRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      setPdfLoading(true);
      setError("");
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/parse-pdf", { method: "POST", body: formData });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "PDF 파싱에 실패했습니다.");
          return;
        }
        const data = await res.json();
        if (data.text) {
          setReferenceText((prev) => (prev ? prev + "\n\n---\n\n" + data.text : data.text));
        }
      } catch {
        setError("PDF 파싱에 실패했습니다.");
      } finally {
        setPdfLoading(false);
      }
    } else {
      const text = await file.text();
      setReferenceText((prev) => (prev ? prev + "\n\n---\n\n" + text : text));
    }
    e.target.value = "";
  };

  const handleGenerate = async () => {
    if (!businessType.trim()) {
      setError("분야명을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          businessType: businessType.trim(),
          referenceText: referenceText || undefined,
          requiredPhrases: requiredPhrases || undefined,
          additionalNotes: additionalNotes || undefined,
          includeSection4,
          model,
          section1Title: section1Title || undefined,
          section2Title: section2Title || undefined,
          section3Title: section3Title || undefined,
          section4Title: section4Title || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "생성 실패");
      }

      const data = await res.json();
      setResult(data);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        setError("생성이 취소되었습���다.");
      } else {
        setError(e instanceof Error ? e.message : "글 생성에 실패했습니다.");
      }
    } finally {
      abortControllerRef.current = null;
      setLoading(false);
    }
  };

  const handleCancel = () => {
    abortControllerRef.current?.abort();
  };

  const handleReset = () => {
    setBusinessType("");
    setReferenceText("");
    setRequiredPhrases("");
    setAdditionalNotes("");
    setIncludeSection4(false);
    setModel("claude-sonnet");
    setSection1Title("");
    setSection2Title("");
    setSection3Title("");
    setSection4Title("");
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
      {/* 분야명 */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-800">분야 정보</h2>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">분야명 *</label>
          <input
            type="text"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            placeholder="예: 공장등록, 근로자파견업, 국제물류주선업"
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500">인허가 글을 작성할 분야명을 입력하세요.</p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">본문 1 소제목 (선택)</label>
          <input
            type="text"
            value={section1Title}
            onChange={(e) => setSection1Title(e.target.value)}
            placeholder="예: 공장등록이란"
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">본문 2 소제목 (선택)</label>
          <input
            type="text"
            value={section2Title}
            onChange={(e) => setSection2Title(e.target.value)}
            placeholder="예: 공장등록 요건"
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">본문 3 소제목 (선택)</label>
          <input
            type="text"
            value={section3Title}
            onChange={(e) => setSection3Title(e.target.value)}
            placeholder="예: 공장등록 제출서류"
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">본문 4 소제목 (선택)</label>
          <input
            type="text"
            value={section4Title}
            onChange={(e) => setSection4Title(e.target.value)}
            placeholder="예: 공장등록 혜택 및 유의사항"
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* 참고 자료 */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-800">참고 자료 (선택)</h2>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">참고 텍스트</label>
          <textarea
            value={referenceText}
            onChange={(e) => setReferenceText(e.target.value)}
            placeholder={"해당 분야의 법률 조문, 등록 요건, 서류 목록 등 참고 자료를 붙여넣으세요.\n정확한 정보일수록 더 높은 품질의 글이 생성됩니다."}
            rows={6}
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">파일 첨부 (.txt, .md, .pdf)</label>
          <input
            type="file"
            accept=".txt,.md,.text,.pdf"
            onChange={handleFileUpload}
            disabled={pdfLoading}
            className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 disabled:opacity-50"
          />
          {pdfLoading && <p className="text-xs text-blue-600">PDF 파싱 중...</p>}
          {!pdfLoading && referenceText && (
            <p className="text-xs text-blue-600">참고 자료 {referenceText.length.toLocaleString()}자 입력됨</p>
          )}
        </div>
      </section>

      {/* 글 옵션 */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-800">글 옵션</h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">필수 포함 문구 (선택)</label>
          <textarea
            value={requiredPhrases}
            onChange={(e) => setRequiredPhrases(e.target.value)}
            placeholder="예: 인허가닷컴, 이민구 행정사, 무료 상담"
            rows={2}
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">추가 요청사항 (선택)</label>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="예: 최근 법률 개정 내용을 강조해주세요, 소규모 사업자 관점에서 써주세요"
            rows={2}
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="includeSection4"
              checked={includeSection4}
              onChange={(e) => setIncludeSection4(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="includeSection4" className="text-sm text-gray-700">
              본문 4 포함 (혜택/추가정보 섹션)
            </label>
          </div>

          <Select
            label="LLM 선택"
            value={model}
            onChange={(e) => setModel(e.target.value as LLMModel)}
            options={[
              { value: "claude-sonnet", label: "Claude Sonnet (추천)" },
              { value: "claude-haiku", label: "Claude Haiku (빠름)" },
              { value: "gemini-flash", label: "Gemini 2.0 Flash" },
            ]}
          />
        </div>
      </section>

      {/* 생성 버튼 */}
      <div className="flex flex-col gap-2 sticky bottom-0 bg-gray-50 py-3 -mx-4 px-4 sm:static sm:bg-transparent sm:py-0 sm:mx-0 sm:px-0">
        {loading ? (
          <Button onClick={handleCancel} className="w-full py-3 text-base sm:text-lg bg-red-500 hover:bg-red-600 text-white">
            생성 취소
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleGenerate} className="flex-1 py-3 text-base sm:text-lg">
              글 생성하기
            </Button>
            <Button variant="secondary" onClick={handleReset} className="py-3 px-4 text-base sm:text-lg">
              초기화
            </Button>
          </div>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      {loading && <GeneratingOverlay />}

      {result && (
        <section ref={resultRef} className="space-y-4 scroll-mt-4">
          <BlogPreview result={result} />
          <Button variant="secondary" onClick={handleGenerate} loading={loading} className="w-full sm:w-auto">
            다시 생성하기
          </Button>
        </section>
      )}
    </div>
  );
}
