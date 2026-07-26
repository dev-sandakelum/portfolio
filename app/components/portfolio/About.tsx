"use client";

import Image from "next/image";
import { PERSON } from "@/lib/portfolio/data";

/* ───────────────────────── Icons ───────────────────────── */

const Icon = {
  pin: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  cap: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5v6" /><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
    </svg>
  ),
  calendar: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  code: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  rocket: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    </svg>
  ),
  spark: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
    </svg>
  ),
  ms: (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <rect x="2" y="2" width="9" height="9" fill="#f25022" />
      <rect x="13" y="2" width="9" height="9" fill="#7fba00" />
      <rect x="2" y="13" width="9" height="9" fill="#00a4ef" />
      <rect x="13" y="13" width="9" height="9" fill="#ffb900" />
    </svg>
  ),
  download: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
};

/* ───────────────────────── Data ───────────────────────── */

const age = new Date().getFullYear() - PERSON.birthYear;

const FACTS = [
  { icon: Icon.pin, label: PERSON.location },
  { icon: Icon.cap, label: "University of Ruhuna" },
  { icon: Icon.calendar, label: `${age} years old` },
];

const HIGHLIGHTS = [
  { num: "3+", label: "Years coding", icon: Icon.code },
  { num: "10+", label: "Projects built", icon: Icon.rocket },
  { num: "Always", label: "Learning", icon: Icon.spark },
];

const TECH = ["React", "Next.js", "TypeScript", "Three.js", "Node.js", "Cloud & AI"];

const ROLES = ["ICT Undergraduate", "Full-stack Developer", "Content Creator"];

/* ───────────────────────── Component ───────────────────────── */

export default function About() {
  return (
    <section id="about" className="about-section relative overflow-hidden">
      <div className="about-glow" aria-hidden />

      <div className="about-inner relative z-10 mx-auto w-full max-w-[1080px]">
        {/* Header */}
        <header className="about-header reveal">
          <span className="about-eyebrow">Get to know me</span>
          <h2 className="about-title">
            About <span className="about-accent">Me</span>
          </h2>
          <p className="about-subtitle">
            Developer, learner, and Microsoft Student Ambassador from {PERSON.location}.
          </p>
        </header>

        <div className="about-grid">
          {/* Profile card */}
          <aside className="about-profile reveal">
            <div className="about-avatar-wrap">
              <div className="about-avatar-ring" aria-hidden />
              <div className="about-avatar">
                <Image
                  src="/portfolio/me.png"
                  alt={PERSON.fullName}
                  fill
                  sizes="(max-width: 700px) 180px, 200px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>

            <div className="about-identity">
              <p className="about-greeting">Hi, I&apos;m</p>
              <h3 className="about-name">
                {PERSON.firstName}{" "}
                <span className="about-accent">{PERSON.lastName}</span>
              </h3>
              <div className="about-roles">
                {ROLES.map((role) => (
                  <span key={role} className="about-role-pill">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="about-profile-side">
              <ul className="about-facts">
                {FACTS.map(({ icon, label }) => (
                  <li key={label} className="about-fact">
                    <span className="about-fact-icon" aria-hidden>
                      {icon}
                    </span>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>

              <div className="about-msa">
                <span className="about-msa-logo" aria-hidden>
                  {Icon.ms}
                </span>
                <div className="about-msa-text">
                  <span className="about-msa-title">Microsoft Student Ambassador</span>
                  <span className="about-msa-sub">Empowering the student tech community</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="about-content reveal">
            <div className="about-bio">
              <p>
                I&apos;m a passionate full-stack developer who enjoys building modern web
                applications, open-source projects, and developer tools. Currently pursuing a{" "}
                <strong>{PERSON.degree}</strong> at the University of Ruhuna.
              </p>
              <p>
                I create technical content in both Sinhala and English, and love exploring
                new technologies — from frontend frameworks to cloud computing and AI.
              </p>
            </div>

            <div className="about-tech-block">
              <span className="about-tech-label">Technologies I work with</span>
              <div className="about-tech-list">
                {TECH.map((tech) => (
                  <span key={tech} className="about-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="about-highlights">
              {HIGHLIGHTS.map(({ num, label, icon }) => (
                <div key={label} className="about-highlight">
                  <span className="about-highlight-icon" aria-hidden>
                    {icon}
                  </span>
                  <div>
                    <span className="about-highlight-num">{num}</span>
                    <span className="about-highlight-label">{label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-cv about-cv-unavailable">
              <div className="about-cv-copy">
                <span className="about-cv-title">My CV</span>
                <span className="about-cv-desc">
                  A complete overview of my skills, experience, and projects — coming soon.
                </span>
              </div>
              <span className="about-cv-btn about-cv-btn-disabled" aria-disabled="true">
                Not available at the moment
              </span>
              <span className="about-cv-meta">Currently being updated</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          min-height: calc(100vh - var(--nav-h));
          padding: clamp(32px, 5vw, 48px) clamp(20px, 4vw, 32px) clamp(48px, 6vw, 64px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .about-glow {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: min(720px, 90vw);
          height: 420px;
          background: radial-gradient(
            ellipse at center,
            rgba(139, 92, 246, 0.14) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .about-header {
          margin-bottom: clamp(28px, 4vw, 40px);
          max-width: 640px;
        }

        .about-eyebrow {
          display: inline-block;
          font-family: var(--font-jetbrains-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--purple);
          margin-bottom: 10px;
        }

        .about-title {
          font-family: var(--font-space-grotesk);
          font-weight: 700;
          font-size: clamp(2rem, 5vw, 2.75rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--text);
          margin: 0 0 12px;
        }

        .about-accent {
          background: linear-gradient(120deg, var(--blue), var(--purple));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .about-subtitle {
          margin: 0;
          font-size: clamp(14px, 1.8vw, 16px);
          line-height: 1.65;
          color: var(--text-dim);
        }

        .about-grid {
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3.5vw, 36px);
        }

        .about-profile-side {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        /* ── Profile card ── */
        .about-profile {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          padding: clamp(22px, 3vw, 26px);
          border-radius: 22px;
          background: linear-gradient(
              180deg,
              rgba(167, 139, 250, 0.07),
              rgba(96, 165, 250, 0.03)
            ),
            var(--surface);
          border: 1px solid rgba(167, 139, 250, 0.22);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .about-avatar-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-avatar-ring {
          position: absolute;
          width: calc(100% + 16px);
          height: calc(100% + 16px);
          border-radius: 50%;
          border: 2px solid rgba(167, 139, 250, 0.35);
          animation: aboutPulse 3s ease-in-out infinite;
        }

        @keyframes aboutPulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.03);
          }
        }

        .about-avatar {
          position: relative;
          width: clamp(150px, 17vw, 180px);
          aspect-ratio: 1;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(167, 139, 250, 0.4);
          background: radial-gradient(
            circle at 50% 35%,
            rgba(167, 139, 250, 0.5),
            rgba(76, 29, 149, 0.85) 70%
          );
        }

        .about-identity {
          text-align: center;
          width: 100%;
        }

        .about-greeting {
          margin: 0 0 4px;
          font-family: var(--font-space-grotesk);
          font-size: 14px;
          color: var(--text-dim);
        }

        .about-name {
          margin: 0 0 12px;
          font-family: var(--font-space-grotesk);
          font-weight: 700;
          font-size: clamp(1.35rem, 3vw, 1.6rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--text);
        }

        .about-roles {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        .about-role-pill {
          font-family: var(--font-space-grotesk);
          font-size: 11.5px;
          font-weight: 600;
          color: var(--pill-color);
          background: var(--pill-bg);
          border: 1px solid rgba(167, 139, 250, 0.25);
          border-radius: 999px;
          padding: 5px 12px;
          white-space: nowrap;
        }

        .about-facts {
          list-style: none;
          margin: 0;
          padding: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .about-fact {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          font-family: var(--font-space-grotesk);
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
          line-height: 1.35;
        }

        .about-fact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(167, 139, 250, 0.15);
          color: var(--purple);
          flex-shrink: 0;
        }

        .about-msa {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 14px 16px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
        }

        .about-msa-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          flex-shrink: 0;
        }

        .about-msa-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .about-msa-title {
          font-family: var(--font-space-grotesk);
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          line-height: 1.3;
        }

        .about-msa-sub {
          font-size: 11.5px;
          color: var(--text-faint);
          line-height: 1.4;
        }

        /* ── Content column ── */
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
          min-width: 0;
        }

        .about-bio {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .about-bio p {
          margin: 0;
          font-size: clamp(14.5px, 1.7vw, 16px);
          line-height: 1.75;
          color: var(--text-dim);
          max-width: 58ch;
        }

        .about-bio strong {
          color: var(--text);
          font-weight: 600;
        }

        .about-tech-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .about-tech-label {
          font-family: var(--font-jetbrains-mono);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-faint);
        }

        .about-tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .about-tech-pill {
          font-family: var(--font-space-grotesk);
          font-size: 12.5px;
          font-weight: 600;
          color: var(--purple);
          background: rgba(167, 139, 250, 0.12);
          border: 1px solid rgba(167, 139, 250, 0.28);
          border-radius: 999px;
          padding: 6px 14px;
          transition: background 0.2s, border-color 0.2s;
        }

        .about-tech-pill:hover {
          background: rgba(167, 139, 250, 0.2);
          border-color: rgba(167, 139, 250, 0.45);
        }

        .about-highlights {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .about-highlight {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-radius: 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          transition: border-color 0.2s, transform 0.2s;
          min-width: 0;
        }

        .about-highlight:hover {
          border-color: rgba(167, 139, 250, 0.4);
          transform: translateY(-2px);
        }

        .about-highlight-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: linear-gradient(
            135deg,
            rgba(96, 165, 250, 0.2),
            rgba(167, 139, 250, 0.2)
          );
          border: 1px solid rgba(167, 139, 250, 0.3);
          color: var(--purple);
          flex-shrink: 0;
        }

        .about-highlight > div {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .about-highlight-num {
          font-family: var(--font-space-grotesk);
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
          line-height: 1.1;
        }

        .about-highlight-label {
          font-family: var(--font-jetbrains-mono);
          font-size: 10px;
          color: var(--text-faint);
        }

        .about-cv {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: auto auto;
          gap: 12px 20px;
          align-items: center;
          padding: 20px 22px;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.1),
            rgba(96, 165, 250, 0.06)
          );
          border: 1px solid rgba(167, 139, 250, 0.28);
        }

        .about-cv-copy {
          grid-column: 1;
          grid-row: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .about-cv-title {
          font-family: var(--font-space-grotesk);
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
        }

        .about-cv-desc {
          font-size: 12.5px;
          color: var(--text-faint);
          line-height: 1.45;
        }

        .about-cv-btn {
          grid-column: 2;
          grid-row: 1 / span 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 12px;
          background: linear-gradient(120deg, #8b5cf6, #a78bfa);
          color: #fff;
          font-family: var(--font-space-grotesk);
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.35);
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }

        .about-cv-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 26px rgba(139, 92, 246, 0.5);
        }

        .about-cv-unavailable {
          background: rgba(255, 255, 255, 0.03);
          border-color: var(--border);
        }

        .about-cv-btn-disabled {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-faint);
          box-shadow: none;
          cursor: not-allowed;
          pointer-events: none;
          font-size: 12.5px;
        }

        .about-cv-btn-disabled:hover {
          transform: none;
          box-shadow: none;
        }

        .about-cv-meta {
          grid-column: 1;
          grid-row: 2;
          font-family: var(--font-jetbrains-mono);
          font-size: 10px;
          color: var(--text-faint);
        }

        /* ── Desktop: full-width horizontal profile card, content below ── */
        @media (min-width: 901px) {
          .about-profile {
            flex-direction: row;
            align-items: center;
            gap: 40px;
            padding: 28px 36px;
            width: 100%;
          }

          .about-avatar-wrap {
            flex-shrink: 0;
          }

          .about-identity {
            text-align: left;
            flex: 1;
            min-width: 0;
          }

          .about-roles {
            justify-content: flex-start;
          }

          .about-profile-side {
            flex: 0 0 320px;
            width: auto;
          }

          .about-content {
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            grid-template-areas:
              "highlights highlights"
              "bio cv"
              "tech cv";
            gap: 28px 44px;
            align-items: start;
          }

          .about-bio {
            grid-area: bio;
          }

          .about-tech-block {
            grid-area: tech;
          }

          .about-highlights {
            grid-area: highlights;
            gap: 16px;
          }

          .about-cv {
            grid-area: cv;
            align-self: stretch;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: center;
            gap: 14px;
            padding: 26px 28px;
          }

          .about-cv-btn {
            width: 100%;
          }

          .about-bio p {
            font-size: 16px;
          }

          .about-highlight {
            padding: 18px 20px;
          }
        }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .about-header {
            text-align: center;
            max-width: none;
            margin-left: auto;
            margin-right: auto;
          }

          .about-bio p {
            max-width: none;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .about-section {
            padding: 28px 18px 40px;
          }

          .about-header {
            margin-bottom: 24px;
          }

          .about-profile {
            padding: 22px 18px;
            gap: 18px;
          }

          .about-avatar {
            width: min(168px, 44vw);
          }

          .about-roles {
            gap: 6px;
          }

          .about-role-pill {
            font-size: 10.5px;
            padding: 4px 10px;
          }

          .about-facts {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .about-fact:last-child {
            grid-column: 1 / -1;
          }

          .about-fact {
            padding: 10px 12px;
            font-size: 12px;
          }

          .about-highlights {
            gap: 8px;
          }

          .about-highlight {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 8px;
            padding: 12px 8px;
          }

          .about-highlight-icon {
            width: 34px;
            height: 34px;
            border-radius: 9px;
          }

          .about-highlight > div {
            align-items: center;
          }

          .about-highlight-num {
            font-size: 17px;
          }

          .about-highlight-label {
            font-size: 9px;
            line-height: 1.3;
            white-space: normal;
          }

          .about-cv {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            padding: 18px;
            gap: 14px;
          }

          .about-cv-copy {
            grid-column: 1;
            grid-row: 1;
          }

          .about-cv-btn {
            grid-column: 1;
            grid-row: 2;
            width: 100%;
          }

          .about-cv-meta {
            grid-column: 1;
            grid-row: 3;
            text-align: center;
          }
        }

        @media (max-width: 380px) {
          .about-facts {
            grid-template-columns: 1fr;
          }

          .about-fact:last-child {
            grid-column: auto;
          }
        }
      `}</style>
    </section>
  );
}
