"use client";

import { useState, useEffect } from "react";
import OrbBackground from "./components/portfolio/OrbBackground";
import Sparkle from "./components/portfolio/Sparkle";
import Hero from "./components/portfolio/Hero";
import About from "./components/portfolio/About";
import Timeline from "./components/portfolio/Timeline";
import Blogs from "./components/portfolio/Blogs";
import Links from "./components/portfolio/Links";
import ContactFooter from "./components/portfolio/ContactFooter";
import RevealObserver from "./components/portfolio/RevealObserver";

const TABS = [
  { id: "home",     label: "Home"     },
  { id: "about",    label: "About"    },
  { id: "timeline", label: "Timeline" },
  { id: "blogs",    label: "Blogs"    },
  { id: "links",    label: "Links"    },
  { id: "connect",  label: "Connect"  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function HomePage() {
  const [active, setActive] = useState<TabId>("home");

  // Mirror the old ContactThemeSync — set data-theme on <html> when on
  // the connect tab so CSS vars flip the nav to the light orchid palette.
  useEffect(() => {
    if (active === "connect") {
      document.documentElement.setAttribute("data-theme", "contact");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [active]);

  const isConnect = active === "connect";

  return (
    <>
      <OrbBackground />

      {/* ── Nav — uses portfolio-nav + nav-* classes so CSS vars drive theming ── */}
      <header
        className="portfolio-nav sticky top-0 z-50"
        style={{
          height: "var(--nav-h)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            height: "100%",
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* Brand */}
          <div
            className="nav-brand flex items-center gap-2 shrink-0"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "17px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            <Sparkle size={16} />
            Portfolio
          </div>

          {/* Tab links — desktop only */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {TABS.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className="nav-link"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "13.5px",
                    fontWeight: isActive ? 600 : 500,
                    padding: "6px 14px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all .18s",
                    background: isActive
                      ? isConnect ? "rgba(134,103,194,.18)" : "rgba(124,58,237,.18)"
                      : "transparent",
                    color: isActive
                      ? isConnect ? "var(--purple)" : "#c4b5fd"
                      : undefined,
                    position: "relative",
                  }}
                >
                  {tab.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-1px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "20px",
                        height: "2px",
                        borderRadius: "2px",
                        background: isConnect
                          ? "linear-gradient(90deg,#8667C2,#E573AB)"
                          : "linear-gradient(90deg,#8b5cf6,#a78bfa)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA — nav-cta class lets CSS vars control bg/colour/shadow */}
          <button
            onClick={() => setActive("connect")}
            className="nav-cta shrink-0 rounded-full px-5 py-2 text-[13.5px] font-semibold"
            style={{ border: "none", cursor: "pointer" }}
          >
            Get in touch
          </button>

          {/* Mobile: dot indicators */}
          <div className="flex items-center gap-1 md:hidden">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                aria-label={tab.label}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  background: active === tab.id
                    ? isConnect
                      ? "linear-gradient(135deg,#8667C2,#E573AB)"
                      : "linear-gradient(135deg,#8b5cf6,#a78bfa)"
                    : "rgba(255,255,255,0.2)",
                  transition: "background .2s",
                }}
              />
            ))}
          </div>
        </div>
      </header>

      {/* ── Tab panels ── */}
      <main className="relative z-10">
        {active === "home"     && <Hero />}
        {active === "about"    && <About />}
        {active === "timeline" && <Timeline />}
        {active === "blogs"    && <Blogs />}
        {active === "links"    && <Links />}
        {active === "connect"  && <ContactFooter />}
      </main>

      <RevealObserver />
    </>
  );
}
