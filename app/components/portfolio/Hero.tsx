import HoverLink from "./ui/HoverLink";
import { PERSON, HERO } from "@/lib/portfolio/data";

export default function Hero() {
  const age = new Date().getFullYear() - PERSON.birthYear;

  return (
    <section
      id="home"
      className="relative overflow-hidden md:overflow-visible"
      style={{ padding: 0 }}
    >
      {/* ── Dark base background ── */}
      <div className="absolute inset-0 z-0" style={{ background: "#0a0812" }} />

      {/* ══════════════════════════════════════════════
          DESKTOP: two-column side-by-side grid
          MOBILE:  single column, text top / video bottom
      ══════════════════════════════════════════════ */}
      <div
        className="relative z-10 mx-auto w-full px-6 py-6
                   md:grid md:max-w-[1080px] md:items-center md:px-8
                   [min-height:calc(100svh_-_var(--nav-h))] md:[min-height:calc(100vh_-_var(--nav-h))]"
        style={{
          /* desktop only */
          gridTemplateColumns: "1fr 1fr",
        }}
      >

        {/* ═══════════ TEXT BLOCK ═══════════ */}
        <div className="flex flex-col justify-center md:pr-4">

          {/* Status pill */}
          <div
            className="reveal mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-[7px] text-[13px]"
            style={{
              background: "rgba(255,255,255,0.055)",
              borderColor: "rgba(255,255,255,0.16)",
              color: "rgba(255,255,255,0.68)",
              fontFamily: "var(--font-jetbrains-mono)",
            }}
          >
            <span
              className="h-[7px] w-[7px] shrink-0 rounded-full"
              style={{
                background: "#84b381",
                boxShadow: "0 0 8px #84b381",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            {PERSON.status} · {PERSON.location}
          </div>

          {/* Name */}
          <h1
            className="reveal mb-4"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 800,
              /* mobile: bigger relative to vw; desktop: clamped smaller */
              fontSize: "clamp(3rem, 12vw, 5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ display: "block", color: "#ffffff" }}>
              {PERSON.firstName}
            </span>
            <span
              style={{
                display: "block",
                background: "linear-gradient(110deg,#9c6ade 0%,#be8ef5 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {PERSON.lastName}
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="reveal mb-6 text-[15px] leading-[1.75] md:mb-8 md:max-w-[400px]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {age}-year-old developer from {PERSON.location}, studying towards a{" "}
            <span style={{ color: "#9c6ade", fontWeight: 500 }}>{PERSON.degree}</span>{" "}
            and {PERSON.tagline}.
          </p>

          {/* CTAs — hidden on mobile, visible on desktop */}
          <div className="reveal hidden flex-wrap gap-4 md:flex">
            <HoverLink
              href={HERO.ctaPrimary.href}
              className="inline-flex items-center gap-2 rounded-full px-7 py-[11px] text-[14px] font-semibold"
              style={{
                background: "linear-gradient(135deg,#7c3aed 0%,#9c6ade 100%)",
                color: "#fff",
                boxShadow: "0 0 28px rgba(124,58,237,0.5)",
              }}
              hoverStyle={{
                transform: "translateY(-2px)",
                boxShadow: "0 8px 36px rgba(124,58,237,0.7)",
              }}
            >
              {HERO.ctaPrimary.label}
            </HoverLink>

            <HoverLink
              href={HERO.ctaSecondary.href}
              className="inline-flex items-center gap-2 rounded-full border px-7 py-[11px] text-[14px] font-semibold"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.2)",
                color: "#fff",
              }}
              hoverStyle={{
                background: "rgba(255,255,255,0.1)",
                transform: "translateY(-2px)",
              }}
            >
              {HERO.ctaSecondary.label}
            </HoverLink>
          </div>

          {/* Scroll hint — desktop only (left-aligned under CTAs) */}
          <div className="reveal mt-10 hidden items-center gap-3 md:flex">
            <div
              className="flex h-[30px] w-[18px] items-start justify-center rounded-full border pt-[5px]"
              style={{ borderColor: "rgba(255,255,255,0.18)" }}
            >
              <div
                className="h-[8px] w-[2px] rounded-full"
                style={{
                  background: "rgba(255,255,255,0.28)",
                  animation: "float 1.8s ease-in-out infinite",
                }}
              />
            </div>
            <span
              className="text-[11px] tracking-[0.22em] uppercase"
              style={{
                color: "rgba(255,255,255,0.28)",
                fontFamily: "var(--font-jetbrains-mono)",
              }}
            >
              {HERO.scrollHint}
            </span>
          </div>
        </div>

        {/* ═══════════ VIDEO ═══════════ */}
        <div
          className="reveal relative flex items-center justify-center
                     mt-2 md:mt-0 md:h-full"
          style={{
            /* desktop keeps the min-size constraint */
            minHeight: undefined,
            overflow: "visible",
          }}
        >
          <div
            style={{
              position: "relative",
              /* mobile: fill width; desktop: up to 900px */
              width: "min(100%, 900px)",
              aspectRatio: "1 / 1",
              overflow: "hidden",
              maskImage: `
                linear-gradient(to right,  transparent 0%, black 18%, black 82%, transparent 100%),
                linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)
              `,
              WebkitMaskImage: `
                linear-gradient(to right,  transparent 0%, black 18%, black 82%, transparent 100%),
                linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)
              `,
              maskComposite: "intersect",
              WebkitMaskComposite: "destination-in",
            }}
          >
            <video
              src={HERO.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                mixBlendMode: "screen",
              }}
            />
          </div>
        </div>

        {/* ── Mobile-only scroll hint — centered below video ── */}
        <div className="flex flex-col items-center gap-2 pb-6 pt-2 md:hidden">
          <div
            className="flex h-[30px] w-[18px] items-start justify-center rounded-full border pt-[5px]"
            style={{ borderColor: "rgba(255,255,255,0.18)" }}
          >
            <div
              className="h-[8px] w-[2px] rounded-full"
              style={{
                background: "rgba(255,255,255,0.28)",
                animation: "float 1.8s ease-in-out infinite",
              }}
            />
          </div>
          <span
            className="text-[10px] tracking-[0.22em] uppercase"
            style={{
              color: "rgba(255,255,255,0.28)",
              fontFamily: "var(--font-jetbrains-mono)",
            }}
          >
            {HERO.scrollHint}
          </span>
        </div>

      </div>
    </section>
  );
}
