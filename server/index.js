import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApiRouter } from './api.js';

// Lê o arquivo .env da raiz, se existir (Node 22+). Em produção as variáveis vêm do ambiente.
try {
  process.loadEnvFile();
} catch {
  /* sem .env: segue com as variáveis do ambiente */
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const isProd = process.env.NODE_ENV === 'production' || process.argv.includes('--prod');
const port = Number(process.env.PORT || 3000);

const app = express();
app.set('trust proxy', 1);
app.use(express.json({ limit: '64kb' }));
app.use('/api', createApiRouter());

if (isProd) {
  // Produção: serve o build do Vite (dist/). Só as rotas reais devolvem a página; o resto é 404 de verdade.
  app.use(express.static(distDir));
  const knownPaths = new Set(['/', '/index.html']);
  app.get('*', (req, res) => {
    const cleanPath = req.path.replace(/\/+$/, '') || '/';
    if (!knownPaths.has(cleanPath)) return res.status(404).sendFile(path.join(distDir, '404.html'));
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  // Desenvolvimento: o Vite roda dentro deste mesmo servidor (um comando, uma porta).
  const { createServer } = await import('vite');
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
  app.use(vite.middlewares);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`JMG Tech ${isProd ? 'em produção' : 'em desenvolvimento'}: http://localhost:${port}`);
});
