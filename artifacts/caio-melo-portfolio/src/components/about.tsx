import { BookOpen, MapPin, Mail, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/motion';
import { portfolio } from '@/data/portfolio';

function MetaLine({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={15} strokeWidth={1.5} className="mt-0.5 text-[#2DD4BF]" />
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[.16em] text-[#53615b]">{label}</p>
        <p className="mt-1 text-sm text-[#9BA7A2]">{value}</p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="section-pad border-y border-[#222A27] bg-[#101513]">
      <div className="section-shell">
        <Reveal><p className="section-label">01 / SOBRE</p></Reveal>
        <div className="mt-12 grid gap-14 lg:grid-cols-[1.12fr_.88fr] lg:gap-24">
          <Reveal delay={.08}>
            <h2 className="max-w-[600px] text-balance text-3xl font-semibold leading-[1.1] tracking-[-.05em] text-[#F3F5F4] md:text-5xl">
              Lado profissional/<span className="text-[#2DD4BF]">acadêmico</span>
            </h2>
            <div className="mt-9 max-w-[640px] space-y-5 text-[15px] leading-7 text-[#9BA7A2]">
              {portfolio.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-[#222A27] pt-6">
              <MetaLine icon={Mail} label="E-mail" value="contato@caiomelo.codes" />
              <MetaLine icon={MapPin} label="Localização" value="Manaus, Amazonas, Brasil" />
            </div>
          </Reveal>
          <Reveal delay={.16} className="space-y-9">
            <div>
              <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-[#2DD4BF]"><BookOpen size={14} /> Educação</div>
              <div className="border-l border-[#34413c] pl-4">
                <p className="text-sm font-semibold text-[#F3F5F4]">Engenharia de Software</p>
                <p className="mt-1 text-sm text-[#9BA7A2]">Universidade Federal do Amazonas</p>
                <p className="mt-2 font-mono text-[10px] text-[#53615b]">2026 — atualmente</p>
              </div>
            </div>
            <div>
              <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-[#2DD4BF]"><Sparkles size={14} /> Certificação</div>
              <p className="text-sm text-[#9BA7A2]">Claude Code — Anthropic</p>
            </div>
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[#53615b]">Áreas de interesse</p>
              <div className="flex flex-wrap gap-2">{portfolio.interests.map((item) => <span key={item} className="border-b border-[#34413c] pb-1 text-sm text-[#9BA7A2]">{item}</span>)}</div>
            </div>
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[#53615b]">Foco atual</p>
              <div className="space-y-2">{portfolio.focus.map((item) => <p key={item} className="text-sm text-[#F3F5F4]"><span className="mr-2 text-[#2DD4BF]">↳</span>{item}</p>)}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}