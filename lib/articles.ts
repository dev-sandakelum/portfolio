/**
 * Article metadata type.
 * Posts are stored as individual TypeScript files in lib/post/{category}/{id}/index.ts
 */
export type ArticleMeta = {
  id: string;
  category: string;
  title: string;          // Sinhala title
  titleEn: string;        // English title
  description: string;    // Sinhala description
  descriptionEn: string;  // English description
  date: string;           // ISO date string
  tags: string[];
  readingTime: number;    // minutes
  coverImage?: string;    // optional cover image path (relative to /public)
};

export type Article = {
  meta: ArticleMeta;
  content: string;
};

export type CategoryInfo = {
  slug: string;
  label: string;
  labelSi: string;        // Sinhala label
  description: string;
  icon: string;
  color: string;          // Tailwind bg color class
  textColor: string;      // Tailwind text color class
  borderColor: string;    // Tailwind border color class
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
// Article registry — import each post module statically so Next.js can tree-shake
// and we avoid any fs/glob at runtime (works in edge & static export too).
// ---------------------------------------------------------------------------
import * as github01 from "./post/github/01";
import * as github02 from "./post/github/02";
import * as azure01 from "./post/azure/01";
import * as aiml01 from "./post/ai-ml/01";

const ALL_POSTS: Article[] = [
  { meta: github01.meta as ArticleMeta, content: github01.content },
  { meta: github02.meta as ArticleMeta, content: github02.content },
  { meta: azure01.meta as ArticleMeta, content: azure01.content },
  { meta: aiml01.meta as ArticleMeta, content: aiml01.content },
];

// Sorted newest-first
const SORTED_POSTS = [...ALL_POSTS].sort(
  (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
);

// ---------------------------------------------------------------------------
// Public helpers
// ---------------------------------------------------------------------------

export function getAllArticles(): Article[] {
  return SORTED_POSTS;
}

export function getArticlesByCategory(category: string): Article[] {
  return SORTED_POSTS.filter((p) => p.meta.category === category);
}

export function getArticle(category: string, id: string): Article | undefined {
  return ALL_POSTS.find((p) => p.meta.category === category && p.meta.id === id);
}

export function getCategoryInfo(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryCounts(): Record<string, number> {
  return ALL_POSTS.reduce<Record<string, number>>((acc, p) => {
    acc[p.meta.category] = (acc[p.meta.category] ?? 0) + 1;
    return acc;
  }, {});
}
