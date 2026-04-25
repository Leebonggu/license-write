import Image from "next/image";
import Link from "next/link";
import { BlogForm } from "@/components/blog-form/BlogForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <div />
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="인허가" width={32} height={32} />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              청아한 블로그 글 생성기
            </h1>
          </div>
          <Link href="/guide" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            사용법
          </Link>
        </div>
        <p className="text-sm sm:text-base text-gray-500 text-center mb-6 sm:mb-8">
          분야명과 참고 자료만 입력하면, 인허가 전문 블로그 글이 완성됩니다
        </p>
        <BlogForm />
      </div>
    </main>
  );
}
