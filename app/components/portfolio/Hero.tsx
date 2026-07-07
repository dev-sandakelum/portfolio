import HoverLink from "./ui/HoverLink";
import Sparkle from "./Sparkle";

export default function Hero() {
  return (
    <section className="snap-section text-center" id="hero">
      <div className="section-inner flex flex-col items-center">

        {/* Status pill */}
        <div
          className="reveal mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text-dim)",
            fontFamily: "var(--font-jetbrains-mono)",
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background: "var(--green)",
              boxShadow: "0 0 8px var(--green)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          Open to collaborations · Sri Lanka
        </div>

        {/* Hero sparkle mark */}
        <div
          className="reveal mb-7"
          style={{ animation: "spin-slow 12s linear infinite, float 4s ease-in-out infinite" }}
        >
          <Sparkle size={64} />
        </div>

        {/* Name */}
        <h1
          className="reveal mb-5 leading-[1.05] tracking-tighter"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 700,
            fontSize: "clamp(2.4rem, 6vw, 4.4rem)",
            background: "linear-gradient(120deg, #fff 30%, var(--text-dim))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Hasitha Sandakelum
        </h1>

        {/* Role tagline */}
        <p
          className="reveal mx-auto mb-10 max-w-[540px] leading-relaxed"
          style={{
            color: "var(--text-dim)",
            fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
          }}
        >
          {new Date().getFullYear() - 2005}-year-old developer from Sri Lanka, studying towards a{" "}
          <span className="grad-text font-semibold">Bachelor of ICT</span>{" "}
          and building products at the intersection of{" "}
          <span className="grad-text font-semibold">code and design</span>.
        </p>

        {/* CTA buttons */}
        <div className="reveal flex flex-wrap items-center justify-center gap-4">
          <HoverLink
            href="#about"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
            style={{ background: "var(--gradient)", color: "#08090d" }}
            hoverStyle={{
              transform: "translateY(-2px)",
              boxShadow: "0 12px 32px -8px rgba(156,106,222,0.55)",
            }}
          >
            Explore ↓
          </HoverLink>

          <HoverLink
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
            hoverStyle={{
              background: "var(--surface-hover)",
              transform: "translateY(-2px)",
            }}
          >
            Contact me
          </HoverLink>
        </div>

        {/* Scroll hint */}
        <p
          className="reveal mt-16 text-xs tracking-widest uppercase"
          style={{ color: "var(--text-faint)", fontFamily: "var(--font-jetbrains-mono)" }}
        >
          scroll to explore
        </p>
      </div>
    </section>
  );
}
