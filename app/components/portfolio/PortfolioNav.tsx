import HoverLink from "./ui/HoverLink";
import Sparkle from "./Sparkle";

const NAV_LINKS = [
  { href: "#about",     label: "About" },
  { href: "#education", label: "Education" },
  { href: "#skills",    label: "Skills" },
  { href: "#projects",  label: "Projects" },
  { href: "#community", label: "Community" },
];

export default function PortfolioNav() {
  return (
    <nav
      className="flex items-center justify-between border-b px-6"
      style={{
        height: "var(--nav-h)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: "rgba(8,9,13,0.75)",
        borderColor: "var(--border)",
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-2 text-[17px] font-semibold tracking-tight"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        <Sparkle size={18} />
        Hasitha
      </div>

      {/* Desktop links */}
      <div className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <HoverLink
            key={link.href}
            href={link.href}
            className="text-sm font-medium"
            style={{ color: "var(--text-dim)" }}
            hoverStyle={{ color: "var(--text)" }}
          >
            {link.label}
          </HoverLink>
        ))}
      </div>

      {/* CTA */}
      <HoverLink
        href="#contact"
        className="rounded-full border px-4 py-2 text-sm font-medium"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
        hoverStyle={{
          background: "var(--surface-hover)",
          borderColor: "var(--blue)",
        }}
      >
        Get in touch
      </HoverLink>
    </nav>
  );
}
