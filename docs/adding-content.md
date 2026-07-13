# Adding Content

## Adding an Article

### 1. Create the article file

```
lib/post/{category}/{id}/index.ts
```

The `id` should be a zero-padded number (`01`, `02`, etc.).

```ts
// lib/post/github/03/index.ts

import type { ArticleMeta } from "@/lib/articles";

export const meta: ArticleMeta = {
  id: "03",
  category: "github",
  title: "GitHub Actions සිංහලෙන්",         // Sinhala title
  titleEn: "GitHub Actions in Sinhala",       // English title
  description: "GitHub Actions ගැන...",       // Sinhala description
  descriptionEn: "Learn about GitHub Actions...",
  date: "2025-08-01",                         // ISO date
  tags: ["github-actions", "ci-cd", "automation"],
  readingTime: 8,                             // estimated minutes
  coverImage: "/article/github/03.jpeg",      // optional, relative to /public
};

export const content = `
# GitHub Actions

Your markdown content here...
`;
```

### 2. Register the article in `lib/articles.ts`

```ts
import * as github03 from "./post/github/03";

const ALL_POSTS: Article[] = [
  // ... existing posts ...
  { meta: github03.meta as ArticleMeta, content: github03.content },
];
```

### 3. Add a cover image (optional)

Place the image in `public/article/{category}/` (e.g. `public/article/github/03.jpeg`).

### 4. Done

The article automatically appears in:
- The Blogs tab on the home page
- `/article` index page (if it's one of the 5 most recent)
- `/article/github` category page
- `/article/github/03` reader page (statically generated)

---

## Adding an Article Category

### 1. Add to `CATEGORIES` in `lib/articles.ts`

```ts
export const CATEGORIES: CategoryInfo[] = [
  // ... existing categories ...
  {
    slug: "web-dev",
    label: "Web Dev",
    labelSi: "වෙබ් සංවර්ධනය",
    description: "Next.js, React, TypeScript and web fundamentals",
    icon: "⚛️",
    color: "bg-cyan-600",
    textColor: "text-white",
    borderColor: "border-cyan-500",
  },
];
```

### 2. Create article files in the new category folder

```
lib/post/web-dev/01/index.ts
```

### 3. Register articles as usual

The category page at `/article/web-dev` will be auto-generated via `generateStaticParams`.

---

## Adding a Shortlink

Edit `lib/links.json`:

```json
{
  "code": "twitter",
  "label": "Twitter / X",
  "subtitle": "Follow my updates",
  "icon": "/link/img/twitter.png",
  "destinationUrl": "https://twitter.com/username"
}
```

- `code` becomes the URL: `/link/twitter` → redirects to `destinationUrl`
- Place icon in `public/link/img/`
- Codes with `/` (e.g. `msplan/a`) are grouped as MS Learn Plans automatically
- Set `"hidden": true` to keep a link accessible by direct URL but hidden from the public index
- Prefix `"h/"` also hides from public listing (special hidden category)

The link will automatically appear in the portfolio Links tab and at `/link`.

---

## Adding an AI Tool

Edit `lib/ai-links.json`:

```json
{
  "code": "chat/newai",
  "label": "New AI",
  "subtitle": "Company Name",
  "icon": "https://cdn.simpleicons.org/openai/412991",
  "destinationUrl": "https://newai.com"
}
```

- The part before `/` in `code` is the category (e.g. `chat`, `code`, `design`)
- Use existing categories to avoid creating a new section
- Icon can be a CDN URL or a local path in `public/link/img/ai/`

---

## Adding a Skill Download

### 1. Create the skill metadata file

```
lib/skills/{category}/{slug}/index.ts
```

```ts
// lib/skills/ai/ai-code-review/index.ts

import type { SkillMeta } from "@/lib/skills";

export const meta: SkillMeta = {
  slug: "ai-code-review",
  category: "ai",
  title: "AI Code Review Skill",
  titleSi: "AI Code Review Skill",
  description: "Automated code review using AI skill files",
  descriptionSi: "AI skill files භාවිතා කර automated code review",
  date: "2025-09-01",
  tags: ["ai", "code-review", "automation"],
  downloads: [
    {
      file: "/download/ai/ai-code-review/code-review.skill",
      label: "Download Skill File",
      filename: "ai-code-review-by-HS.skill",
      fileType: "SKILL",
      fileSize: "2.1 KB",
      description: "AI skill file for automated code review",
    },
  ],
};

export const content = `
## About this skill

Detailed description of what this skill does...
`;
```

### 2. Register in `lib/skills.ts`

```ts
import * as aiCodeReview from "./skills/ai/ai-code-review";

const ALL_SKILLS: Skill[] = [
  // ... existing skills ...
  { meta: aiCodeReview.meta as SkillMeta, content: aiCodeReview.content },
];
```

### 3. Place the downloadable file

```
public/download/ai/ai-code-review/code-review.skill
```

### 4. Done

The skill appears at `/download/ai/skill/ai-code-review`.

---

## Updating Personal Info

Edit `lib/portfolio/data.ts` — this is the single source of truth.

| What to change | Field |
|---------------|-------|
| Name | `PERSON.firstName`, `PERSON.lastName`, `PERSON.fullName` |
| Age | `PERSON.birthYear` (age is calculated automatically) |
| Email | `PERSON.email` |
| GitHub URL | `PERSON.github` |
| LinkedIn URL | `PERSON.linkedin` |
| Status pill text | `PERSON.status` |
| Tagline | `PERSON.tagline` |
| Hero video | `HERO.videoSrc` |
| Contact heading | `CONTACT.heading` |
| Contact subtext | `CONTACT.subtext` |

---

## Adding a New Portfolio Tab

To add a new tab section to the main portfolio:

### 1. Create the component

```tsx
// app/components/portfolio/Projects.tsx
export default function Projects() {
  return (
    <section id="projects" className="relative" style={{ padding: 0 }}>
      {/* your content */}
    </section>
  );
}
```

### 2. Add to the TABS array in `app/page.tsx`

```ts
const TABS = [
  { id: "home",     label: "Home"     },
  { id: "about",    label: "About"    },
  { id: "timeline", label: "Timeline" },
  { id: "blogs",    label: "Blogs"    },
  { id: "links",    label: "Links"    },
  { id: "projects", label: "Projects" },  // new
  { id: "connect",  label: "Connect"  },
] as const;
```

### 3. Import and add the conditional render in the tab panel

```tsx
import Projects from "./components/portfolio/Projects";

// in the <main> block:
{active === "projects" && <Projects />}
```

The tab will appear in the nav automatically.
