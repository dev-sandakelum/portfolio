"use client";

import Sparkle from "./Sparkle";

const EVENTS = [
  {
    year: "2023",
    title: "Started Bachelor of ICT",
    desc: "Began studying towards a Bachelor of ICT, deepening formal knowledge in software engineering and cloud.",
    tag: "Education",
    icon: "🎓",
  },
  {
    year: "2023",
    title: "First Open-Source Contributions",
    desc: "Started contributing to open-source projects on GitHub, learning collaborative workflows and code review.",
    tag: "GitHub",
    icon: "⬡",
  },
  {
    year: "2024",
    title: "Started Writing Tech Articles",
    desc: "Launched a series of technical articles in Sinhala and English covering GitHub, Azure, and AI/ML topics.",
    tag: "Writing",
    icon: "✍",
  },
  {
    year: "2024",
    title: "Built Portfolio v1",
    desc: "Designed and developed the first version of this portfolio site using Next.js, Tailwind, and TypeScript.",
    tag: "Project",
    icon: "▲",
  },
  {
    year: "2025",
    title: "Exploring AI & Cloud",
    desc: "Deep diving into AI/ML concepts and Microsoft Azure services, building integrations and tools.",
    tag: "AI / Cloud",
    icon: "☁",
  },
  {
    year: "Now",
    title: "Open to Collaborations",
    desc: "Actively looking for internships, open-source collaborations, and community projects.",
    tag: "Current",
    icon: "✦",
    current: true,
  },
] as const;

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden"
      style={{ padding: 0 }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 30% 50%, rgba(74,58,190,.1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 mx-auto w-full max-w-[720px] px-5 sm:px-8"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: "48px",
          paddingBottom: "64px",
        }}
      >
        {/* Header */}
        <div className="reveal mb-10 flex flex-col gap-3">
          <div
            className="flex items-center gap-2 text-xs uppercase tracking-widest"
            style={{ color: "var(--blue)", fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <span className="inline-block h-px w-4 shrink-0" style={{ background: "var(--blue)" }} />
            Journey
          </div>
          <div className="flex items-center gap-3">
            <Sparkle size={30} />
            <h2
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                background: "linear-gradient(120deg, #fff 30%, var(--text-dim))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Timeline
            </h2>
          </div>
          <p style={{ color: "var(--text-dim)", fontSize: "14px", lineHeight: 1.65, maxWidth: "420px" }}>
            Key moments that shaped who I am as a developer.
          </p>
        </div>

        {/* Timeline list */}
        <ol style={{ position: "relative", paddingLeft: "28px", listStyle: "none", margin: 0 }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "9px",
              top: "8px",
              bottom: "8px",
              width: "1px",
              background:
                "linear-gradient(to bottom, transparent, var(--border) 8%, var(--border) 92%, transparent)",
            }}
            aria-hidden="true"
          />

          {EVENTS.map((ev, i) => (
            <li
              key={i}
              className="reveal"
              style={{ position: "relative", marginBottom: i < EVENTS.length - 1 ? "28px" : 0 }}
            >
              {/* Dot */}
              <span
                style={{
                  position: "absolute",
                  left: "-24px",
                  top: "6px",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: ev.current
                    ? "linear-gradient(135deg, #a78bfa, #7c3aed)"
                    : "var(--surface)",
                  border: `2px solid ${ev.current ? "#a78bfa" : "var(--border)"}`,
                  boxShadow: ev.current ? "0 0 10px rgba(167,139,250,.55)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  transition: "border-color .2s",
                }}
                aria-hidden="true"
              />

              {/* Card */}
              <div
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${ev.current ? "rgba(167,139,250,.45)" : "var(--border)"}`,
                  borderRadius: "14px",
                  padding: "16px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  transition: "border-color .2s, transform .2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(167,139,250,.45)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = ev.current
                    ? "rgba(167,139,250,.45)"
                    : "var(--border)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateX(0)";
                }}
              >
                {/* Top row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "18px", lineHeight: 1 }}>{ev.icon}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        fontSize: "14.5px",
                        fontWeight: 700,
                        color: "var(--text)",
                      }}
                    >
                      {ev.title}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "#d8c9fb",
                        background: "rgba(139,92,246,.18)",
                        border: "1px solid rgba(139,92,246,.3)",
                        borderRadius: "6px",
                        padding: "2px 7px",
                      }}
                    >
                      {ev.tag}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "11px",
                        color: "var(--text-faint)",
                      }}
                    >
                      {ev.year}
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-dim)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {ev.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
