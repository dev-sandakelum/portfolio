"use client";

/**
 * ArticleBody — renders markdown-like content in the portfolio dark theme.
 *
 * Supported syntax:
 *   ## ## ### ####  headings
 *   **bold**   _italic_   `inline code`   [label](url)
 *   ```lang … ```   fenced code blocks
 *   > blockquote
 *   - / * unordered list,  1. ordered list
 *   | table |
 *   ---  horizontal rule
 *
 * Sinhala Unicode is rendered via Noto Sans Sinhala.
 */

import { useMemo, ReactNode, CSSProperties } from "react";

// ─── CSS variable shorthands ──────────────────────────────────────────────────
const S = {
  text:     "var(--text)",
  dim:      "var(--text-dim)",
  faint:    "var(--text-faint)",
  border:   "var(--border)",
  surface:  "var(--surface)",
  blue:     "var(--blue)",
  gradient: "var(--gradient)",
  mono:     "var(--font-jetbrains-mono)",
  display:  "var(--font-space-grotesk)",
};

// ─── Inline parser ────────────────────────────────────────────────────────────
function parseInline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|`(.+?)`|_(.+?)_|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));

    if (match[2] !== undefined) {
      parts.push(
        <strong key={match.index} style={{ fontWeight: 600, color: S.text }}>
          {match[2]}
        </strong>
      );
    } else if (match[3] !== undefined) {
      parts.push(
        <code
          key={match.index}
          style={{
            borderRadius: 6,
            background: "rgba(255,255,255,0.08)",
            padding: "1px 7px",
            fontFamily: S.mono,
            fontSize: "0.85em",
            color: "var(--blue)",
          }}
        >
          {match[3]}
        </code>
      );
    } else if (match[4] !== undefined) {
      parts.push(
        <em key={match.index} style={{ fontStyle: "italic", color: S.dim }}>
          {match[4]}
        </em>
      );
    } else if (match[5] !== undefined && match[6] !== undefined) {
      const href = match[6];
      const isInternal = href.startsWith("/");
      parts.push(
        <a
          key={match.index}
          href={href}
          {...(!isInternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          style={{
            color: S.blue,
            textDecoration: "underline",
            textUnderlineOffset: 3,
            fontWeight: 500,
          }}
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

// ─── Block parser ──────────────────────────────────────────────────────────────
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
      i++;
      nodes.push(
        <div
          key={next()}
          style={{
            margin: "20px 0",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0d0f16",
          }}
        >
          {lang !== "text" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span style={{ fontFamily: S.mono, fontSize: 12, color: S.faint }}>{lang}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(232,83,93,0.5)" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(219,184,45,0.5)" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(132,179,129,0.5)" }} />
              </div>
            </div>
          )}
          <pre
            style={{
              overflowX: "auto",
              padding: "18px 20px",
              margin: 0,
              fontSize: 13.5,
              lineHeight: 1.65,
            }}
          >
            <code style={{ fontFamily: S.mono, color: "#c9d1d9" }}>{codeLines.join("\n")}</code>
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
        <blockquote
          key={next()}
          style={{
            margin: "16px 0",
            borderLeft: `4px solid var(--blue)`,
            background: "rgba(73,146,234,0.07)",
            padding: "12px 16px",
            borderRadius: "0 12px 12px 0",
            fontSize: 14,
            color: S.dim,
            lineHeight: 1.8,
          }}
        >
          {bqLines.map((l, idx) => <p key={idx} style={{ margin: "4px 0" }}>{parseInline(l)}</p>)}
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
        <ul key={next()} style={{ margin: "14px 0", paddingLeft: 22, color: S.dim }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ listStyle: "disc", marginBottom: 6, lineHeight: 1.75, fontSize: "0.97rem" }}>
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // ── ordered list ──────────────────────────────────────────────────────────
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      nodes.push(
        <ol key={next()} style={{ margin: "14px 0", paddingLeft: 22, color: S.dim }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ listStyle: "decimal", marginBottom: 6, lineHeight: 1.75, fontSize: "0.97rem" }}>
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
          l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim())
        );
      if (rows.length > 0) {
        const [head, ...body] = rows;
        nodes.push(
          <div key={next()} style={{ margin: "20px 0", overflowX: "auto", borderRadius: 12, border: "1px solid var(--border)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                  {head.map((h, ci) => (
                    <th
                      key={ci}
                      style={{
                        padding: "10px 16px",
                        textAlign: "left",
                        fontSize: 11,
                        fontFamily: S.mono,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: S.faint,
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {parseInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, ri) => (
                  <tr
                    key={ri}
                    style={{ borderBottom: ri < body.length - 1 ? "1px solid var(--border)" : "none" }}
                  >
                    {row.map((cell, ci) => (
                      <td key={ci} style={{ padding: "9px 16px", color: S.dim, lineHeight: 1.6 }}>
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
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      nodes.push(
        <hr key={next()} style={{ margin: "28px 0", border: "none", borderTop: "1px solid var(--border)" }} />
      );
      i++;
      continue;
    }

    // ── headings ──────────────────────────────────────────────────────────────
    if (line.startsWith("#### ")) {
      nodes.push(
        <h4 key={next()} style={{ marginTop: 20, marginBottom: 8, fontSize: 15, fontWeight: 600, color: S.text, fontFamily: S.display }}>
          {parseInline(line.slice(5))}
        </h4>
      );
      i++; continue;
    }
    if (line.startsWith("### ")) {
      nodes.push(
        <h3 key={next()} style={{ marginTop: 28, marginBottom: 10, fontSize: 17, fontWeight: 700, color: S.text, fontFamily: S.display }}>
          {parseInline(line.slice(4))}
        </h3>
      );
      i++; continue;
    }
    if (line.startsWith("## ")) {
      nodes.push(
        <h2
          key={next()}
          style={{
            marginTop: 36,
            marginBottom: 12,
            paddingBottom: 10,
            fontSize: 20,
            fontWeight: 700,
            fontFamily: S.display,
            background: S.gradient,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {parseInline(line.slice(3))}
        </h2>
      );
      i++; continue;
    }
    if (line.startsWith("# ")) {
      nodes.push(
        <h1 key={next()} style={{ marginTop: 28, marginBottom: 12, fontSize: 24, fontWeight: 700, color: S.text, fontFamily: S.display }}>
          {parseInline(line.slice(2))}
        </h1>
      );
      i++; continue;
    }

    // ── blank line ────────────────────────────────────────────────────────────
    if (line.trim() === "") { i++; continue; }

    // ── paragraph ─────────────────────────────────────────────────────────────
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith("> ") &&
      !/^[-*] /.test(lines[i]) &&
      !/^\d+\. /.test(lines[i]) &&
      !lines[i].trim().startsWith("|") &&
      !/^(-{3,}|\*{3,}|_{3,})$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      nodes.push(
        <p key={next()} style={{ margin: "12px 0", fontSize: "0.975rem", lineHeight: 1.85, color: S.dim }}>
          {parseInline(paraLines.join(" "))}
        </p>
      );
    }
  }

  return nodes;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ArticleBody({ content }: { content: string }) {
  const nodes = useMemo(() => parseBlocks(content), [content]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wdth,wght@75..125,100..900&display=swap');
        .article-body {
          font-family: 'Noto Sans Sinhala', var(--font-inter, sans-serif);
        }
        .article-body a:hover { opacity: 0.8; }
      `}</style>
      <article className="article-body">{nodes}</article>
    </>
  );
}
