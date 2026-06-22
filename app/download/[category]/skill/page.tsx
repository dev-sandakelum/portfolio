import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSkillsByCategory, getSkillCategoryInfo, SKILL_CATEGORIES } from "@/lib/skills";
import type { Metadata } from "next";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return SKILL_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getSkillCategoryInfo(category);
  if (!cat) return {};
  return {
    title: `${cat.label} — Downloads | hasitha-sandakelum`,
    description: cat.description,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function SkillCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getSkillCategoryInfo(category);
  if (!cat) notFound();

  const skills = getSkillsByCategory(category);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-xl space-y-10">

        {/* Back */}
        <Link href="/download"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-slate-700">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Downloads
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4">
          <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${cat.color} ${cat.textColor} shadow-sm`}>
            {cat.icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{cat.label}</h1>
            <p className="text-sm text-slate-500">{cat.description}</p>
          </div>
        </div>

        {/* Skills list */}
        {skills.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
            <p className="text-sm text-slate-400">ඉක්මනින් files එකතු වේ — Coming soon.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {skills.map((skill) => (
              <li key={skill.meta.slug}>
                <Link
                  href={`/download/${category}/skill/${skill.meta.slug}`}
                  className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-violet-200 hover:shadow-md"
                >
                  {/* Cover thumbnail */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-100">
                    {skill.meta.coverImage ? (
                      <Image
                        src={skill.meta.coverImage}
                        alt={skill.meta.title}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl">
                        {cat.icon}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 group-hover:text-slate-900 leading-snug line-clamp-2">
                      {skill.meta.titleSi}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">
                      {skill.meta.descriptionSi}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {skill.meta.fileType && (
                        <span className="rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-600">
                          {skill.meta.fileType}
                        </span>
                      )}
                      {skill.meta.fileSize && (
                        <span className="text-xs text-slate-400">{skill.meta.fileSize}</span>
                      )}
                      <span className="text-xs text-slate-300">·</span>
                      <span className="text-xs text-slate-400">{formatDate(skill.meta.date)}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg className="mt-1 h-4 w-4 shrink-0 self-start text-slate-300 transition group-hover:text-violet-400"
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <p className="text-center text-xs text-slate-300">
          hasitha-sandakelum · {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
