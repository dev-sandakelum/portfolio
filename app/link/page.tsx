import { getShortlinks } from "@/lib/shortlinks";

const ICONS: Record<string, string> = {
  linkedin: "in",
  github: "gh",
};

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function Badge({ code }: { code: string }) {
  const abbr = ICONS[code];
  if (abbr) {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white">
        {abbr}
      </span>
    );
  }
  // msplan badge — show letter
  const letter = code.split("/")[1]?.toUpperCase() ?? "?";
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">
      {letter}
    </span>
  );
}

export default function LinksPage() {
  const links = getShortlinks();
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const social = links.filter((l) => !l.code.includes("/"));
  const plans = links.filter((l) => l.code.includes("/"));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 font-sans">
      <div className="mx-auto max-w-xl space-y-12">

        {/* Header */}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
            hasitha-sandakelum
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            My Links
          </h1>
          <p className="text-sm text-slate-400">
            Quick access to all my public links.
          </p>
        </div>

        {/* Social links */}
        {social.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Social
            </h2>
            <ul className="space-y-2">
              {social.map((link) => (
                <li key={link.code}>
                  <a
                    href={`${origin}/link/${link.code}`}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                  >
                    <Badge code={link.code} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                        {link.label}
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        {getDomain(link.destinationUrl)}
                      </p>
                    </div>
                    <svg
                      className="h-4 w-4 text-slate-300 transition group-hover:text-slate-500 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* MS Learn plans */}
        {plans.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Microsoft Learn Plans
            </h2>
            <ul className="space-y-2">
              {plans.map((link) => (
                <li key={link.code}>
                  <a
                    href={`${origin}/link/${link.code}`}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
                  >
                    <Badge code={link.code} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                        {link.label}
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        learn.microsoft.com
                      </p>
                    </div>
                    <svg
                      className="h-4 w-4 text-slate-300 transition group-hover:text-indigo-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-slate-300">
          hasitha-sandakelum · {new Date().getFullYear()}
        </p>

      </div>
    </main>
  );
}
