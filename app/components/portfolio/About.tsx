"use client";

import Sparkle from "./Sparkle";
import { PERSON } from "@/lib/portfolio/data";

const SKILLS = [
  { label: "Next.js",    icon: "▲" },
  { label: "TypeScript", icon: "⟨⟩" },
  { label: "React",      icon: "⚛" },
  { label: "Azure",      icon: "☁" },
  { label: "GitHub",     icon: "⬡" },
  { label: "AI / ML",    icon: "🤖" },
  { label: "Tailwind",   icon: "✦" },
  { label: "Node.js",    icon: "⬢" },
];

const HIGHLIGHTS = [
  { num: new Date().getFullYear() - PERSON.birthYear, label: "Years old" },
  { num: "3+",  label: "Years coding" },
  { num: "10+", label: "Projects built" },
];

export default function About() {
  const age = new Date().getFullYear() - PERSON.birthYear;

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ padding: 0 }}
    >
      <div
        className="relative z-10 mx-auto w-full max-w-[920px] px-5 sm:px-8"
        style={{
          minHeight: "calc(100vh - var(--nav-h))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "48px",
          paddingBottom: "48px",
          gap: "40px",
        }}
      >
        {/* ── Two-column layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Left — text */}
          <div className="reveal flex flex-col gap-5">
            <div
              className="flex items-center gap-2 text-xs uppercase tracking-widest"
              style={{ color: "var(--blue)", fontFamily: "var(--font-jetbrains-mono)" }}
            >
              <span className="inline-block h-px w-4 shrink-0" style={{ background: "var(--blue)" }} />
              About me
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
                About
              </h2>
            </div>

            <p
  style={{
    color: "var(--text-dim)",
    fontSize: "14.5px",
    lineHeight: 1.75,
  }}
>
  Hi, I&apos;m{" "}
  <strong style={{ color: "var(--text)" }}>
    {PERSON.fullName}
  </strong>{" "}
  , a {age}-year-old ICT undergraduate from{" "}
  <span style={{ color: "var(--purple)" }}>
    {PERSON.location}
  </span>
  , currently studying{" "}
  <span style={{ color: "var(--purple)" }}>
    {PERSON.degree}
  </span>{" "}
  at the University of Ruhuna.
</p>

<p
  style={{
    color: "var(--text-dim)",
    fontSize: "14px",
    lineHeight: 1.75,
  }}
>
  I&apos;m a Microsoft Student Ambassador and a passionate full-stack
  developer who enjoys building modern web applications, open-source
  projects, and developer tools. I also create technical content in both
  Sinhala and English while continuously exploring technologies like
  React, Next.js, TypeScript, Three.js, cloud computing, and AI.
</p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-3">
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h.label}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "12px 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "var(--text)",
                      lineHeight: 1.1,
                    }}
                  >
                    {h.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "10.5px",
                      color: "var(--text-faint)",
                    }}
                  >
                    {h.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — skills */}
          <div className="reveal flex flex-col gap-5">
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--text-faint)", fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Skills &amp; Tools
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              {SKILLS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "11px",
                    padding: "11px 14px",
                    transition: "border-color .2s, transform .2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(167,139,250,.45)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, var(--blue), var(--purple))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text)",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 700px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
