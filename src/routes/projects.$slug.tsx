import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { content, projects, type Lang } from "@/lib/i18n";
import { findProject, PROJECT_DETAILS, type ProjectDetail } from "@/lib/project-details";
import { ProjectDiagram } from "@/components/ProjectDiagram";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }): { project: ProjectDetail } => {
    const project = findProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.codename ?? "Case File"} — DK.SEC` },
      { name: "description", content: loaderData?.project.summary.en ?? "" },
      { property: "og:title", content: `${loaderData?.project.codename ?? "Case File"} — DK.SEC` },
      { property: "og:description", content: loaderData?.project.summary.en ?? "" },
    ],
  }),
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <div className="font-display text-6xl">404</div>
        <p className="mt-4 text-muted-foreground">Case file not found.</p>
        <Link to="/" className="mt-6 inline-block text-primary underline">← Home</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="max-w-md text-center">
        <div className="font-display text-3xl">Something went wrong</div>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <Link to="/" className="mt-6 inline-block text-primary underline">← Home</Link>
      </div>
    </div>
  ),
});

function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "fr") setLang(saved);
  }, []);
  const set = (l: Lang) => {
    setLang(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };
  return [lang, set];
}

const teamColor = {
  BLUE: "oklch(0.7 0.18 230)",
  RED: "oklch(0.65 0.24 8)",
  PURPLE: "oklch(0.65 0.2 310)",
  DEV: "oklch(0.78 0.18 145)",
};

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: ProjectDetail };
  const [lang, setLang] = useLang();
  const t = content[lang];
  const projList = projects[lang];
  const meta = projList.find((p) => p.slug === project.slug)!;
  const idx = projList.findIndex((p) => p.slug === project.slug);
  const next = projList[(idx + 1) % projList.length];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 md:px-12">
          <Link to="/" className="font-display text-lg tracking-tight">
            DK<span className="text-primary">.SEC</span>
          </Link>
          <Link to="/" hash="projects" className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground">
            ← {t.nav.projects}
          </Link>
          <div className="flex items-center gap-1 rounded border border-border p-0.5 text-xs uppercase tracking-[0.2em]">
            {(["en", "fr"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-2 py-1 transition-colors ${
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-border px-6 py-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:px-12">
          <span>CASE FILE / {project.slug.toUpperCase()}</span>
          <span className="ml-3 text-primary">{project.classification}</span>
        </div>
      </header>

      {/* hero */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="flex flex-wrap items-baseline gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span style={{ color: teamColor[project.team] }}>● {project.team} TEAM</span>
          <span>{meta.tag}</span>
          <span>// {meta.num}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display mt-4 text-[clamp(2.5rem,7vw,6rem)]"
        >
          {meta.title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-3 font-mono-ui text-sm text-primary"
        >
          {project.codename}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {project.summary[lang]}
        </motion.p>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {[
            ["Codename", project.codename],
            ["Duration", project.duration],
            ["Role", project.role],
            ["Team", project.team],
          ].map(([k, v], i) => (
            <motion.div key={k}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.05 }}
              className="bg-card p-5">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{k}</div>
              <div className="mt-2 font-mono-ui text-sm">{v}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* objective + metrics */}
      <section className="border-t border-border px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary">// OBJECTIVE</div>
            <p className="font-display mt-6 text-2xl md:text-3xl">{project.objective[lang]}</p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
            {project.metrics[lang].map((m, i) => (
              <motion.div key={m.k}
                initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-card p-6">
                <div className="font-display text-3xl text-primary">{m.v}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{m.k}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGRAM */}
      <section className="border-t border-border px-6 py-16 md:px-12 md:py-24">
        <div className="text-xs uppercase tracking-[0.3em] text-primary">// ARCHITECTURE</div>
        <h2 className="font-display mt-4 text-3xl md:text-5xl">
          {lang === "en" ? "System schema" : "Schéma système"}
        </h2>
        <div className="mt-10">
          <ProjectDiagram kind={project.diagram} />
        </div>
      </section>

      {/* phases */}
      <section className="border-t border-border px-6 py-16 md:px-12 md:py-24">
        <div className="text-xs uppercase tracking-[0.3em] text-primary">// EXECUTION</div>
        <h2 className="font-display mt-4 text-3xl md:text-5xl">
          {lang === "en" ? "Phases" : "Phases"}
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {project.phases[lang].map((ph, i) => (
            <motion.div key={ph.step}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-3xl text-primary">{ph.step}</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">phase</span>
              </div>
              <h3 className="font-display mt-3 text-xl">{ph.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{ph.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* terminal logs */}
      <section className="border-t border-border px-6 py-16 md:px-12 md:py-24">
        <div className="text-xs uppercase tracking-[0.3em] text-primary">// TELEMETRY</div>
        <h2 className="font-display mt-4 text-3xl md:text-5xl">
          {lang === "en" ? "Live logs" : "Logs en direct"}
        </h2>
        <div className="mt-10 overflow-hidden rounded-lg border border-border bg-[oklch(0.10_0.005_270)] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[oklch(0.65_0.22_25)]" />
            <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.16_85)]" />
            <span className="h-3 w-3 rounded-full bg-[oklch(0.7_0.18_145)]" />
            <span className="ml-3 text-[11px] text-muted-foreground">bash — {project.slug}</span>
          </div>
          <div className="space-y-2 p-5 font-mono-ui text-xs md:text-sm">
            {project.logs.map((line, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className={
                  line.type === "cmd" ? "text-primary"
                  : line.type === "ok" ? "text-[oklch(0.78_0.18_145)]"
                  : line.type === "warn" ? "text-[oklch(0.78_0.16_85)]"
                  : line.type === "err" ? "text-[oklch(0.65_0.22_25)]"
                  : "text-foreground"
                }>
                {line.text}
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 border-t border-border p-4">
            {meta.stack.map((s) => (
              <span key={s} className="rounded border border-border px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* outcomes */}
      <section className="border-t border-border px-6 py-16 md:px-12 md:py-24">
        <div className="text-xs uppercase tracking-[0.3em] text-primary">// IMPACT</div>
        <h2 className="font-display mt-4 text-3xl md:text-5xl">
          {lang === "en" ? "Outcomes" : "Résultats"}
        </h2>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {project.outcomes[lang].map((o, i) => (
            <motion.li key={i}
              initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 py-5">
              <span className="font-display text-primary">→</span>
              <span className="text-base md:text-lg">{o}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* next */}
      <section className="border-t border-border px-6 py-16 md:px-12">
        <Link to="/projects/$slug" params={{ slug: next.slug }}
          className="group flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {lang === "en" ? "Next case file" : "Dossier suivant"} · {next.num}
            </div>
            <div className="font-display mt-2 text-3xl md:text-5xl group-hover:text-primary transition-colors">
              {next.title} →
            </div>
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-primary">{next.tag}</span>
        </Link>
      </section>

      <footer className="border-t border-border px-6 py-8 text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>{t.footer}</span>
          <span>DK<span className="text-primary">.SEC</span> // case file</span>
        </div>
      </footer>
    </div>
  );
}

// ensure tree-shake doesn't drop list
export const _all = PROJECT_DETAILS;
