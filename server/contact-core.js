import { mailConfigured, sendMail } from './mailer.js';
import { webhookConfigured, sendWebhook } from './notify.js';

export const MAX = { name: 120, email: 160, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Valida o corpo do formulário. Retorna { errors, data }. */
export function validateContact(body) {
  const { name, email, message } = body ?? {};
  const errors = [];

  if (typeof name !== 'string' || !name.trim()) errors.push('Informe seu nome.');
  else if (name.length > MAX.name) errors.push('Nome muito longo.');

  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) errors.push('Informe um e-mail válido.');
  else if (email.length > MAX.email) errors.push('E-mail muito longo.');

  if (typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Descreva sua mensagem em pelo menos 10 caracteres.');
  } else if (message.length > MAX.message) errors.push('Mensagem muito longa.');

  if (errors.length) return { errors, data: null };
  return { errors, data: { name: name.trim(), email: email.trim(), message: message.trim() } };
}

/** Limite simples por IP, na memória do processo. */
export function createLimiter({ windowMs = 10 * 60 * 1000, max = 5 } = {}) {
  const hits = new Map();
  return function isLimited(key) {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) {
      for (const [k, times] of hits) if (!times.some((t) => now - t < windowMs)) hits.delete(k);
    }
    return recent.length > max;
  };
}

const limiter = createLimiter();

/**
 * Processa um envio do formulário. Independente de framework:
 * devolve { status, json } para o Express (local/Docker) ou para a Cloud Function (Firebase).
 */
export async function handleContact({ body, ip, isLimited = limiter }) {
  // Campo-isca invisível: pessoas não preenchem, robôs sim. Responde como sucesso e descarta.
  if (typeof body?.website === 'string' && body.website.trim()) {
    return { status: 200, json: { ok: true } };
  }

  if (isLimited(ip || 'unknown')) {
    return {
      status: 429,
      json: { ok: false, error: 'Muitas mensagens em pouco tempo. Tente de novo em alguns minutos.' },
    };
  }

  const { errors, data } = validateContact(body);
  if (errors.length) return { status: 422, json: { ok: false, error: errors.join(' ') } };

  const subject = `Novo contato do portfólio: ${data.name.replace(/[\r\n]+/g, ' ').slice(0, 100)}`;
  const content = [
    'Recebemos uma mensagem pelo formulário do portfólio da JMG Tech.',
    '',
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    '',
    'Mensagem:',
    data.message,
  ].join('\n');

  const attempts = [];
  if (mailConfigured()) attempts.push(['e-mail', sendMail({ subject, text: content, replyTo: data.email })]);
  if (webhookConfigured()) attempts.push(['webhook', sendWebhook({ title: subject, content })]);

  if (!attempts.length) {
    console.warn('[contact] nenhum canal configurado (defina SMTP_USER/SMTP_PASS ou CONTACT_WEBHOOK_URL).');
    return { status: 503, json: { ok: false, error: 'O envio pelo formulário está indisponível no momento.' } };
  }

  const results = await Promise.all(attempts.map(async ([channel, p]) => [channel, await p]));
  const delivered = results.filter(([, r]) => r.ok).map(([channel]) => channel);
  results.filter(([, r]) => !r.ok).forEach(([channel, r]) => console.warn(`[contact] falha em ${channel}:`, r.error));

  if (!delivered.length) {
    return { status: 502, json: { ok: false, error: 'Não conseguimos entregar a mensagem agora.' } };
  }
  return { status: 200, json: { ok: true, delivered } };
}
