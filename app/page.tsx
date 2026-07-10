import OrbBackground from "./components/portfolio/OrbBackground";
import PortfolioNav from "./components/portfolio/PortfolioNav";
import Hero from "./components/portfolio/Hero";
import Discover from "./components/portfolio/Discover";
import ContactFooter from "./components/portfolio/ContactFooter";
import RevealObserver from "./components/portfolio/RevealObserver";
import ScrollDots from "./components/portfolio/ScrollDots";
import SmoothScroller from "./components/portfolio/SmoothScroller";

export default function HomePage() {
  return (
    <>
      <OrbBackground />
      <div className="sticky top-0 z-50" style={{ height: "var(--nav-h)" }}>
        <PortfolioNav />
      </div>
      <main
        className="snap-container relative z-10"
        id="snap-root"
        style={{ overflow: "hidden scroll" }}
      >
        <Hero />
        <Discover />
        <ContactFooter />
      </main>
      <ScrollDots />
      <SmoothScroller />
      <RevealObserver />
    </>
  );
}
