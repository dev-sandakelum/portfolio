import Image from "next/image";
import Eyebrow from "./Eyebrow";
import HoverLink from "./ui/HoverLink";
import ContactThemeSync from "./ContactThemeSync";

export default function ContactFooter() {
  return (
    <section
      className="snap-section-last relative overflow-hidden"
      id="contact"
      style={{ justifyContent: "center" }}
    >
      {/* ── Observes visibility and flips data-theme on <html> ── */}
      <ContactThemeSync />

      {/* ── Full-screen background image, no overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/portfolio/contact_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />

      {/* Contact card */}
      <div className="section-inner flex flex-1 items-center justify-center">
        <div
          className="reveal relative w-full max-w-[600px] overflow-hidden rounded-3xl p-10 text-center sm:p-14"
          style={{
            // background: "rgba(220,209,247,0.22)",
            // borderColor: "rgba(134,103,194,0.3)",
            // backdropFilter: "blur(2px)",
            // WebkitBackdropFilter: "blur(2px)",
            transform:"translate(120px , 40px)",
          }}
        >
          {/* Radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            // style={{
            //   background:
            //     "radial-gradient(circle at 50% 0%, rgba(229,115,171,0.25), transparent 65%)",
            // }}
            aria-hidden="true"
          />

          <Eyebrow label="Contact" center />

          <h2
            className="mb-3 tracking-tight"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 600,
              fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
              color: "#1a1030",
            }}
          >
            Let&apos;s build something
          </h2>
          <p
            className="mx-auto mb-8 max-w-sm text-base"
            style={{ color: "#4A3B80" }}
          >
            Open to internships, collaborations, and community projects. Reach
            out through GitHub or email.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <HoverLink
              href="mailto:your.email@example.com"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
              style={{
                background: "linear-gradient(120deg,#8667C2 0%,#E573AB 100%)",
                color: "#fff",
              }}
              hoverStyle={{
                transform: "translateY(-2px)",
                boxShadow: "0 12px 32px -8px rgba(229,115,171,0.6)",
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
                background: "rgba(220,209,247,0.35)",
                borderColor: "rgba(134,103,194,0.4)",
                color: "#1a1030",
              }}
              hoverStyle={{
                background: "rgba(220,209,247,0.55)",
                transform: "translateY(-2px)",
              }}
            >
              <Image
                src="/link/img/github.png"
                alt="GitHub"
                width={18}
                height={18}
                className="object-contain opacity-90"
              />
              GitHub ↗
            </HoverLink>

            <HoverLink
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold"
              style={{
                background: "rgba(220,209,247,0.35)",
                borderColor: "rgba(134,103,194,0.4)",
                color: "#1a1030",
              }}
              hoverStyle={{
                background: "rgba(220,209,247,0.55)",
                transform: "translateY(-2px)",
              }}
            >
              <Image
                src="/link/img/linkedin.png"
                alt="LinkedIn"
                width={18}
                height={18}
                className="object-contain"
              />
              LinkedIn ↗
            </HoverLink>
          </div>
        </div>
      </div>
    </section>
  );
}
