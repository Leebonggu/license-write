"use client";

import { useState } from "react";
import { Button } from "./Button";

interface CopyButtonProps {
  text: string;
  richHtml?: string;
  label?: string;
}

export function CopyButton({ text, richHtml, label = "복사" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (richHtml) {
        const blob = new Blob([richHtml], { type: "text/html" });
        const textBlob = new Blob([text], { type: "text/plain" });
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": blob,
            "text/plain": textBlob,
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(text);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button variant="secondary" onClick={handleCopy}>
      {copied ? "복사됨!" : label}
    </Button>
  );
}
