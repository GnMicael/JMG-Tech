import { useState } from 'react';
import { brand, cta, sectionCopy, team } from '../content';
import { mailtoLink, telLink, waLink } from '../contact';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Payload = { ok?: boolean; error?: string };

const t = sectionCopy.contact;

/** Lê a resposta com segurança: o gateway pode responder HTML mesmo onde esperamos JSON. */
async function readJson(res: Response): Promise<Payload> {
  const text = await res.text();
  try {
    return JSON.parse(text) as Payload;
  } catch {
    return { ok: false };
  }
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [note, setNote] = useState('');
  const [values, setValues] = useState({ name: '', email: '', message: '', website: '' });

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // Validação nativa do navegador antes de qualquer requisição.
    if (!form.reportValidity()) return;

    setStatus('sending');
    setNote('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await readJson(res);
      if (!res.ok || !data.ok) throw new Error(data.error || '');

      setStatus('sent');
      setNote(t.sent);
      setValues({ name: '', email: '', message: '', website: '' });
      form.reset();
    } catch (err) {
      setStatus('error');
      const reason = err instanceof Error && err.message ? `${err.message} ` : '';
      setNote(`${reason}${t.failure} ${brand.email}.`);
    }
  }

  const socials = [
    { href: brand.social.linkedin, label: 'LinkedIn' },
    { href: brand.social.instagram, label: 'Instagram' },
    { href: brand.social.github, label: 'GitHub' },
  ].filter((x) => x.href);

  // Texto pronto para WhatsApp/e-mail: usa o que a pessoa já digitou, se houver.
  const typed = values.message.trim();
  const who = values.name.trim();
  const waText = typed
    ? `${who ? `Olá, sou ${who}. ` : 'Olá! '}${typed}`.slice(0, 900)
    : t.whatsappGreeting;
  const mailBody = [typed || t.whatsappGreeting, '', who, values.email.trim()].join('\n');

  return (
    <section className="section" id="contato">
      <div className="container">
        <div className="cta-band glass" data-reveal>
          <div>
            <h3>{cta.title}</h3>
            <p>{cta.text}</p>
          </div>
          <a className="btn btn-primary" href="#formulario">
            {cta.button}
          </a>
        </div>

        <div className="contact">
          <div className="contact-info">
            <span className="eyebrow" data-reveal>
              {t.eyebrow}
            </span>
            <h2 data-reveal data-delay="60">
              {t.titleLead} <span className="grad-text">{t.titleHighlight}</span>
            </h2>
            <p className="lead" data-reveal data-delay="120">
              {t.lead}
            </p>

            <dl className="facts" data-reveal data-delay="180">
              <div>
                <dt>{t.factLabels.email}</dt>
                <dd>
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                </dd>
              </div>
              <div>
                <dt>{t.factLabels.phone}</dt>
                <dd className="phones">
                  {team.map((m) => (
                    <span key={m.whatsapp}>
                      {m.name.split(' ')[0]}:{' '}
                      <a href={telLink(m.whatsapp)}>{m.phone}</a>
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>{t.factLabels.base}</dt>
                <dd>{brand.city}</dd>
              </div>
              <div>
                <dt>{t.factLabels.attendance}</dt>
                <dd>{brand.attendance}</dd>
              </div>
            </dl>

            <div className="socials" data-reveal data-delay="240">
              {team.map((m) => (
                <a
                  href={waLink(m.whatsapp, t.whatsappGreeting)}
                  key={m.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.whatsappLabel} {m.name.split(' ')[0]}
                </a>
              ))}
              {socials.map((s) => (
                <a href={s.href} key={s.label} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <form className="glass contact-form" id="formulario" onSubmit={submit} data-reveal data-delay="120">
            <div className="field-trap" aria-hidden="true">
              <label htmlFor="website">Não preencha este campo</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={set('website')}
              />
            </div>

            <div className="field">
              <label htmlFor="name">{t.labels.name}</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={120}
                placeholder={t.placeholders.name}
                value={values.name}
                onChange={set('name')}
              />
            </div>

            <div className="field">
              <label htmlFor="email">{t.labels.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={160}
                placeholder={t.placeholders.email}
                value={values.email}
                onChange={set('email')}
              />
            </div>

            <div className="field">
              <label htmlFor="message">{t.labels.message}</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                minLength={10}
                maxLength={4000}
                placeholder={t.placeholders.message}
                value={values.message}
                onChange={set('message')}
              />
              <span className="hint">{t.messageHint}</span>
            </div>

            <button className="btn btn-primary submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? t.sending : t.submit}
            </button>

            {note && (
              <p className={`form-note ${status}`} role="status">
                {note}
              </p>
            )}

            {status === 'error' && (
              <div className="form-fallback">
                <p>{t.fallbackTitle}</p>
                <div className="fallback-actions">
                  <a
                    className="btn btn-primary"
                    href={mailtoLink(brand.email, `Contato pelo portfólio${who ? `: ${who}` : ''}`, mailBody)}
                  >
                    {t.fallbackEmail}
                  </a>
                  {team.map((m) => (
                    <a
                      className="btn btn-ghost"
                      href={waLink(m.whatsapp, waText)}
                      key={m.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.whatsappLabel} {m.name.split(' ')[0]}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <p className="form-alt">
              {t.quick}{' '}
              {team.map((m, i) => (
                <span key={m.whatsapp}>
                  {i > 0 && ' · '}
                  <a href={waLink(m.whatsapp, waText)} target="_blank" rel="noopener noreferrer">
                    {m.name.split(' ')[0]}
                  </a>
                </span>
              ))}
            </p>
          </form>
        </div>
      </div>

      <style>{`
        .cta-band{display:flex;align-items:center;justify-content:space-between;gap:1.6rem;
          padding:clamp(1.5rem,3vw,2.2rem);margin-bottom:clamp(2.5rem,5vw,4rem);
          background:linear-gradient(120deg,rgba(146,38,255,.16),rgba(38,146,255,.1) 55%,rgba(38,200,255,.14));}
        .cta-band h3{font-size:clamp(1.15rem,2.4vw,1.55rem);}
        .cta-band p{margin-top:.5rem;color:var(--muted);max-width:58ch;font-size:.94rem;}
        .contact{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.95fr);gap:clamp(2rem,5vw,4rem);align-items:start;}
        .lead{margin-top:1.1rem;color:var(--muted);}
        .facts{margin:2rem 0 0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.2rem 1.6rem;}
        .facts dt{font-family:var(--font-display);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--dim);}
        .facts dd{margin:.35rem 0 0;font-size:.92rem;}
        .facts a{color:var(--cyan);border-bottom:1px solid rgba(38,200,255,.3);}
        .phones{display:grid;gap:.25rem;}
        .form-fallback{display:grid;gap:.8rem;padding:1rem;border-radius:var(--radius-sm);border:1px solid var(--border);
          background:rgba(255,255,255,.025);}
        .form-fallback p{font-size:.88rem;color:var(--muted);}
        .fallback-actions{display:flex;flex-wrap:wrap;gap:.6rem;}
        .fallback-actions .btn{padding:.65rem 1.1rem;font-size:.84rem;}
        .socials{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:2rem;}
        .socials a{padding:.5rem 1rem;border-radius:999px;border:1px solid var(--border);font-size:.84rem;color:var(--muted);
          transition:all .35s var(--ease);}
        .socials a:hover{color:var(--cyan);border-color:rgba(38,200,255,.5);background:rgba(38,200,255,.07);}
        .contact-form{padding:clamp(1.5rem,3vw,2rem);display:grid;gap:1.2rem;}
        .field{display:grid;gap:.45rem;}
        .field label{font-family:var(--font-display);font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);}
        .field input,.field textarea{width:100%;padding:.85rem .95rem;border-radius:var(--radius-sm);
          border:1px solid var(--border);background:rgba(255,255,255,.035);color:var(--text);font-family:inherit;font-size:.95rem;
          transition:border-color .3s var(--ease),box-shadow .3s var(--ease),background .3s var(--ease);}
        .field textarea{resize:vertical;min-height:120px;}
        .field input::placeholder,.field textarea::placeholder{color:var(--dim);}
        .field input:focus,.field textarea:focus{outline:none;border-color:rgba(38,200,255,.6);background:rgba(38,200,255,.05);
          box-shadow:0 0 0 3px rgba(38,200,255,.12),0 0 26px -14px rgba(146,38,255,.9);}
        .field input:invalid:not(:placeholder-shown),.field textarea:invalid:not(:placeholder-shown){border-color:rgba(255,90,120,.6);}
        .hint{font-size:.76rem;color:var(--dim);}
        .field-trap{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;}
        .form-alt{font-size:.84rem;color:var(--dim);text-align:center;}
        .form-alt a{color:var(--cyan);border-bottom:1px solid rgba(38,200,255,.3);}
        .submit{width:100%;}
        .submit:disabled{opacity:.6;cursor:progress;}
        .form-note{font-size:.86rem;padding:.75rem .9rem;border-radius:var(--radius-sm);border:1px solid var(--border);}
        .form-note.sent{color:#7cf0c4;border-color:rgba(60,220,160,.4);background:rgba(40,190,140,.08);}
        .form-note.error{color:#ffb0bd;border-color:rgba(255,90,120,.4);background:rgba(255,90,120,.07);}
        @media (max-width:900px){
          .contact{grid-template-columns:1fr;}
          .cta-band{flex-direction:column;align-items:flex-start;}
        }
      `}</style>
    </section>
  );
}
