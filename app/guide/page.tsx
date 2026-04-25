import Link from "next/link";

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">사용 가이드</h1>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            글 생성하러 가기 &rarr;
          </Link>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <h2 className="text-lg font-bold text-gray-900">분야명 입력</h2>
            </div>
            <p className="text-gray-600 mb-3">
              생성할 인허가 분야명을 입력합니다. 블로그 글의 주제가 됩니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-500 mb-2">입력 예시</p>
              <div className="flex flex-wrap gap-2">
                {["공장등록", "근로자파견업", "국제물류주선업", "여행업 등록", "식육포장처리업", "대중문화예술기획업"].map((item) => (
                  <span key={item} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{item}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <h2 className="text-lg font-bold text-gray-900">참고 자료 첨부 (선택)</h2>
            </div>
            <p className="text-gray-600 mb-3">
              해당 분야의 법률 조문, 등록 요건, 서류 목록 등을 붙여넣으면 글의 정확도가 크게 올라갑니다.
            </p>
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm font-medium text-green-800 mb-1">참고 자료가 있을 때</p>
                <p className="text-sm text-green-700">구체적 수치 (자본금 1억5천만원, 전용면적 20㎡ 등)가 정확하게 반영됩니다.</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm font-medium text-yellow-800 mb-1">참고 자료가 없을 때</p>
                <p className="text-sm text-yellow-700">글 구조와 톤은 정확하지만, 세부 수치는 일반적인 내용으로 생성됩니다.</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              텍스트 직접 입력 또는 <strong>.txt, .md, .pdf</strong> 파일 첨부 가능
            </p>
          </section>

          {/* Step 3 */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <h2 className="text-lg font-bold text-gray-900">글 옵션 설정</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-medium text-gray-700">옵션</th>
                    <th className="text-left py-2 font-medium text-gray-700">설명</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 pr-4 font-medium">필수 포함 문구</td>
                    <td className="py-2.5">글에 반드시 들어가야 할 키워드나 문구</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 pr-4 font-medium">추가 요청사항</td>
                    <td className="py-2.5">특별히 강조하거나 요청할 내용</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 pr-4 font-medium">본문 4 소제목</td>
                    <td className="py-2.5">체크 시 혜택/추가정보 섹션 추가 (분야 정보 섹션에서 설정)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium">LLM 선택</td>
                    <td className="py-2.5">Sonnet (고품질, 추천) / Haiku (빠름, 저비용) / Gemini Flash</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Step 4 */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <h2 className="text-lg font-bold text-gray-900">생성 및 복사</h2>
            </div>
            <p className="text-gray-600 mb-4">
              &quot;글 생성하기&quot; 클릭 후 1~2분 정도 기다리면 결과가 나옵니다.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                <span className="text-sm font-medium text-gray-800 whitespace-nowrap">텍스트 복사</span>
                <span className="text-sm text-gray-600">순수 텍스트만 복사합니다.</span>
              </div>
              <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-3">
                <span className="text-sm font-medium text-blue-800 whitespace-nowrap">리치텍스트 복사</span>
                <span className="text-sm text-blue-700">네이버 블로그 에디터에 붙여넣기용. 서식이 유지됩니다.</span>
              </div>
              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                <span className="text-sm font-medium text-gray-800 whitespace-nowrap">HTML 복사</span>
                <span className="text-sm text-gray-600">원본 HTML 코드를 복사합니다.</span>
              </div>
            </div>
          </section>

          {/* Step 5 */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              <h2 className="text-lg font-bold text-gray-900">네이버 블로그에 포스팅</h2>
            </div>
            <ol className="space-y-3 text-gray-600">
              <li className="flex gap-3">
                <span className="font-bold text-gray-400">1.</span>
                <span>&quot;리치텍스트 복사&quot; 버튼을 클릭합니다.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-gray-400">2.</span>
                <span>네이버 블로그 &gt; 글쓰기 &gt; 에디터를 엽니다.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-gray-400">3.</span>
                <span>에디터에서 <strong>Ctrl+V</strong> (Mac: Cmd+V) 붙여넣기합니다.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-gray-400">4.</span>
                <span>제목은 별도로 &quot;제목 복사&quot; 후 붙여넣기합니다.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-gray-400">5.</span>
                <span>필요 시 이미지를 추가한 뒤 발행합니다.</span>
              </li>
            </ol>
          </section>

          {/* 글 구조 */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">생성되는 글 구조</h2>
            <div className="space-y-2">
              {[
                { label: "인트로", desc: "인사 + 분야 배경 + 안내 + CTA", color: "bg-blue-50 text-blue-800" },
                { label: "본문 1: ~이란", desc: "법적 정의 + 법률 인용 + 벌칙 안내", color: "bg-gray-50 text-gray-800" },
                { label: "본문 2: ~ 요건", desc: "자본금, 인력, 시설, 결격사유 등 상세 요건", color: "bg-gray-50 text-gray-800" },
                { label: "본문 3: ~ 서류", desc: "필수/추가 서류 목록 + 절차", color: "bg-gray-50 text-gray-800" },
                { label: "본문 4 (선택)", desc: "혜택, 인증, 변경등록 등 부가 정보", color: "bg-yellow-50 text-yellow-800" },
                { label: "엔딩", desc: "요약 + 전문가 의뢰 유도 CTA", color: "bg-blue-50 text-blue-800" },
              ].map((section) => (
                <div key={section.label} className={`flex items-center gap-4 rounded-lg p-3 ${section.color}`}>
                  <span className="font-medium text-sm whitespace-nowrap min-w-[120px]">{section.label}</span>
                  <span className="text-sm">{section.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center pt-4 pb-8">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              글 생성하러 가기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
