interface EyebrowProps {
  label: string;
  center?: boolean;
}

export default function Eyebrow({ label, center = false }: EyebrowProps) {
  return (
    <div
      className={`mb-4 flex items-center gap-2 text-xs uppercase tracking-widest ${center ? "justify-center" : ""}`}
      style={{
        color: "var(--blue)",
        fontFamily: "var(--font-jetbrains-mono)",
      }}
    >
      {!center && (
        <span
          className="inline-block h-px w-4 shrink-0"
          style={{ background: "var(--blue)" }}
          aria-hidden="true"
        />
      )}
      {label}
    </div>
  );
}
