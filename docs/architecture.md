# Architecture

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.9 (App Router) |
| UI | React 19.2.4 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Fonts | Space Grotesk · JetBrains Mono · Inter |
| 3D | React Three Fiber 9 + Three.js 0.185 |
| Linting | ESLint 9 + eslint-config-next |

## Folder Structure

```
port-app/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout — fonts, metadata, html/body
│   ├── page.tsx                # Root page — tab-based SPA
│   ├── globals.css             # CSS variables + global styles
│   ├── components/
│   │   └── portfolio/          # All portfolio section components
│   │       ├── ui/             # Reusable primitives (HoverCard, HoverLink)
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Timeline.tsx
│   │       ├── Blogs.tsx
│   │       ├── Links.tsx
│   │       ├── ContactFooter.tsx
│   │       ├── ContactThemeSync.tsx
│   │       ├── OrbBackground.tsx
│   │       ├── Sparkle.tsx
│   │       ├── RevealObserver.tsx
│   │       ├── Discover.tsx        (legacy, not used in root)
│   │       ├── PortfolioNav.tsx    (legacy, not used in root)
│   │       ├── ScrollDots.tsx      (legacy, not used in root)
│   │       └── SmoothScroller.tsx  (legacy, not used in root)
│   ├── article/                # Article sub-pages
│   │   ├── page.tsx            # /article index
│   │   ├── [category]/
│   │   │   ├── page.tsx        # /article/[category]
│   │   │   └── [id]/
│   │   │       ├── page.tsx    # /article/[category]/[id]
│   │   │       └── ArticleBody.tsx
│   ├── link/                   # Shortlink system
│   │   ├── page.tsx            # /link — social links index
│   │   ├── ai/page.tsx         # /link/ai — AI tools index
│   │   ├── [code]/page.tsx     # /link/[code] — redirect handler
│   │   └── [...slug]/page.tsx  # /link/[...slug] — multi-segment redirect
│   └── download/               # Downloads system
│       ├── page.tsx            # /download index
│       └── [category]/skill/
│           ├── page.tsx
│           └── [slug]/page.tsx
├── lib/                        # Data layer (no filesystem at runtime)
│   ├── portfolio/
│   │   └── data.ts             # PERSON, NAV, HERO, CONTACT constants
│   ├── articles.ts             # Article types + CATEGORIES + helpers
│   ├── shortlinks.ts           # Shortlink type + helpers
│   ├── ai-shortlinks.ts        # AiLink type + category grouping
│   ├── skills.ts               # Skill types + SKILL_CATEGORIES + helpers
│   ├── links.json              # Social + MS Learn links data
│   ├── ai-links.json           # AI tools data (100+ entries)
│   ├── post/                   # Article content (static imports)
│   │   ├── github/01/, 02/
│   │   ├── azure/01/
│   │   └── ai-ml/01/
│   └── skills/                 # Skill content (static imports)
│       └── ai/
│           ├── ai-academic-note/
│           └── ai-project-report/
└── public/                     # Static assets
    ├── portfolio/              # Hero video, contact bg, discover cards
    ├── link/img/               # Link icons
    ├── article/                # Article cover images
    └── download/               # Downloadable skill files
```

## Root Page — Tab SPA Architecture

The main portfolio (`app/page.tsx`) is a **client-side tab SPA**, not a scroll-snapping multi-section page.

```
app/page.tsx  ("use client")
│
├── useState<TabId>("home")      ← active tab state
├── useEffect → data-theme on <html>  ← contact theme sync
│
├── <header>  (portfolio-nav sticky)
│   ├── Brand (Portfolio + Sparkle)
│   ├── <nav>  (6 tab buttons)
│   └── CTA button → setActive("connect")
│
└── <main>
    ├── active === "home"     → <Hero />
    ├── active === "about"    → <About />
    ├── active === "timeline" → <Timeline />
    ├── active === "blogs"    → <Blogs />
    ├── active === "links"    → <Links />
    └── active === "connect"  → <ContactFooter />
```

Each tab panel is conditionally rendered — only the active panel is in the DOM. This means:
- No scroll state to manage
- Each panel mounts fresh (RevealObserver handles re-scanning `.reveal` elements)
- Contact theme applies/removes cleanly via `useEffect` on active tab

## Theme System

Two themes, switched via `data-theme` attribute on `<html>`:

| Attribute | Theme | When |
|-----------|-------|------|
| *(none)* | Dark (default) | All tabs except Connect |
| `data-theme="contact"` | Light orchid | Connect tab active |

CSS custom properties drive all colours. The `portfolio-nav` class reads `--nav-bg`, `--nav-border`, `--nav-cta-bg` etc. so the header reacts automatically.

## Static vs Client Components

| Component | Type | Reason |
|-----------|------|--------|
| `Hero` | Server | No interactivity (video `autoPlay` is fine) |
| `About` | Client | `onMouseEnter/Leave` on skill cards |
| `Timeline` | Client | `onMouseEnter/Leave` on timeline cards |
| `Blogs` | Client | Filter pill state |
| `Links` | Client | Sub-tab state + shimmer skeleton `useState` |
| `ContactFooter` | Server | No interactivity (HoverLink handles its own) |
| `ContactThemeSync` | Client | `useEffect` + `IntersectionObserver` |
| `RevealObserver` | Client | `IntersectionObserver` + `MutationObserver` |
| `page.tsx` | Client | Tab state, `useEffect` for theme |

## Data Flow

```
lib/portfolio/data.ts  →  Hero, About, ContactFooter (personal constants)
lib/articles.ts        →  Blogs, /article/* pages
lib/shortlinks.ts      →  Links component, /link/* pages
lib/ai-shortlinks.ts   →  Links component, /link/ai page
lib/skills.ts          →  /download/* pages
```

No API calls. All data is imported statically — safe for static export and edge runtime.

## URL Routing

| URL | Handler |
|-----|---------|
| `/` | Tab SPA (Home tab by default) |
| `/article` | Article index |
| `/article/[category]` | Category listing |
| `/article/[category]/[id]` | Article reader |
| `/link` | Shortlinks index (light theme) |
| `/link/ai` | AI tools index (light theme) |
| `/link/[code]` | Redirect page (1.8s animated) |
| `/download` | Downloads index |
| `/download/[category]/skill` | Skill category listing |
| `/download/[category]/skill/[slug]` | Skill detail + download |
