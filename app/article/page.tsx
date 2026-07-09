import Link from "next/link";
import { CATEGORIES, getCategoryCounts, getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";
import OrbBackground from "@/app/components/portfolio/OrbBackground";
import Sparkle from "@/app/components/portfolio/Sparkle";
import Eyebrow from "@/app/components/portfolio/Eyebrow";
import HoverLink from "@/app/components/portfolio/ui/HoverLink";
import HoverCard from "@/app/components/portfolio/ui/HoverCard";

export const metadata: Metadata = {
  title: "Articles — Hasitha Sandakelum",
  description: "Tech articles in Sinhala and English covering GitHub, Azure, AI/ML and more.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-LK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ArticlesIndexPage() {
  const counts = getCategoryCounts();
  const recent = getAllArticles().slice(0, 5);

  return (
    <>
      <OrbBackground />

      <div className="relative z-10 min-h-screen px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-[860px] space-y-16">

          {/* ── Back ── */}
          <HoverLink
            href="/"
            className="inline-flex items-center gap-1.5 text-xs"
            style={{ color: "var(--text-faint)", fontFamily: "var(--font-jetbrains-mono)" }}
            hoverStyle={{ color: "var(--text-dim)" }}
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </HoverLink>

          {/* ── Header ── */}
          <header className="space-y-4">
            <Eyebrow label="Articles" />
            <div className="flex items-center gap-3">
              <Sparkle size={36} />
              <h1
                className="leading-tight tracking-tighter"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  background: "linear-gradient(120deg, #fff 30%, var(--text-dim))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                ලිපි{" "}
                <span style={{ color: "var(--text-faint)", fontWeight: 400 }}>/ Articles</span>
              </h1>
            </div>
            <p className="max-w-lg text-base" style={{ color: "var(--text-dim)" }}>
              සිංහල සහ English මාධ්‍යයෙන් tech ලිපි — GitHub, Azure, AI/ML සහ තවත් බොහෝ ක්ෂේත්‍ර.
            </p>
          </header>

          {/* ── Category Grid ── */}
          <section className="space-y-5">
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--text-faint)", fontFamily: "var(--font-jetbrains-mono)" }}
            >
              ප්‍රවර්ග / Categories
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat) => (
                <HoverCard
                  key={cat.slug}
                  className="rounded-2xl border"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                  hoverBorderColor="rgba(255,255,255,0.18)"
                  hoverBackground="var(--surface-hover)"
                  hoverTransform="translateY(-2px)"
                >
                  <Link href={`/article/${cat.slug}`} className="flex items-center gap-4 p-5">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl"
                      style={{ background: "var(--gradient)" }}
                    >
                      {cat.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className="font-semibold"
                        style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--text)" }}
                      >
                        {cat.label}
                      </p>
                      <p className="truncate text-xs" style={{ color: "var(--text-dim)" }}>
                        {cat.description}
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        background: "rgba(255,255,255,0.06)",
                        color: "var(--text-dim)",
                      }}
                    >
                      {counts[cat.slug] ?? 0}
                    </span>
                  </Link>
                </HoverCard>
              ))}
            </div>
          </section>

          {/* ── Recent Articles ── */}
          {recent.length > 0 && (
            <section className="space-y-5">
              <p
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--text-faint)", fontFamily: "var(--font-jetbrains-mono)" }}
              >
                මෑත ලිපි / Recent Articles
              </p>
              <ul className="space-y-3">
                {recent.map((article) => {
                  const cat = CATEGORIES.find((c) => c.slug === article.meta.category);
                  return (
                    <li key={`${article.meta.category}/${article.meta.id}`}>
                      <HoverCard
                        className="rounded-2xl border"
                        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                        hoverBorderColor="rgba(255,255,255,0.18)"
                        hoverBackground="var(--surface-hover)"
                        hoverTransform="translateY(-2px)"
                      >
                        <Link
                          href={`/article/${article.meta.category}/${article.meta.id}`}
                          className="flex items-start gap-4 p-5"
                        >
                          <span
                            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base"
                            style={{ background: "var(--gradient)" }}
                          >
                            {cat?.icon ?? "📄"}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p
                              className="text-sm font-semibold leading-snug"
                              style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--text)" }}
                            >
                              {article.meta.title}
                            </p>
                            <p className="mt-0.5 truncate text-xs" style={{ color: "var(--text-dim)" }}>
                              {article.meta.description}
                            </p>
                            <div className="mt-1.5 flex flex-wrap items-center gap-2">
                              <span
                                className="text-xs"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--text-faint)" }}
                              >
                                {formatDate(article.meta.date)}
                              </span>
                              <span style={{ color: "var(--border)" }}>·</span>
                              <span
                                className="text-xs"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--text-faint)" }}
                              >
                                {article.meta.readingTime} min read
                              </span>
                            </div>
                          </div>
                          <svg
                            className="mt-1 h-4 w-4 shrink-0"
                            style={{ color: "var(--text-faint)" }}
                            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </HoverCard>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* ── Footer ── */}
          <footer
            className="border-t pt-8 text-center text-xs"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-faint)",
              fontFamily: "var(--font-jetbrains-mono)",
            }}
          >
            <Sparkle size={10} style={{ verticalAlign: "-1px", marginRight: 6 }} />
            Hasitha Sandakelum · {new Date().getFullYear()}
          </footer>

        </div>
      </div>
    </>
  );
}
