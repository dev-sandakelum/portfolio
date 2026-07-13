# Styling

## CSS Custom Properties

Defined in `app/globals.css` under `:root`. These drive the entire design system.

### Colours

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg` | `#08090d` | Page background |
| `--bg-elevated` | `#0d0f16` | Elevated surfaces |
| `--surface` | `rgba(255,255,255,0.045)` | Card backgrounds |
| `--surface-hover` | `rgba(255,255,255,0.075)` | Card hover state |
| `--border` | `rgba(255,255,255,0.09)` | Default borders |
| `--text` | `#eef0f4` | Primary text |
| `--text-dim` | `#93969f` | Secondary text |
| `--text-faint` | `#5c5f68` | Tertiary/metadata text |
| `--blue` | `#4992ea` | Accent blue, eyebrow labels |
| `--purple` | `#9c6ade` | Accent purple, hover states |
| `--pink` | `#e8535d` | Accent pink |
| `--gold` | `#dbb82d` | Gold accent (available) |
| `--green` | `#84b381` | Status dot colour |

### Gradient

```css
--gradient: linear-gradient(120deg, var(--blue) 0%, var(--purple) 52%, var(--pink) 100%);
```

Used for: icon backgrounds, Sparkle component, gradient text, active states.

### Nav

| Variable | Dark value | Contact value |
|----------|-----------|---------------|
| `--nav-h` | `64px` | `64px` |
| `--nav-bg` | `rgba(10,8,18,0.72)` | `transparent` |
| `--nav-border` | `rgba(255,255,255,0.07)` | `transparent` |
| `--nav-cta-bg` | `linear-gradient(135deg,#7c3aed,#9c6ade)` | `rgba(255,255,255,0.88)` |
| `--nav-cta-color` | `#ffffff` | `#2D1B6B` |
| `--nav-cta-shadow` | `0 0 20px rgba(124,58,237,0.45)` | `0 0 20px rgba(180,140,255,0.35)` |

---

## Contact Theme

When `data-theme="contact"` is set on `<html>`:

| Variable | Override |
|----------|---------|
| `--bg` | `#A88BE3` (light orchid) |
| `--surface` | `rgba(220,209,247,0.25)` |
| `--border` | `rgba(134,103,194,0.28)` |
| `--text` | `#2D1B6B` (dark violet) |
| `--text-dim` | `#2D1B6B` |
| `--purple` | `#8667C2` |
| `--pink` | `#E573AB` |
| `--gradient` | `linear-gradient(120deg,#8667C2,#E573AB)` |

Transition is animated: `background-color 0.7s` and `color 0.7s` on `html`, `background 0.7s` and `border-color 0.7s` on `nav` and `.orb`.

---

## Fonts

Loaded via `next/font/google` in `app/layout.tsx`:

| Font | Variable | Weights | Usage |
|------|----------|---------|-------|
| Space Grotesk | `--font-space-grotesk` | 400–700 | Headings, nav brand, labels |
| JetBrains Mono | `--font-jetbrains-mono` | 400–500 | Mono labels, dates, tags, metadata |
| Inter | `--font-inter` | 400–600 | Body text (default body font) |

---

## CSS Utility Classes

### `.reveal` / `.reveal.in`

Scroll-reveal animation:
```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.in { opacity: 1; transform: translateY(0); }
```

Stagger delays applied to `.reveal:nth-child(2–5)` (0.1s – 0.4s).

Exception: `#contact .reveal` uses fade-only (no translateY) with 0.9s duration.

### `.orb`

Fixed blur sphere for ambient background:
```css
.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.22;
  z-index: 0;
  pointer-events: none;
}
```

### `.grad-text`

Gradient text shorthand:
```css
.grad-text {
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

### `.sparkle-icon`

CSS mask sparkle using SVG star path with site gradient.

### `.text-3d-purple`

Clay text effect with layered text-shadow:
```css
.text-3d-purple {
  color: #d8b4fe;
  text-shadow: (7 layers of offset shadows in purple palette);
}
```

### `.portfolio-nav`

Nav theming class — reads `--nav-bg`, `--nav-border` for background/border, transitions on theme change.

Sub-classes: `.nav-brand`, `.nav-link`, `.nav-cta` — each reads corresponding CSS vars.

### `.snap-section` / `.snap-section-last`

Legacy scroll-snap section styles (still in CSS but components no longer use them in the tab SPA).

### `.contact-bg-fixed`

Fixed full-viewport background image that fades in when `data-theme="contact"` is set:
- Desktop: `/portfolio/contact_bg.jpg`
- Mobile: `/portfolio/contact_bg_mobile.png`

---

## Keyframe Animations

| Name | Effect | Used in |
|------|--------|---------|
| `pulse` | opacity 1→0.35→1 | Status dot in Hero |
| `float` | translateY 0→-8px→0 | Scroll hint in Hero |
| `spin-slow` | rotate 0→360 + scale | Available, not currently used |
| `_shimmer` | background-position sweep | Skeleton loading in Links |

---

## Responsive Breakpoints

| Breakpoint | Class prefix | Behaviour |
|------------|-------------|-----------|
| < 640px | (mobile) | Single column, compact spacing |
| 640px+ | `sm:` | Medium layout adjustments |
| 768px+ | `md:` | Nav links visible, Hero 2-column |
| 1024px+ | `lg:` | Discover desktop canvas |

Key patterns:
- Hero: `md:grid` → 2-column; single column on mobile
- About: `about-grid` switches to single column at 700px via inline `<style>`
- Nav links: `hidden md:flex` — dots shown on mobile instead
- Discover: CSS classes `discover-desktop-canvas` (≥1024) vs `discover-responsive-layout` (<1024)
