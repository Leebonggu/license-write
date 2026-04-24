import Link from "next/link";
import { BlogForm } from "@/components/blog-form/BlogForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <div />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            인허가 블로그 글 생성기
          </h1>
          <Link href="/guide" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            사용법
          </Link>
        </div>
        <p className="text-sm sm:text-base text-gray-500 text-center mb-6 sm:mb-8">
          업종명과 참고 자료만 입력하면, 인허가 전문 블로그 글이 완성됩니다
        </p>
        <BlogForm />
      </div>
    </main>
  );
}
