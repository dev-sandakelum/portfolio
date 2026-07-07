import Eyebrow from "./Eyebrow";
import HoverLink from "./ui/HoverLink";

export default function Contact() {
  return (
    <section id="contact" className="px-6 pb-16 pt-24">
      <div className="mx-auto max-w-[1080px] text-center">
        <div
          className="reveal relative mx-auto max-w-[640px] overflow-hidden rounded-3xl border p-12 sm:px-16"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {/* Radial glow overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(156,106,222,0.18), transparent 60%)",
            }}
            aria-hidden="true"
          />

          <Eyebrow label="Contact" center />

          <h2
            className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Let&apos;s build something
          </h2>
          <p className="mx-auto max-w-sm text-base" style={{ color: "var(--text-dim)" }}>
            Open to internships, collaborations, and community projects. Reach out through GitHub or
            email.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <HoverLink
              href="mailto:your.email@example.com"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
              style={{ background: "var(--gradient)", color: "#08090d" }}
              hoverStyle={{
                transform: "translateY(-2px)",
                boxShadow: "0 10px 30px -10px rgba(156,106,222,0.6)",
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
    </section>
  );
}
