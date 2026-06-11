import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Shortlink Manager
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          A simple, local-first shortlink manager. Create, manage, and share shortlinks easily. Everything stays in your browser.
        </p>
      </header>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/link"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-8 text-base font-medium text-white transition hover:bg-slate-800"
        >
          Manage Links
        </Link>
      </div>

      <footer className="mt-12 text-sm text-slate-500">
        Data is stored locally in your browser.
      </footer>
    </main>
  );
}
