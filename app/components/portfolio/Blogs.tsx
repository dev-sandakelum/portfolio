"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, getAllArticles } from "@/lib/articles";
import Sparkle from "./Sparkle";

// ── helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-LK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "10px",
        fontWeight: 600,
        color: "#d8c9fb",
        background: "rgba(139,92,246,.18)",
        border: "1px solid rgba(139,92,246,.3)",
        borderRadius: "6px",
        padding: "3px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ── Blog card ─────────────────────────────────────────────────────────────────

function BlogCard({
  article,
  cat,
}: {
  article: ReturnType<typeof getAllArticles>[number];
  cat: ReturnType<typeof CATEGORIES.find> | undefined;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/article/${article.meta.category}/${article.meta.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "rgba(22,18,38,.55)",
        border: `1px solid ${hovered ? "rgba(167,139,250,.45)" : "var(--border)"}`,
        borderRadius: "14px",
        overflow: "hidden",
        textDecoration: "none",
        color: "var(--text)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(124,58,237,.2)" : "none",
        transition: "border-color .2s, transform .2s, box-shadow .2s",
      }}
    >
      {/* Thumb */}
      <div
        style={{
          width: "100%",
          height: "136px",
          flexShrink: 0,
          overflow: "hidden",
          background: "linear-gradient(135deg, rgba(139,92,246,.12), rgba(124,58,237,.06))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {article.meta.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.meta.coverImage}
            alt={article.meta.titleEn}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform .35s",
            }}
          />
        ) : (
          <span style={{ fontSize: "42px" }}>{cat?.icon ?? "📄"}</span>
        )}
      </div>

      {/* Body */}
      <div
        style={{
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "7px",
        }}
      >
        {cat && <Tag label={cat.label} />}

        <h4
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "13.5px",
            fontWeight: 700,
            lineHeight: 1.4,
            color: "var(--text)",
            margin: 0,
          }}
        >
          {article.meta.titleEn}
        </h4>

        <p
          style={{
            fontSize: "11.5px",
            color: "var(--text-dim)",
            lineHeight: 1.55,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.meta.descriptionEn}
        </p>

        {/* Meta footer */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "9px",
            borderTop: "1px solid rgba(255,255,255,.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "10px",
              color: "var(--text-faint)",
            }}
          >
            {formatDate(article.meta.date)}
            <span style={{ margin: "0 5px" }}>·</span>
            {article.meta.readingTime} min
          </span>
          <span
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              border: `1px solid ${hovered ? "transparent" : "var(--border)"}`,
              background: hovered ? "linear-gradient(135deg,#a78bfa,#7c3aed)" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: hovered ? "#fff" : "#cfc9de",
              fontSize: "11px",
              transition: "all .2s",
              flexShrink: 0,
            }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Blogs() {
  const [filter, setFilter] = useState("All");
  const allArticles = getAllArticles();
  const filters = ["All", ...CATEGORIES.map((c) => c.label)];

  const filtered =
    filter === "All"
      ? allArticles
      : allArticles.filter((a) => {
          const cat = CATEGORIES.find((c) => c.slug === a.meta.category);
          return cat?.label === filter;
        });

  return (
    <section
      id="blogs"
      className="relative"
      style={{ padding: 0, overflowX: "hidden" }}
    >
      <div
        className="mx-auto w-full max-w-[920px] px-5 sm:px-8"
        style={{ paddingTop: "48px", paddingBottom: "64px" }}
      >
        {/* ── Header ── */}
        <div className="mb-8 flex flex-col gap-3">
          <div
            className="flex items-center gap-2 text-xs uppercase tracking-widest"
            style={{ color: "var(--blue)", fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <span
              className="inline-block h-px w-4 shrink-0"
              style={{ background: "var(--blue)" }}
            />
            Writing
          </div>
          <div className="flex items-center gap-3">
            <Sparkle size={32} />
            <h2
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
                fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                background: "linear-gradient(120deg, #fff 30%, var(--text-dim))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Blogs
            </h2>
          </div>
          <p
            style={{
              color: "var(--text-dim)",
              fontSize: "14px",
              maxWidth: "480px",
              lineHeight: 1.65,
            }}
          >
            Tech write-ups in Sinhala &amp; English — GitHub, Azure, AI/ML and more.
          </p>
        </div>

        {/* ── Filter pills ── */}
        <div className="mb-7 flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: active ? "1px solid transparent" : "1px solid var(--border)",
                  borderRadius: "999px",
                  padding: "7px 16px",
                  background: active
                    ? "linear-gradient(135deg, #8b5cf6, #7c3aed)"
                    : "rgba(22,18,38,.5)",
                  color: active ? "#fff" : "#cfc9de",
                  boxShadow: active ? "0 4px 16px rgba(124,58,237,.4)" : "none",
                  transition: "all .2s",
                  userSelect: "none",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* ── Cards ── */}
        {filtered.length === 0 ? (
          <p
            className="py-16 text-center text-xs"
            style={{
              color: "var(--text-faint)",
              fontFamily: "var(--font-jetbrains-mono)",
            }}
          >
            No posts in this category yet.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "14px",
            }}
          >
            {filtered.map((article) => {
              const cat = CATEGORIES.find((c) => c.slug === article.meta.category);
              return (
                <BlogCard
                  key={`${article.meta.category}/${article.meta.id}`}
                  article={article}
                  cat={cat}
                />
              );
            })}
          </div>
        )}

        {/* ── View all link ── */}
        <div className="mt-8 text-center">
          <Link
            href="/article"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "12px",
              fontWeight: 600,
              borderRadius: "999px",
              border: "1px solid var(--border)",
              padding: "10px 22px",
              color: "var(--text-dim)",
              background: "var(--surface)",
              textDecoration: "none",
              transition: "border-color .2s, color .2s",
            }}
          >
            View all posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
