import Image from "next/image";
import { getPublicShortlinks, Shortlink } from "@/lib/shortlinks";

const ABBR: Record<string, string> = {
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

function Badge({ link }: { link: Shortlink }) {
  if (link.icon) {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white p-1.5 shadow-sm">
        <Image
          src={link.icon}
          alt={link.label}
          width={28}
          height={28}
          className="h-full w-full object-contain"
          unoptimized
        />
      </span>
    );
  }

  const abbr = ABBR[link.code] ?? link.code.split("/")[1]?.toUpperCase() ?? "?";
  const isplan = link.code.includes("/");

  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white ${
        isplan ? "bg-indigo-600" : "bg-slate-900"
      }`}
    >
      {abbr}
    </span>
  );
}

export default function LinksPage() {
  const links = getPublicShortlinks();
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const social = links.filter((l) => !l.code.includes("/"));
  const plans = links.filter((l) => l.code.includes("/"));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
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
                    <Badge link={link} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                        {link.label}
                      </p>
                      {link.subtitle ? (
                        <p className="truncate text-xs text-slate-400">{link.subtitle}</p>
                      ) : (
                        <p className="truncate text-xs text-slate-400">{getDomain(link.destinationUrl)}</p>
                      )}
                    </div>
                    <svg
                      className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-slate-500"
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
                    <Badge link={link} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                        {link.label}
                      </p>
                      {link.subtitle ? (
                        <p className="truncate text-xs text-slate-400">{link.subtitle}</p>
                      ) : (
                        <p className="truncate text-xs text-slate-400">learn.microsoft.com</p>
                      )}
                    </div>
                    <svg
                      className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-indigo-400"
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
