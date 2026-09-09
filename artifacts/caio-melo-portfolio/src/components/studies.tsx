import { ArrowUpRight, ImageOff } from 'lucide-react';
import { Reveal } from '@/components/motion';
import { portfolio } from '@/data/portfolio';
import { useState } from 'react';

export function StudyCard({ study, index }: { study: typeof portfolio.studies[number]; index: number }) {
  const [hasImage, setHasImage] = useState(true);
  return (
    <Reveal delay={.1 + index * .08}>
      <article className="group overflow-hidden rounded-2xl border border-[#222A27] bg-[#101513] transition-transform duration-300 hover:-translate-y-0.5 hover:border-[#34413c]" data-testid={`card-study-${index}`}>
        <div className={`relative h-56 overflow-hidden border-b border-[#222A27] ${study.kind === 'blueprint' ? 'hairline-grid' : 'bg-[#151c19]'}`}>
          {hasImage && <img src={study.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen" onError={() => setHasImage(false)} />}
          {!hasImage && <div className="absolute inset-0">{study.kind === 'blueprint' ? <Blueprint /> : <Wireframe />}<div className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.17em] text-[#53615b]"><ImageOff size={12} /> imagem / em breve</div></div>}
          <span className="absolute right-4 top-4 font-mono text-[10px] text-[#53615b]">0{index + 1}</span>
        </div>
        <div className="p-6 sm:p-7"><h3 className="max-w-[360px] text-xl font-semibold leading-snug tracking-[-.04em] text-[#F3F5F4]">{study.title}</h3><p className="mt-4 max-w-[420px] text-sm leading-6 text-[#9BA7A2]">{study.description}</p><div className="mt-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-[#2DD4BF]">caderno de estudo <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></div></div>
      </article>
    </Reveal>
  );
}

function Blueprint() {
  return <svg className="h-full w-full opacity-70" viewBox="0 0 600 280" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="#2DD4BF" strokeOpacity=".38" strokeWidth="1"><path d="M50 220 L170 140 L280 190 L390 75 L535 130" /><path d="M170 140 L170 54 M280 190 L280 92 M390 75 L390 25" /><circle cx="50" cy="220" r="5" fill="#2DD4BF" fillOpacity=".5" /><circle cx="170" cy="140" r="5" fill="#2DD4BF" fillOpacity=".5" /><circle cx="280" cy="190" r="5" fill="#2DD4BF" fillOpacity=".5" /><circle cx="390" cy="75" r="5" fill="#2DD4BF" fillOpacity=".5" /><circle cx="535" cy="130" r="5" fill="#2DD4BF" fillOpacity=".5" /></g><g stroke="#53615b" strokeWidth=".7"><path d="M0 80h600M0 160h600M100 0v280M300 0v280M500 0v280" /></g></svg>;
}

function Wireframe() {
  return <svg className="h-full w-full p-10 opacity-70" viewBox="0 0 500 200" aria-hidden="true"><g fill="none" stroke="#53615b" strokeWidth="1"><rect x="28" y="28" width="444" height="142" rx="3" /><rect x="51" y="54" width="116" height="92" /><rect x="190" y="54" width="120" height="12" /><rect x="190" y="78" width="214" height="6" /><rect x="190" y="92" width="172" height="6" /><rect x="190" y="122" width="88" height="24" rx="3" stroke="#2DD4BF" /><path d="M51 40h421" /><circle cx="65" cy="40" r="3" stroke="#2DD4BF" /></g></svg>;
}

export function Studies() {
  return <section id="studies" className="section-pad"><div className="section-shell"><Reveal><p className="section-label">04 / CADERNO</p></Reveal><Reveal delay={.08}><div className="mt-8 flex flex-wrap items-end justify-between gap-5"><h2 className="text-4xl font-semibold tracking-[-.06em] text-[#F3F5F4] md:text-6xl">Atualmente <span className="text-[#2DD4BF]">estudando</span></h2></div></Reveal><div className="mt-14 grid gap-5 lg:grid-cols-2">{portfolio.studies.map((study, index) => <StudyCard key={study.title} study={study} index={index} />)}</div></div></section>;
}