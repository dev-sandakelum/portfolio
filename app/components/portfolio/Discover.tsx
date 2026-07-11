"use client";
import Image from "next/image";
import { useState } from "react";
import { PERSON } from "@/lib/portfolio/data";

const CARDS = [
  {
    href: "/link",
    image: "/portfolio/discover/card1.png",
    alt: "Links — Everything that connects me online",
    color: "#6E5BFF",
    /** Desktop absolute position — used only on ≥1024px canvas */
    desktopStyle: { left: "10%", right: "47%", top: "28%", bottom: "42%" },
  },
  {
    href: "/article",
    image: "/portfolio/discover/card2.png",
    alt: "Articles & Blogs — Thoughts, tutorials and technical articles",
    color: "#D95CFF",
    desktopStyle: { left: "51%", right: "18%", top: "28%", bottom: "42%" },
  },
  {
    href: "#",
    image: "/portfolio/discover/card3.png",
    alt: "Projects — Apps, websites and experiments I've built",
    color: "#2AAEFF",
    desktopStyle: { left: "22%", right: "49%", top: "64%", bottom: "6%" },
  },
  {
    href: "/download",
    image: "/portfolio/discover/card4.png",
    alt: "Downloads — Resources, templates and useful files",
    color: "#FF9A2E",
    desktopStyle: { left: "51%", right: "12%", top: "64%", bottom: "6%" },
  },
] as const;

/* ── Desktop card (absolute-positioned within the % canvas) ── */
function DesktopCard({
  href,
  image,
  alt,
  color,
  desktopStyle,
}: typeof CARDS[number]) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      className="absolute z-10 block"
      style={desktopStyle as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-contain"
        style={{
          filter: hovered
            ? `drop-shadow(0 0 10px ${color}cc) drop-shadow(0 0 28px ${color}88) drop-shadow(0 0 48px ${color}44)`
            : `drop-shadow(0 0 5px ${color}66) drop-shadow(0 0 12px ${color}33)`,
          transition: "filter 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        sizes="39vw"
      />
    </a>
  );
}

/* ── Responsive card (inside CSS grid for tablet / mobile) ── */
function ResponsiveCard({
  href,
  image,
  alt,
  color,
}: Omit<typeof CARDS[number], "desktopStyle">) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      className="discover-resp-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-contain"
        style={{
          filter: hovered
            ? `drop-shadow(0 0 10px ${color}cc) drop-shadow(0 0 28px ${color}88) drop-shadow(0 0 48px ${color}44)`
            : `drop-shadow(0 0 5px ${color}66) drop-shadow(0 0 12px ${color}33)`,
          transition: "filter 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        sizes="(max-width: 767px) 90vw, 45vw"
      />
    </a>
  );
}

export default function Discover() {
  return (
    <section
      id="discover"
      className="snap-section relative overflow-hidden"
      style={{ padding: 0, background: "#09091a" }}
    >
      {/* Ambient purple glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 42%, rgba(80,40,160,0.28) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* bg.png — full cover background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/portfolio/discover/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════════
          DESKTOP CANVAS  ≥ 1024 px
          Exact same absolute-position layout as before.
          Hidden on tablet / mobile via CSS.
      ══════════════════════════════════════════════════════════ */}
      <div
        className="discover-desktop-canvas relative z-10 w-full"
        style={{ minHeight: "calc(100vh - var(--nav-h))" }}
      >
        {/* Header — top-left */}
        <div className="absolute z-30" style={{ left: "6%", top: "12%", maxWidth: "32%" }}>
          <h2
            className="mb-3 leading-tight"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
              color: "#fff",
            }}
          >
            Discover{" "}
            <span
              style={{
                background: "linear-gradient(110deg,#9c6ade 0%,#be8ef5 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              More
            </span>
          </h2>
          <p
            className="mb-4 text-[14px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Choose a destination to explore<br />my work, resources and ideas.
          </p>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-[6px] text-[8px]"
            style={{
              color: "rgba(255,255,255,0.68)",
              fontFamily: "var(--font-jetbrains-mono)",
            }}
          >
            {PERSON.status} · {PERSON.location}
          </div>
        </div>

        {/* Child character — anchored between Card 1/2 and Card 3/4 */}
        <div
          className="pointer-events-none absolute z-20"
          style={{ left: "28%", right: "33%", top: "32%", bottom: "20%" }}
          aria-hidden="true"
        >
          <Image
            src="/portfolio/discover/child.png"
            alt=""
            fill
            priority
            className="object-contain object-bottom"
            sizes="40vw"
          />
        </div>

        {/* Four-quadrant cards */}
        {CARDS.map((card) => (
          <DesktopCard key={card.image} {...card} />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════
          RESPONSIVE LAYOUT  < 1024 px
          - Mobile (<768px): single-column stack, child above card 1
          - Tablet (768–1023px): 2-col grid, child scaled/centered top
          Shown only below 1024px via CSS.
      ══════════════════════════════════════════════════════════ */}
      <div className="discover-responsive-layout">
        {/* Section header */}
        <div className="discover-resp-header">
          <h2
            className="leading-tight"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 6vw, 2.2rem)",
              color: "#fff",
              marginBottom: "0.5rem",
            }}
          >
            Discover{" "}
            <span
              style={{
                background: "linear-gradient(110deg,#9c6ade 0%,#be8ef5 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              More
            </span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(0.78rem, 2.2vw, 0.9rem)",
              lineHeight: 1.6,
              marginBottom: "0.4rem",
            }}
          >
            Choose a destination to explore my work, resources and ideas.
          </p>
          <div
            style={{
              color: "rgba(255,255,255,0.60)",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.65rem",
            }}
          >
            {PERSON.status} · {PERSON.location}
          </div>
        </div>

        {/* Child character — mascot above the card grid */}
        <div className="discover-child-responsive" aria-hidden="true">
          <Image
            src="/portfolio/discover/child.png"
            alt=""
            fill
            priority
            className="object-contain object-bottom"
            sizes="(max-width: 767px) 60px, 28vw"
          />
        </div>

        {/* Cards grid — 1 col on mobile, 2 col on tablet */}
        <div className="discover-cards-grid">
          {CARDS.map((card) => (
            <ResponsiveCard
              key={card.image}
              href={card.href}
              image={card.image}
              alt={card.alt}
              color={card.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
