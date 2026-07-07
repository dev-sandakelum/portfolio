"use client";

import type { CSSProperties, ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hoverBorderColor?: string;
  hoverBackground?: string;
  hoverTransform?: string;
}

export default function HoverCard({
  children,
  className = "",
  style,
  hoverBorderColor = "rgba(255,255,255,0.2)",
  hoverBackground,
  hoverTransform = "translateY(-3px)",
}: HoverCardProps) {
  return (
    <div
      className={`transition-all duration-200 ${className}`}
      style={style}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = hoverBorderColor;
        if (hoverBackground) el.style.background = hoverBackground;
        el.style.transform = hoverTransform;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = String(style?.borderColor ?? "var(--border)");
        if (hoverBackground) el.style.background = String(style?.background ?? "var(--surface)");
        el.style.transform = "translateY(0)";
      }}
    >
      {children}
    </div>
  );
}
