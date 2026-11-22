/**
 * Envio do formulário de contato.
 *
 * - Com as chaves VITE_FIREBASE_* no .env, a mensagem é gravada no Firestore do seu projeto
 *   (coleção "mensagens"), direto do navegador. Funciona no plano Spark, sem Cloud Functions.
 * - Sem as chaves (ex.: hospedagem própria com Node), usa a API Node em /api/contact.
 */

export type ContactValues = { name: string; email: string; message: string; website: string };
export type SendResult = { ok: true } | { ok: false; error: string };

const env = import.meta.env;

export const firebaseEnabled = Boolean(
  env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID && env.VITE_FIREBASE_APP_ID
);

const LIMITS = { name: 120, email: 160, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error('timeout')), ms);
    promise.then(
      (v) => {
        window.clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        window.clearTimeout(timer);
        reject(e);
      }
    );
  });
}

async function viaFirestore(data: { name: string; email: string; message: string }) {
  const [{ getApp, getApps, initializeApp }, { addDoc, collection, getFirestore, serverTimestamp }] =
    await Promise.all([import('firebase/app'), import('firebase/firestore')]);

  const app = getApps().length
    ? getApp()
    : initializeApp({
        apiKey: env.VITE_FIREBASE_API_KEY,
        authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: env.VITE_FIREBASE_APP_ID,
      });

  await withTimeout(
    addDoc(collection(getFirestore(app), 'mensagens'), {
      ...data,
      origem: 'portfolio',
      createdAt: serverTimestamp(),
    }),
    12000
  );
}

async function viaNodeApi(data: { name: string; email: string; message: string }) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const text = await res.text();
  let payload: { ok?: boolean; error?: string } = {};
  try {
    payload = JSON.parse(text);
  } catch {
    /* hospedagem estática responde HTML: tratado como falha */
  }
  if (!res.ok || !payload.ok) throw new Error(payload.error || 'api');
}

export async function sendContact(values: ContactValues): Promise<SendResult> {
  // Campo-isca: pessoas não veem nem preenchem; robôs sim. Finge sucesso e descarta.
  if (values.website.trim()) return { ok: true };

  const data = {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  };

  if (!data.name || data.name.length > LIMITS.name) return { ok: false, error: 'Informe seu nome.' };
  if (!EMAIL_RE.test(data.email) || data.email.length > LIMITS.email) {
    return { ok: false, error: 'Informe um e-mail válido.' };
  }
  if (data.message.length < 10 || data.message.length > LIMITS.message) {
    return { ok: false, error: 'Descreva sua mensagem entre 10 e 4000 caracteres.' };
  }

  try {
    if (firebaseEnabled) await viaFirestore(data);
    else await viaNodeApi(data);
    return { ok: true };
  } catch {
    // Detalhes técnicos (regras, rede, hospedagem estática) não ajudam o visitante: o formulário
    // mostra os canais diretos (e-mail e WhatsApp).
    return { ok: false, error: '' };
  }
}
