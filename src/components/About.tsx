import { about, process, sectionCopy } from '../content';

export default function About() {
  return (
    <>
      <section className="section" id="sobre">
        <div className="container about-grid">
          <div>
            <span className="eyebrow" data-reveal>
              {about.eyebrow}
            </span>
            <h2 data-reveal data-delay="60">{about.title}</h2>
            <div className="about-text" data-reveal data-delay="120">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>

          <ul className="pillars">
            {about.pillars.map((pillar, i) => (
              <li className="glass" key={pillar.title} data-reveal data-delay={i * 110}>
                <span className="pillar-index">0{i + 1}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-tight" id="processo">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow" data-reveal>
                {sectionCopy.process.eyebrow}
              </span>
              <h2 data-reveal data-delay="60">{sectionCopy.process.title}</h2>
            </div>
            <p data-reveal data-delay="120">{sectionCopy.process.lead}</p>
          </div>

          <ol className="steps">
            {process.map((s, i) => (
              <li key={s.step} data-reveal data-delay={i * 90}>
                <span className="step-num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <style>{`
        .about-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(2rem,5vw,4rem);align-items:start;}
        .about-text{margin-top:1.4rem;display:grid;gap:1rem;color:var(--muted);}
        .pillars{list-style:none;margin:0;padding:0;display:grid;gap:1rem;}
        .pillars li{padding:1.35rem 1.5rem;transition:transform .4s var(--ease),background .4s var(--ease);}
        .pillars li:hover{transform:translateX(6px);background:var(--surface-strong);}
        .pillar-index{font-family:var(--font-display);font-size:.74rem;letter-spacing:.18em;color:var(--cyan);}
        .pillars h3{margin:.35rem 0 .45rem;}
        .pillars p{color:var(--muted);font-size:.93rem;}
        .section-tight{padding-top:clamp(2rem,4vw,3rem);}
        .steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;counter-reset:step;}
        .steps li{position:relative;padding:1.5rem 1.3rem;border-radius:var(--radius);border:1px solid var(--border);
          background:linear-gradient(160deg,rgba(255,255,255,.045),rgba(255,255,255,.015));overflow:hidden;}
        .steps li::before{content:'';position:absolute;left:0;top:0;height:2px;width:100%;background:var(--grad);opacity:.7;}
        .step-num{font-family:var(--font-display);font-weight:700;font-size:1.5rem;letter-spacing:.04em;color:var(--dim);
          transition:color .4s var(--ease);}
        .steps li:hover .step-num{color:var(--cyan);}
        .steps h3{margin:.5rem 0 .4rem;font-size:1.02rem;}
        .steps p{color:var(--muted);font-size:.88rem;}
        @media (max-width:900px){
          .about-grid{grid-template-columns:1fr;}
          .steps{grid-template-columns:repeat(2,minmax(0,1fr));}
        }
        @media (max-width:520px){.steps{grid-template-columns:1fr;}}
      `}</style>
    </>
  );
}
