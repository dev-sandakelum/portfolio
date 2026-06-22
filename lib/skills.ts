/**
 * Skills system
 * Skill files live in lib/skills/{category}/{slug}/index.ts
 * Each exports `meta` and `content` (markdown string).
 * Downloadable files live in public/download/{category}/{slug}/
 */

export type SkillDownload = {
  file: string;       // path relative to /public
  label: string;
  filename: string;   // suggested save filename (with extension)
  fileType: string;   // display label e.g. "PDF", "SKILL"
  fileSize?: string;
};

export type SkillMeta = {
  slug: string;
  category: string;
  title: string;
  titleSi: string;
  description: string;
  descriptionSi: string;
  date: string;
  tags: string[];
  coverImage?: string;
  /** Multiple downloadable files */
  downloads?: SkillDownload[];
  /** Legacy single-file fields — kept for backward compat */
  downloadFile?: string;
  downloadLabel?: string;
  fileSize?: string;
  fileType?: string;
};

export type Skill = {
  meta: SkillMeta;
  content: string;
};

export type SkillCategoryInfo = {
  slug: string;
  label: string;
  labelSi: string;
  description: string;
  icon: string;
  color: string;
  textColor: string;
};

// ---------------------------------------------------------------------------
// Category registry
// ---------------------------------------------------------------------------
export const SKILL_CATEGORIES: SkillCategoryInfo[] = [
  {
    slug: "ai",
    label: "AI Skills",
    labelSi: "AI දක්ෂතා",
    description: "Practical AI skill sheets — prompt engineering, tools, workflows",
    icon: "🤖",
    color: "bg-violet-600",
    textColor: "text-white",
  },
];

// ---------------------------------------------------------------------------
// Skill registry — static imports
// ---------------------------------------------------------------------------
import * as aiPromptEng from "./skills/ai/prompt-engineering-basics";

const ALL_SKILLS: Skill[] = [
  { meta: aiPromptEng.meta as SkillMeta, content: aiPromptEng.content },
];

const SORTED_SKILLS = [...ALL_SKILLS].sort(
  (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function getAllSkills(): Skill[] {
  return SORTED_SKILLS;
}

export function getSkillsByCategory(category: string): Skill[] {
  return SORTED_SKILLS.filter((s) => s.meta.category === category);
}

export function getSkill(category: string, slug: string): Skill | undefined {
  return ALL_SKILLS.find((s) => s.meta.category === category && s.meta.slug === slug);
}

export function getSkillCategoryInfo(slug: string): SkillCategoryInfo | undefined {
  return SKILL_CATEGORIES.find((c) => c.slug === slug);
}

export function getSkillCategoryCounts(): Record<string, number> {
  return ALL_SKILLS.reduce<Record<string, number>>((acc, s) => {
    acc[s.meta.category] = (acc[s.meta.category] ?? 0) + 1;
    return acc;
  }, {});
}
