# Data Layer

All data is statically imported — no filesystem access at runtime. This makes it compatible with Next.js static export and edge runtime.

---

## Personal Data — `lib/portfolio/data.ts`

The single source of truth for all personal information. **Edit only this file** to update portfolio content.

```ts
export const PERSON = {
  firstName:  "Hasitha",
  lastName:   "Sandakelum",
  fullName:   "Hasitha Sandakelum",
  birthYear:  2005,           // used to calculate age dynamically
  location:   "Sri Lanka",
  degree:     "Bachelor of ICT",
  status:     "Open to collaborations",
  email:      "dev.sandakelum@gmail.com",
  github:     "https://github.com/dev-sandakelum",
  linkedin:   "https://linkedin.com/in/hasitha-sandakelum",
  tagline:    "building products at the intersection of code and design",
};
```

```ts
export const NAV = {
  brand: "Portfolio",
  cta:   "Get in touch",
  links: [
    { href: "#home",     label: "Home"     },
    { href: "#about",    label: "About"    },
    { href: "#timeline", label: "Timeline" },
    { href: "#blogs",    label: "Blogs"    },
    { href: "#links",    label: "Links"    },
    { href: "#contact",  label: "Connect"  },
  ],
};
```

```ts
export const HERO = {
  ctaPrimary:   { label: "Explore ↓",  href: "#contact" },
  ctaSecondary: { label: "Contact me", href: "#contact" },
  scrollHint:   "Scroll to explore",
  videoSrc:     "/portfolio/hero2.mp4",
};
```

```ts
export const CONTACT = {
  eyebrow: "Contact",
  heading: "Let's build something",
  subtext: "Open to internships, collaborations, and community projects...",
  buttons: { email: "Email me", github: "GitHub ↗", linkedin: "LinkedIn ↗" },
};
```

---

## Articles — `lib/articles.ts`

### Types

```ts
type ArticleMeta = {
  id: string;           // matches folder name (e.g. "01")
  category: string;     // matches category slug (e.g. "github")
  title: string;        // Sinhala title
  titleEn: string;      // English title
  description: string;  // Sinhala description
  descriptionEn: string;
  date: string;         // ISO date string
  tags: string[];
  readingTime: number;  // minutes (estimated)
  coverImage?: string;  // path relative to /public
};

type Article = {
  meta: ArticleMeta;
  content: string;      // markdown content
};
```

### Categories

| Slug | Label | Sinhala | Icon |
|------|-------|---------|------|
| `github` | GitHub | GitHub | 🐙 |
| `azure` | Azure | Azure | ☁️ |
| `ai-ml` | AI / ML | කෘතිම බුද්ධිය | 🤖 |

### Current Articles

| File | Category | ID |
|------|----------|----|
| `lib/post/github/01/index.ts` | github | 01 |
| `lib/post/github/02/index.ts` | github | 02 |
| `lib/post/azure/01/index.ts` | azure | 01 |
| `lib/post/ai-ml/01/index.ts` | ai-ml | 01 |

### Helper Functions

```ts
getAllArticles()                     // sorted newest-first
getArticlesByCategory(category)      // filtered + sorted
getArticle(category, id)             // single article
getCategoryInfo(slug)                // CategoryInfo object
getCategoryCounts()                  // { github: 2, azure: 1, "ai-ml": 1 }
```

---

## Shortlinks — `lib/shortlinks.ts` + `lib/links.json`

```ts
type Shortlink = {
  code: string;           // URL segment (e.g. "linkedin", "msplan/a")
  label: string;          // display name
  destinationUrl: string; // redirect target
  icon?: string;          // image path or URL
  subtitle?: string;      // secondary text
  hidden?: boolean;       // if true, excluded from public listing
};
```

### Public Links (visible in portfolio)

**Social:**
| Code | Label |
|------|-------|
| `linkedin` | LinkedIn |
| `github` | GitHub |
| `youtube` | YouTube |
| `whatsapp` | WhatsApp Channel |

**Microsoft Learn Plans:**
| Code | Label | Subtitle |
|------|-------|---------|
| `msplan/a` | MS Learn Plan A | Mastering Microsoft Search |
| `msplan/b` | MS Learn Plan B | GitHub Essentials |
| `msplan/d` | MS Learn Plan D | OneNote |
| `msplan/f` | MS Learn Plan F | .NET |
| `msplan/g` | MS Learn Plan G | Data Analytics & AI Apps |
| `msplan/h` | MS Learn Plan H | Microsoft Fabric |
| `msplan/j` | MS Learn Plan J | Azure |
| `msplan/k` | MS Learn Plan K | PowerShell |

**Hidden links** (in JSON but not shown publicly — accessed directly by URL):
- `h/gdg-build-with-ai` — GDG Sri Lanka session registration
- `h/answers` — MS Learn Plans Answers (Google Drive)

### Helper Functions

```ts
getShortlinks()            // all links including hidden
getPublicShortlinks()      // excludes hidden:true and h/ prefix
getShortlinkByCode(code)   // single link by code
```

---

## AI Links — `lib/ai-shortlinks.ts` + `lib/ai-links.json`

```ts
type AiLink = {
  code: string;           // "category/slug" format (e.g. "chat/chatgpt")
  label: string;
  subtitle?: string;      // provider name (e.g. "OpenAI")
  icon?: string;
  destinationUrl: string;
};
```

### Categories and Counts

| Category | Count | Examples |
|----------|-------|---------|
| chat | 20 | ChatGPT, Gemini, Claude, Grok |
| code | 16 | v0, Cursor, Bolt, Replit |
| design | 10 | Figma, Canva, Framer |
| image | 10 | Midjourney, DALL·E 3, Adobe Firefly |
| write | 10 | QuillBot, Grammarly, Jasper |
| audio | 7 | Suno, ElevenLabs, Whisper |
| video | 7 | Runway, Pika, Kling AI |
| search | 7 | Perplexity, Brave, Kagi |
| data | 6 | Julius AI, Deepnote |
| util | 14 | NotebookLM, Gamma, n8n |

**Total: 107 AI tools**

### Helper Functions

```ts
getAiLinks()               // all AI links
getAiLinkByCode(code)      // single AI link
getAiLinkCategories()      // grouped: { chat: AiLink[], code: AiLink[], ... }
```

---

## Skills — `lib/skills.ts`

### Types

```ts
type SkillMeta = {
  slug: string;
  category: string;
  title: string;
  titleSi: string;          // Sinhala title
  description: string;
  descriptionSi: string;
  date: string;
  tags: string[];
  coverImage?: string;
  downloads?: SkillDownload[];  // multiple download files
  // Legacy single-file fields:
  downloadFile?: string;
  downloadLabel?: string;
  fileSize?: string;
  fileType?: string;
};

type SkillDownload = {
  file: string;         // URL path from /public
  label: string;        // button label
  filename: string;     // suggested save filename
  fileType: string;     // badge label e.g. "SKILL", "PDF"
  fileSize?: string;
  description?: string;
};
```

### Categories

| Slug | Label | Sinhala |
|------|-------|---------|
| `ai` | AI Skills | AI දක්ෂතා |

### Current Skills

| Slug | Category | File |
|------|----------|------|
| `ai-academic-note` | ai | `lib/skills/ai/ai-academic-note/index.ts` |
| `ai-project-report` | ai | `lib/skills/ai/ai-project-report/index.ts` |

Each skill folder also contains the `.skill` source file (e.g. `pdf-academic-doc-by-HS.skill`).

### Helper Functions

```ts
getAllSkills()                    // sorted newest-first
getSkillsByCategory(category)
getSkill(category, slug)
getSkillCategoryInfo(slug)
getSkillCategoryCounts()         // { ai: 2 }
```
