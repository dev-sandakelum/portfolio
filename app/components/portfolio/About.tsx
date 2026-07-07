import Image from "next/image";
import Eyebrow from "./Eyebrow";


const INFO_ROWS = [
  { label: "NAME",        value: "Hasitha Sandakelum" },
  { label: "AGE",         value: String(new Date().getFullYear() - 2005) },
  { label: "NATIONALITY", value: "Sri Lankan" },
  { label: "LOCATION",    value: "Sri Lanka" },
  { label: "ROLE",        value: "MLSA" },
];

export default function About() {
  return (
    <section className="snap-section" id="about">
      <div className="section-inner">
        <Eyebrow label="About" />
        <h2
          className="reveal mb-8 tracking-tight"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 600,
            fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
          }}
        >
          Learning in public, one project at a time
        </h2>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          {/* Text */}
          <div
            className="reveal space-y-4 text-base leading-relaxed"
            style={{ color: "var(--text-dim)" }}
          >
            <p>
              I&apos;m{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>Hasitha Sandakelum</strong>
              , a 21-year-old Sri Lankan developer with a growing focus on{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                game design, web development, and UI/UX
              </strong>
              . I care about interfaces that feel considered — fast, clear, and a little delightful.
            </p>
            <p>
              As a{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                Microsoft Learn Student Ambassador
              </strong>
              , I spend as much time helping others get started in tech as I do building for myself
              — through community events, shared resources, and practical projects for my faculty.
            </p>
            <p>
              My current stack leans on{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>React and Vite</strong> for
              the front end, and I&apos;m expanding into backend and database work to build
              complete, end-to-end products.
            </p>
          </div>

          {/* Info card */}
          <div
            className="reveal rounded-2xl border p-6"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            {INFO_ROWS.map((row, i) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-3 text-sm"
                style={{
                  borderBottom:
                    i < INFO_ROWS.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span
                  style={{
                    color: "var(--text-faint)",
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                  }}
                >
                  {row.label}
                </span>

                {/* MLSA row gets the real badge */}
                {row.label === "ROLE" ? (
                  <span className="flex items-center gap-2 font-medium" style={{ color: "var(--text)" }}>
                    <Image
                      src="/portfolio/msLearn/LevelAlpha.png"
                      alt="MLSA Level Alpha badge"
                      width={22}
                      height={22}
                      className="object-contain"
                    />
                    {row.value}
                  </span>
                ) : (
                  <span className="font-medium" style={{ color: "var(--text)" }}>
                    {row.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
