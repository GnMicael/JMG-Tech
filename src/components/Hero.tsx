import { brand, hero } from '../content';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <img src={brand.heroImage} alt="" />
      </div>
      <div className="hero-ring" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow" data-reveal>
            {hero.eyebrow}
          </span>
          <h1 data-reveal data-delay="80">
            {hero.titleLead} <span className="grad-text">{hero.titleHighlight}</span>
          </h1>
          <p className="hero-sub" data-reveal data-delay="160">
            {hero.subtitle}
          </p>
          <div className="hero-actions" data-reveal data-delay="240">
            <a className="btn btn-primary" href="#projetos">
              {hero.primaryCta}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </a>
            <a className="btn btn-ghost" href="#contato">
              {hero.secondaryCta}
            </a>
          </div>
          <p className="hero-tagline" data-reveal data-delay="320">
            {brand.tagline}
            <span>· {brand.taglinePt}</span>
          </p>
        </div>

        <aside className="hero-card glass" data-reveal data-delay="260" aria-label={`Resumo da ${brand.name}`}>
          <div className="hero-card-logo">
            <img src={brand.logoUrl} alt={`Logo ${brand.name}`} />
          </div>
          <dl>
            <div>
              <dt>{hero.card.since}</dt>
              <dd>{brand.foundedYear}</dd>
            </div>
            <div>
              <dt>{hero.card.base}</dt>
              <dd>{brand.city}</dd>
            </div>
            <div>
              <dt>{hero.card.focus}</dt>
              <dd>{hero.card.focusValue}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <style>{`
        .hero{position:relative;padding:calc(var(--header-h) + clamp(3rem,8vw,6rem)) 0 clamp(3.5rem,7vw,5.5rem);overflow:hidden;}
        .hero-bg{position:absolute;inset:0;z-index:-2;}
        .hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.5;}
        .hero-bg::after{content:'';position:absolute;inset:0;background:
          linear-gradient(180deg,rgba(5,6,10,.55),rgba(5,6,10,.82) 60%,var(--bg)),
          radial-gradient(70rem 26rem at 20% 10%,rgba(146,38,255,.22),transparent 60%);}
        .hero-ring{position:absolute;z-index:-1;width:min(48vw,620px);aspect-ratio:1;right:-14%;top:-8%;border-radius:50%;
          border:1px solid rgba(38,200,255,.2);box-shadow:0 0 90px -30px rgba(146,38,255,.6) inset,0 0 60px -20px rgba(38,146,255,.4);
          animation:spin 46s linear infinite;}
        .hero-ring::before{content:'';position:absolute;inset:12%;border-radius:50%;border:1px dashed rgba(146,38,255,.22);}
        @keyframes spin{to{transform:rotate(360deg)}}
        .hero-inner{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,.9fr);gap:clamp(2rem,4vw,3.5rem);align-items:center;}
        .hero-sub{margin-top:1.35rem;max-width:56ch;color:var(--muted);font-size:clamp(1rem,1.5vw,1.1rem);}
        .hero-actions{display:flex;flex-wrap:wrap;gap:.85rem;margin-top:2rem;}
        .hero-tagline{margin-top:2.4rem;font-family:var(--font-display);letter-spacing:.28em;text-transform:uppercase;
          font-size:.72rem;color:var(--cyan);}
        .hero-tagline span{display:block;margin-top:.45rem;letter-spacing:.12em;color:var(--dim);text-transform:none;}
        .hero-card{padding:1.6rem;}
        .hero-card-logo{display:grid;place-items:center;padding:1rem 0 1.4rem;border-bottom:1px solid var(--border);}
        .hero-card-logo img{width:132px;border-radius:50%;filter:drop-shadow(0 0 22px rgba(146,38,255,.55));}
        .hero-card dl{margin:1.1rem 0 0;display:grid;gap:.85rem;}
        .hero-card dl > div{display:flex;justify-content:space-between;gap:1rem;align-items:baseline;}
        .hero-card dt{font-family:var(--font-display);font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);}
        .hero-card dd{margin:0;font-size:.9rem;text-align:right;color:var(--text);}
        @media (max-width:900px){
          .hero-inner{grid-template-columns:1fr;}
          .hero-card{max-width:420px;}
          .hero-ring{width:120vw;right:-40%;top:-24%;}
        }
      `}</style>
    </section>
  );
}
