import { sectionCopy, team } from '../content';
import { waLink } from '../contact';

function Icon({ d, label }: { d: string; label: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <title>{label}</title>
    </svg>
  );
}

export default function Team() {
  return (
    <section className="section" id="equipe">
      <div className="container">
        <div className="section-head">
            <div>
              <span className="eyebrow" data-reveal>
                {sectionCopy.team.eyebrow}
              </span>
              <h2 data-reveal data-delay="60">
                {sectionCopy.team.titleLead} <span className="grad-text">{sectionCopy.team.titleHighlight}</span>
              </h2>
            </div>
            <p data-reveal data-delay="120">{sectionCopy.team.lead}</p>
          </div>

        <div className="team">
          {team.map((m, i) => (
            <article className="member glass" key={m.name} data-reveal data-delay={i * 140}>
              <div className="member-photo">
                <img src={m.photo} alt={m.alt} loading="lazy" />
              </div>
              <div className="member-body">
                <h3>{m.name}</h3>
                <p className="member-role">{m.role}</p>
                <p className="member-bio">{m.bio}</p>
                <div className="project-tags member-focus">
                  {m.focus.map((f) => (
                    <span className="tag" key={f}>
                      {f}
                    </span>
                  ))}
                </div>
                <div className="member-links">
                  {m.links.github && (
                    <a href={m.links.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub de ${m.name}`}>
                      <Icon d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a4.7 4.7 0 0 0-2.4-.6c-.8 0-1.7.2-2.4.6C7.4 2.9 6.4 3.2 6.4 3.2a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 5 7.6c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" label="GitHub" />
                    </a>
                  )}
                  {m.links.linkedin && (
                    <a href={m.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${m.name}`}>
                      <Icon d="M4 9v11m0-14V4h4v2a8 8 0 0 1 12 8v6M4 20h4v-6a2 2 0 0 1 4 0v6h4" label="LinkedIn" />
                    </a>
                  )}
                  <a
                    href={waLink(m.whatsapp, 'Olá! Vim pelo portfólio da JMG Tech.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp de ${m.name}: ${m.phone}`}
                    title={m.phone}
                  >
                    <Icon d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" label="WhatsApp" />
                  </a>
                  {m.links.email && (
                    <a href={`mailto:${m.links.email}`} aria-label={`E-mail de ${m.name}`}>
                      <Icon d="M3 7l9 6 9-6M4 5h16v14H4z" label="E-mail" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="team-shared" data-reveal>
          {sectionCopy.team.shared}
        </p>
      </div>

      <style>{`
        .team{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.4rem;}
        .member{display:grid;grid-template-columns:minmax(150px,.85fr) minmax(0,1.15fr);overflow:hidden;
          transition:transform .45s var(--ease),box-shadow .45s var(--ease);}
        .member:hover{transform:translateY(-5px);box-shadow:0 24px 56px -30px rgba(38,146,255,.75);}
        .member-photo{position:relative;overflow:hidden;min-height:240px;}
        .member-photo img{width:100%;height:100%;object-fit:cover;object-position:top center;
          transition:transform .7s var(--ease),filter .5s var(--ease);}
        .member:hover .member-photo img{transform:scale(1.05);}
        .member-photo::after{content:'';position:absolute;inset:0;
          background:linear-gradient(90deg,rgba(146,38,255,.18),transparent 55%),linear-gradient(180deg,transparent 50%,rgba(5,6,10,.9));}
        /* Moldura com brilho neon, como o anel da logo */
        .member-photo::before{content:'';position:absolute;z-index:2;inset:14px;border-radius:14px;
          border:1px solid rgba(38,200,255,.35);box-shadow:0 0 22px -6px rgba(146,38,255,.75),
          inset 0 0 26px -14px rgba(38,200,255,.9);opacity:.55;transition:opacity .45s var(--ease);}
        .member:hover .member-photo::before{opacity:1;}
        .member-body{padding:1.5rem 1.5rem 1.6rem;display:flex;flex-direction:column;gap:.6rem;}
        .member-role{font-family:var(--font-display);font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;
          color:var(--cyan);}
        .member-bio{color:var(--muted);font-size:.93rem;margin-top:.2rem;}
        .member-focus{margin-top:.4rem;}
        .team-shared{margin-top:1.6rem;text-align:center;color:var(--muted);font-size:.95rem;}
        .member-links{display:flex;gap:.55rem;margin-top:auto;padding-top:1rem;}
        .member-links a{display:grid;place-items:center;width:36px;height:36px;border-radius:10px;
          border:1px solid var(--border);color:var(--muted);transition:all .35s var(--ease);}
        .member-links a:hover{color:var(--cyan);border-color:rgba(38,200,255,.55);background:rgba(38,200,255,.08);transform:translateY(-2px);}
        @media (max-width:820px){
          .team{grid-template-columns:1fr;}
          .member{grid-template-columns:1fr;}
          .member-photo{min-height:340px;}
          .member-photo::after{background:linear-gradient(180deg,transparent 45%,rgba(5,6,10,.92));}
        }
      `}</style>
    </section>
  );
}
