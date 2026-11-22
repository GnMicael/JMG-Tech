import { brand } from '../content';

const nav = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#equipe', label: 'Equipe' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#processo', label: 'Processo' },
  { href: '#contato', label: 'Contato' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a className="brand" href="#top">
            <img src={brand.logoUrl} alt={`Logo ${brand.name}`} width="52" height="52" />
            <span className="brand-name">
              JMG<b>TECH</b>
            </span>
          </a>
          <p>{brand.tagline}</p>
        </div>

        <nav className="footer-nav" aria-label="Navegação do rodapé">
          {nav.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="footer-meta">
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <span>{brand.city}</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {year} {brand.name}. Todos os direitos reservados.
        </p>
        <p>
          Portfólio desenvolvido pela {brand.name} · nomes da equipe, telefone, redes e números da
          faixa de destaques ainda são exemplos: troque-os em <code>src/content.ts</code>.
        </p>
      </div>

      <style>{`
        .site-footer{position:relative;border-top:1px solid var(--border);padding-top:clamp(2.5rem,5vw,3.5rem);
          background:linear-gradient(180deg,rgba(146,38,255,.05),transparent 40%);}
        .footer-inner{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr);gap:2rem;
          padding-bottom:2.2rem;}
        .footer-brand p{margin-top:1rem;color:var(--dim);font-family:var(--font-display);font-size:.74rem;
          letter-spacing:.24em;text-transform:uppercase;}
        .footer-nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.6rem .8rem;align-content:start;}
        .footer-nav a{color:var(--muted);font-size:.9rem;transition:color .3s var(--ease);}
        .footer-nav a:hover{color:var(--cyan);}
        .footer-meta{display:grid;gap:.5rem;align-content:start;font-size:.9rem;color:var(--muted);}
        .footer-meta a{color:var(--cyan);}
        .footer-bottom{display:flex;flex-wrap:wrap;justify-content:space-between;gap:1rem;padding:1.2rem 0 2rem;
          border-top:1px solid var(--border);font-size:.79rem;color:var(--dim);}
        .footer-bottom code{font-size:.76rem;color:var(--muted);}
        @media (max-width:820px){.footer-inner{grid-template-columns:1fr;}}
      `}</style>
    </footer>
  );
}
