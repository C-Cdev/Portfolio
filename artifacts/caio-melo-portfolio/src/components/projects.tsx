import { ArrowUpRight, Github, LockKeyhole } from 'lucide-react';
import { Reveal } from '@/components/motion';
import { portfolio } from '@/data/portfolio';
import type { ReactNode } from 'react';

function UnavailableAction({ children }: { children: ReactNode }) {
  return <button type="button" disabled className="inline-flex cursor-not-allowed items-center gap-2 border-b border-[#34413c] pb-1 text-xs text-[#53615b]" title="URL será adicionada posteriormente" aria-label="Ação indisponível no momento">{children}<LockKeyhole size={12} /></button>;
}

export function Projects() {
  return (
    <section id="projects" className="section-pad border-y border-[#222A27] bg-[#101513]">
      <div className="section-shell">
        <Reveal><p className="section-label">03 / PROJETOS</p></Reveal>
        <Reveal delay={.08}><div className="mt-8 flex flex-wrap items-end justify-between gap-5"><h2 className="text-4xl font-semibold tracking-[-.06em] text-[#F3F5F4] md:text-6xl">Projetos</h2><span className="font-mono text-[10px] uppercase tracking-[.16em] text-[#53615b]">01 registro real</span></div></Reveal>
        <Reveal delay={.14}>
          <article className="group relative mt-14 overflow-hidden rounded-2xl border border-[#222A27] bg-[#0A0D0C] transition-transform duration-300 hover:-translate-y-0.5 hover:border-[#34413c]" data-testid="card-project-personal-trainer">
            <div className="absolute right-0 top-0 h-full w-[45%] opacity-40" aria-hidden="true"><div className="absolute inset-0 hairline-grid" /><div className="absolute right-[20%] top-[15%] size-32 rounded-full border border-[#34413c]" /><div className="absolute right-[27%] top-[22%] size-16 rounded-full border border-[#2DD4BF]/50" /><div className="absolute bottom-[17%] right-[24%] h-px w-44 rotate-[-28deg] bg-[#34413c]" /></div>
            <div className="relative grid gap-12 p-7 sm:p-10 lg:grid-cols-[1fr_280px] lg:p-14">
              <div>
                <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[.16em] text-[#2DD4BF]"><span className="size-1.5 rounded-full bg-[#2DD4BF]" /> {portfolio.project.status}</div>
                <h3 className="mt-7 max-w-[650px] text-3xl font-semibold leading-tight tracking-[-.05em] text-[#F3F5F4] md:text-5xl">{portfolio.project.title}</h3>
                <p className="mt-6 max-w-[590px] text-sm leading-7 text-[#9BA7A2]">{portfolio.project.description}</p>
                <div className="mt-8 flex flex-wrap gap-2">{portfolio.project.technologies.map((tech) => <span key={tech} className="rounded-full border border-[#34413c] px-3 py-1.5 font-mono text-[10px] text-[#9BA7A2]">{tech}</span>)}</div>
                <div className="mt-10 flex flex-wrap gap-5"><UnavailableAction>Ver projeto <ArrowUpRight size={14} /></UnavailableAction><UnavailableAction>GitHub <Github size={14} /></UnavailableAction></div>
              </div>
              <div className="flex flex-col justify-between border-l border-[#222A27] pl-6 lg:min-h-[230px]">
                <div className="font-mono text-[10px] uppercase leading-5 tracking-[.15em] text-[#53615b]">produto<br />em construção</div>
                <div className="font-mono text-[10px] leading-5 text-[#53615b]">/ acompanhamento<br /><span className="text-[#2DD4BF]">/ desenvolvimento</span></div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}