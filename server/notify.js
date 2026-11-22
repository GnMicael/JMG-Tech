/**
 * Canal opcional por webhook (Discord, Slack, Make, Zapier, n8n...).
 * Defina CONTACT_WEBHOOK_URL para receber cada mensagem do formulário também por lá.
 */
export function webhookConfigured() {
  return Boolean(process.env.CONTACT_WEBHOOK_URL);
}

export async function sendWebhook({ title, content }) {
  const url = process.env.CONTACT_WEBHOOK_URL;
  const text = `${title}\n\n${content}`;
  const isDiscord = /discord(app)?\.com\/api\/webhooks\//.test(url);
  const body = isDiscord ? { content: text.slice(0, 1900) } : { title, content, text };

  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.ok ? { ok: true } : { ok: false, error: `Webhook HTTP ${res.status}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
