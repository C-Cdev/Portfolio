import { Check, Clock3, Github, Linkedin, LoaderCircle, MapPin, Send, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { useSubmitContact } from '@workspace/api-client-react';
import { Reveal } from '@/components/motion';

type FormState = 'idle' | 'sending' | 'success' | 'error';
type Fields = { name: string; email: string; message: string; website: string };

function ManausClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Manaus', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span data-testid="text-manaus-time">{time || '--:--:--'}</span>;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '', website: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<FormState>('idle');
  const [successMessage, setSuccessMessage] = useState('');
  const submitMutation = useSubmitContact();

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) next.name = 'Informe seu nome.';
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) next.email = 'Informe um e-mail válido.';
    if (fields.message.trim().length < 12) next.message = 'Escreva uma mensagem com pelo menos 12 caracteres.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate() || fields.website) return;
    setState('sending');
    setSuccessMessage('');
    try {
      const result = await submitMutation.mutateAsync({ data: fields });
      setSuccessMessage(result.message);
      setState('success');
    } catch {
      setState('error');
    }
  };

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
    if (state !== 'idle') {
      setState('idle');
      setSuccessMessage('');
      submitMutation.reset();
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5" noValidate aria-describedby="form-status" data-testid="form-contact">
      <input tabIndex={-1} autoComplete="off" value={fields.website} onChange={(event) => update('website', event.target.value)} className="absolute -left-[9999px] h-px w-px opacity-0" aria-hidden="true" />
      <div>
        <label htmlFor="contact-name" className="mb-2 block font-mono text-[10px] uppercase tracking-[.15em] text-[#9BA7A2]">Nome</label>
        <input id="contact-name" value={fields.name} onChange={(event) => update('name', event.target.value)} className="w-full rounded-lg border border-[#222A27] bg-[#101513] px-4 py-3 text-sm text-[#F3F5F4] placeholder:text-[#53615b] transition-colors focus:border-[#2DD4BF] focus:outline-none" placeholder="Como posso chamar você?" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'error-name' : undefined} data-testid="input-contact-name" />
        {errors.name && <p id="error-name" className="mt-2 text-xs text-[#f19b8d]">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-2 block font-mono text-[10px] uppercase tracking-[.15em] text-[#9BA7A2]">E-mail</label>
        <input id="contact-email" type="email" value={fields.email} onChange={(event) => update('email', event.target.value)} className="w-full rounded-lg border border-[#222A27] bg-[#101513] px-4 py-3 text-sm text-[#F3F5F4] placeholder:text-[#53615b] transition-colors focus:border-[#2DD4BF] focus:outline-none" placeholder="voce@exemplo.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'error-email' : undefined} data-testid="input-contact-email" />
        {errors.email && <p id="error-email" className="mt-2 text-xs text-[#f19b8d]">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block font-mono text-[10px] uppercase tracking-[.15em] text-[#9BA7A2]">Mensagem</label>
        <textarea id="contact-message" rows={5} value={fields.message} onChange={(event) => update('message', event.target.value)} className="w-full resize-y rounded-lg border border-[#222A27] bg-[#101513] px-4 py-3 text-sm leading-6 text-[#F3F5F4] placeholder:text-[#53615b] transition-colors focus:border-[#2DD4BF] focus:outline-none" placeholder="Conte um pouco sobre o que você tem em mente." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'error-message' : undefined} data-testid="input-contact-message" />
        {errors.message && <p id="error-message" className="mt-2 text-xs text-[#f19b8d]">{errors.message}</p>}
      </div>
      <button type="submit" disabled={state === 'sending'} className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#2DD4BF] px-5 text-xs font-bold text-[#0A0D0C] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70" data-testid="button-submit-contact">
        {state === 'sending' ? <><LoaderCircle size={15} className="animate-spin" /> Enviando...</> : <>Enviar mensagem <Send size={14} className="transition-transform group-hover:translate-x-1" /></>}
      </button>
      <div id="form-status" role="status" aria-live="polite" className="min-h-5 text-xs">
        {state === 'success' && <p className="flex items-center gap-2 text-[#2DD4BF]"><Check size={14} /> {successMessage}</p>}
        {state === 'error' && <p className="flex items-center gap-2 text-[#f19b8d]"><X size={14} /> Não foi possível enviar agora. Verifique a configuração do contato ou tente novamente.</p>}
      </div>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section-pad border-t border-[#222A27] bg-[#101513]">
      <div className="section-shell">
        <Reveal><p className="section-label">05 / CONTATO</p></Reveal>
        <Reveal delay={.08}><div className="mt-8 max-w-[720px]"><h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-.06em] text-[#F3F5F4] md:text-6xl">Vamos trabalhar <span className="text-[#2DD4BF]">juntos?</span></h2><p className="mt-6 max-w-[570px] text-sm leading-7 text-[#9BA7A2]">Aberto a oportunidades, projetos e colaborações que me permitam aplicar meus conhecimentos e continuar evoluindo em engenharia de software.</p></div></Reveal>
        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_320px] lg:gap-24">
          <Reveal delay={.14}><ContactForm /></Reveal>
          <Reveal delay={.2} className="space-y-8">
            <div className="border-t border-[#222A27] pt-4"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#53615b]">E-mail</p><p className="mt-3 text-sm text-[#9BA7A2]">contato@caiomelo.codes</p></div>
            <div className="border-t border-[#222A27] pt-4"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-[#53615b]"><MapPin size={13} className="text-[#2DD4BF]" />Localização</div><p className="mt-3 text-sm text-[#9BA7A2]">Manaus, Amazonas, Brasil</p></div>
            <div className="border-t border-[#222A27] pt-4"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-[#53615b]"><Clock3 size={13} className="text-[#2DD4BF]" />Local time</div><p className="mt-3 font-mono text-xl text-[#F3F5F4]"><ManausClock /></p><p className="mt-1 font-mono text-[10px] text-[#53615b]">Manaus, BR</p></div>
            <div className="border-t border-[#222A27] pt-4"><div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-[#2DD4BF]"><span className="size-1.5 rounded-full bg-[#2DD4BF]" /> Disponível para oportunidades</div><div className="flex gap-4 text-[#53615b]"><span title="Link será adicionado posteriormente"><Github size={17} /></span><span title="Link será adicionado posteriormente"><Linkedin size={17} /></span></div></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}