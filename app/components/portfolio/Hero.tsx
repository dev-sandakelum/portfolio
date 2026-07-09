import HoverLink from "./ui/HoverLink";

export default function Hero() {
  const age = new Date().getFullYear() - 2005;

  return (
    <section
      id="hero"
      className="snap-section relative overflow-hidden"
      style={{ padding: 0 }}
    >
      {/* ── Dark base background ── */}
      <div className="absolute inset-0 z-0" style={{ background: "#0a0812" }} />

      {/* ── Two-column grid ── */}
      <div
        className="relative z-10 mx-auto grid w-full max-w-[1080px] items-center px-8 py-6"
        style={{
          gridTemplateColumns: "1fr 1fr",
          minHeight: "calc(100vh - var(--nav-h))",
        }}
      >
        {/* ═══════════ LEFT ═══════════ */}
        <div className="flex flex-col justify-center pr-4">

          {/* Status pill */}
          <div
            className="reveal mb-7 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-[7px] text-[13px]"
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
            Open to collaborations · Sri Lanka
          </div>

          {/* ── Name: clean bold two-line matching original design ── */}
          <h1
            className="reveal mb-5"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 4.8vw, 5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ display: "block", color: "#ffffff" }}>
              Hasitha
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
              Sandakelum
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="reveal mb-8 max-w-[400px] text-[14.5px] leading-[1.75]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {age}-year-old developer from Sri Lanka, studying towards a{" "}
            <span style={{ color: "#9c6ade", fontWeight: 500 }}>Bachelor of ICT</span>{" "}
            and building products at the intersection of{" "}
            <span style={{ color: "#9c6ade", fontWeight: 500 }}>code</span> and{" "}
            <span style={{ color: "#9c6ade", fontWeight: 500 }}>design</span>.
          </p>

          {/* CTAs */}
          <div className="reveal flex flex-wrap gap-4">
            <HoverLink
              href="#about"
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
              Explore ↓
            </HoverLink>

            <HoverLink
              href="#contact"
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
              Contact me
            </HoverLink>
          </div>

          {/* Scroll hint */}
          <div className="reveal mt-12 flex items-center gap-3">
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
              Scroll to explore
            </span>
          </div>
        </div>

        {/* ═══════════ RIGHT: looping video ═══════════ */}
        <div
          className="reveal relative flex h-full items-center justify-center"
          style={{ minHeight: "600px", minWidth :"600px" , overflow: "visible"  }}
        >
          {/* Square crop wrapper — clips 16:9 video to 1:1 */}
          <div
            style={{
              position: "relative",
              width: "min(100%, 900px)",
              aspectRatio: "1 / 1",
              overflow: "hidden",
              /* 4-edge linear fade mask */
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
              src="/portfolio/hero2.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",   /* crops 16:9 → 1:1 center */
                objectPosition: "center center",
                mixBlendMode: "screen",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
