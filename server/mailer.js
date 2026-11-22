/**
 * Envio de e-mail por SMTP (nodemailer). Funciona com Gmail usando uma "senha de app".
 * Variáveis: SMTP_USER, SMTP_PASS (obrigatórias), SMTP_HOST (padrão smtp.gmail.com),
 * SMTP_PORT (padrão 465), MAIL_TO (padrão jmg.tech7@gmail.com), MAIL_FROM (padrão SMTP_USER).
 */
export function mailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

let transporter;

async function getTransporter() {
  if (transporter) return transporter;
  const { default: nodemailer } = await import('nodemailer');
  const port = Number(process.env.SMTP_PORT || 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
  });
  return transporter;
}

export async function sendMail({ subject, text, replyTo }) {
  const to = process.env.MAIL_TO || 'jmg.tech7@gmail.com';
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  try {
    const tx = await getTransporter();
    await tx.sendMail({ from: `"Portfólio JMG Tech" <${from}>`, to, replyTo, subject, text });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
