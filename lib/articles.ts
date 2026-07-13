/**
 * articles.ts — isomorphic, client-safe
 *
 * Exports types, CATEGORIES, and metadata-only helpers.
 * No `fs` or Node-only APIs — safe to import in "use client" components.
 *
 * For full articles with markdown content use articles.server.ts
 * (Server Components / route handlers only).
 */

export type ArticleMeta = {
  id: string;
  category: string;
  title: string;         // Sinhala title
  titleEn: string;       // English title
  description: string;   // Sinhala description
  descriptionEn: string; // English description
  date: string;          // ISO date string
  tags: string[];
  readingTime: number;   // minutes
  coverImage?: string;   // relative to /public
};

export type Article = {
  meta: ArticleMeta;
  content: string;
};

export type CategoryInfo = {
  slug: string;
  label: string;
  labelSi: string;
  description: string;
  icon: string;
  color: string;
  textColor: string;
  borderColor: string;
};

// ---------------------------------------------------------------------------
// Category registry — add new categories here
// ---------------------------------------------------------------------------
export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "github",
    label: "GitHub",
    labelSi: "GitHub",
    description: "Git, GitHub Actions, and open-source workflows",
    icon: "🐙",
    color: "bg-slate-900",
    textColor: "text-white",
    borderColor: "border-slate-800",
  },
  {
    slug: "azure",
    label: "Azure",
    labelSi: "Azure",
    description: "Microsoft Azure cloud services and architecture",
    icon: "☁️",
    color: "bg-blue-600",
    textColor: "text-white",
    borderColor: "border-blue-500",
  },
  {
    slug: "ai-ml",
    label: "AI / ML",
    labelSi: "කෘතිම බුද්ධිය",
    description: "Artificial Intelligence සහ Machine Learning සිංහලෙන්",
    icon: "🤖",
    color: "bg-violet-600",
    textColor: "text-white",
    borderColor: "border-violet-500",
  },
];

// ---------------------------------------------------------------------------
// Metadata-only registry — add each new post's meta import here
// No content strings → safe for client bundles
// ---------------------------------------------------------------------------
// import * as github01 from "./post/github/01";
// import * as github02 from "./post/github/02";
// import * as azure01 from "./post/azure/01";
// import * as aiml01 from "./post/ai-ml/01";

const ALL_META: ArticleMeta[] = [
  // github01.meta as ArticleMeta,
  // github02.meta as ArticleMeta,
  // azure01.meta as ArticleMeta,
  // aiml01.meta as ArticleMeta,
];

const SORTED_META = [...ALL_META].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

// Returns metadata only — use in client components and Blogs.tsx
export function getAllArticles(): ArticleMeta[] {
  return SORTED_META;
}

export function getCategoryInfo(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryCounts(): Record<string, number> {
  return ALL_META.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});
}
