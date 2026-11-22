import { sectionCopy, services, stats, type Service } from '../content';
import { useCountUp } from '../hooks';

const icons: Record<Service['icon'], string> = {
  code: 'M8 18 3 12l5-6m8 12 5-6-5-6m-3 15 2-18',
  infra: 'M4 6h16v5H4zM4 13h16v5H4zM7 8.5h.01M7 15.5h.01M11 8.5h.01M11 15.5h.01',
  automation: 'M12 3v3m0 12v3M3 12h3m12 0h3M6.5 6.5l2 2m7 7 2 2m0-11-2 2m-7 7-2 2M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z',
};

function StatItem({ stat }: { stat: (typeof stats)[number] }) {
  const { ref, value } = useCountUp(stat.value);
  return (
    <div className="stat" data-reveal>
      <b className="grad-text">
        <span ref={ref}>{value}</span>
        {stat.suffix}
      </b>
      <span>{stat.label}</span>
    </div>
  );
}

export default function Services() {
  return (
    <>
      <section className="section" id="servicos">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow" data-reveal>
                {sectionCopy.services.eyebrow}
              </span>
              <h2 data-reveal data-delay="60">{sectionCopy.services.title}</h2>
            </div>
            <p data-reveal data-delay="120">{sectionCopy.services.lead}</p>
          </div>

          <div className="services">
            {services.map((s, i) => (
              <article className="service glass" key={s.title} data-reveal data-delay={i * 120}>
                <span className="service-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d={icons[s.icon]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3>{s.title}</h3>
                <p className="service-desc">{s.description}</p>
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Números da JMG Tech">
        <div className="container stats">
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} />
          ))}
        </div>
      </section>

      <style>{`
        .services{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.2rem;}
        .service{padding:1.7rem 1.6rem 1.8rem;transition:transform .45s var(--ease),background .45s var(--ease);}
        .service:hover{transform:translateY(-6px);background:var(--surface-strong);}
        .service-icon{display:grid;place-items:center;width:46px;height:46px;border-radius:13px;color:var(--cyan);
          border:1px solid rgba(38,200,255,.3);background:radial-gradient(circle at 30% 20%,rgba(146,38,255,.28),rgba(38,200,255,.08));
          box-shadow:0 0 24px -10px rgba(146,38,255,.9);transition:transform .45s var(--ease);}
        .service:hover .service-icon{transform:rotate(-6deg) scale(1.06);}
        .service h3{margin:1.05rem 0 .5rem;}
        .service-desc{color:var(--muted);font-size:.92rem;}
        .service ul{list-style:none;margin:1.15rem 0 0;padding:1.1rem 0 0;border-top:1px solid var(--border);display:grid;gap:.5rem;}
        .service li{position:relative;padding-left:1.15rem;font-size:.87rem;color:var(--text);}
        .service li::before{content:'';position:absolute;left:0;top:.6em;width:6px;height:6px;border-radius:2px;
          background:var(--grad);}
        .stats-band{position:relative;padding:clamp(2.2rem,5vw,3.2rem) 0;
          background:linear-gradient(180deg,rgba(146,38,255,.07),rgba(38,200,255,.05));
          border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
        .stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1.5rem;text-align:center;}
        .stat b{display:block;font-family:var(--font-display);font-weight:700;font-size:clamp(1.85rem,4.4vw,2.8rem);
          line-height:1;white-space:nowrap;}
        .stat > span{display:block;margin-top:.55rem;font-size:.82rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);}
        @media (max-width:900px){.services{grid-template-columns:1fr;max-width:520px;}.stats{grid-template-columns:repeat(2,1fr);gap:1.8rem 1.2rem;}}
      `}</style>
    </>
  );
}
