"use client";

/**
 * ArticleBody — renders a lightweight Markdown-like string into styled HTML.
 *
 * Supported syntax:
 *   ## Heading 2      → <h2>
 *   ### Heading 3     → <h3>
 *   #### Heading 4    → <h4>
 *   **bold**          → <strong>
 *   _italic_          → <em>
 *   `inline code`     → <code>
 *   ```lang ... ```   → <pre><code>
 *   > blockquote      → <blockquote>
 *   - item            → <ul><li>
 *   | a | b |         → <table>
 *   blank line        → paragraph break
 *
 * All text is rendered in a font that has excellent Sinhala Unicode support
 * (Noto Sans Sinhala via Google Fonts).
 */

import { useMemo, ReactNode } from "react";

// ──────────────────────────────────────────────────────────────────────────────
// Inline parser: bold, italic, inline-code
// ──────────────────────────────────────────────────────────────────────────────
function parseInline(text: string): ReactNode {
  // Split on **bold**, _italic_, `code`, [label](url)
  const parts: ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|`(.+?)`|_(.+?)_|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));

    if (match[2] !== undefined) {
      // **bold**
      parts.push(<strong key={match.index} className="font-semibold text-slate-900">{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      // `code`
      parts.push(
        <code key={match.index} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-700">
          {match[3]}
        </code>
      );
    } else if (match[4] !== undefined) {
      // _italic_
      parts.push(<em key={match.index} className="italic text-slate-700">{match[4]}</em>);
    } else if (match[5] !== undefined && match[6] !== undefined) {
      // [label](url)
      const href = match[6];
      const isInternal = href.startsWith("/");
      parts.push(
        <a
          key={match.index}
          href={href}
          {...(!isInternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-medium text-indigo-600 underline underline-offset-2 transition hover:text-indigo-800"
        >
          {match[5]}
        </a>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

// ──────────────────────────────────────────────────────────────────────────────
// Block parser
// ──────────────────────────────────────────────────────────────────────────────
function parseBlocks(content: string): ReactNode[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const nodes: ReactNode[] = [];
  let i = 0;
  let key = 0;

  const next = () => key++;

  while (i < lines.length) {
    const line = lines[i];

    // ── fenced code block ────────────────────────────────────────────────────
    if (line.trimStart().startsWith("```")) {
      const lang = line.trim().slice(3).trim() || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // consume closing ```
      nodes.push(
        <div key={next()} className="my-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm">
          {lang !== "text" && (
            <div className="flex items-center justify-between border-b border-slate-700 px-4 py-2">
              <span className="text-xs font-mono text-slate-400">{lang}</span>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
              </div>
            </div>
          )}
          <pre className="overflow-x-auto px-5 py-4 text-sm leading-relaxed text-slate-200">
            <code className="font-mono">{codeLines.join("\n")}</code>
          </pre>
        </div>
      );
      continue;
    }

    // ── blockquote ────────────────────────────────────────────────────────────
    if (line.startsWith("> ")) {
      const bqLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        bqLines.push(lines[i].slice(2));
        i++;
      }
      nodes.push(
        <blockquote key={next()} className="my-4 border-l-4 border-indigo-300 bg-indigo-50 px-4 py-3 text-sm text-indigo-800 leading-relaxed rounded-r-xl">
          {bqLines.map((l, idx) => <p key={idx}>{parseInline(l)}</p>)}
        </blockquote>
      );
      continue;
    }

    // ── unordered list ────────────────────────────────────────────────────────
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(lines[i].slice(2));
        i++;
      }
      nodes.push(
        <ul key={next()} className="my-4 space-y-1.5 pl-5 text-slate-700">
          {items.map((item, idx) => (
            <li key={idx} className="list-disc text-[0.95rem] leading-relaxed">
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // ── ordered list ─────────────────────────────────────────────────────────
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      nodes.push(
        <ol key={next()} className="my-4 space-y-1.5 pl-5 text-slate-700">
          {items.map((item, idx) => (
            <li key={idx} className="list-decimal text-[0.95rem] leading-relaxed">
              {parseInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // ── table ─────────────────────────────────────────────────────────────────
    if (line.includes("|") && line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines
        .filter((l) => !l.replace(/\|/g, "").trim().match(/^[-: ]+$/))
        .map((l) =>
          l
            .trim()
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim())
        );
      if (rows.length > 0) {
        const [head, ...body] = rows;
        nodes.push(
          <div key={next()} className="my-5 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  {head.map((h, ci) => (
                    <th key={ci} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      {parseInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {body.map((row, ri) => (
                  <tr key={ri} className="hover:bg-slate-50">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2.5 text-slate-700">
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // ── horizontal rule ───────────────────────────────────────────────────────
    if (line.trim() === "---" || line.trim() === "***" || line.trim() === "___") {
      nodes.push(
        <hr key={next()} className="my-8 border-t border-slate-200" />
      );
      i++;
      continue;
    }

    // ── headings ──────────────────────────────────────────────────────────────
    if (line.startsWith("#### ")) {
      nodes.push(
        <h4 key={next()} className="mt-6 mb-2 text-base font-semibold text-slate-800">
          {parseInline(line.slice(5))}
        </h4>
      );
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      nodes.push(
        <h3 key={next()} className="mt-8 mb-2 text-lg font-bold text-slate-800">
          {parseInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      nodes.push(
        <h2 key={next()} className="mt-10 mb-3 text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
          {parseInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      nodes.push(
        <h1 key={next()} className="mt-8 mb-3 text-2xl font-bold text-slate-900">
          {parseInline(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // ── blank line → skip ─────────────────────────────────────────────────────
    if (line.trim() === "") {
      i++;
      continue;
    }

    // ── paragraph ─────────────────────────────────────────────────────────────
    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#") && !lines[i].startsWith("```") && !lines[i].startsWith("> ") && !/^[-*] /.test(lines[i]) && !/^\d+\. /.test(lines[i]) && !lines[i].trim().startsWith("|")) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      nodes.push(
        <p key={next()} className="my-3 text-[0.975rem] leading-[1.85] text-slate-700">
          {parseInline(paraLines.join(" "))}
        </p>
      );
    }
  }

  return nodes;
}

// ──────────────────────────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────────────────────────
export function ArticleBody({ content }: { content: string }) {
  const nodes = useMemo(() => parseBlocks(content), [content]);

  return (
    <>
      {/* Load Noto Sans Sinhala for proper Sinhala Unicode rendering */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wdth,wght@75..125,100..900&display=swap');
        .article-body {
          font-family: 'Noto Sans Sinhala', 'Geist', ui-sans-serif, system-ui, sans-serif;
        }
      `}</style>
      <article className="article-body">{nodes}</article>
    </>
  );
}
