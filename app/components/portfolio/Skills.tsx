import Eyebrow from "./Eyebrow";
import HoverCard from "./ui/HoverCard";

interface Chip { label: string; color: string }
interface SkillGroup { title: string; chips: Chip[] }

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    chips: [
      { label: "React",      color: "var(--blue)"   },
      { label: "Vite",       color: "var(--purple)" },
      { label: "JavaScript", color: "var(--gold)"   },
      { label: "HTML",       color: "var(--pink)"   },
      { label: "CSS",        color: "var(--blue)"   },
    ],
  },
  {
    title: "Backend",
    chips: [
      { label: "MongoDB",    color: "var(--green)"  },
    ],
  },
  {
    title: "Database",
    chips: [
      { label: "Google Sheets",    color: "var(--green)" },
      { label: "Database Design",  color: "var(--blue)"  },
    ],
  },
  {
    title: "Tools",
    chips: [
      { label: "Git",    color: "var(--pink)"   },
      { label: "GitHub", color: "var(--text)"   },
      { label: "Vercel", color: "var(--purple)" },
    ],
  },
];

export default function Skills() {
  return (
    <section className="snap-section" id="skills">
      <div className="section-inner">
        <Eyebrow label="Skills" />
        <h2
          className="reveal mb-3 tracking-tight"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 600,
            fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
          }}
        >
          What I build with
        </h2>
        <p className="reveal mb-10 max-w-lg text-base" style={{ color: "var(--text-dim)" }}>
          A front-end-first toolkit, expanding steadily into backend, data, and tooling.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <HoverCard
              key={group.title}
              className="reveal rounded-2xl border p-5"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              hoverBorderColor="rgba(255,255,255,0.2)"
              hoverTransform="translateY(-3px)"
            >
              <div
                className="mb-3 text-xs uppercase tracking-widest"
                style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--text-faint)" }}
              >
                {group.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.chips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px]"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: chip.color }}
                      aria-hidden="true"
                    />
                    {chip.label}
                  </span>
                ))}
              </div>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
}
