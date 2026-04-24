"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
}

export function Button({ variant = "primary", loading, children, className = "", ...props }: ButtonProps) {
  const base = "rounded-lg font-medium text-sm transition-colors disabled:opacity-50 px-4 py-2.5";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} disabled={loading} {...props}>
      {loading ? "처리 중..." : children}
    </button>
  );
}
