import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { content, projects, tools, type Lang } from "@/lib/i18n";
import { SKILLS_DATA } from "@/lib/skills-data";

export const Route = createFileRoute("/")({
  component: Index,
});

const LINKEDIN = "https://www.linkedin.com/in/douae-karachi-2a93372b5";
const EMAIL = "douaekarachi@gmail.com";

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function fmt(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -10% 0px" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className="relative border-t border-border px-6 py-24 md:px-12 md:py-32"
    >
      {children}
    </motion.section>
  );
}

function LetterReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span aria-label={text} className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [selectedSkill, setSelectedSkill] = useState<(typeof SKILLS_DATA)[number] | null>(null);

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "fr") setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("lang", lang);
  }, [lang]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedSkill(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const t = content[lang];
  const projs = projects[lang];
  const now = useNow();
  const projList = useMemo(() => projs, [projs]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="scanline" aria-hidden />

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 md:px-12">
          <a href="#top" className="font-display text-lg tracking-tight">
            DK<span className="text-primary">.SEC</span>
          </a>
          <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
            <a href="#about" className="transition-colors hover:text-foreground">{t.nav.about}</a>
            <a href="#projects" className="transition-colors hover:text-foreground">{t.nav.projects}</a>
            <a href="#skills" className="transition-colors hover:text-foreground">{t.nav.skills}</a>
            <a href="#contact" className="transition-colors hover:text-foreground">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
            <div className="flex items-center gap-1 rounded border border-border p-0.5">
              {(["en", "fr"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 transition-colors ${
                    lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href="#contact"
              className="hidden rounded border border-border px-3 py-1.5 transition-colors hover:border-primary hover:text-primary md:inline-block"
            >
              {t.nav.hire} →
            </a>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-border px-6 py-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:px-12">
          <span>
            {t.portfolio} <span className="ml-3 text-primary">{t.status}</span>
          </span>
          <span>{fmt(now)}</span>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative px-6 py-24 md:px-12 md:py-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                {t.available}
              </div>

              <h1 className="font-display text-[clamp(3.5rem,11vw,11rem)]">
                <div>
                  <LetterReveal text={t.heroLine1} delay={0.05} />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-primary italic"
                >
                  {t.heroLine2}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t.heroLine3}
                </motion.div>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-12 max-w-xl text-sm text-muted-foreground md:text-base"
              >
                {t.heroSub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <a
                  href="#projects"
                  className="rounded border border-border px-5 py-3 text-xs uppercase tracking-[0.2em] transition-all hover:border-primary hover:text-primary"
                >
                  {t.viewWork}
                </a>
                <a
                  href="#contact"
                  className="rounded bg-primary px-5 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-all hover:opacity-90"
                >
                  {t.contactCta}
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* STATS */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 border-t border-border md:grid-cols-4"
        >
          {t.stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="border-border p-8 [&:not(:last-child)]:border-r md:p-12"
            >
              <div className="font-display text-4xl md:text-6xl">{s.v}</div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </motion.section>

        {/* ABOUT */}
        <Section id="about">
          <motion.div variants={fadeUp} className="mb-12 text-xs uppercase tracking-[0.3em] text-primary">
            {t.sec01}
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(2.5rem,6vw,5rem)] max-w-4xl">
            {t.aboutTitleA}
            <span className="italic text-primary">{t.aboutTitleB}</span>
            {t.aboutTitleC}
          </motion.h2>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <motion.div variants={fadeUp} className="space-y-6 text-muted-foreground">
              <p className="text-base leading-relaxed md:text-lg">{t.aboutBody}</p>
              <p className="text-foreground">{t.aboutGoal}</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-4 text-xs">
                {t.meta.map((m) => (
                  <div key={m.k} className="border-l border-primary pl-3">
                    <div className="uppercase tracking-[0.2em] text-muted-foreground">{m.k}</div>
                    <div className="mt-1 text-foreground">{m.v}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Terminal */}
            <motion.div
              variants={fadeUp}
              className="overflow-hidden rounded-lg border border-border shadow-2xl"
              style={{ background: "var(--terminal-bg)" }}
            >
              <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-[oklch(0.65_0.22_25)]" />
                <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.16_85)]" />
                <span className="h-3 w-3 rounded-full bg-[oklch(0.7_0.18_145)]" />
                <span className="ml-3 text-[11px] text-muted-foreground">bash — threat-ops</span>
              </div>
              <div className="space-y-2 p-5 text-xs md:text-sm">
                <div className="text-muted-foreground">douae.karachi — cybersec student</div>
                {t.terminal.map((line, i) => (
                  <motion.div
                    key={`${lang}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.4, duration: 0.5 }}
                    className={
                      line.startsWith("$")
                        ? "text-primary"
                        : line.startsWith("✓")
                        ? "text-[oklch(0.78_0.18_145)]"
                        : "text-foreground"
                    }
                  >
                    {i === t.terminal.length - 1 ? (
                      <span className="cursor-blink">{line}</span>
                    ) : (
                      line
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 border-t border-border p-4">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded border border-border px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills">
          <motion.div variants={fadeUp} className="mb-12 text-xs uppercase tracking-[0.3em] text-primary">
            {t.sec02}
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(2.5rem,6vw,5rem)]">
            {t.capTitleA}
            <span className="italic text-primary">{t.capTitleB}</span>
          </motion.h2>

          {/* All Skills Grid */}
          <div className="mt-12">
            <motion.div variants={fadeUp} className="mb-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              All Skills ({SKILLS_DATA.length})
            </motion.div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {SKILLS_DATA.map((skill, i) => (
                <motion.div
                  key={skill.slug}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedSkill(skill)}
                    onKeyDown={(e) => e.key === "Enter" && setSelectedSkill(skill)}
                    className="group relative overflow-hidden rounded-lg border border-border bg-card/30 p-6 transition-all hover:border-primary hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/20 cursor-pointer block h-full"
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <div
                              key={j}
                              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                                j < skill.level ? "bg-primary" : "bg-border"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <h3 className="font-display text-lg md:text-xl mb-2 group-hover:text-primary transition-colors">
                        {skill.name[lang]}
                      </h3>

                      <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 mb-4">
                        {skill.description[lang]}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {skill.tools.slice(0, 3).map((tool) => (
                          <span
                            key={tool}
                            className="text-[10px] px-2 py-0.5 rounded border border-border/50 text-muted-foreground group-hover:border-primary/50 transition-colors"
                          >
                            {tool}
                          </span>
                        ))}
                        {skill.tools.length > 3 && (
                          <span className="text-[10px] px-2 py-0.5 text-muted-foreground">
                            +{skill.tools.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="text-xs uppercase tracking-[0.15em] text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                        View Details →
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


        </Section>

        {/* PROJECTS */}
        <Section id="projects">
          <motion.div variants={fadeUp} className="mb-12 text-xs uppercase tracking-[0.3em] text-primary">
            {t.sec03}
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(2.5rem,6vw,5rem)]">
            {t.projTitleA}
            <span className="italic text-primary">{t.projTitleB}</span>
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {projList.map((p) => (
              <motion.div
                key={p.num}
                variants={fadeUp}
                whileHover={{ y: -6, borderColor: "oklch(0.65 0.24 8)" }}
                className="group rounded-lg border border-border bg-card transition-shadow hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--primary)_40%,transparent)]"
              >
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="flex h-full flex-col gap-4 p-8"
                >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <span>{p.num}</span>
                  <span className="text-primary">{p.tag}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded border border-border px-2 py-1 text-[10px] uppercase tracking-wider">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-6 text-xs uppercase tracking-[0.2em] text-primary opacity-60 transition-opacity group-hover:opacity-100">
                  {t.accessFile}
                </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact">
          <motion.div variants={fadeUp} className="mb-12 text-xs uppercase tracking-[0.3em] text-primary">
            {t.sec04}
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(3rem,8vw,7rem)]">
            {t.contactTitleA}
            <span className="italic text-primary">{t.contactTitleB}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
            {t.contactBody}
          </motion.p>

          <div className="relative z-10 mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            <a
              href={`mailto:${EMAIL}`}
              className="group bg-card p-8 transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-primary-foreground/70">
                {t.email}
              </div>
              <div className="mt-3 break-all font-display text-xl">{EMAIL}</div>
              <div className="mt-6 text-xs uppercase tracking-[0.2em]">→</div>
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card p-8 transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-primary-foreground/70">
                {t.linkedin}
              </div>
              <div className="mt-3 font-display text-xl">douae-karachi</div>
              <div className="mt-6 text-xs uppercase tracking-[0.2em]">↗</div>
            </a>
            <div className="bg-card p-8">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t.location}</div>
              <div className="mt-3 font-display text-xl">{t.locationVal}</div>
              <div className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">●</div>
            </div>
          </div>
        </Section>

        <footer className="border-t border-border px-6 py-8 text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:px-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>{t.footer}</span>
            <span>DK<span className="text-primary">.SEC</span> // v1.0</span>
          </div>
        </footer>
      </main>

      {/* SKILL DETAIL MODAL */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            key="skill-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ background: "oklch(0.08 0.005 270 / 0.88)" }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              key="skill-modal-panel"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-black/60"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="relative overflow-hidden border-b border-border p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-primary border border-primary/40 px-2 py-1 rounded">
                        {selectedSkill.category}
                      </span>
                      <div className="flex gap-1.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <motion.div
                            key={j}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.12 + j * 0.06, type: "spring", stiffness: 350 }}
                            className={`h-2 w-2 rounded-full ${j < selectedSkill.level ? "bg-primary" : "bg-border"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedSkill(null)}
                      className="text-2xl leading-none text-muted-foreground hover:text-foreground transition-colors -mt-1"
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="font-display text-4xl md:text-5xl"
                  >
                    {selectedSkill.name[lang]}
                  </motion.h2>
                </div>
              </div>

              {/* Modal body */}
              <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.4 }}
                >
                  <div className="mb-3 text-[10px] uppercase tracking-[0.25em] text-primary">
                    {lang === "en" ? "Summary" : "Résumé"}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedSkill.description[lang]}
                  </p>
                </motion.div>

                {/* Experience */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26, duration: 0.4 }}
                >
                  <div className="mb-3 text-[10px] uppercase tracking-[0.25em] text-primary">
                    {lang === "en" ? "Experience" : "Expérience"}
                  </div>
                  <p className="text-sm leading-relaxed border-l-2 border-primary pl-4 text-foreground/90">
                    {selectedSkill.experience[lang]}
                  </p>
                </motion.div>

                {/* Tools */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34, duration: 0.4 }}
                >
                  <div className="mb-3 text-[10px] uppercase tracking-[0.25em] text-primary">
                    {lang === "en" ? "Tools & Technologies" : "Outils & Technologies"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.tools.map((tool, i) => (
                      <motion.span
                        key={tool}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.38 + i * 0.035 }}
                        className="text-xs px-3 py-1.5 rounded border border-border/70 text-muted-foreground hover:border-primary/60 hover:text-foreground transition-colors"
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
