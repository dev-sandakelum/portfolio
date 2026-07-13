# Pages

## Root Page — `/`

**File:** `app/page.tsx`  
**Type:** Client Component (`"use client"`)

The main portfolio is a single-page tab application. No sub-navigation, no URL changes between tabs.

### Tabs

| Tab ID | Label | Component | Scrollable |
|--------|-------|-----------|-----------|
| `home` | Home | `Hero` | No — fills viewport |
| `about` | About | `About` | No — fills viewport |
| `timeline` | Timeline | `Timeline` | Yes — natural height |
| `blogs` | Blogs | `Blogs` | Yes — natural height |
| `links` | Links | `Links` | Yes — natural height |
| `connect` | Connect | `ContactFooter` | No — fills viewport |

### Header / Nav

- Sticky, uses `portfolio-nav` CSS class
- Brand: "Portfolio" with Sparkle icon
- Desktop: 6 tab buttons, active tab gets underline indicator + tinted bg
- Mobile: 6 dot indicators
- "Get in touch" CTA button → activates `connect` tab
- On connect tab: underline/highlight shifts to orchid/pink palette
- On connect tab: `data-theme="contact"` set on `<html>` via `useEffect`

### Contact Theme

When the connect tab is active, `useEffect` sets `data-theme="contact"` on `<html>`. This flips CSS custom properties for the entire page, turning the nav transparent and the background to light orchid purple. When any other tab is selected, the attribute is removed.

---

## Article Index — `/article`

**File:** `app/article/page.tsx`  
**Type:** Server Component

Shows:
1. **Categories grid** — 3 columns (GitHub 🐙, Azure ☁️, AI/ML 🤖) with article counts
2. **Recent articles list** — 5 most recent across all categories

Each category card links to `/article/[category]`. Each article row links to `/article/[category]/[id]`.

Back link → `/` (Home)

---

## Category Page — `/article/[category]`

**File:** `app/article/[category]/page.tsx`  
**Type:** Server Component

- `generateStaticParams` pre-generates pages for all registered categories
- Shows category header (icon, label, description in both English and Sinhala)
- Lists all articles in that category sorted newest-first
- Each article shows: Sinhala title, English subtitle, description, date, reading time, tags
- If no articles: shows "ලිපි නොමැත" (No articles yet) message
- Back link → `/article`

---

## Article Reader — `/article/[category]/[id]`

**File:** `app/article/[category]/[id]/page.tsx`  
**Type:** Server Component

- `generateStaticParams` pre-generates all article pages
- If article has `coverImage`: renders it as a blurred fixed background with dark overlay
- Header: category badge, Sinhala title, English subtitle, date, reading time, tags
- Description callout box (blue-tinted)
- Article body rendered via `ArticleBody` client component (handles markdown/rich content)
- Footer nav: back to category, link to all articles
- Back link → `/article/[category]`

---

## Links Index — `/link`

**File:** `app/link/page.tsx`  
**Type:** Server Component  
**Theme:** Light (slate-50 background)

Standalone page (separate from portfolio tab) showing all public shortlinks:
- **Social** section: LinkedIn, GitHub, YouTube, WhatsApp
- **Microsoft Learn Plans** section: MS Learn Plan A through K

Each row has: icon badge, label, subtitle/domain, chevron arrow.  
All rows link to `/link/[code]` which handles the redirect.

---

## AI Tools Index — `/link/ai`

**File:** `app/link/ai/page.tsx`  
**Type:** Server Component  
**Theme:** Light (slate-50 background)

Standalone page showing all AI tools grouped by category:

| Category | Label |
|----------|-------|
| chat | 💬 Chat |
| code | 💻 Code |
| design | 🎨 Design |
| image | 🖼 Image |
| write | ✍ Write |
| audio | 🎵 Audio |
| video | 🎬 Video |
| search | 🔍 Search |
| data | 📊 Data |
| util | ⚙ Utilities |

Each tool card shows icon, name, subtitle. Links to `/link/[code]`.

---

## Link Redirect — `/link/[code]`

**File:** `app/link/[code]/page.tsx`  
**Type:** Client Component

Animated redirect page:
1. Looks up the shortlink by code via `getShortlinkByCode(code)`
2. If not found: shows 404 with back link
3. If found: animated progress bar at top, card with icon/label/subtitle, 3 bouncing dots
4. After 1.8 seconds (cubic-ease progress): redirects to `destinationUrl`

Handles both simple codes (`linkedin`) and slash codes (`msplan/a`, `chat/chatgpt`).

---

## Downloads Index — `/download`

**File:** `app/download/page.tsx`  
**Type:** Server Component  
**Theme:** Light (slate-50 background)

Lists all skill download categories. Currently only one: **AI Skills** 🤖.  
Each category links to `/download/[category]/skill`.

---

## Skill Category — `/download/[category]/skill`

Lists all skills within a category with download counts.

---

## Skill Detail — `/download/[category]/skill/[slug]`

Shows skill detail and download button(s) for a specific skill file.
