import Eyebrow from "./Eyebrow";

const TAGS = [
  "9th Batch",
  "Faculty of Technology",
  "Information & Communication Technology",
];

export default function Education() {
  return (
    <section className="snap-section" id="education">
      <div className="section-inner">
        <Eyebrow label="Education" />
        <h2
          className="reveal mb-10 tracking-tight"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 600,
            fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
          }}
        >
          Currently studying
        </h2>

        <div
          className="reveal relative flex flex-col gap-6 overflow-hidden rounded-2xl border p-8 sm:flex-row sm:items-start"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {/* Gradient shimmer */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--gradient)", opacity: 0.055 }}
            aria-hidden="true"
          />

          {/* Icon */}
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl"
            style={{ background: "var(--gradient)" }}
            aria-hidden="true"
          >
            🎓
          </div>

          <div>
            <div
              className="mb-2 text-xl font-semibold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Bachelor of ICT <span style={{ color: "var(--text-faint)", fontWeight: 400 }}>(Planned)</span>
            </div>
            <div className="mb-5 text-sm" style={{ color: "var(--text-dim)" }}>
              University of Ruhuna — Faculty of Technology
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 text-xs"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "var(--border)",
                    color: "var(--text-dim)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Spacer note */}
        <p
          className="reveal mt-8 text-sm"
          style={{ color: "var(--text-faint)", fontFamily: "var(--font-jetbrains-mono)" }}
        >
          // More milestones coming soon
        </p>
      </div>
    </section>
  );
}
