import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticle, getCategoryInfo, getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";
import { ArticleBody } from "./ArticleBody";

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
  return {
    title: `${article.meta.titleEn} — hasitha-sandakelum`,
    description: article.meta.descriptionEn,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("si-LK", {
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
    <main className="relative min-h-screen bg-slate-50 px-4 py-16">

      {/* Fixed background cover image at 40% opacity */}
      {meta.coverImage && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <Image
            src={meta.coverImage}
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.4 }}
            unoptimized
            priority
          />
          {/* Soft overlay so text stays readable */}
          <div className="absolute inset-0 bg-slate-50/60" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-2xl">

        {/* Back */}
        <Link
          href={`/article/${category}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-slate-700"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {cat?.label ?? category}
        </Link>

        {/* Article header */}
        <header className="mt-8 space-y-4">
          {/* Category badge */}
          {cat && (
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cat.color} ${cat.textColor}`}>
              {cat.icon} {cat.label}
            </span>
          )}

          <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
            {meta.title}
          </h1>
          <p className="text-base text-slate-500 leading-relaxed">
            {meta.titleEn}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span>{formatDate(meta.date)}</span>
            <span className="text-slate-200">·</span>
            <span>{meta.readingTime} min read</span>
            <span className="text-slate-200">·</span>
            <span>
              {meta.tags.map((tag) => (
                <span key={tag} className="mr-1 rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">
                  #{tag}
                </span>
              ))}
            </span>
          </div>

          {/* Description */}
          <p className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700 leading-relaxed">
            {meta.description}
          </p>
        </header>

        {/* Divider */}
        <div className="my-8 border-t border-slate-200" />

        {/* Article body */}
        <ArticleBody content={content} />

        {/* Divider */}
        <div className="my-10 border-t border-slate-200" />

        {/* Footer nav */}
        <div className="flex items-center justify-between">
          <Link
            href={`/article/${category}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {cat?.label ?? category} ලිපි
          </Link>
          <Link
            href="/article"
            className="text-xs text-slate-400 transition hover:text-slate-700"
          >
            සියළු ලිපි ↗
          </Link>
        </div>

        <p className="mt-10 text-center text-xs text-slate-300">
          hasitha-sandakelum · {new Date().getFullYear()}
        </p>

      </div>
    </main>
  );
}
