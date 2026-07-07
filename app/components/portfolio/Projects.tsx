import Eyebrow from "./Eyebrow";
import HoverCard from "./ui/HoverCard";
import HoverLink from "./ui/HoverLink";

interface Project {
  name: string;
  description: string;
  href?: string;
  status?: string;
}

const PROJECTS: Project[] = [
  {
    name: "Birthday Post Studio",
    description: "Birthday post generator built for the Faculty of Technology, 9th Batch.",
    href: "https://learning-ict.vercel.app/apps/bd3",
  },
  {
    name: "Learning ICT",
    description: "Educational platform hosting applications and learning resources for students.",
    status: "In progress",
  },
  {
    name: "Batch Website",
    description: "Official website for the 9th Batch, Faculty of Technology.",
    status: "In progress",
  },
];

export default function Projects() {
  return (
    <section className="snap-section" id="projects">
      <div className="section-inner">
        <Eyebrow label="Projects" />
        <h2
          className="reveal mb-3 tracking-tight"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 600,
            fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
          }}
        >
          Things I&apos;ve shipped
        </h2>
        <p className="reveal mb-10 max-w-lg text-base" style={{ color: "var(--text-dim)" }}>
          Small, useful tools built for my faculty and batch community.
        </p>

        <div className="flex flex-col gap-4">
          {PROJECTS.map((project) => (
            <HoverCard
              key={project.name}
              className="reveal grid items-center gap-4 rounded-2xl border p-5 sm:p-6"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                gridTemplateColumns: "44px 1fr auto",
              }}
              hoverBorderColor="rgba(255,255,255,0.18)"
              hoverBackground="var(--surface-hover)"
              hoverTransform="translateY(-2px)"
            >
              {/* Gradient mark */}
              <div
                className="h-11 w-11 shrink-0 rounded-xl"
                style={{ background: "var(--gradient)" }}
                aria-hidden="true"
              />

              {/* Info */}
              <div className="min-w-0">
                <div
                  className="mb-1 truncate font-semibold"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                  }}
                >
                  {project.name}
                </div>
                <div
                  className="text-sm leading-snug"
                  style={{ color: "var(--text-dim)" }}
                >
                  {project.description}
                </div>
              </div>

              {/* Action */}
              {project.href ? (
                <HoverLink
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap rounded-full border px-4 py-2 text-sm"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    color: "var(--blue)",
                    borderColor: "var(--border)",
                  }}
                  hoverStyle={{
                    borderColor: "var(--blue)",
                    background: "rgba(73,146,234,0.08)",
                  }}
                >
                  Visit ↗
                </HoverLink>
              ) : (
                <span
                  className="whitespace-nowrap rounded-full border px-4 py-2 text-xs"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    color: "var(--text-faint)",
                    borderColor: "var(--border)",
                  }}
                >
                  {project.status}
                </span>
              )}
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
}
