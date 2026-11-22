import { useEffect, useRef, useState } from 'react';
import { projects, sectionCopy, type Project } from '../content';
import { useDialogFocus } from '../hooks';

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const caseRef = useRef<HTMLDivElement | null>(null);
  useDialogFocus(caseRef);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <section className="section" id="projetos">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow" data-reveal>
              {sectionCopy.projects.eyebrow}
            </span>
            <h2 data-reveal data-delay="60">
              {sectionCopy.projects.titleLead}{' '}
              <span className="grad-text">{sectionCopy.projects.titleHighlight}</span>
            </h2>
          </div>
          <p data-reveal data-delay="120">
            {sectionCopy.projects.lead}
          </p>
        </div>

        <div className="projects">
          {projects.map((p, i) =>
            p.status === 'open' ? (
              <article
                className="project project-open"
                key={p.id}
                data-reveal
                data-delay={i * 110}
              >
                <div className="open-art" aria-hidden="true">
                  <span className="open-plus">+</span>
                </div>
                <div className="project-body">
                  <p className="project-meta">
                    <span>{p.category}</span>
                    <span className="open-badge">{sectionCopy.projects.openBadge}</span>
                  </p>
                  <h3>{p.name}</h3>
                  <p className="project-summary">{p.summary}</p>
                  <a className="project-more" href="#contato">
                    {sectionCopy.projects.openCta} →
                  </a>
                </div>
              </article>
            ) : (
              <article
                className="project glass"
                key={p.id}
                data-reveal
                data-delay={i * 110}
              >
                <button
                  type="button"
                  className="project-media"
                  onClick={() => setActive(p)}
                  aria-label={`Abrir case: ${p.name}`}
                >
                  <img src={p.image} alt={p.alt} loading="lazy" />
                  <span className="project-zoom">
                    {sectionCopy.projects.openCase}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M7 17 17 7m0 0h-8m8 0v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <div className="project-body">
                  <p className="project-meta">
                    <span>{p.category}</span>
                    {p.period && <span>{p.period}</span>}
                  </p>
                  <h3>{p.name}</h3>
                  <p className="project-summary">{p.summary}</p>

                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="project-metrics">
                    {p.metrics.map((m) => (
                      <div key={m.label}>
                        <b className="grad-text">{m.value}</b>
                        <span>{m.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="project-actions">
                    <button type="button" className="project-more" onClick={() => setActive(p)}>
                      {sectionCopy.projects.details} →
                    </button>
                    {p.url && (
                      <a
                        className="project-visit"
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${sectionCopy.projects.visit}: ${p.name} (abre em nova aba)`}
                      >
                        {sectionCopy.projects.visit}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M7 17 17 7m0 0h-8m8 0v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      </div>

      {active && (
        <div
          className="case-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
          onClick={() => setActive(null)}
        >
          <div className="case glass" ref={caseRef} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="case-close" onClick={() => setActive(null)}>
              <span aria-hidden="true">×</span>
              <span className="case-close-label">Fechar</span>
            </button>

            <img className="case-hero" src={active.image} alt={active.alt} />

            <div className="case-body">
              <p className="project-meta">
                <span>{active.category}</span>
                {active.period && <span>{active.period}</span>}
              </p>
              <h3 className="case-title">{active.name}</h3>

              {(['challenge', 'solution', 'result'] as const).map((k) => (
                <div className="case-block" key={k}>
                  <h4>
                    {k === 'challenge' ? 'O problema' : k === 'solution' ? 'O que construímos' : 'O resultado'}
                  </h4>
                  <p>{active[k]}</p>
                </div>
              ))}

              <div className="case-metrics">
                {active.metrics.map((m) => (
                  <div key={m.label}>
                    <b className="grad-text">{m.value}</b>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="case-tags">
                {active.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>

              {active.url && (
                <a
                  className="btn btn-primary case-visit"
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {sectionCopy.projects.visit}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 17 17 7m0 0h-8m8 0v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .projects{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.2rem;}
        .project{display:flex;flex-direction:column;overflow:hidden;transition:transform .45s var(--ease),box-shadow .45s var(--ease);}
        .project:hover{transform:translateY(-6px);box-shadow:0 26px 60px -32px rgba(94,74,255,.7);}
        .project-media{display:block;width:100%;padding:0;border:0;background:none;position:relative;aspect-ratio:2/1;overflow:hidden;background:var(--bg-soft);}
        .project-media img{width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease),filter .5s var(--ease);}
        .project-media:hover img{transform:scale(1.06);}
        .project-media::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(5,6,10,.85));}
        .project-zoom{position:absolute;left:1rem;bottom:1rem;z-index:2;display:inline-flex;align-items:center;gap:.4rem;
          padding:.42rem .85rem;border-radius:999px;background:rgba(5,6,10,.6);border:1px solid rgba(38,200,255,.4);
          color:var(--cyan);font-family:var(--font-display);font-size:.76rem;letter-spacing:.06em;opacity:0;transform:translateY(8px);
          transition:opacity .4s var(--ease),transform .4s var(--ease);}
        .project-media:hover .project-zoom,.project-media:focus-visible .project-zoom{opacity:1;transform:none;}
        .project-body{padding:1.4rem 1.5rem 1.5rem;display:flex;flex-direction:column;gap:.85rem;flex:1;}
        .project-meta{display:flex;justify-content:space-between;gap:1rem;font-family:var(--font-display);
          font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);}
        .project h3{font-size:1.16rem;}
        .project-summary{color:var(--muted);font-size:.92rem;}
        .project-tags{display:flex;flex-wrap:wrap;gap:.4rem;}
        .project-metrics{display:flex;gap:1.6rem;margin-top:auto;padding-top:.9rem;border-top:1px solid var(--border);}
        .project-metrics b{display:block;font-family:var(--font-display);font-size:1.5rem;line-height:1.1;}
        .project-metrics span{font-size:.76rem;color:var(--dim);}
        .project-more{align-self:flex-start;margin-top:.4rem;background:none;border:0;padding:0;color:var(--blue);
          font-family:var(--font-display);font-size:.84rem;letter-spacing:.02em;transition:color .3s var(--ease),transform .3s var(--ease);}
        .project-more:hover{color:var(--cyan);transform:translateX(4px);}
        .case-overlay{position:fixed;inset:0;z-index:80;background:rgba(3,4,8,.8);backdrop-filter:blur(8px);
          display:grid;place-items:center;padding:clamp(1rem,4vw,2.5rem);overflow-y:auto;animation:fade .3s var(--ease);}
        @keyframes fade{from{opacity:0}to{opacity:1}}
        .case{max-width:840px;width:100%;max-height:92vh;overflow-y:auto;position:relative;animation:rise .4s var(--ease);}
        @keyframes rise{from{opacity:0;transform:translateY(26px) scale(.985)}to{opacity:1;transform:none}}
        .case-hero{width:100%;aspect-ratio:2/1;object-fit:cover;}
        .case-close{position:absolute;top:1rem;right:1rem;display:inline-flex;align-items:center;gap:.35rem;
          padding:.4rem .8rem;border-radius:999px;background:rgba(5,6,10,.72);border:1px solid var(--border);color:var(--text);
          font-size:1.05rem;line-height:1;transition:border-color .3s var(--ease);}
        .case-close:hover{border-color:var(--cyan);}
        .case-close-label{font-family:var(--font-display);font-size:.74rem;letter-spacing:.1em;text-transform:uppercase;}
        .case-body{padding:clamp(1.4rem,3vw,2.1rem);display:grid;gap:1.1rem;}
        .case-title{font-size:clamp(1.4rem,3vw,1.9rem);}
        .case-block h4{font-family:var(--font-display);font-size:.74rem;letter-spacing:.18em;text-transform:uppercase;
          color:var(--cyan);margin-bottom:.4rem;}
        .case-block p{color:var(--muted);font-size:.95rem;}
        .case-metrics{display:flex;gap:2.2rem;padding:1.1rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
        .case-metrics b{display:block;font-family:var(--font-display);font-size:1.8rem;line-height:1.05;}
        .case-metrics span{font-size:.78rem;color:var(--dim);}
        .case-tags{display:flex;flex-wrap:wrap;gap:.4rem;}
        .project-actions{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-top:.4rem;flex-wrap:wrap;}
        .project-actions .project-more{margin-top:0;}
        .project-visit{display:inline-flex;align-items:center;gap:.4rem;padding:.42rem .9rem;border-radius:999px;
          border:1px solid var(--border);font-family:var(--font-display);font-size:.8rem;color:var(--text);
          transition:border-color .3s var(--ease),background .3s var(--ease),color .3s var(--ease);}
        .project-visit:hover{border-color:rgba(38,200,255,.55);background:rgba(38,200,255,.08);color:var(--cyan);}
        .case-visit{justify-self:start;margin-top:.4rem;}
        .project-open{display:flex;flex-direction:column;border-radius:var(--radius);border:1.5px dashed rgba(140,160,220,.28);
          background:rgba(255,255,255,.015);overflow:hidden;transition:border-color .4s var(--ease),transform .45s var(--ease);}
        .project-open:hover{border-color:rgba(38,200,255,.5);transform:translateY(-6px);}
        .open-art{aspect-ratio:2/1;display:grid;place-items:center;
          background:radial-gradient(18rem 9rem at 50% 50%,rgba(146,38,255,.14),transparent 70%);}
        .open-plus{display:grid;place-items:center;width:58px;height:58px;border-radius:50%;border:1px dashed rgba(38,200,255,.5);
          font-family:var(--font-display);font-size:1.7rem;font-weight:300;color:var(--cyan);}
        .open-badge{color:var(--cyan);}
        .project-open .project-more{text-decoration:none;}
        @media (max-width:1000px){.projects{grid-template-columns:1fr;max-width:560px;}}
      `}</style>
    </section>
  );
}
