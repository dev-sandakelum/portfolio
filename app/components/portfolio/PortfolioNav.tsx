import HoverLink from "./ui/HoverLink";
import Sparkle from "./Sparkle";

const NAV_LINKS = [
  { href: "#hero",    label: "Hero" },
  { href: "#contact", label: "Contact" },
];

export default function PortfolioNav() {
  return (
    <nav
      className="portfolio-nav flex items-center justify-between px-8"
      style={{
        height: "var(--nav-h)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* ── Brand: ✦ Portfolio ── */}
      <div
        className="nav-brand flex items-center gap-2 text-[17px] font-bold tracking-tight"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        <Sparkle size={16} />
        Portfolio
      </div>

      {/* ── Centered nav links ── */}
      <div className="hidden items-center gap-9 md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link text-[14px] font-medium"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* ── CTA pill ── */}
      <a
        href="#contact"
        className="nav-cta rounded-full px-5 py-2 text-[13.5px] font-semibold"
      >
        Get in touch
      </a>
    </nav>
  );
}
