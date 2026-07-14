"use client";

import linksData from "@/lib/links.json";
import Sparkle from "./Sparkle";

// ── types ─────────────────────────────────────────────────────────────────────

interface LinkEntry {
  code: string;
  label: string;
  subtitle: string;
  icon: string;
  destinationUrl: string;
  hidden?: boolean;
  /** optional brand color override, e.g. "#0a66c2" */
  accent?: string;
}

// ── brand accent (glow color for the icon tile) ───────────────────────────────

const BRAND_ACCENTS: [RegExp, string][] = [
  [/linkedin/i, "#0a66c2"],
  [/github/i, "#e6edf3"],
  [/youtube/i, "#ff0033"],
  [/whatsapp/i, "#25d366"],
  [/drive|google/i, "#fbbc05"],
  [/azure|\.net|microsoft|onenote|fabric|powershell/i, "#38bdf8"],
];

function accentFor(entry: LinkEntry): string {
  if (entry.accent) return entry.accent;
  const haystack = `${entry.label} ${entry.code} ${entry.subtitle}`;
  return BRAND_ACCENTS.find(([re]) => re.test(haystack))?.[1] ?? "#a78bfa";
}

// ── card ──────────────────────────────────────────────────────────────────────

function LinkCard({ entry }: { entry: LinkEntry }) {
  const accent = accentFor(entry);

  return (
    <a
      href={entry.destinationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="lk-card"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {/* Icon tile */}
      <div className="lk-icon">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entry.icon}
          alt=""
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Text */}
      <div className="lk-text">
        <div className="lk-label">{entry.label}</div>
        <div className="lk-subtitle">{entry.subtitle}</div>
      </div>

      {/* Arrow */}
      <span className="lk-arrow" aria-hidden="true">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}

// ── section heading (icon + label + rule + end dot) ───────────────────────────

function SectionHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="lk-heading">
      <span className="lk-heading-icon">{icon}</span>
      <span className="lk-heading-label">{title}</span>
      <span className="lk-heading-rule" />
      <span className="lk-heading-dot" />
    </div>
  );
}

const SocialsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ResourcesIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── decorative chain graphic (header, hidden on mobile) ───────────────────────

function ChainGraphic() {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      aria-hidden="true"
      className="lk-chain"
    >
      <defs>
        <linearGradient id="lkChainGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="55%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="lkOrbitGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(167,139,250,0)" />
          <stop offset="50%" stopColor="rgba(167,139,250,.55)" />
          <stop offset="100%" stopColor="rgba(167,139,250,0)" />
        </linearGradient>
        <filter id="lkChainGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* orbit */}
      <ellipse
        cx="120"
        cy="95"
        rx="112"
        ry="30"
        stroke="url(#lkOrbitGrad)"
        strokeWidth="1.5"
        transform="rotate(-10 120 95)"
      />
      <circle cx="222" cy="76" r="2.5" fill="#a78bfa" />

      {/* interlocking chain links */}
      <g filter="url(#lkChainGlow)" transform="rotate(-38 130 72)">
        <rect
          x="98"
          y="26"
          width="42"
          height="66"
          rx="21"
          stroke="url(#lkChainGrad)"
          strokeWidth="14"
        />
        <rect
          x="122"
          y="62"
          width="42"
          height="66"
          rx="21"
          stroke="url(#lkChainGrad)"
          strokeWidth="14"
        />
      </g>
    </svg>
  );
}

// ── section ───────────────────────────────────────────────────────────────────

export default function Links() {
  const visibleLinks = (linksData as LinkEntry[]).filter(
    (l) => !l.hidden && !l.code.startsWith("h/")
  );

  // Split into social (top-level codes without "/") and resource links
  const social = visibleLinks.filter((l) => !l.code.includes("/"));
  const resources = visibleLinks.filter((l) => l.code.includes("/"));

  return (
    <section id="links" className="relative overflow-x-hidden">
      <div className="mx-auto w-full max-w-[980px] px-4 py-12 sm:px-8 sm:py-16">
        {/* ── Header ── */}
        <div className="relative mb-8 sm:mb-10">
          <div className="pointer-events-none absolute -top-6 right-0 hidden w-[210px] opacity-90 md:block lg:w-[240px]">
            <ChainGraphic />
          </div>

          <div className="flex items-center gap-3">
            <Sparkle size={30} />
            <h2 className="lk-title">Links</h2>
          </div>
          <span className="lk-title-underline" />
          <p className="lk-lede">
            Find me on socials or explore learning resources I&apos;ve shared.
          </p>
        </div>

        {/* ── Social links ── */}
        {social.length > 0 && (
          <div className="mb-9">
            <SectionHeading icon={<SocialsIcon />} title="Socials" />
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
              {social.map((entry) => (
                <LinkCard key={entry.code} entry={entry} />
              ))}
            </div>
          </div>
        )}

        {/* ── Resource links ── */}
        {resources.length > 0 && (
          <div>
            <SectionHeading icon={<ResourcesIcon />} title="Resources" />
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
              {resources.map((entry) => (
                <LinkCard key={entry.code} entry={entry} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── styles ── */}
      <style>{`
        /* ── header ─────────────────────────────────────────── */
        #links .lk-title {
          font-family: var(--font-space-grotesk);
          font-weight: 700;
          font-size: clamp(1.9rem, 6vw, 2.8rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          background: linear-gradient(120deg, #fff 30%, var(--text-dim));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        #links .lk-title-underline {
          display: block;
          width: 64px;
          height: 3px;
          margin: 10px 0 14px 42px;
          border-radius: 999px;
          background: linear-gradient(90deg, #a78bfa, rgba(124, 58, 237, 0));
        }
        #links .lk-lede {
          color: var(--text-dim);
          font-size: 14px;
          max-width: 480px;
          line-height: 1.65;
        }

        /* ── section heading ────────────────────────────────── */
        #links .lk-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        #links .lk-heading-icon {
          display: inline-flex;
          color: #a78bfa;
          flex-shrink: 0;
        }
        #links .lk-heading-label {
          font-family: var(--font-jetbrains-mono);
          font-size: 11.5px;
          font-weight: 700;
          color: #a78bfa;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          white-space: nowrap;
        }
        #links .lk-heading-rule {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(139, 92, 246, 0.45),
            rgba(139, 92, 246, 0.06)
          );
        }
        #links .lk-heading-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #7c3aed;
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.8);
          flex-shrink: 0;
        }

        /* ── card ───────────────────────────────────────────── */
        #links .lk-card {
          display: flex;
          align-items: center;
          gap: 13px;
          min-height: 72px;
          padding: 13px 15px;
          border-radius: 14px;
          background: linear-gradient(
            180deg,
            rgba(32, 26, 58, 0.65),
            rgba(19, 15, 36, 0.75)
          );
          border: 1px solid rgba(139, 92, 246, 0.16);
          text-decoration: none;
          color: var(--text);
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
          transition:
            border-color 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }
        #links .lk-card:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 2px;
        }
        /* hover effects only on devices that actually hover */
        @media (hover: hover) and (pointer: fine) {
          #links .lk-card:hover {
            transform: translateY(-3px);
            border-color: rgba(167, 139, 250, 0.5);
            box-shadow: 0 12px 30px rgba(124, 58, 237, 0.2);
          }
          #links .lk-card:hover .lk-arrow {
            background: linear-gradient(135deg, #a78bfa, #7c3aed);
            border-color: transparent;
            color: #fff;
          }
        }
        /* touch feedback on mobile */
        #links .lk-card:active {
          transform: scale(0.98);
          border-color: rgba(167, 139, 250, 0.5);
        }

        /* ── icon tile (white, brand-colored glow) ──────────── */
        #links .lk-icon {
          width: 44px;
          height: 44px;
          border-radius: 11px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #fff;
          border: 1px solid color-mix(in srgb, var(--accent) 55%, transparent);
          box-shadow:
            0 0 14px color-mix(in srgb, var(--accent) 45%, transparent),
            0 0 30px color-mix(in srgb, var(--accent) 18%, transparent);
        }
        #links .lk-icon img {
          width: 26px;
          height: 26px;
          object-fit: contain;
        }

        /* ── text ───────────────────────────────────────────── */
        #links .lk-text {
          flex: 1;
          min-width: 0;
        }
        #links .lk-label {
          font-family: var(--font-space-grotesk);
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        #links .lk-subtitle {
          font-family: var(--font-jetbrains-mono);
          font-size: 11px;
          color: var(--text-faint);
          margin-top: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── arrow ──────────────────────────────────────────── */
        #links .lk-arrow {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #cfc9de;
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.3);
          transition: all 0.2s ease;
        }

        /* ── mobile fine-tuning ─────────────────────────────── */
        @media (max-width: 640px) {
          #links .lk-card {
            padding: 12px 13px;
            gap: 12px;
            min-height: 68px;
          }
          #links .lk-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          #links .lk-icon img {
            width: 24px;
            height: 24px;
          }
          #links .lk-lede {
            font-size: 13px;
          }
          #links .lk-title-underline {
            margin-left: 40px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          #links .lk-card,
          #links .lk-arrow {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
