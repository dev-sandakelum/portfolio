"use client";

import { useState } from "react";
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
}

// ── card ──────────────────────────────────────────────────────────────────────

function LinkCard({ entry }: { entry: LinkEntry }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={entry.destinationUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        background: "rgba(22,18,38,.55)",
        border: `1px solid ${hovered ? "rgba(167,139,250,.45)" : "var(--border)"}`,
        borderRadius: "14px",
        padding: "14px 16px",
        textDecoration: "none",
        color: "var(--text)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 10px 28px rgba(124,58,237,.18)" : "none",
        transition: "border-color .2s, transform .2s, box-shadow .2s",
        overflow: "hidden",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "10px",
          flexShrink: 0,
          overflow: "hidden",
          background: "rgba(139,92,246,.12)",
          border: "1px solid rgba(139,92,246,.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entry.icon}
          alt={entry.label}
          style={{ width: "26px", height: "26px", objectFit: "contain" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "13.5px",
            fontWeight: 700,
            color: "var(--text)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {entry.label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "11px",
            color: "var(--text-faint)",
            marginTop: "2px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {entry.subtitle}
        </div>
      </div>

      {/* Arrow */}
      <span
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: `1px solid ${hovered ? "transparent" : "var(--border)"}`,
          background: hovered ? "linear-gradient(135deg,#a78bfa,#7c3aed)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: hovered ? "#fff" : "#cfc9de",
          fontSize: "13px",
          transition: "all .2s",
          flexShrink: 0,
        }}
      >
        →
      </span>
    </a>
  );
}

// ── section ───────────────────────────────────────────────────────────────────

export default function Links() {
  const visibleLinks = (linksData as LinkEntry[]).filter((l) => !l.hidden);

  // Split into social (top-level codes without "/") and resource links
  const social = visibleLinks.filter((l) => !l.code.includes("/"));
  const resources = visibleLinks.filter((l) => l.code.includes("/"));

  return (
    <section
      id="links"
      className="relative"
      style={{ padding: 0, overflowX: "hidden" }}
    >
      <div
        className="mx-auto w-full max-w-[920px] px-5 sm:px-8"
        style={{ paddingTop: "48px", paddingBottom: "64px" }}
      >
        {/* ── Header ── */}
        <div className="mb-8 flex flex-col gap-3">
          <div
            className="flex items-center gap-2 text-xs uppercase tracking-widest"
            style={{ color: "var(--blue)", fontFamily: "var(--font-jetbrains-mono)" }}
          >
            <span
              className="inline-block h-px w-4 shrink-0"
              style={{ background: "var(--blue)" }}
            />
            Connect
          </div>
          <div className="flex items-center gap-3">
            <Sparkle size={32} />
            <h2
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
                fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                background: "linear-gradient(120deg, #fff 30%, var(--text-dim))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Links
            </h2>
          </div>
          <p
            style={{
              color: "var(--text-dim)",
              fontSize: "14px",
              maxWidth: "480px",
              lineHeight: 1.65,
            }}
          >
            Find me on socials or explore learning resources I&apos;ve shared.
          </p>
        </div>

        {/* ── Social links ── */}
        {social.length > 0 && (
          <div className="mb-8">
            <p
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--text-faint)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "12px",
              }}
            >
              Socials
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "10px",
              }}
            >
              {social.map((entry) => (
                <LinkCard key={entry.code} entry={entry} />
              ))}
            </div>
          </div>
        )}

        {/* ── Resource links ── */}
        {resources.length > 0 && (
          <div>
            <p
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--text-faint)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "12px",
              }}
            >
              Resources
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "10px",
              }}
            >
              {resources.map((entry) => (
                <LinkCard key={entry.code} entry={entry} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
