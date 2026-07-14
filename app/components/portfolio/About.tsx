"use client";
  
  import Image from "next/image";
  import Sparkle from "./Sparkle";
  import { PERSON } from "@/lib/portfolio/data";
  
  /* ───────────────────────── Icons (inline SVG) ───────────────────────── */
  
  const Icon = {
    user: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
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
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    spark: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
        <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
      </svg>
    ),
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
    chevron: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    ms: (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
        <rect x="2" y="2" width="9" height="9" fill="#f25022" />
        <rect x="13" y="2" width="9" height="9" fill="#7fba00" />
        <rect x="2" y="13" width="9" height="9" fill="#00a4ef" />
        <rect x="13" y="13" width="9" height="9" fill="#ffb900" />
      </svg>
    ),
    msa: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-2 3-2 6 0 9 2-3 2-6 0-9z" />
        <path d="M6 8c0 4 2.5 7 6 8-1-3.5-3-6.5-6-8z" /><path d="M18 8c0 4-2.5 7-6 8 1-3.5 3-6.5 6-8z" />
        <path d="M12 16v5" />
      </svg>
    ),
    doc: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" />
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
  
  const [firstName, ...restNameParts] = PERSON.fullName.split(" ");
  const lastName = restNameParts.join(" ");
  
  // const HIGHLIGHTS = [
  //   { num: `${age}`, label: "Years old", icon: Icon.user, desktopOnly: true },
  //   { num: "3+", label: "Years coding", icon: Icon.code },
  //   { num: "10+", label: "Projects built", icon: Icon.rocket },
  //   { num: "Always", label: "Learning", icon: Icon.spark, mobileOnly: true },
  // ];
  
  /* ───────────────────────── Small building blocks ───────────────────────── */
  
  function IconBadge({
    children,
    size = 40,
    radius = 12,
  }: {
    children: React.ReactNode;
    size?: number;
    radius?: number;
  }) {
    return (
      <span
        aria-hidden
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: "linear-gradient(135deg, rgba(96,165,250,.22), rgba(167,139,250,.22))",
          border: "1px solid rgba(167,139,250,.35)",
          color: "var(--purple)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {children}
      </span>
    );
  }
  
  /* ───────────────────────── Component ───────────────────────── */
  
  export default function About() {
    return (
      <section id="about" className="about-section relative overflow-hidden">
        <div className="about-inner relative z-10 mx-auto w-full">
          <div className="about-grid">
            {/* ══════════ LEFT — Profile card ══════════ */}
            <div className="reveal about-card">
              {/* Avatar */}
              <div className="about-avatar-wrap">
                <span className="about-avatar-sparkle s1">✦</span>
                <span className="about-avatar-sparkle s2">✦</span>
                <span className="about-avatar-sparkle s3">✦</span>
  
                {/* Floating MSA pill — mobile only */}
                <div className="about-msa-pill" aria-hidden>
                  {Icon.ms}
                  <span>Microsoft Student Ambassador</span>
                </div>
  
                <div className="about-avatar">
                  <Image
                    src="/portfolio/me.png"
                    alt={PERSON.fullName}
                    fill
                    sizes="(max-width: 700px) 220px, 220px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              </div>
  
              {/* Hero intro — mobile only */}
              <div className="about-hero-mobile">
                <span className="about-hero-hi">Hi, I&apos;m</span>
                <h2 className="about-hero-name">
                  {firstName} <span className="about-heading-accent">{lastName}</span>
                </h2>
                <div className="about-hero-tags">
                  <span className="about-hero-dot" aria-hidden />
                  <span>ICT Undergraduate</span>
                  <span className="about-hero-sep" aria-hidden>•</span>
                  <span>Learner</span>
                  <span className="about-hero-sep" aria-hidden>•</span>
                  <span>Builder</span>
                </div>
                <p className="about-hero-para">
                  {age}-year-old ICT undergraduate from{" "}
                  <span style={{ color: "var(--purple)" }}>{PERSON.location}</span>, currently
                  studying <span style={{ color: "var(--purple)" }}>{PERSON.degree}</span> at the{" "}
                  <span style={{ color: "var(--purple)" }}>University of Ruhuna</span>.
                </p>
              </div>
  
              {/* Meta rows */}
              <div className="about-meta">
                <div className="about-meta-row">
                  <IconBadge size={30} radius={9}>{Icon.pin}</IconBadge>
                  <span>{PERSON.location}</span>
                </div>
                <div className="about-meta-row">
                  <IconBadge size={30} radius={9}>{Icon.cap}</IconBadge>
                  <span>University of Ruhuna</span>
                </div>
                {/* Age chip — mobile only */}
                <div className="about-meta-row m-only-meta">
                  <IconBadge size={30} radius={9}>{Icon.calendar}</IconBadge>
                  <span>{age} years old</span>
                </div>
              </div>
  
              <div className="about-divider" />
  
              {/* MSA badge */}
              <div className="about-msa">
                <IconBadge>{Icon.msa}</IconBadge>
                <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                  <span className="about-msa-title">Microsoft Student Ambassador</span>
                  <span className="about-msa-sub">Empowering the student tech community</span>
                </div>
                <span className="about-msa-chevron" aria-hidden>{Icon.chevron}</span>
              </div>
            </div>
  
            {/* ══════════ RIGHT — Text, stats, CV ══════════ */}
            <div className="reveal about-right">
              {/* Stats row */}
              {/* <div className="about-stats m-only-block">
                {HIGHLIGHTS.map((h) => (
                  <div
                    key={h.label}
                    className={`about-stat${h.desktopOnly ? " d-only" : ""}${h.mobileOnly ? " m-only-stat" : ""}`}
                  >
                    <IconBadge>{h.icon}</IconBadge>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                      <span className="about-stat-num">{h.num}</span>
                      <span className="about-stat-label">{h.label}</span>
                    </div>
                  </div>
                ))}
              </div> */}
  
              {/* Heading */}
              <div className="about-heading-row">
                {/* <Sparkle size={30} /> */}
                <span className="about-heading-spark" aria-hidden>✦</span>
                <h2 className="about-heading">
                  About <span className="about-heading-accent">Me</span>
                </h2>
                <span className="about-heading-line" aria-hidden />
              </div>
  
              {/* Intro — desktop only (mobile shows it in the hero above) */}
              <p className="about-para about-para-intro">
                Hi, I&apos;m <strong style={{ color: "var(--text)" }}>{PERSON.fullName}</strong>, a{" "}
                <span style={{ color: "var(--purple)" }}>{age}-year-old ICT</span> undergraduate from{" "}
                <span style={{ color: "var(--purple)" }}>{PERSON.location}</span>, currently studying{" "}
                <span style={{ color: "var(--purple)" }}>{PERSON.degree}</span> at the{" "}
                <span style={{ color: "var(--purple)" }}>University of Ruhuna</span>.
              </p>
  
              <div className="about-para-group">
                <p className="about-para">
                  I&apos;m a Microsoft Student Ambassador and a passionate full-stack developer who
                  enjoys building modern web applications, open-source projects, and developer tools.
                </p>
                <p className="about-para">
                  I also create technical content in both Sinhala and English while continuously
                  exploring technologies like <span className="about-tech">React</span>,{" "}
                  <span className="about-tech">Next.js</span>,{" "}
                  <span className="about-tech">TypeScript</span>,{" "}
                  <span className="about-tech">Three.js</span>, cloud computing, and AI.
                </p>
              </div>
  
              {/* Download CV card */}
              <div className="about-cv">
                <div className="about-cv-info">
                  <IconBadge size={52} radius={14}>{Icon.doc}</IconBadge>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                    <span className="about-cv-title">Download My CV</span>
                    <span className="about-cv-sub">
                      Get a complete overview of my skills, experience and projects.
                    </span>
                  </div>
                </div>
                <div className="about-cv-action">
                  <a href="/cv.pdf" download className="about-cv-btn">
                    {Icon.download}
                    <span className="about-cv-btn-text">Download CV</span>
                  </a>
                  <span className="about-cv-note">PDF &bull; Updated July 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
   {/* ───────────────────── Styles ───────────────────── */}
        <style jsx>{`
          .about-section {
            padding: 0;
          }
          .about-inner {
            max-width: 1080px;
            min-height: calc(100vh - var(--nav-h));
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: clamp(40px, 6vw, 64px) clamp(20px, 4vw, 32px);
          }
          .about-grid {
            display: grid;
            grid-template-columns: minmax(300px, 380px) 1fr;
            gap: clamp(32px, 5vw, 64px);
            align-items: center;
          }
  
          /* Mobile-only elements — hidden on desktop */
          .about-msa-pill,
          .about-hero-mobile,
          .about-msa-chevron,
          .about-heading-spark,
          .about-heading-line,
          .m-only-meta,
          .m-only-stat {
            display: none;
          }
          .about-tech {
            color: inherit;
          }
  
          /* ── Left card ── */
          .about-card {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: clamp(22px, 3vw, 32px);
            border-radius: 24px;
            background: linear-gradient(180deg, rgba(167, 139, 250, 0.06), rgba(96, 165, 250, 0.03)),
              var(--surface);
            border: 1px solid rgba(167, 139, 250, 0.28);
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.12), 0 0 80px rgba(139, 92, 246, 0.06);
          }
          .about-avatar-wrap {
            position: relative;
            display: flex;
            justify-content: center;
            padding: 12px 0;
          }
          .about-avatar {
            position: relative;
            width: clamp(160px, 22vw, 220px);
            aspect-ratio: 1;
            border-radius: 50%;
            overflow: hidden;
            background: radial-gradient(circle at 50% 35%, rgba(167, 139, 250, 0.55), rgba(76, 29, 149, 0.85) 70%);
            border: 1px solid rgba(167, 139, 250, 0.35);
          }
          .about-avatar-sparkle {
            position: absolute;
            color: var(--purple);
            font-size: 13px;
            opacity: 0.85;
            animation: aboutTwinkle 2.6s ease-in-out infinite;
          }
          .about-avatar-sparkle.s1 { top: 6%; right: 14%; }
          .about-avatar-sparkle.s2 { bottom: 12%; right: 6%; font-size: 10px; animation-delay: 0.8s; }
          .about-avatar-sparkle.s3 { bottom: 6%; left: 10%; font-size: 11px; animation-delay: 1.5s; }
          @keyframes aboutTwinkle {
            0%, 100% { opacity: 0.35; transform: scale(0.85); }
            50% { opacity: 1; transform: scale(1.15); }
          }
          .about-msa {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 14px 16px;
          }
          .about-msa-title {
            font-family: var(--font-space-grotesk);
            font-size: 14px;
            font-weight: 700;
            color: var(--text);
          }
          .about-msa-sub {
            font-size: 12px;
            color: var(--text-faint);
          }
          .about-divider {
            height: 1px;
            background: var(--border);
          }
          .about-meta {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .about-meta-row {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 13.5px;
            color: var(--text);
            font-family: var(--font-space-grotesk);
            font-weight: 500;
          }
  
          /* ── Right column ── */
          .about-right {
            display: flex;
            flex-direction: column;
            gap: 20px;
            min-width: 0;
          }
          .about-heading-row {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .about-heading {
            font-family: var(--font-space-grotesk);
            font-weight: 700;
            font-size: clamp(2rem, 5vw, 3.2rem);
            line-height: 1.1;
            letter-spacing: -0.02em;
            color: var(--text);
          }
          .about-heading-accent {
            background: linear-gradient(120deg, var(--blue), var(--purple));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .about-para-group {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .about-para {
            color: var(--text-dim);
            font-size: clamp(14px, 1.6vw, 15.5px);
            line-height: 1.8;
            max-width: 60ch;
          }
  
          /* ── Stats ── */
          .about-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          .about-stat {
            display: flex;
            align-items: center;
            gap: 12px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 14px 16px;
            transition: border-color 0.2s, transform 0.2s;
          }
          .about-stat:hover {
            border-color: rgba(167, 139, 250, 0.45);
            transform: translateY(-2px);
          }
          .about-stat-num {
            font-family: var(--font-space-grotesk);
            font-size: 21px;
            font-weight: 700;
            color: var(--text);
            line-height: 1.1;
          }
          .about-stat-label {
            font-family: var(--font-jetbrains-mono);
            font-size: 10.5px;
            color: var(--text-faint);
            white-space: nowrap;
          }
  
          /* ── CV card ── */
          .about-cv {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 18px;
            padding: 20px 22px;
          }
          .about-cv-info {
            display: flex;
            align-items: center;
            gap: 14px;
            min-width: 0;
            flex: 1 1 260px;
          }
          .about-cv-title {
            font-family: var(--font-space-grotesk);
            font-size: 15.5px;
            font-weight: 700;
            color: var(--text);
          }
          .about-cv-sub {
            font-size: 12.5px;
            line-height: 1.5;
            color: var(--text-faint);
          }
          .about-cv-action {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 7px;
            flex-shrink: 0;
          }
          .about-cv-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(120deg, #8b5cf6, #a78bfa);
            color: #fff;
            font-family: var(--font-space-grotesk);
            font-size: 13.5px;
            font-weight: 700;
            padding: 11px 20px;
            border-radius: 11px;
            text-decoration: none;
            box-shadow: 0 4px 20px rgba(139, 92, 246, 0.35);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .about-cv-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 26px rgba(139, 92, 246, 0.5);
          }
          .about-cv-note {
            font-family: var(--font-jetbrains-mono);
            font-size: 10.5px;
            color: var(--text-faint);
          }
  
          /* ── Responsive: tablet ── */
          @media (max-width: 980px) {
            .about-grid {
              grid-template-columns: 1fr;
              align-items: start;
            }
            .about-card {
              max-width: 440px;
              margin: 0 auto;
              width: 100%;
            }
          }
  
          /* ═════════ Mobile redesign (matches mockup) ═════════ */
          @media (max-width: 700px) {
            .d-only {
              display: none !important;
            }
  
            .about-inner {
              padding: 32px 20px 48px;
            }
            .about-grid {
              gap: 24px;
            }
  
            /* Left card dissolves into the page background */
            .about-card {
              background: none;
              border: none;
              box-shadow: none;
              padding: 0;
              max-width: none;
              gap: 18px;
            }
            .about-divider {
              display: none;
            }
  
            /* Avatar + floating MSA pill */
            .about-avatar-wrap {
              padding: 18px 0 10px;
            }
            .about-avatar {
              width: min(220px, 58vw);
              border: 3px solid rgba(139, 92, 246, 0.55);
              box-shadow: 0 0 42px rgba(139, 92, 246, 0.3);
            }
            .about-msa-pill {
              position: absolute;
              top: 0;
              right: 0;
              z-index: 2;
              display: inline-flex;
              align-items: center;
              gap: 8px;
              max-width: 170px;
              padding: 8px 12px;
              border-radius: 14px;
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid var(--border);
              backdrop-filter: blur(8px);
              font-family: var(--font-space-grotesk);
              font-size: 11.5px;
              font-weight: 600;
              line-height: 1.3;
              color: var(--text);
            }
  
            /* Hero intro */
            .about-hero-mobile {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }
            .about-hero-hi {
              font-family: var(--font-space-grotesk);
              font-size: 19px;
              font-weight: 500;
              color: var(--text-dim);
            }
            .about-hero-name {
              font-family: var(--font-space-grotesk);
              font-weight: 700;
              font-size: clamp(1.9rem, 9.5vw, 2.5rem);
              line-height: 1.1;
              letter-spacing: -0.02em;
              color: var(--text);
              margin-top: -4px;
            }
            .about-hero-tags {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              gap: 8px;
              font-family: var(--font-space-grotesk);
              font-size: 14px;
              font-weight: 500;
              color: var(--text);
            }
            .about-hero-dot {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: var(--purple);
              flex-shrink: 0;
            }
            .about-hero-sep {
              color: var(--text-faint);
            }
            .about-hero-para {
              color: var(--text-dim);
              font-size: 15px;
              line-height: 1.75;
            }
  
            /* Meta → 3 chips in a row */
            .about-meta {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 10px;
            }
            .about-meta-row {
              gap: 9px;
              background: var(--surface);
              border: 1px solid var(--border);
              border-radius: 14px;
              padding: 12px 10px;
              font-size: 12px;
              line-height: 1.3;
            }
            .m-only-meta {
              display: flex;
            }
  
            /* MSA card with chevron */
            .about-msa {
              border-radius: 16px;
              padding: 16px;
            }
            .about-msa-chevron {
              display: flex;
              align-items: center;
              margin-left: auto;
              color: var(--text-faint);
              flex-shrink: 0;
            }
  
            /* Right column */
            .about-right {
              gap: 18px;
            }
  
            /* Stats → 3 vertical tiles, "Always Learning" replaces age */
            .about-stats {
              grid-template-columns: repeat(3, 1fr);
              gap: 10px;
            }
            .about-stat {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
              padding: 14px 12px;
            }
            .m-only-stat {
              display: flex;
            }
            .about-stat-num {
              font-size: 19px;
            }
            .about-stat-label {
              white-space: normal;
            }
  
            /* About Me heading with sparkle + gradient line */
            .about-heading-spark {
              display: inline-flex;
              color: var(--purple);
              font-size: 20px;
              line-height: 1;
            }
            .about-heading-line {
              display: block;
              margin-left: auto;
              width: 54px;
              height: 3px;
              border-radius: 2px;
              background: linear-gradient(90deg, var(--purple), var(--blue));
            }
            .about-heading {
              font-size: 1.55rem;
            }
  
            /* Paragraphs get the purple side rail; intro moves to hero */
            .about-para-intro {
              display: none;
            }
            .about-para-group {
              border-left: 3px solid rgba(139, 92, 246, 0.65);
              padding-left: 14px;
              gap: 14px;
            }
            .about-para {
              font-size: 14.5px;
            }
            .about-tech {
              color: var(--purple);
            }
  
            /* CV card → compact row */
            .about-cv {
              border-radius: 18px;
              padding: 16px;
              gap: 14px;
              border-color: rgba(167, 139, 250, 0.3);
            }
            .about-cv-info {
              flex: 1 1 170px;
              gap: 12px;
            }
            .about-cv-sub {
              font-size: 12px;
            }
            .about-cv-btn {
              padding: 10px 16px;
              border-radius: 12px;
            }
          }
  
          @media (max-width: 380px) {
            .about-msa {
              padding: 12px;
            }
            .about-msa-title {
              font-size: 13px;
            }
            .about-msa-pill {
              max-width: 145px;
              font-size: 10.5px;
            }
            .about-cv {
              flex-direction: column;
              align-items: stretch;
            }
            .about-cv-action {
              align-items: stretch;
              text-align: center;
            }
            .about-cv-btn {
              justify-content: center;
            }
          }
        `}
      </style>
       
    </section>
  );
}