import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navItems } from '@/data/portfolio';

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY <= window.innerHeight * 0.72);
    const observers = navItems.map(({ id }) => {
      const node = document.getElementById(id);
      if (!node) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(id);
      }, { rootMargin: '-30% 0px -55% 0px' });
      observer.observe(node);
      return observer;
    });
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observers.forEach((observer) => observer?.disconnect());
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const go = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed left-1/2 top-5 z-50 w-[calc(100%-32px)] max-w-[720px] -translate-x-1/2 md:top-6">
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -15 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
        className="rounded-full border border-[#222A27] bg-[#101513]/95 px-4 py-2.5 backdrop-blur-md"
        aria-label="Navegação principal"
      >
        <div className="flex items-center justify-between gap-5">
          <button
            type="button"
            onClick={() => go('hero')}
            className="font-bold tracking-[-0.06em] text-[#F3F5F4] transition-colors hover:text-[#2DD4BF]"
            data-testid="button-nav-logo"
            aria-label="Voltar ao início"
          >
            CAIO
          </button>
          <div className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${active === item.id ? 'text-[#2DD4BF]' : 'text-[#9BA7A2] hover:text-[#F3F5F4]'}`}
                data-testid={`button-nav-${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="grid size-9 place-items-center rounded-full text-[#9BA7A2] transition-colors hover:bg-[#18211e] hover:text-[#2DD4BF] md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={17} strokeWidth={1.7} /> : <Menu size={17} strokeWidth={1.7} />}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="mt-3 border-t border-[#222A27] pt-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className={`block w-full rounded-lg px-2 py-2.5 text-left text-sm ${active === item.id ? 'text-[#2DD4BF]' : 'text-[#9BA7A2]'}`}
                    data-testid={`button-mobile-nav-${item.id}`}
                  >
                    <span className="mr-2 font-mono text-[10px] text-[#53615b]">{String(navItems.indexOf(item)).padStart(2, '0')}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}

export function ProgressPill() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
      setVisible(window.scrollY > window.innerHeight * 0.72);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const observers = navItems.map(({ id }) => {
      const node = document.getElementById(id);
      if (!node) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(id);
      }, { rootMargin: '-35% 0px -55% 0px' });
      observer.observe(node);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: .98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: .98 }}
          transition={{ duration: .4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-1/2 top-4 z-50 w-[calc(100%-32px)] max-w-[460px] -translate-x-1/2 rounded-[22px] border border-[#222A27] bg-[#101513]/95 p-2 backdrop-blur-md"
        >
          <div className="flex min-h-7 items-center gap-2.5 px-2">
            <span className="font-mono text-[10px] text-[#2DD4BF]" data-testid="text-scroll-progress">{String(progress).padStart(2, '0')}%</span>
            <span className="min-w-0 flex-1 truncate text-[10px] font-medium uppercase tracking-[.12em] text-[#9BA7A2]" data-testid="text-active-section">
              {navItems.find((item) => item.id === active)?.label}
            </span>
            <div className="h-px w-20 overflow-hidden bg-[#222A27] sm:w-28" aria-hidden="true">
              <motion.div className="h-full origin-left bg-[#2DD4BF]" animate={{ width: `${progress}%` }} />
            </div>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid size-7 place-items-center rounded-full text-[#9BA7A2] hover:bg-[#18211e] hover:text-[#2DD4BF]"
              aria-label={open ? 'Fechar menu de seções' : 'Abrir menu de seções'}
              aria-expanded={open}
              data-testid="button-progress-menu"
            >
              <ArrowDown size={14} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="grid grid-cols-2 gap-1 border-t border-[#222A27] pt-2 md:grid-cols-3">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { scrollToSection(item.id); setOpen(false); }}
                    className={`rounded-lg px-2 py-2 text-left text-[11px] ${active === item.id ? 'bg-[#18211e] text-[#2DD4BF]' : 'text-[#9BA7A2] hover:bg-[#18211e] hover:text-[#F3F5F4]'}`}
                    data-testid={`button-progress-${item.id}`}
                  >
                    <span className="mr-1.5 font-mono text-[9px] text-[#53615b]">0{index + 1}</span>{item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}