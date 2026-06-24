import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSkill, getSkillCategoryInfo, getAllSkills } from "@/lib/skills";
import type { Metadata } from "next";
import { ArticleBody } from "@/app/article/[category]/[id]/ArticleBody";
import { DownloadButton } from "./DownloadButton";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateStaticParams() {
  return getAllSkills().map((s) => ({
    category: s.meta.category,
    slug: s.meta.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const skill = getSkill(category, slug);
  if (!skill) return {};
  return {
    title: `${skill.meta.title} — Downloads | hasitha-sandakelum`,
    description: skill.meta.description,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function SkillPage({ params }: Props) {
  const { category, slug } = await params;
  const skill = getSkill(category, slug);
  if (!skill) notFound();

  const cat = getSkillCategoryInfo(category);
  const { meta, content } = skill;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-2xl">

        {/* Back */}
        <Link
          href={`/download/${category}/skill`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-slate-700"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {cat?.label ?? category}
        </Link>

        {/* Header */}
        <header className="mt-8 space-y-4">

          {/* Category badge */}
          {cat && (
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cat.color} ${cat.textColor}`}>
              {cat.icon} {cat.label}
            </span>
          )}

          <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
            {meta.titleSi}
          </h1>
          <p className="text-base text-slate-500 leading-relaxed">{meta.title}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span>{formatDate(meta.date)}</span>
            {meta.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">
                #{tag}
              </span>
            ))}
          </div>

          {/* Description callout */}
          <p className="rounded-xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm text-violet-700 leading-relaxed">
            {meta.descriptionSi}
          </p>

          {/* Cover image */}
          {meta.coverImage && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <Image
                src={meta.coverImage}
                alt={meta.title}
                width={800}
                height={450}
                className="w-full object-cover"
                unoptimized
                priority
              />
            </div>
          )}
        </header>

        {/* ── Download cards ── */}
        {(meta.downloads && meta.downloads.length > 0) ? (
          <div className="my-8 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Download Files
            </p>
            {meta.downloads.map((dl) => (
              <div key={dl.file} className="flex items-start justify-between gap-4 rounded-2xl border border-violet-200 bg-white px-5 py-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-xs font-bold text-white">
                    {dl.fileType}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{dl.label}</p>
                    {dl.description && (
                      <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{dl.description}</p>
                    )}
                    <p className="mt-0.5 text-xs text-slate-400">
                      {dl.fileType}
                      {dl.fileSize && <span> · {dl.fileSize}</span>}
                    </p>
                  </div>
                </div>
                <DownloadButton href={dl.file} filename={dl.filename} />
              </div>
            ))}
          </div>
        ) : meta.downloadFile ? (
          <div className="my-8 flex items-center justify-between gap-4 rounded-2xl border border-violet-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white">
                {meta.fileType ?? "FILE"}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">{meta.downloadLabel}</p>
                <p className="text-xs text-slate-400">
                  {meta.fileType && <span>{meta.fileType}</span>}
                  {meta.fileSize && <span> · {meta.fileSize}</span>}
                </p>
              </div>
            </div>
            <DownloadButton href={meta.downloadFile} filename={`${meta.slug}.${meta.fileType?.toLowerCase() ?? "file"}`} />
          </div>
        ) : null}

        <div className="my-8 border-t border-slate-200" />

        {/* Article body */}
        <ArticleBody content={content} />

        <div className="my-10 border-t border-slate-200" />

        {/* Bottom download CTA */}
        {(meta.downloads && meta.downloads.length > 0) ? (
          <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white px-6 py-6 text-center shadow-sm space-y-4">
            <p className="text-sm font-semibold text-slate-700">Skill files ready to download! 🎉</p>
            <p className="text-xs text-slate-400">
              මෙම skill files ඔබේ device ට save කර ඕනෑ වෙලේ reference කරගන්න.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {meta.downloads.map((dl) => (
                <DownloadButton key={dl.file} href={dl.file} filename={dl.filename} large />
              ))}
            </div>
          </div>
        ) : meta.downloadFile ? (
          <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white px-6 py-6 text-center shadow-sm space-y-3">
            <p className="text-sm font-semibold text-slate-700">Skill sheet ready to download! 🎉</p>
            <p className="text-xs text-slate-400">
              මෙම skill sheet ඔබේ device ට save කර ඕනෑ වෙලේ reference කරගන්න.
            </p>
            <DownloadButton href={meta.downloadFile} filename={`${meta.slug}.${meta.fileType?.toLowerCase() ?? "file"}`} large />
          </div>
        ) : null}

        <div className="my-10 border-t border-slate-200" />

        {/* Footer nav */}
        <div className="flex items-center justify-between">
          <Link
            href={`/download/${category}/skill`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {cat?.label ?? category}
          </Link>
          <Link href="/download" className="text-xs text-slate-400 transition hover:text-slate-700">
            සියළු Downloads ↗
          </Link>
        </div>

        <p className="mt-10 text-center text-xs text-slate-300">
          hasitha-sandakelum · {new Date().getFullYear()}
        </p>

      </div>
    </main>
  );
}
