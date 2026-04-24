"use client";

export function GeneratingOverlay() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center space-y-3">
      <div className="flex justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
      <p className="text-blue-800 font-medium">블로그 글을 생성하고 있습니다...</p>
      <p className="text-blue-600 text-sm">4000자 이상의 장문 콘텐츠를 작성 중이므로 1~2분 정도 소요됩니다.</p>
    </div>
  );
}
