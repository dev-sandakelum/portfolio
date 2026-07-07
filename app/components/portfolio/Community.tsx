import Image from "next/image";
import Eyebrow from "./Eyebrow";

interface CommunityItem {
  imageSrc: string;
  imageAlt: string;
  name: string;
  sub?: string;
  /** Use gradient background for image container (for logos that need it) */
  gradientBg?: boolean;
}

const COMMUNITIES: CommunityItem[] = [
  {
    imageSrc: "/portfolio/msLearn/LevelAlpha.png",
    imageAlt: "Microsoft Learn Student Ambassador – Level Alpha badge",
    name: "Microsoft Learn\nStudent Ambassador",
    sub: "Level Alpha",
  },
  {
    imageSrc: "/link/img/github.png",
    imageAlt: "GitHub logo",
    name: "GitHub\nCommunity",
    gradientBg: true,
  },
  {
    imageSrc: "/portfolio/msLearn/LevelAlpha.png", // placeholder — swap if you have a faculty logo
    imageAlt: "Faculty of Technology, University of Ruhuna",
    name: "Faculty of Technology\nUniversity of Ruhuna",
    sub: "9th Batch",
  },
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
              {/* Image icon */}
              <div
                className={`relative mb-5 h-16 w-16 overflow-hidden rounded-xl ${
                  item.gradientBg ? "p-2" : ""
                }`}
                style={
                  item.gradientBg
                    ? { background: "var(--gradient)" }
                    : undefined
                }
              >
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>

              <div
                className="text-[14.5px] font-semibold leading-snug"
                style={{ whiteSpace: "pre-line" }}
              >
                {item.name}
              </div>

              {item.sub && (
                <span
                  className="mt-2 rounded-full border px-3 py-0.5 text-xs"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    color: "var(--blue)",
                    borderColor: "var(--blue)",
                    background: "rgba(73,146,234,0.08)",
                  }}
                >
                  {item.sub}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
