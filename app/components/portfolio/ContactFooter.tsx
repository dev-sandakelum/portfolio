import Image from "next/image";
import Eyebrow from "./Eyebrow";
import HoverLink from "./ui/HoverLink";
import ContactThemeSync from "./ContactThemeSync";
import { PERSON, CONTACT } from "@/lib/portfolio/data";

export default function ContactFooter() {
  return (
    <section
      className="relative overflow-hidden md:overflow-visible
                 [min-height:calc(100svh_-_var(--nav-h))] md:[min-height:calc(100vh_-_var(--nav-h))]"
      id="contact"
      style={{ justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* ── Observes visibility, flips data-theme, renders fixed bg ── */}
      <ContactThemeSync />

      {/* Contact card */}
      <div className="section-inner flex flex-1 items-center justify-center">

        {/* Offset wrapper — md+: push right 120px + down 20px; mobile: push down 30px only */}
        <div className="max-w-[300px] md:max-w-[600px] mt-[120px] md:mt-[20px] md:ml-[240px] border-red-100">

          <div className="reveal relative w-full overflow-hidden rounded-3xl p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true" />

            <Eyebrow label={CONTACT.eyebrow} center />

            <h2
              className="mb-3 tracking-tight"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 600,
                fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
                color: "#1a1030",
              }}
            >
              {CONTACT.heading}
            </h2>

            <p className="mx-auto mb-8 max-w-sm text-base" style={{ color: "#4A3B80" }}>
              {CONTACT.subtext}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {/* Email */}
              <HoverLink
                href={`mailto:${PERSON.email}`}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
                style={{ background: "linear-gradient(120deg,#8667C2 0%,#E573AB 100%)", color: "#fff" }}
                hoverStyle={{ transform: "translateY(-2px)", boxShadow: "0 12px 32px -8px rgba(229,115,171,0.6)" }}
              >
                {CONTACT.buttons.email}
              </HoverLink>

              {/* GitHub */}
              <HoverLink
                href={PERSON.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold"
                style={{ background: "rgba(220,209,247,0.35)", borderColor: "rgba(134,103,194,0.4)", color: "#1a1030" }}
                hoverStyle={{ background: "rgba(220,209,247,0.55)", transform: "translateY(-2px)" }}
              >
                <Image src="/link/img/github.png" alt="GitHub" width={18} height={18} className="object-contain opacity-90" />
                {CONTACT.buttons.github}
              </HoverLink>

              {/* LinkedIn */}
              <HoverLink
                href={PERSON.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold"
                style={{ background: "rgba(220,209,247,0.35)", borderColor: "rgba(134,103,194,0.4)", color: "#1a1030" }}
                hoverStyle={{ background: "rgba(220,209,247,0.55)", transform: "translateY(-2px)" }}
              >
                <Image src="/link/img/linkedin.png" alt="LinkedIn" width={18} height={18} className="object-contain" />
                {CONTACT.buttons.linkedin}
              </HoverLink>
            </div>
          </div>

        </div>{/* end contact-card-offset */}
      </div>
    </section>
  );
}
