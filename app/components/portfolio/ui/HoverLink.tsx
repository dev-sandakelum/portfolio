"use client";

import type { CSSProperties, ReactNode } from "react";

interface HoverLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  target?: string;
  rel?: string;
  hoverStyle?: CSSProperties;
}

export default function HoverLink({
  href,
  children,
  className = "",
  style,
  target,
  rel,
  hoverStyle = {},
}: HoverLinkProps) {
  return (
    <a
      href={href}
      className={`transition-all duration-200 ${className}`}
      style={style}
      target={target}
      rel={rel}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        Object.assign(el.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        // Reset to original style values
        Object.keys(hoverStyle).forEach((key) => {
          (el.style as unknown as Record<string, string>)[key] =
            (style as unknown as Record<string, string>)?.[key] ?? "";
        });
      }}
    >
      {children}
    </a>
  );
}
