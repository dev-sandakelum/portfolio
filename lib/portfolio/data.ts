// ─────────────────────────────────────────────────────────────
//  Personal data — edit ONLY this file to update portfolio info
// ─────────────────────────────────────────────────────────────

export const PERSON = {
  firstName:  "Hasitha",
  lastName:   "Sandakelum",
  fullName:   "Hasitha Sandakelum",
  birthYear:  2005,
  location:   "Sri Lanka",
  degree:     "Bachelor of ICT",
  status:     "Open to collaborations",
  email:      "dev.sandakelum@gmail.com",
  github:     "https://github.com/dev-sandakelum",
  linkedin:   "https://linkedin.com/in/hasitha-sandakelum",
  tagline:    "building products at the intersection of code and design",
};

// ── Nav ────────────────────────────────────────────────────────
export const NAV = {
  brand:  "Portfolio",
  cta:    "Get in touch",
  links: [
    { href: "#hero",    label: "Home" },
    { href: "#contact", label: "Contact" },
  ],
};

// ── Hero section ───────────────────────────────────────────────
export const HERO = {
  statusPill:   "Open to collaborations",   // overrides PERSON.status if needed
  ctaPrimary:   { label: "Explore ↓",   href: "#contact" },
  ctaSecondary: { label: "Contact me",  href: "#contact" },
  scrollHint:   "Scroll to explore",
  videoSrc:     "/portfolio/hero2.mp4",
};

// ── Contact section ────────────────────────────────────────────
export const CONTACT = {
  eyebrow:  "Contact",
  heading:  "Let's build something",
  subtext:  "Open to internships, collaborations, and community projects. Reach out through GitHub or email.",
  buttons: {
    email:    "Email me",
    github:   "GitHub ↗",
    linkedin: "LinkedIn ↗",
  },
};
