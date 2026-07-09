import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticlesByCategory, getCategoryInfo, CATEGORIES } from "@/lib/articles";
import type { Metadata } from "next";
import OrbBackground from "@/app/components/portfolio/OrbBackground";
import Sparkle from "@/app/components/portfolio/Sparkle";
import Eyebrow from "@/app/components/portfolio/Eyebrow";
import HoverLink from "@/app/components/portfolio/ui/HoverLink";
import HoverCard from "@/app/components/portfolio/ui/HoverCard";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryInfo(category);
  if (!cat) return {};
  return {
    title: `${cat.label} — Hasitha Sandakelum`,
    description: cat.description,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-LK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryInfo(category);
  if (!cat) notFound();
  const articles = getArticlesByCategory(category);

  return (
    <>
      <OrbBackground />

      <div className="relative z-10 min-h-screen px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-[860px] space-y-12">

          {/* ── Back ── */}
          <HoverLink
            href="/article"
            className="inline-flex items-center gap-1.5 text-xs"
            style={{ color: "var(--text-faint)", fontFamily: "var(--font-jetbrains-mono)" }}
            hoverStyle={{ color: "var(--text-dim)" }}
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            ලිපි / Articles
          </HoverLink>

          {/* ── Header ── */}
          <header className="space-y-4">
            <Eyebrow label={cat.labelSi} />
            <div className="flex items-center gap-4">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl"
                style={{ background: "var(--gradient)" }}
              >
                {cat.icon}
              </span>
              <div>
                <h1
                  className="tracking-tight"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontWeight: 700,
                    fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                    background: "linear-gradient(120deg, #fff 30%, var(--text-dim))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {cat.label}
                </h1>
                <p className="text-sm" style={{ color: "var(--text-dim)" }}>{cat.description}</p>
              </div>
            </div>
          </header>

          {/* ── Articles list ── */}
          {articles.length === 0 ? (
            <div
              className="rounded-2xl border border-dashed px-6 py-16 text-center"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-sm" style={{ color: "var(--text-dim)" }}>ලිපි නොමැත — ඉක්මනින් එකතු වේ.</p>
              <p className="mt-1 text-xs" style={{ color: "var(--text-faint)" }}>No articles yet — coming soon.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {articles.map((article) => (
                <li key={article.meta.id}>
                  <HoverCard
                    className="rounded-2xl border"
                    style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                    hoverBorderColor="rgba(255,255,255,0.18)"
                    hoverBackground="var(--surface-hover)"
                    hoverTransform="translateY(-2px)"
                  >
                    <Link href={`/article/${category}/${article.meta.id}`} className="block p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <p
                            className="font-semibold leading-snug"
                            style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--text)" }}
                          >
                            {article.meta.title}
                          </p>
                          <p className="mt-0.5 text-xs" style={{ color: "var(--text-faint)" }}>
                            {article.meta.titleEn}
                          </p>
                          <p
                            className="mt-2 line-clamp-2 text-sm leading-relaxed"
                            style={{ color: "var(--text-dim)" }}
                          >
                            {article.meta.description}
                          </p>
                        </div>
                        <svg
                          className="mt-1 h-4 w-4 shrink-0"
                          style={{ color: "var(--text-faint)" }}
                          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
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
                        {article.meta.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border px-2.5 py-0.5 text-xs"
                            style={{
                              fontFamily: "var(--font-jetbrains-mono)",
                              background: "rgba(255,255,255,0.04)",
                              borderColor: "var(--border)",
                              color: "var(--text-faint)",
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </HoverCard>
                </li>
              ))}
            </ul>
          )}

          {/* ── Footer ── */}
          <footer
            className="border-t pt-8 text-center text-xs"
            style={{ borderColor: "var(--border)", color: "var(--text-faint)", fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <Sparkle size={10} style={{ verticalAlign: "-1px", marginRight: 6 }} />
            Hasitha Sandakelum · {new Date().getFullYear()}
          </footer>

        </div>
      </div>
    </>
  );
}
