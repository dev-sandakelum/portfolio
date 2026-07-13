"use client";

import { useState, useEffect, useRef } from "react";
import Sparkle from "./components/portfolio/Sparkle";
import Hero from "./components/portfolio/Hero";
import About from "./components/portfolio/About";
import Timeline from "./components/portfolio/Timeline";
import Blogs from "./components/portfolio/Blogs";
import Links from "./components/portfolio/Links";
import ContactFooter from "./components/portfolio/ContactFooter";
import RevealObserver from "./components/portfolio/RevealObserver";

const TABS = [
  { id: "home",     label: "Home",     icon: "⌂"  },
  { id: "about",    label: "About",    icon: "👤" },
  { id: "timeline", label: "Timeline", icon: "📅" },
  { id: "blogs",    label: "Blogs",    icon: "✍️"  },
  { id: "links",    label: "Links",    icon: "🔗" },
  { id: "connect",  label: "Connect",  icon: "✉️"  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function HomePage() {
  const [active, setActive]       = useState<TabId>("home");
  const [menuOpen, setMenuOpen]   = useState(false);
  const drawerRef                 = useRef<HTMLDivElement>(null);

  // Theme sync for connect tab
  useEffect(() => {
    if (active === "connect") {
      document.documentElement.setAttribute("data-theme", "contact");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [active]);

  // Close drawer on outside tap
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isConnect = active === "connect";

  function navigate(id: TabId) {
    setActive(id);
    setMenuOpen(false);
  }

  return (
    <>
      {/* ── Nav ── */}
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

          {/* Desktop tab links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {TABS.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.id)}
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

          {/* Desktop CTA */}
          <button
            onClick={() => navigate("connect")}
            className="nav-cta hidden shrink-0 rounded-full px-5 py-2 text-[13.5px] font-semibold md:block"
            style={{ border: "none", cursor: "pointer" }}
          >
            Get in touch
          </button>

          {/* Mobile right side: current tab label + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Active tab pill */}
            <span
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "12px",
                fontWeight: 600,
                color: isConnect ? "var(--purple)" : "#c4b5fd",
                background: isConnect ? "rgba(134,103,194,.15)" : "rgba(124,58,237,.15)",
                borderRadius: "999px",
                padding: "3px 10px",
              }}
            >
              {TABS.find((t) => t.id === active)?.label}
            </span>

            {/* Hamburger / close button */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: menuOpen
                  ? isConnect ? "rgba(134,103,194,.18)" : "rgba(124,58,237,.18)"
                  : "var(--surface)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "4px",
                padding: "8px",
                transition: "all .2s",
              }}
            >
              {/* Animated hamburger lines */}
              <span
                style={{
                  display: "block",
                  width: "16px",
                  height: "1.5px",
                  borderRadius: "2px",
                  background: "var(--text)",
                  transition: "transform .25s, opacity .25s",
                  transform: menuOpen ? "translateY(5.5px) rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "16px",
                  height: "1.5px",
                  borderRadius: "2px",
                  background: "var(--text)",
                  transition: "opacity .25s",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "16px",
                  height: "1.5px",
                  borderRadius: "2px",
                  background: "var(--text)",
                  transition: "transform .25s, opacity .25s",
                  transform: menuOpen ? "translateY(-5.5px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile backdrop + drawer — only mounted on mobile via CSS ── */}
      <>
        {/* Backdrop */}
        <div
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "opacity .3s ease",
            // Only show on mobile — if viewport is ≥768px this stays invisible
            // even when menuOpen is true (desktop nav handles navigation)
          }}
          className="md:!hidden"
        />

        {/* Bottom drawer */}
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="md:!hidden"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            borderRadius: "24px 24px 0 0",
            background: isConnect
              ? "rgba(140,100,210,0.97)"
              : "rgba(12,9,26,0.97)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid var(--border)",
            borderBottom: "none",
            padding: "12px 20px 40px",
            transform: menuOpen ? "translateY(0)" : "translateY(100%)",
            transition: "transform .38s cubic-bezier(0.32,0.72,0,1)",
            willChange: "transform",
          }}
        >
          {/* Drag handle */}
          <div
            style={{
              width: "40px",
              height: "4px",
              borderRadius: "2px",
              background: "rgba(255,255,255,0.18)",
              margin: "0 auto 22px",
            }}
          />

          {/* Nav items */}
          <nav aria-label="Mobile navigation">
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
              {TABS.map((tab) => {
                const isActive = active === tab.id;
                return (
                  <li key={tab.id}>
                    <button
                      onClick={() => navigate(tab.id)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "12px 14px",
                        borderRadius: "14px",
                        border: `1px solid ${isActive ? "rgba(255,255,255,0.1)" : "transparent"}`,
                        background: isActive
                          ? isConnect
                            ? "rgba(255,255,255,0.15)"
                            : "rgba(124,58,237,.2)"
                          : "transparent",
                        cursor: "pointer",
                        transition: "all .18s",
                        textAlign: "left",
                      }}
                    >
                      {/* Icon badge */}
                      <span
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "11px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                          flexShrink: 0,
                          background: isActive
                            ? isConnect
                              ? "linear-gradient(135deg,#8667C2,#E573AB)"
                              : "linear-gradient(135deg,#8b5cf6,#6d28d9)"
                            : "rgba(255,255,255,0.07)",
                          boxShadow: isActive
                            ? isConnect
                              ? "0 4px 14px rgba(134,103,194,.45)"
                              : "0 4px 14px rgba(124,58,237,.5)"
                            : "none",
                          transition: "all .18s",
                        }}
                      >
                        {tab.icon}
                      </span>

                      {/* Label */}
                      <span
                        style={{
                          fontFamily: "var(--font-space-grotesk)",
                          fontSize: "15px",
                          fontWeight: isActive ? 700 : 500,
                          color: isActive
                            ? isConnect ? "#fff" : "#e9d5ff"
                            : "var(--text-dim)",
                          transition: "color .18s",
                          flex: 1,
                        }}
                      >
                        {tab.label}
                      </span>

                      {/* Chevron */}
                      {isActive && (
                        <svg
                          width="16" height="16" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2.5"
                          style={{
                            color: isConnect ? "rgba(255,255,255,0.6)" : "#a78bfa",
                            flexShrink: 0,
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA */}
          <button
            onClick={() => navigate("connect")}
            style={{
              marginTop: "14px",
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "14px",
              fontWeight: 700,
              background: isConnect
                ? "rgba(255,255,255,0.9)"
                : "linear-gradient(135deg,#7c3aed,#9c6ade)",
              color: isConnect ? "#2D1B6B" : "#fff",
              boxShadow: isConnect
                ? "0 4px 20px rgba(180,140,255,.3)"
                : "0 4px 20px rgba(124,58,237,.45)",
              transition: "all .2s",
            }}
          >
            ✉️ &nbsp; Get in touch
          </button>
        </div>
      </>

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
