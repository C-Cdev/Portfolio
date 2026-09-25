import { ArrowDownRight, ArrowRight, Github, Linkedin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { portfolio } from '@/data/portfolio';

function UnavailableLink({ children, label }: { children: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-[#53615b]" title="Link será adicionado posteriormente" aria-label={`${label}. Link indisponível no momento`}>
      {children}<span className="font-mono text-[9px] uppercase tracking-widest">em breve</span>
    </span>
  );
}

export function HeroVisual() {
  const [hasImage, setHasImage] = useState(true);
  return (
    <div 
    className="relative mx-auto aspect-[4/5] w-full max-w-[450px] overflow-hidden md:aspect-[5/6]" 
    data-testid="hero-visual"
    >
      <div className="absolute inset-x-[4%] bottom-0 top-[8%] overflow-hidden rounded-3xl border-x border-[#222A27]">
        {hasImage ? (
          <img
            src="/assets/hero-caio.jpg"
            alt="Retrato de Caio Melo"
            className="h-full w-full object-cover object-center grayscale-[.2] mix-blend-screen opacity-90"
            onError={() => setHasImage(false)}
          />
        ) : (
          <div className="relative flex h-full items-end justify-center overflow-hidden bg-[#151c19]">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_5%,rgba(45,212,191,.18),transparent_65%)]" />
            <div className="absolute left-1/2 top-[19%] size-[32%] -translate-x-1/2 rounded-full border border-[#53615b] bg-[#222a27]" />
            <div className="absolute bottom-[-4%] left-1/2 h-[61%] w-[66%] -translate-x-1/2 rounded-t-[48%] border border-[#34413c] bg-[#1b2420]" />
            <div className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[.2em] text-[#53615b]">imagem / em breve</div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const enter = (delay: number) => reduced ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: .65, ease: 'easeOut' as const } };
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative flex min-h-[760px] items-center overflow-hidden pb-20 pt-32 lg:min-h-[92vh] lg:pb-10 lg:pt-28">
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
        <div className="lg:-ml-12 xl:-ml-20">
          <motion.p {...enter(0)} className="mb-6 font-mono text-[11px] uppercase tracking-[.18em] text-[#2DD4BF]" data-testid="text-hero-greeting">
            Olá, eu sou o Caio.
          </motion.p>
          <motion.h1 {...enter(.1)} className="max-w-[680px] text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[.99] tracking-[-.07em] text-[#F3F5F4]" data-testid="heading-hero">
            DESENVOLVEDOR <span className="font-normal text-[#53615b]">&amp;</span><br />
            <span className="text-[#2DD4BF]">ENGENHEIRO</span> DE<br className="hidden sm:block" /> SOFTWARE
          </motion.h1>
          <motion.p {...enter(.2)} className="mt-8 max-w-[430px] text-base leading-7 text-[#9BA7A2]" data-testid="text-hero-education">
            {portfolio.education}
          </motion.p>
          <motion.p {...enter(.26)} className="mt-3 max-w-[460px] text-sm leading-6 text-[#53615b]" data-testid="text-hero-description">
            {portfolio.heroDescription}
          </motion.p>
          <motion.div {...enter(.34)} className="mt-9 flex flex-wrap gap-3">
            <button type="button" onClick={() => go('projects')} className="group inline-flex items-center gap-3 rounded-full bg-[#2DD4BF] px-5 py-3 text-xs font-bold text-[#0A0D0C] transition-transform hover:-translate-y-0.5" data-testid="button-hero-projects">
              Ver projetos <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button type="button" onClick={() => go('contact')} className="group inline-flex items-center gap-3 rounded-full border border-[#34413c] px-5 py-3 text-xs font-semibold text-[#F3F5F4] transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]" data-testid="button-hero-contact">
              Entrar em contato <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
          <motion.div {...enter(.44)} className="mt-9 flex items-center gap-5">
            <UnavailableLink label="GitHub"><Github size={16} strokeWidth={1.6} /></UnavailableLink>
            <UnavailableLink label="LinkedIn"><Linkedin size={16} strokeWidth={1.6} /></UnavailableLink>
          </motion.div>
        </div>
        <motion.div {...(reduced ? {} : { initial: { opacity: 0, scale: .97, x: 18 }, animate: { opacity: 1, scale: 1, x: 0 }, transition: { delay: .15, duration: .85, ease: 'easeOut' as const } })}>
          <HeroVisual />
        </motion.div>
      </div>
      <button type="button" onClick={() => go('about')} className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[#53615b] transition-colors hover:text-[#2DD4BF] sm:flex" aria-label="Continuar para Sobre" data-testid="button-scroll-about">
        <span className="font-mono text-[9px] uppercase tracking-[.2em]">explorar</span><ArrowDownRight size={15} />
      </button>
    </section>
  );
}