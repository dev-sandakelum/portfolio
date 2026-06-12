import Image from "next/image";
import { getAiLinkCategories } from "@/lib/ai-shortlinks";
import type { AiLink } from "@/lib/ai-shortlinks";

const CATEGORY_LABELS: Record<string, string> = {
  chat:   "💬 Chat",
  code:   "💻 Code",
  design: "🎨 Design",
  image:  "🖼️ Image",
  write:  "✍️ Write",
  audio:  "🎵 Audio",
  video:  "🎬 Video",
  search: "🔍 Search",
  data:   "📊 Data",
  util:   "⚙️ Utilities",
  other:  "Other",
};

function GridCard({ link }: { link: AiLink }) {
  return (
    <a
      href={`/link/${link.code}`}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden shadow-sm">
        {link.icon ? (
          <Image
            src={link.icon}
            alt={link.label}
            width={48}
            height={48}
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          <span className="text-lg font-bold text-slate-400">
            {link.label[0]}
          </span>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
          {link.label}
        </p>
        {link.subtitle && (
          <p className="mt-0.5 text-xs text-slate-400">{link.subtitle}</p>
        )}
      </div>

      <svg
        className="h-3.5 w-3.5 text-slate-200 transition group-hover:text-violet-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  );
}

export default function AiLinksPage() {
  const categories = getAiLinkCategories();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-12">

        {/* Header */}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500">
            hasitha-sandakelum
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            AI Tools
          </h1>
          <p className="text-sm text-slate-400">
            My go-to AI tools and platforms.
          </p>
        </div>

        {/* Categories */}
        {Object.entries(categories).map(([category, links]) => (
          <section key={category} className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              {CATEGORY_LABELS[category] ?? category}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {links.map((link) => (
                <GridCard key={link.code} link={link} />
              ))}
            </div>
          </section>
        ))}

        {/* Footer */}
        <p className="text-center text-xs text-slate-300">
          hasitha-sandakelum · {new Date().getFullYear()}
        </p>

      </div>
    </main>
  );
}
