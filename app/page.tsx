import OrbBackground from "./components/portfolio/OrbBackground";
import PortfolioNav from "./components/portfolio/PortfolioNav";
import Hero from "./components/portfolio/Hero";
import ContactFooter from "./components/portfolio/ContactFooter";
import RevealObserver from "./components/portfolio/RevealObserver";
import ScrollDots from "./components/portfolio/ScrollDots";
import SmoothScroller from "./components/portfolio/SmoothScroller";

export default function HomePage() {
  return (
    <>
      {/* Fixed ambient orbs */}
      <OrbBackground />

      {/* Nav — fixed height, sits above scroll container */}
      <div className="sticky top-0 z-50" style={{ height: "var(--nav-h)" }}>
        <PortfolioNav />
      </div>

      {/* Scroll container — JS controls scroll, no CSS snap */}
      <main
        className="snap-container relative z-10"
        id="snap-root"
        style={{ overflow: "hidden scroll" }}
      >
        <Hero />
        <ContactFooter />
      </main>

      {/* Side dot indicators */}
      <ScrollDots />

      {/* JS smooth scroller — intercepts wheel/touch/keyboard */}
      <SmoothScroller />

      {/* Reveal animation observer */}
      <RevealObserver />
    </>
  );
}
