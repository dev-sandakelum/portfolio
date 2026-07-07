import Eyebrow from "./Eyebrow";
import HoverLink from "./ui/HoverLink";
import Sparkle from "./Sparkle";

export default function ContactFooter() {
  return (
    <section className="snap-section-last" id="contact">
      {/* Contact card */}
      <div className="section-inner flex flex-1 items-center justify-center">
        <div
          className="reveal relative w-full max-w-[600px] overflow-hidden rounded-3xl border p-10 text-center sm:p-14"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {/* Radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(156,106,222,0.2), transparent 65%)",
            }}
            aria-hidden="true"
          />

          <Eyebrow label="Contact" center />

          <h2
            className="mb-3 tracking-tight"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 600,
              fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
            }}
          >
            Let&apos;s build something
          </h2>
          <p className="mx-auto mb-8 max-w-sm text-base" style={{ color: "var(--text-dim)" }}>
            Open to internships, collaborations, and community projects. Reach out through GitHub
            or email.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <HoverLink
              href="mailto:your.email@example.com"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
              style={{ background: "var(--gradient)", color: "#08090d" }}
              hoverStyle={{
                transform: "translateY(-2px)",
                boxShadow: "0 12px 32px -8px rgba(156,106,222,0.55)",
              }}
            >
              Email me
            </HoverLink>

            <HoverLink
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
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
              GitHub ↗
            </HoverLink>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="w-full border-t py-6 text-center text-sm"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          color: "var(--text-faint)",
          borderColor: "var(--border)",
        }}
      >
        <Sparkle size={11} style={{ verticalAlign: "-1px", marginRight: 6 }} />
        Hasitha Sandakelum · Built with care in Sri Lanka
      </footer>
    </section>
  );
}
