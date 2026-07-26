"use client";

import { useState, useEffect, useCallback } from "react";
  
  type Status = "Ongoing" | "Completed";
  type Category = "Experience" | "Education" | "Volunteering";
  type Filter = "All" | Category;

  const CATEGORY_META: Record<
    Category,
    { icon: string; accent: string; chipBg: string; chipBorder: string; chipColor: string }
  > = {
    Experience: {
      icon: "briefcase",
      accent: "#a78bfa",
      chipBg: "rgba(139,92,246,.16)",
      chipBorder: "rgba(139,92,246,.32)",
      chipColor: "#d8c9fb",
    },
    Education: {
      icon: "grad",
      accent: "#10b981",
      chipBg: "rgba(16,185,129,.12)",
      chipBorder: "rgba(16,185,129,.35)",
      chipColor: "#6ee7b7",
    },
    Volunteering: {
      icon: "heart",
      accent: "#3b82f6",
      chipBg: "rgba(59,130,246,.14)",
      chipBorder: "rgba(59,130,246,.35)",
      chipColor: "#93c5fd",
    },
  };
  
  const EVENTS = [
    {
      year: "Now",
      title: "Microsoft Student Ambassador",
      org: "Microsoft Learn",
      desc: "Selected as a Microsoft Student Ambassador, learning, building, and empowering the student developer community through Microsoft technologies.",
      category: "Volunteering" as Category,
      logo: "/portfolio/msLearn/LevelAlpha.png",
      period: "Jul 2026 – Present",
      status: "Ongoing" as Status,
      current: true,
      accent: "#3b82f6",
    },
    {
      year: "Jul 2025",
      title: "ICT Representative",
      org: "University of Ruhuna",
      desc: "Served as the ICT Representative, supporting student activities and acting as a bridge between students and the department.",
      category: "Volunteering" as Category,
      logo: "/portfolio/ruhuna.png",
      period: "Jul 2025 – Mar 2026",
      status: "Completed" as Status,
      current: false,
      accent: "#a78bfa",
    },
    {
      year: "Jul 2025",
      title: "Bachelor of ICT",
      org: "University of Ruhuna",
      desc: "Currently pursuing a Bachelor's degree in Information & Communication Technology at the University of Ruhuna.",
      category: "Education" as Category,
      logo: "/portfolio/ruhuna.png",
      period: "Jul 2025 – Present",
      status: "Ongoing" as Status,
      current: true,
      accent: "#10b981",
    },
    {
      year: "2024",
      title: "Associate Trainee",
      org: "OREL IT",
      desc: "Completed a six-month Associate Trainee program at OREL IT, gaining practical experience in software development and industry workflows.",
      category: "Experience" as Category,
      logo: "/portfolio/orel.png",
      period: "Aug 2024 – Jan 2025",
      status: "Completed" as Status,
      current: false,
      accent: "#a78bfa",
    },
    {
      year: "2015",
      title: "A/L — Information Technology",
      org: "Bandaranayake College, Gampaha",
      desc: "Studied Information Technology at Advanced Level, building the foundational knowledge that sparked my passion for computing and software development.",
      category: "Education" as Category,
      logo: "/portfolio/bcg.png",
      period: "Jan 2015 – Jul 2024",
      status: "Completed" as Status,
      current: false,
      accent: "#a78bfa",
    },
  ];
  
  const FILTERS: Filter[] = ["All", "Experience", "Education", "Volunteering"];
  
  /* ---------- small pieces ---------- */
  
  function Icon({ name, size = 26 }: { name: string; size?: number }) {
    const common = {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#a78bfa",
      strokeWidth: 1.8,
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
    };
    switch (name) {
      case "heart":
        return (
          <svg {...common} fill="#a78bfa" stroke="none">
            <path d="M12 21s-6.7-4.35-9.33-8.11C.9 10.35 1.7 6.6 4.8 5.4c2-.78 4.2-.1 5.5 1.5l1.7 2 1.7-2c1.3-1.6 3.5-2.28 5.5-1.5 3.1 1.2 3.9 4.95 2.13 7.49C18.7 16.65 12 21 12 21z" />
          </svg>
        );
      case "people":
        return (
          <svg {...common}>
            <circle cx="9" cy="8" r="3.2" />
            <path d="M2.8 19c.7-3 3.2-4.6 6.2-4.6s5.5 1.6 6.2 4.6" />
            <circle cx="17" cy="9" r="2.4" />
            <path d="M15.5 14.6c2.6.2 4.9 1.6 5.7 4.4" />
          </svg>
        );
      case "grad":
        return (
          <svg {...common}>
            <path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5z" />
            <path d="M6.5 11.8v4.2c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5v-4.2" />
            <path d="M22 9.5v5" />
          </svg>
        );
      case "briefcase":
        return (
          <svg {...common}>
            <rect x="3" y="7.5" width="18" height="12" rx="2.5" />
            <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
            <path d="M3 12.5h18" />
          </svg>
        );
      default:
        return null;
    }
  }
  
  function TimelineLogo({ src, alt }: { src: string; alt: string }) {
    const [loaded, setLoaded] = useState(false);

    return (
      <div className="tl-logo-wrap">
        {!loaded && <span className="tl-logo-shimmer" aria-hidden="true" />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`tl-logo-img${loaded ? " loaded" : ""}`}
          onLoad={() => setLoaded(true)}
        />
      </div>
    );
  }

  function TimelineSkeleton({ count = 3 }: { count?: number }) {
    return (
      <>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="tl-row tl-row-skeleton" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="tl-meta tl-skeleton-block" aria-hidden="true">
              <span className="tl-skeleton tl-skeleton-year" />
              <span className="tl-skeleton tl-skeleton-period" />
              <span className="tl-skeleton tl-skeleton-pill" />
            </div>
            <div className="tl-track tl-track-loading" aria-hidden="true">
              <span className="tl-dot tl-dot-skeleton" />
            </div>
            <div className="tl-card tl-card-skeleton" aria-hidden="true">
              <span className="tl-skeleton tl-skeleton-icon" />
              <div className="tl-skeleton-body">
                <span className="tl-skeleton tl-skeleton-title" />
                <span className="tl-skeleton tl-skeleton-org" />
                <span className="tl-skeleton tl-skeleton-desc" />
                <span className="tl-skeleton tl-skeleton-desc tl-skeleton-desc-short" />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  function StatusPill({ status }: { status: Status }) {
    const ongoing = status === "Ongoing";
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: ".08em",
          color: ongoing ? "#34d399" : "var(--text-faint)",
          background: ongoing ? "rgba(16,185,129,.1)" : "rgba(255,255,255,.04)",
          border: `1px solid ${ongoing ? "rgba(16,185,129,.35)" : "var(--border)"}`,
          borderRadius: "999px",
          padding: "3px 10px",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: ongoing ? "#34d399" : "var(--text-faint)",
            boxShadow: ongoing ? "0 0 6px rgba(52,211,153,.8)" : "none",
          }}
        />
        {status.toUpperCase()}
      </span>
    );
  }
  
  /* ---------- main component ---------- */
  
  export default function Timeline() {
    const [filter, setFilter] = useState<Filter>("All");
    const [displayFilter, setDisplayFilter] = useState<Filter>("All");
    const [loading, setLoading] = useState(false);

    const events = EVENTS.filter((e) => displayFilter === "All" || e.category === displayFilter);
    const pendingCount = EVENTS.filter((e) => filter === "All" || e.category === filter).length;

    useEffect(() => {
      if (filter === displayFilter) return;
      setLoading(true);
      const timer = window.setTimeout(() => {
        setDisplayFilter(filter);
        setLoading(false);
      }, 320);
      return () => window.clearTimeout(timer);
    }, [filter, displayFilter]);

    const handleFilter = useCallback((next: Filter) => {
      if (next === filter) return;
      setFilter(next);
    }, [filter]);
  
    return (
      <section id="timeline" className="relative overflow-hidden" style={{ padding: 0 }}>
        <style>{`
          #timeline .tl-header {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: space-between;
            column-gap: 16px;
            row-gap: 5px;
            margin-bottom: 44px;
          }
          #timeline .tl-filters {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 5px;
          }
          #timeline .tl-filter-btn {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            font-family: var(--font-jetbrains-mono);
            font-size: 12px;
            font-weight: 600;
            color: var(--text-dim);
            background: transparent;
            border: 1px solid transparent;
            border-radius: 9px;
            padding: 6px 14px;
            cursor: pointer;
            transition: color .2s, background .2s, border-color .2s;
            white-space: nowrap;
          }
          #timeline .tl-filter-btn:hover { color: var(--text); }
          #timeline .tl-filter-btn.active {
            color: var(--text);
            background: rgba(139,92,246,.14);
            border-color: rgba(167,139,250,.5);
          }
          #timeline .tl-row {
            display: grid;
            grid-template-columns: 168px 40px 1fr;
            margin-bottom: 30px;
          }
          #timeline .tl-row:last-of-type { margin-bottom: 0; }
          #timeline .tl-meta {
            text-align: right;
            padding-right: 14px;
            padding-top: 6px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 6px;
          }
          #timeline .tl-track {
            position: relative;
            display: flex;
            justify-content: center;
          }
          #timeline .tl-track::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 0;
            bottom: -30px;
            width: 1px;
            background: linear-gradient(to bottom, var(--border), var(--border));
            transform: translateX(-50%);
          }
          #timeline .tl-row:first-of-type .tl-track::before { top: 10px; }
          #timeline .tl-row:last-of-type .tl-track::before { bottom: auto; height: 100%; }
          #timeline .tl-dot {
            position: relative;
            z-index: 1;
            margin-top: 8px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: var(--surface);
            border: 2px solid var(--border);
            flex-shrink: 0;
          }
          #timeline .tl-card {
            position: relative;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 18px 20px;
            display: grid;
            grid-template-columns: 56px minmax(0, 1fr) auto;
            grid-template-areas:
              "icon body badges"
              "icon description badges";
            gap: 16px;
            transition: border-color .2s, transform .2s, box-shadow .2s;
          }
          #timeline .tl-card-body {
            grid-area: body;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          #timeline .tl-description {
            grid-area: description;
            font-size: 13px;
            color: var(--text-dim);
            line-height: 1.65;
            margin: 0;
          }
          #timeline .tl-card-accent { display: none; }
          #timeline .tl-card:hover {
            border-color: rgba(167,139,250,.5) !important;
            box-shadow: 0 8px 30px rgba(0,0,0,.35);
          }
          #timeline .tl-iconbox {
            grid-area: icon;
            flex-shrink: 0;
            width: 56px;
            height: 56px;
            border-radius: 14px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(139,92,246,.3);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          #timeline .tl-badges {
            grid-area: badges;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 10px;
            padding-top: 2px;
          }
          #timeline .tl-meta-inline { display: none; }
          #timeline .tl-footer {
            margin-top: 40px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 18px 22px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
          }
          #timeline .tl-chip {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: var(--text-dim);
            background: rgba(255,255,255,.03);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 9px 14px;
            transition: border-color .2s, color .2s;
            white-space: nowrap;
          }
          #timeline .tl-chip:hover { border-color: rgba(167,139,250,.5); color: var(--text); }

          /* ---------- loading & entrance ---------- */
          @keyframes tlShimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes tlRowEnter {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes tlSpineFlow {
            0% { background-position: 50% -120%; opacity: 0.35; }
            50% { opacity: 1; }
            100% { background-position: 50% 220%; opacity: 0.35; }
          }
          @keyframes tlDotPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(167,139,250,.35); transform: scale(1); }
            50% { box-shadow: 0 0 0 6px rgba(167,139,250,0); transform: scale(1.08); }
          }

          #timeline .tl-skeleton {
            display: block;
            border-radius: 8px;
            background: linear-gradient(
              90deg,
              rgba(255,255,255,.04) 0%,
              rgba(167,139,250,.14) 45%,
              rgba(96,165,250,.1) 55%,
              rgba(255,255,255,.04) 100%
            );
            background-size: 200% 100%;
            animation: tlShimmer 1.4s ease-in-out infinite;
          }
          #timeline .tl-row-skeleton { pointer-events: none; }
          #timeline .tl-skeleton-year { width: 52px; height: 18px; margin-left: auto; border-radius: 6px; }
          #timeline .tl-skeleton-period { width: 88px; height: 11px; margin-left: auto; }
          #timeline .tl-skeleton-pill { width: 72px; height: 20px; margin-left: auto; border-radius: 999px; }
          #timeline .tl-skeleton-icon {
            width: 56px;
            height: 56px;
            border-radius: 14px;
            flex-shrink: 0;
          }
          #timeline .tl-skeleton-body {
            display: flex;
            flex-direction: column;
            gap: 8px;
            min-width: 0;
          }
          #timeline .tl-skeleton-title { width: min(220px, 72%); height: 16px; }
          #timeline .tl-skeleton-org { width: min(140px, 48%); height: 13px; }
          #timeline .tl-skeleton-desc { width: 100%; height: 11px; }
          #timeline .tl-skeleton-desc-short { width: 78%; }
          #timeline .tl-card-skeleton {
            display: flex;
            gap: 16px;
            padding: 18px 20px;
            border-color: rgba(139,92,246,.12);
          }
          #timeline .tl-dot-skeleton {
            border-color: rgba(167,139,250,.35);
            animation: tlDotPulse 1.6s ease-in-out infinite;
          }
          #timeline .tl-track-loading::before {
            background: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(167,139,250,.55) 45%,
              rgba(96,165,250,.45) 55%,
              transparent 100%
            );
            background-size: 100% 40%;
            animation: tlSpineFlow 1.8s ease-in-out infinite;
          }
          #timeline .tl-row-enter {
            animation: tlRowEnter 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          #timeline .tl-row-enter:nth-child(1) { animation-delay: 0.04s; }
          #timeline .tl-row-enter:nth-child(2) { animation-delay: 0.1s; }
          #timeline .tl-row-enter:nth-child(3) { animation-delay: 0.16s; }
          #timeline .tl-row-enter:nth-child(4) { animation-delay: 0.22s; }
          #timeline .tl-row-enter:nth-child(5) { animation-delay: 0.28s; }
          #timeline .tl-row-enter:nth-child(6) { animation-delay: 0.34s; }

          #timeline .tl-logo-wrap {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          #timeline .tl-logo-shimmer {
            position: absolute;
            inset: 6px;
            border-radius: 10px;
            background: linear-gradient(
              90deg,
              rgba(255,255,255,.06) 0%,
              rgba(167,139,250,.18) 50%,
              rgba(255,255,255,.06) 100%
            );
            background-size: 200% 100%;
            animation: tlShimmer 1.4s ease-in-out infinite;
          }
          #timeline .tl-logo-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 10px;
            padding: 6px;
            opacity: 0;
            transition: opacity 0.35s ease;
          }
          #timeline .tl-logo-img.loaded { opacity: 1; }

          @media (prefers-reduced-motion: reduce) {
            #timeline .tl-skeleton,
            #timeline .tl-logo-shimmer,
            #timeline .tl-dot-skeleton,
            #timeline .tl-track-loading::before,
            #timeline .tl-row-enter {
              animation: none !important;
            }
            #timeline .tl-logo-img { opacity: 1; transition: none; }
            #timeline .tl-row-enter { opacity: 1; transform: none; }
          }
  
          /* ---------- tablet ---------- */
          @media (max-width: 900px) {
            #timeline .tl-row { grid-template-columns: 120px 32px 1fr; }
            #timeline .tl-meta { padding-right: 10px; }
          }
  
          /* ---------- mobile ---------- */
          @media (max-width: 680px) {
            #timeline .tl-container {
              min-height: auto !important;
              padding: 32px 16px 88px !important;
            }
            #timeline .tl-header {
              flex-direction: column;
              gap: 20px;
              margin-bottom: 24px;
            }
            #timeline .tl-heading {
              font-size: clamp(1.75rem, 9vw, 2.35rem) !important;
            }
            #timeline .tl-subtitle {
              max-width: 32ch;
              font-size: 13px !important;
            }
            #timeline .tl-filters {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              width: 100%;
              gap: 8px;
              padding: 0;
              border: 0;
              background: transparent;
            }
            #timeline .tl-filter-btn {
              justify-content: center;
              min-height: 44px;
              padding: 10px 8px;
              font-size: 11px;
              gap: 6px;
              min-width: 0;
              background: var(--surface);
              border-color: var(--border);
              border-radius: 12px;
            }
            #timeline .tl-filter-btn.active {
              background: linear-gradient(135deg, rgba(139,92,246,.22), rgba(59,130,246,.12));
              border-color: rgba(167,139,250,.65);
              box-shadow: inset 0 0 0 1px rgba(167,139,250,.08);
            }
            #timeline .tl-row {
              display: block;
              margin-bottom: 14px;
            }
            #timeline .tl-meta { display: none; }
            #timeline .tl-meta-inline {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 10px;
              margin-top: 4px;
              margin-bottom: 0;
              order: 2;
            }
            #timeline .tl-meta-row {
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              gap: 6px;
            }
            #timeline .tl-meta-dates {
              font-family: var(--font-jetbrains-mono);
              font-size: 10px;
              color: var(--text-faint);
              gap: 6px;
            }
            #timeline .tl-track { display: none; }
            #timeline .tl-card {
              display: grid;
              grid-template-columns: 44px minmax(0, 1fr);
              grid-template-areas:
                "icon body"
                "description description"
                "badges badges";
              gap: 12px;
              padding: 16px;
              overflow: hidden;
              align-items: start;
              border-radius: 18px;
              background:
                linear-gradient(145deg, rgba(255,255,255,.025), transparent 45%),
                var(--surface);
            }
            #timeline .tl-card:hover { transform: none; }
            #timeline .tl-present-floating { display: none !important; }
            #timeline .tl-card-accent {
              display: block;
              position: absolute;
              inset: 0 auto 0 0;
              width: 3px;
            }
            #timeline .tl-iconbox {
              grid-area: icon;
              width: 44px;
              height: 44px;
              border-radius: 12px;
            }
            #timeline .tl-card-body {
              grid-area: body;
              min-width: 0;
              gap: 4px;
            }
            #timeline .tl-card-body h3 {
              font-size: 16px !important;
              line-height: 1.25 !important;
            }
            #timeline .tl-description {
              grid-area: description;
              font-size: 12.5px;
              line-height: 1.6;
              padding-top: 2px;
            }
            #timeline .tl-badges {
              grid-area: badges;
              flex-direction: row;
              align-items: center;
              flex-wrap: wrap;
              justify-content: flex-start;
              gap: 8px;
              padding-top: 12px;
              margin-top: 0;
              border-top: 1px solid var(--border);
            }
            #timeline .tl-card-skeleton {
              display: grid;
              grid-template-columns: 44px minmax(0, 1fr);
              gap: 12px;
              padding: 16px;
            }
            #timeline .tl-skeleton-icon {
              width: 44px;
              height: 44px;
              border-radius: 12px;
            }
            #timeline .tl-meta.tl-skeleton-block { display: none; }
          }

          @media (min-width: 681px) {
            #timeline .tl-present-floating { position: absolute; top: -13px; right: 14px; }
          }
        `}</style>
  
        <div
          className="tl-container relative z-10 mx-auto w-full max-w-[1080px] px-5 sm:px-8"
          style={{ minHeight: "100vh", paddingTop: "56px", paddingBottom: "72px" }}
        >
          {/* ---------- Header ---------- */}
          <div className="tl-header">
            <div className="flex flex-col gap-3">
              
              <div className="flex items-center gap-3">
                {/* <Sparkle size={30} /> */}
                <h2
                  className="tl-heading"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontWeight: 700,
                    fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  <span style={{ color: "#fff" }}>My </span>
                  <span
                    style={{
                      background: "linear-gradient(120deg, #a78bfa 10%, #60a5fa 90%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Timeline
                  </span>
                </h2>
              </div>
              <p className="tl-subtitle" style={{ color: "var(--text-dim)", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
                Experience, education, and volunteering across my journey.
              </p>
            </div>
  
            {/* Filter */}
            <div className="tl-filters" role="tablist" aria-label="Filter timeline by category">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  className={`tl-filter-btn ${filter === f ? "active" : ""}`}
                  onClick={() => handleFilter(f)}
                >
                  {f !== "All" && (
                    <Icon name={CATEGORY_META[f].icon} size={14} />
                  )}
                  {f}
                </button>
              ))}
            </div>
          </div>
  
          {/* ---------- Timeline ---------- */}
          <div
            className={`tl-list${loading ? " tl-list-loading" : ""}`}
            aria-busy={loading}
            aria-live="polite"
          >
            {loading ? (
              <TimelineSkeleton count={Math.min(Math.max(pendingCount, 1), 3)} />
            ) : (
              events.map((ev) => (
              <div key={`${displayFilter}-${ev.title}`} className="tl-row tl-row-enter">
                {/* Left meta (desktop) */}
                <div className="tl-meta">
                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: ev.current ? ev.accent : "#a78bfa",
                      lineHeight: 1,
                    }}
                  >
                    {ev.year}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "11px",
                      color: "var(--text-faint)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ev.period}
                  </span>
                  <StatusPill status={ev.status} />
                </div>
  
                {/* Track + dot */}
                <div className="tl-track" aria-hidden="true">
                  <span
                    className="tl-dot"
                    style={
                      ev.current
                        ? {
                            background: `radial-gradient(circle at 35% 35%, #fff2, ${ev.accent})`,
                            border: `2px solid ${ev.accent}`,
                          }
                        : undefined
                    }
                  />
                </div>
  
                {/* Card */}
                <article
                  className="tl-card"
                  style={ev.current ? { borderColor: `${ev.accent}66` } : undefined}
                >
                  <span className="tl-card-accent" style={{ background: ev.accent }} aria-hidden="true" />
                  {/* PRESENT ribbon */}
                  {ev.current && (
                    <span
                      className="tl-present-floating"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: ".1em",
                        color: "#fff",
                        background:
                          ev.accent === "#3b82f6"
                            ? "linear-gradient(120deg, #3b82f6, #6366f1)"
                            : "linear-gradient(120deg, #10b981, #059669)",
                        borderRadius: "999px",
                        padding: "4px 12px",
                      }}
                    >
                      ✦ PRESENT
                    </span>
                  )}

                  <div className="tl-iconbox">
                    <TimelineLogo src={ev.logo} alt={ev.org} />
                  </div>
  
                  <div className="tl-card-body">
                    {/* Mobile-only meta */}
                    <div className="tl-meta-inline">
                      <div className="tl-meta-row tl-meta-dates">
                        <span>{ev.period}</span>
                      </div>
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "var(--text)",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {ev.title}
                    </h3>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: ev.accent === "#3b82f6" ? "#60a5fa" : "#a78bfa",
                      }}
                    >
                      {ev.org}
                    </span>
                  </div>

                  <p className="tl-description">{ev.desc}</p>
  
                  <div className="tl-badges">
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: CATEGORY_META[ev.category].chipColor,
                        background: CATEGORY_META[ev.category].chipBg,
                        border: `1px solid ${CATEGORY_META[ev.category].chipBorder}`,
                        borderRadius: "8px",
                        padding: "4px 12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {ev.category}
                    </span>
                    <span className="tl-status-desktop">
                      <StatusPill status={ev.status} />
                    </span>
                  </div>
                </article>
              </div>
            ))
            )}
          </div>
  
          
        </div>
      </section>
    );
  }
  