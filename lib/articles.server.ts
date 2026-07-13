/**
 * articles.server.ts — SERVER ONLY
 *
 * Reads content.md from disk at build/request time via fs.
 * Import ONLY from Server Components or route handlers.
 * Never import this from a "use client" component.
 */

import fs from "fs";
import path from "path";
import {
  CATEGORIES,
  getCategoryInfo,
  getCategoryCounts,
  type Article,
  type ArticleMeta,
  type CategoryInfo,
} from "./articles";

export { CATEGORIES, getCategoryInfo, getCategoryCounts };
export type { Article, ArticleMeta, CategoryInfo };

// ---------------------------------------------------------------------------
// Reads the content.md sitting next to each post's index.ts
// ---------------------------------------------------------------------------
function readContent(category: string, id: string): string {
  const mdPath = path.join(
    process.cwd(),
    "lib", "post", category, id, "content.md"
  );
  return fs.readFileSync(mdPath, "utf-8");
}

// ---------------------------------------------------------------------------
// Post metadata — same order as articles.ts
// ---------------------------------------------------------------------------
import * as github01 from "./post/github/01";
import * as github02 from "./post/github/02";
import * as azure01 from "./post/azure/01";
import * as aiml01 from "./post/ai-ml/01";

const ALL_META: ArticleMeta[] = [
  github01.meta as ArticleMeta,
  github02.meta as ArticleMeta,
  azure01.meta as ArticleMeta,
  aiml01.meta as ArticleMeta,
];

// Build full articles once at module load (build time for static, request
// time for dynamic routes — both fine since this is server-only).
const ALL_FULL: Article[] = ALL_META.map((meta) => ({
  meta,
  content: readContent(meta.category, meta.id),
}));

const SORTED_FULL = [...ALL_FULL].sort(
  (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
);

// ---------------------------------------------------------------------------
// Public helpers — drop-in replacements for the old articles.ts helpers
// ---------------------------------------------------------------------------

export function getAllArticles(): Article[] {
  return SORTED_FULL;
}

export function getArticlesByCategory(category: string): Article[] {
  return SORTED_FULL.filter((a) => a.meta.category === category);
}

export function getArticle(category: string, id: string): Article | undefined {
  return ALL_FULL.find(
    (a) => a.meta.category === category && a.meta.id === id
  );
}
