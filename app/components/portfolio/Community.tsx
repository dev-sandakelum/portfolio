import Eyebrow from "./Eyebrow";

interface CommunityItem { icon: string; name: string }

const COMMUNITIES: CommunityItem[] = [
  { icon: "🧑‍💻", name: "Microsoft Learn\nStudent Ambassador" },
  { icon: "🐙",   name: "GitHub\nCommunity" },
  { icon: "🏛️",  name: "Faculty of Technology\nCommunity" },
];

export default function Community() {
  return (
    <section className="snap-section" id="community">
      <div className="section-inner">
        <Eyebrow label="Community" />
        <h2
          className="reveal mb-10 tracking-tight"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 600,
            fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
          }}
        >
          Where I show up
        </h2>

        <div className="grid gap-5 sm:grid-cols-3">
          {COMMUNITIES.map((item) => (
            <div
              key={item.name}
              className="reveal flex flex-col items-center rounded-2xl border p-8 text-center"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                style={{ background: "var(--gradient)" }}
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <div
                className="text-[14.5px] font-semibold leading-snug"
                style={{ whiteSpace: "pre-line" }}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
