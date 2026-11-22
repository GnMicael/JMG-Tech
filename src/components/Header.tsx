import { useEffect, useState } from 'react';
import { brand, hero } from '../content';

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#equipe', label: 'Equipe' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#contato', label: 'Contato' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Em telas grandes o menu volta a ser horizontal; o estado mobile é descartado.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 861px)');
    const sync = () => mq.matches && setOpen(false);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Destaca no menu a seção que está na tela.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const targets = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(`#${e.target.id}`);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const menuId = 'menu-principal';

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-header-inner">
        <a className="brand" href="#top" aria-label={`${brand.name} — início`}>
          <img src={brand.logoUrl} alt="" width="44" height="44" />
          <span className="brand-name">
            JMG<b>TECH</b>
          </span>
        </a>

        <nav
          id={menuId}
          className={`nav${open ? ' is-open' : ''}`}
          aria-label="Navegação principal"
          aria-hidden={!open}
          data-mobile-closed={!open || undefined}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              tabIndex={open ? undefined : -1}
              aria-current={current === l.href ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            className="btn btn-primary nav-cta"
            href="#contato"
            tabIndex={open ? undefined : -1}
            onClick={() => setOpen(false)}
          >
            {hero.navCta}
          </a>
        </nav>

        <button
          type="button"
          className={`burger${open ? ' is-active' : ''}`}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
          <i />
          <i />
        </button>
      </div>

      <style>{`
        .site-header{position:fixed;top:0;left:0;right:0;z-index:50;height:var(--header-h);
          display:flex;align-items:center;transition:background .35s var(--ease),border-color .35s var(--ease),backdrop-filter .35s;
          border-bottom:1px solid transparent;}
        .site-header.is-scrolled{background:rgba(5,6,10,.76);backdrop-filter:blur(14px);border-bottom-color:var(--border);}
        .site-header-inner{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;width:100%;}
        .brand{display:flex;align-items:center;gap:.7rem;}
        .brand img{border-radius:50%;box-shadow:0 0 18px -4px rgba(146,38,255,.75),0 0 22px -6px rgba(38,200,255,.6);}
        .brand-name{font-family:var(--font-display);font-weight:700;letter-spacing:.16em;font-size:1rem;}
        .brand-name b{font-weight:500;color:var(--cyan);margin-left:.28em;letter-spacing:.22em;}
        .nav{display:flex;align-items:center;gap:1.9rem;}
        .nav > a:not(.btn){font-size:.9rem;color:var(--muted);position:relative;padding:.2rem 0;transition:color .3s var(--ease);}
        .nav > a:not(.btn)::after{content:'';position:absolute;left:0;bottom:-2px;width:0;height:1px;background:var(--grad);transition:width .35s var(--ease);}
        .nav > a:not(.btn):hover,.nav > a[aria-current='true']{color:var(--text);}
        .nav > a[aria-current='true']::after{width:100%;}
        .nav > a:not(.btn):hover::after{width:100%;}
        .nav-cta{padding:.6rem 1.15rem;font-size:.85rem;}
        .burger{display:none;width:42px;height:38px;background:transparent;border:1px solid var(--border);border-radius:10px;
          position:relative;}
        .burger i{position:absolute;left:11px;width:19px;height:1.5px;background:var(--text);transition:transform .3s var(--ease),opacity .3s;}
        .burger i:first-child{top:15px;}
        .burger i:last-child{top:21px;}
        .burger.is-active i:first-child{transform:translateY(3px) rotate(45deg);}
        .burger.is-active i:last-child{transform:translateY(-3px) rotate(-45deg);}
        .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;}
        @media (max-width:860px){
          .burger{display:block;}
          .nav{position:fixed;top:var(--header-h);left:0;right:0;flex-direction:column;align-items:stretch;gap:0;
            background:rgba(5,6,10,.96);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);
            padding:0 clamp(1.1rem,4vw,2rem);max-height:0;overflow:hidden;visibility:hidden;
            transition:max-height .4s var(--ease),padding .4s var(--ease),visibility 0s linear .4s;}
          .nav.is-open{max-height:70vh;padding-bottom:1.25rem;overflow-y:auto;visibility:visible;
            transition:max-height .4s var(--ease),padding .4s var(--ease),visibility 0s;}
          .nav > a:not(.btn){padding:.85rem .2rem;border-bottom:1px solid rgba(140,160,220,.09);font-size:1rem;}
          .nav-cta{margin-top:1rem;width:100%;}
        }
      `}</style>
    </header>
  );
}
