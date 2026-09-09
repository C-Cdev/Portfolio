import { Braces, Code2, Container, Database, GitBranch, Globe2, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/motion';
import { portfolio } from '@/data/portfolio';

const categoryIcons: Record<string, LucideIcon> = { CORE: Code2, WEB: Globe2, DATABASE: Database, DEVOPS: Container };

export function TechCard({ name, index }: { name: string; index: number }) {
  return (
    <div className="group flex min-h-[56px] items-center gap-3 rounded-xl border border-[#222A27] bg-[#101513] px-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#34413c] hover:bg-[#151c19]" data-testid={`card-tech-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
      <span className="grid size-7 shrink-0 place-items-center rounded-md border border-[#222A27] font-mono text-[11px] text-[#53615b] transition-colors group-hover:border-[#2DD4BF] group-hover:text-[#2DD4BF]">{index % 2 === 0 ? <Braces size={14} strokeWidth={1.4} /> : <GitBranch size={14} strokeWidth={1.4} />}</span>
      <span className="text-sm text-[#F3F5F4]">{name}</span>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="stack" className="section-pad">
      <div className="section-shell">
        <Reveal><p className="section-label">02 / FERRAMENTAS</p></Reveal>
        <Reveal delay={.08}><div className="mt-8 flex flex-wrap items-end justify-between gap-5"><h2 className="text-4xl font-semibold tracking-[-.06em] text-[#F3F5F4] md:text-6xl">Tech <span className="text-[#2DD4BF]">Stack</span></h2><p className="max-w-[290px] text-right text-sm leading-6 text-[#53615b]">Tecnologias utilizadas e estudadas no caminho de construir software.</p></div></Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-14 md:gap-y-12">
          {portfolio.stack.map((group, groupIndex) => {
            const Icon = categoryIcons[group.name];
            return (
              <Reveal key={group.name} delay={.1 + groupIndex * .05}>
                <div className="border-t border-[#222A27] pt-4">
                  <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[.18em] text-[#2DD4BF]"><Icon size={14} strokeWidth={1.5} />{group.name}</div><span className="font-mono text-[10px] text-[#53615b]">{String(groupIndex + 1).padStart(2, '0')}</span></div>
                  <div className="grid grid-cols-2 gap-2.5">{group.technologies.map((technology, index) => <TechCard key={technology} name={technology} index={index} />)}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}