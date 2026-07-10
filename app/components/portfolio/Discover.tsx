import Image from "next/image";
import { PERSON } from "@/lib/portfolio/data";

function cardGlow(color: string) {
  return {
    filter: `drop-shadow(0 0 6px ${color}99) drop-shadow(0 0 14px ${color}55)`,
  };
}

const CARDS = [
  {
    href: "/link",
    image: "/portfolio/discover/card1.png",
    alt: "Links — Everything that connects me online",
    color: "#6E5BFF",
    style: { left: "10%", right: "47%", top: "28%", bottom: "42%" },
  },
  {
    href: "/article",
    image: "/portfolio/discover/card2.png",
    alt: "Articles & Blogs — Thoughts, tutorials and technical articles",
    color: "#D95CFF",
    style: { left: "51%", right: "18%", top: "28%", bottom: "42%" },
  },
  {
    href: "#",
    image: "/portfolio/discover/card3.png",
    alt: "Projects — Apps, websites and experiments I've built",
    color: "#2AAEFF",
    style: { left: "22%", right: "49%", top: "64%", bottom: "6%" },
  },
  {
    href: "/download",
    image: "/portfolio/discover/card4.png",
    alt: "Downloads — Resources, templates and useful files",
    color: "#FF9A2E",
    style: { left: "51%", right: "12%", top: "64%", bottom: "6%" },
  },
] as const;

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

      {/* Percentage-based canvas */}
      <div
        className="relative z-10 w-full"
        style={{ minHeight: "calc(100vh - var(--nav-h))" }}
      >
        {/* Header — top-left */}
        <div
          className="absolute z-30"
          style={{ left: "6%", top: "12%", maxWidth: "32%" }}
        >
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
            Choose a destination to explore
            <br />
            my work, resources and ideas.
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

        {/* Child character — central anchor, overlaps top card row */}
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
          <a
            key={card.image}
            href={card.href}
            className="absolute z-10 block transition-transform duration-300 hover:scale-[1.02]"
            style={card.style}
          >
            <Image
              src={card.image}
              alt={card.alt}
              fill
              className="object-contain"
              style={cardGlow(card.color)}
              sizes="(max-width: 768px) 45vw, 39vw"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
