import express from 'express';
import { handleContact } from './contact-core.js';

/** Rotas da API (/api/health e /api/contact). Usada pelo servidor local e pela Cloud Function. */
export function createApiRouter() {
  const router = express.Router();

  router.get('/health', (_req, res) => {
    res.status(200).json({ ok: true });
  });

  router.post('/contact', async (req, res) => {
    try {
      const { status, json } = await handleContact({ body: req.body, ip: req.ip });
      res.status(status).json(json);
    } catch (err) {
      console.error('[contact] erro inesperado:', err);
      res.status(500).json({ ok: false, error: 'Erro interno. Tente novamente em instantes.' });
    }
  });

  router.use((_req, res) => {
    res.status(404).json({ ok: false, error: 'Rota não encontrada.' });
  });

  return router;
}
