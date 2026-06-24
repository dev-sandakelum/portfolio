/**
 * Skills system
 *
 * File layout:
 *   lib/skills/{category}/{slug}/index.ts   ← metadata + markdown content
 *   lib/skills/{category}/{slug}/*.skill    ← source skill files (for reference)
 *   public/download/{category}/{slug}/*     ← files served as static downloads
 *
 * To add a new skill:
 *   1. Create lib/skills/{category}/{slug}/index.ts
 *   2. Copy downloadable files to public/download/{category}/{slug}/
 *   3. Import and register below
 */

export type SkillDownload = {
  file: string;         // URL path from /public (e.g. /download/ai/slug/file.skill)
  label: string;        // Display name on the download button
  filename: string;     // Suggested save filename with extension
  fileType: string;     // Short type label shown in badge e.g. "SKILL", "PDF"
  fileSize?: string;    // Optional e.g. "1.2 MB"
  description?: string; // Optional one-liner shown under the label
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
// Category registry — add new categories here
// ---------------------------------------------------------------------------
export const SKILL_CATEGORIES: SkillCategoryInfo[] = [
  {
    slug: "ai",
    label: "AI Skills",
    labelSi: "AI දක්ෂතා",
    description: "Practical AI skill files — document generation, automation, workflows",
    icon: "🤖",
    color: "bg-violet-600",
    textColor: "text-white",
  },
];

// ---------------------------------------------------------------------------
// Skill registry — one static import per skill file
// ---------------------------------------------------------------------------
import * as aiAcademicNote   from "./skills/ai/ai-academic-note";
import * as aiProjectReport  from "./skills/ai/ai-project-report";

const ALL_SKILLS: Skill[] = [
  { meta: aiAcademicNote.meta  as SkillMeta, content: aiAcademicNote.content  },
  { meta: aiProjectReport.meta as SkillMeta, content: aiProjectReport.content },
];

// Newest-first
const SORTED_SKILLS = [...ALL_SKILLS].sort(
  (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
);

// ---------------------------------------------------------------------------
// Public helpers
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
