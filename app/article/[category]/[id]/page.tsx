import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticle, getCategoryInfo, getAllArticles } from "@/lib/articles.server";
import type { Metadata } from "next";
import { ArticleBody } from "./ArticleBody";
import OrbBackground from "@/app/components/portfolio/OrbBackground";
import Sparkle from "@/app/components/portfolio/Sparkle";
import HoverLink from "@/app/components/portfolio/ui/HoverLink";

type Props = { params: Promise<{ category: string; id: string }> };

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({
    category: a.meta.category,
    id: a.meta.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, id } = await params;
  const article = getArticle(category, id);
  if (!article) return {};
  const { meta } = article;
  const url = `/article/${category}/${id}`;
  return {
    title: meta.titleEn,
    description: meta.descriptionEn,
    keywords: meta.tags,
    alternates: { canonical: url },
    openGraph: {
      title: `${meta.titleEn} — Hasitha Sandakelum`,
      description: meta.descriptionEn,
      url,
      type: "article",
      publishedTime: meta.date,
      authors: ["Hasitha Sandakelum"],
      tags: meta.tags,
      ...(meta.coverImage ? { images: [{ url: meta.coverImage, width: 1200, height: 630, alt: meta.titleEn }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.titleEn} — Hasitha Sandakelum`,
      description: meta.descriptionEn,
      ...(meta.coverImage ? { images: [meta.coverImage] } : {}),
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-LK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { category, id } = await params;
  const article = getArticle(category, id);
  if (!article) notFound();

  const cat = getCategoryInfo(category);
  const { meta, content } = article;

  return (
    <>
      <OrbBackground />

      {/* Blurred cover image */}
      {meta.coverImage && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <Image
            src={meta.coverImage}
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.08 }}
            unoptimized
            priority
          />
          <div className="absolute inset-0" style={{ background: "rgba(8,9,13,0.82)" }} />
        </div>
      )}

      <div className="relative z-10 min-h-screen px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-[720px] space-y-10">

          {/* ── Back ── */}
          <HoverLink
            href={`/article/${category}`}
            className="inline-flex items-center gap-1.5 text-xs"
            style={{ color: "var(--text-faint)", fontFamily: "var(--font-jetbrains-mono)" }}
            hoverStyle={{ color: "var(--text-dim)" }}
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {cat?.label ?? category}
          </HoverLink>

          {/* ── Header ── */}
          <header className="space-y-5">
            {cat && (
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  background: "var(--gradient)",
                  color: "#08090d",
                }}
              >
                {cat.icon} {cat.label}
              </span>
            )}

            <h1
              className="leading-tight tracking-tighter"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                background: "linear-gradient(120deg, #fff 40%, var(--text-dim))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {meta.title}
            </h1>

            <p className="text-base" style={{ color: "var(--text-dim)" }}>{meta.titleEn}</p>

            {/* Meta row */}
            <div
              className="flex flex-wrap items-center gap-3 text-xs"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--text-faint)" }}
            >
              <span>{formatDate(meta.date)}</span>
              <span style={{ color: "var(--border)" }}>·</span>
              <span>{meta.readingTime} min read</span>
              <span style={{ color: "var(--border)" }}>·</span>
              <span className="flex flex-wrap gap-1.5">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-2.5 py-0.5"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "var(--border)",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </span>
            </div>

            {/* Description callout */}
            <div
              className="rounded-2xl border px-5 py-4 text-sm leading-relaxed"
              style={{
                background: "rgba(73,146,234,0.07)",
                borderColor: "rgba(73,146,234,0.25)",
                color: "var(--text-dim)",
              }}
            >
              {meta.description}
            </div>
          </header>

          {/* ── Divider ── */}
          <div style={{ borderTop: "1px solid var(--border)" }} />

          {/* ── Article body ── */}
          <ArticleBody content={content} />

          {/* ── Divider ── */}
          <div style={{ borderTop: "1px solid var(--border)" }} />

          {/* ── Footer nav ── */}
          <div className="flex items-center justify-between">
            <HoverLink
              href={`/article/${category}`}
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
              hoverStyle={{
                background: "var(--surface-hover)",
                borderColor: "rgba(255,255,255,0.18)",
              }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {cat?.label ?? category}
            </HoverLink>

            <HoverLink
              href="/article"
              className="text-xs"
              style={{ color: "var(--text-faint)", fontFamily: "var(--font-jetbrains-mono)" }}
              hoverStyle={{ color: "var(--text-dim)" }}
            >
              සියළු ලිපි ↗
            </HoverLink>
          </div>

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
