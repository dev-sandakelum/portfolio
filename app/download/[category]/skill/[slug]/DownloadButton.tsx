"use client";

type Props = {
  href: string;
  filename: string;
  large?: boolean;
};

export function DownloadButton({ href, filename, large = false }: Props) {
  return (
    <a
      href={href}
      download={filename}
      className={
        large
          ? "inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-95"
          : "inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-95 shrink-0"
      }
    >
      {/* Download icon */}
      <svg
        className={large ? "h-4 w-4" : "h-3.5 w-3.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 10l5 5 5-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12" />
      </svg>
      {large ? "Download Skill Sheet" : "Download"}
    </a>
  );
}
