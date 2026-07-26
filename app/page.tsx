"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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

const TAB_IDS = TABS.map((t) => t.id) as readonly string[];

function isTabId(v: string | null): v is TabId {
  return v !== null && TAB_IDS.includes(v);
}

// ── Inner component that uses useSearchParams (must be inside Suspense) ────────

function HomePageInner() {
  const router     = useRouter();
  const pathname   = usePathname();
  const searchParams = useSearchParams();

  const active: TabId = (() => {
    const t = searchParams.get("t");
    return isTabId(t) ? t : "home";
  })();

  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef               = useRef<HTMLDivElement>(null);

  // Theme sync for connect tab
  useEffect(() => {
    if (active === "connect") {
      document.documentElement.setAttribute("data-theme", "contact");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [active]);

  // Close drawer with the Escape key (the backdrop handles outside taps)
  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function navigate(id: TabId) {
    setMenuOpen(false);
    // Update URL with ?t= (replace so tab switches don't pile up in history)
    const params = new URLSearchParams(searchParams.toString());
    if (id === "home") {
      params.delete("t");
    } else {
      params.set("t", id);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
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
                    background: isActive ? "var(--pill-bg)" : "transparent",
                    color: isActive ? "var(--pill-color)" : undefined,
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
                        background: "var(--gradient)",
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
                color: "var(--pill-color)",
                background: "var(--pill-bg)",
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
                background: menuOpen ? "var(--drawer-active-bg)" : "var(--surface)",
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
            background: "var(--scrim)",
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

        {/* Right-side mobile drawer */}
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          aria-hidden={!menuOpen}
          className="md:!hidden"
          style={{
            position: "fixed",
            top: "var(--nav-h)",
            bottom: 0,
            right: 0,
            width: "min(86vw, 360px)",
            zIndex: 50,
            borderRadius: "20px 0 0 0",
            background: "var(--drawer-bg)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid var(--border)",
            borderRight: "none",
            borderBottom: "none",
            padding: "24px 18px max(24px, env(safe-area-inset-bottom))",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "transform .3s cubic-bezier(0.22,1,0.36,1), opacity .2s ease",
            willChange: "transform, opacity",
            overflowY: "auto",
            boxShadow: "var(--drawer-shadow)",
          }}
        >
          {/* Drawer heading */}
          <div
            style={{
              marginBottom: "20px",
              padding: "0 8px 16px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Navigation
            </div>
            <div style={{ marginTop: "4px", fontSize: "12px", color: "var(--text-faint)" }}>
              Choose where you want to go
            </div>
          </div>

          {/* Nav items */}
          <nav aria-label="Mobile navigation">
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
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
                        padding: "10px 12px",
                        borderRadius: "12px",
                        border: `1px solid ${isActive ? "var(--drawer-active-border)" : "transparent"}`,
                        background: isActive ? "var(--drawer-active-bg)" : "transparent",
                        cursor: "pointer",
                        transition: "all .18s",
                        textAlign: "left",
                      }}
                    >
                      {/* Icon badge */}
                      <span
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                          flexShrink: 0,
                          background: isActive
                            ? "var(--drawer-icon-active-bg)"
                            : "var(--drawer-icon-bg)",
                          boxShadow: isActive ? "var(--drawer-icon-shadow)" : "none",
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
                          color: isActive ? "var(--drawer-active-text)" : "var(--text-dim)",
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
                          style={{ color: "var(--drawer-chevron)", flexShrink: 0 }}
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
              background: "var(--nav-cta-bg)",
              color: "var(--nav-cta-color)",
              boxShadow: "var(--nav-cta-shadow)",
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

// ── Public export: wraps inner component in Suspense (required for useSearchParams) ──

export default function HomePage() {
  return (
    <Suspense>
      <HomePageInner />
    </Suspense>
  );
}
