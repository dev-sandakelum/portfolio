# Components

All portfolio components live in `app/components/portfolio/`.

---

## Tab Section Components

### `Hero.tsx` — Home tab

**Type:** Server Component  
**Section ID:** `#home`

Two-column layout (desktop) / single column (mobile):
- **Left:** Status pill (pulsing green dot + status text), name in gradient, tagline, two CTA buttons, scroll hint
- **Right:** Video (`/portfolio/hero2.mp4`) with `mixBlendMode: screen` and feathered mask edges

The video is muted, auto-playing, looped. The feathering is done with CSS `mask-image` combining left/right and top/bottom linear gradients with `mask-composite: intersect`.

CTAs link to `#contact` (triggers the connect tab via hash — note: currently the tab SPA doesn't read hash, so these are visual).

---

### `About.tsx` — About tab

**Type:** Client Component (`"use client"`)  
**Section ID:** `#about`

Two-column grid (desktop) / stacked (mobile via inline `<style>`):
- **Left column:** Eyebrow label, heading, two bio paragraphs, 3 stat cards (age, years coding, projects)
- **Right column:** "Skills & Tools" heading, 2×4 grid of skill chips

**Stats:** Dynamically calculated age from `PERSON.birthYear`.  
**Skills hardcoded in component:** Next.js, TypeScript, React, Azure, GitHub, AI/ML, Tailwind, Node.js  
**Hover:** Skill cards lift with purple border via inline `onMouseEnter/Leave`.

---

### `Timeline.tsx` — Timeline tab

**Type:** Client Component (`"use client"`)  
**Section ID:** `#timeline`

Vertical timeline with 6 hardcoded events. Scrollable (natural height).

**Each event has:** year, title, description, tag chip, icon  
**Visual:** Vertical gradient line, dot (purple glow for "current" event), card that slides right on hover  
**Current event** ("Open to Collaborations") has a glowing purple dot and highlighted border.

**Events (hardcoded):**
| Year | Title | Tag |
|------|-------|-----|
| 2023 | Started Bachelor of ICT | Education |
| 2023 | First Open-Source Contributions | GitHub |
| 2024 | Started Writing Tech Articles | Writing |
| 2024 | Built Portfolio v1 | Project |
| 2025 | Exploring AI & Cloud | AI / Cloud |
| Now | Open to Collaborations | Current |

---

### `Blogs.tsx` — Blogs tab

**Type:** Client Component (`"use client"`)  
**Section ID:** `#blogs`

Filter pills + card grid. Scrollable (natural height).

- **Filter pills:** "All" + one per article category (GitHub, Azure, AI/ML)
- **Cards:** `auto-fill minmax(240px, 1fr)` grid — cover image (136px tall) or emoji fallback, category tag, English title, description (2-line clamp), date + reading time, arrow circle
- **Hover:** Card lifts 4px, border glows purple, arrow circle fills purple, cover image scales 1.06
- "View all posts →" link to `/article` at the bottom

Data from `getAllArticles()` and `CATEGORIES` in `lib/articles.ts`.

---

### `Links.tsx` — Links tab

**Type:** Client Component (`"use client"`)  
**Section ID:** `#links`

Two sub-tabs: **My Links** and **AI Tools**.

#### My Links sub-tab
- **Social** section: LinkedIn, GitHub, YouTube, WhatsApp — row layout with icon, label, subtitle, chevron
- **Microsoft Learn Plans** section: 8 MS Learn plans — same row layout

#### AI Tools sub-tab
- Groups from `getAiLinkCategories()` — 10 categories, 100+ tools
- Card grid (`auto-fill minmax(120px, 1fr)`) — 48×48 icon, name, subtitle

#### Shimmer Skeleton
Both sections use `SkeletonImg` — shows a shimmer animation until `onLoad` fires, then fades the image in with 0.25s opacity transition.

```
SkeletonImg props:
  src: string
  alt: string
  size: number        (px — used for both width and height)
  radius?: string     (border-radius, default "11px")
```

---

### `ContactFooter.tsx` — Connect tab

**Type:** Server Component  
**Section ID:** `#contact`

Full-viewport centered card. Renders `ContactThemeSync` which applies the orchid theme.

**Card contents:**
- Eyebrow: "Contact"
- Heading: "Let's build something"
- Subtext: open to internships/collaborations
- Three buttons: Email me, GitHub ↗, LinkedIn ↗

Buttons use `HoverLink` for hover lift effect. GitHub and LinkedIn buttons show brand icons from `/link/img/`.

---

## Utility Components

### `ContactThemeSync.tsx`

**Type:** Client Component  
**Purpose:** Watches `#contact` visibility and toggles `data-theme="contact"` on `<html>`

Uses `IntersectionObserver` with `threshold: 0.45`. Cleanup removes the attribute so switching tabs always resets the theme properly.

Also renders a fixed `div.contact-bg-fixed` — a full-viewport background image that fades in/out via CSS when `data-theme="contact"` is set. Uses `/portfolio/contact_bg.jpg` (desktop) and `/portfolio/contact_bg_mobile.png` (mobile).

---

### `RevealObserver.tsx`

**Type:** Client Component  
**Purpose:** Adds `.in` class to `.reveal` elements when they enter the viewport

Two observers:
1. `IntersectionObserver` (threshold 0.08) — fires when element scrolls into view
2. `MutationObserver` — re-scans when new DOM nodes appear (handles tab switches where fresh content mounts)

On each scan, elements already in the viewport (`getBoundingClientRect()`) get `.in` immediately without waiting for an intersection event.

---

### `OrbBackground.tsx`

**Type:** Server Component  
**Purpose:** Three fixed blur orbs for ambient background glow

| Orb | Colour | Position |
|-----|--------|---------|
| 1 | `--blue` | top: -180px, left: -120px, 520×520 |
| 2 | `--pink` | top: 30%, right: -180px, 460×460 |
| 3 | `--purple` | bottom: -160px, left: 20%, 420×420 |

Uses `.orb` class: `position: fixed`, `filter: blur(90px)`, `opacity: 0.22`.

---

### `Sparkle.tsx`

**Type:** Server Component  
**Purpose:** CSS-mask star/sparkle icon using the site gradient

Uses `.sparkle-icon` class which applies `background: var(--gradient)` through an SVG mask of a 4-pointed star path.

```tsx
<Sparkle size={16} />           // small nav sparkle
<Sparkle size={30} />           // section heading sparkle
<Sparkle size={36} />           // article page heading sparkle
```

---

## UI Primitives — `ui/`

### `ui/HoverCard.tsx`

**Type:** Client Component  
**Purpose:** A `div` wrapper that applies hover styles via inline JS (avoids Tailwind pseudo-class conflicts with dynamic styles)

```tsx
<HoverCard
  className="rounded-2xl border"
  style={{ background: "var(--surface)", borderColor: "var(--border)" }}
  hoverBorderColor="rgba(167,139,250,.45)"
  hoverBackground="var(--surface-hover)"
  hoverTransform="translateY(-2px)"
>
  {children}
</HoverCard>
```

Resets all hover styles on `mouseLeave` using the original `style` prop values.

---

### `ui/HoverLink.tsx`

**Type:** Client Component  
**Purpose:** An `<a>` wrapper with `hoverStyle` prop — merges styles on enter, reverts on leave

```tsx
<HoverLink
  href="/article"
  style={{ color: "var(--text-faint)" }}
  hoverStyle={{ color: "var(--text-dim)" }}
>
  ← Back
</HoverLink>
```

---

## Legacy Components (defined but not used in root page)

| Component | Notes |
|-----------|-------|
| `Discover.tsx` | Original "Discover More" section with 4 image cards — used to be the "Links" tab, now replaced by `Links.tsx` |
| `PortfolioNav.tsx` | Static nav using `NAV` data from `data.ts` — replaced by inline nav in `page.tsx` |
| `ScrollDots.tsx` | Right-side dot navigation — only works with scroll-snap SPA, not tab SPA |
| `SmoothScroller.tsx` | JS-driven quintic ease scroll + native mobile snap — only works with scroll-snap SPA |

These files remain in the repo as they may be reused if the scroll architecture is restored.
