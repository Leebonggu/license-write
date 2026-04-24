import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "인허가 블로그 글 생성기",
  description: "인허가 전문 블로그 콘텐츠를 자동으로 생성합니다",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
