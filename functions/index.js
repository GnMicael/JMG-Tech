import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { createApiRouter } from './server/api.js';

// Mesmo backend do `npm run dev`, publicado como Cloud Function (Node.js 22).
// O Firebase Hosting encaminha /api/** para esta função (veja firebase.json).
// SMTP_PASS é um segredo: firebase functions:secrets:set SMTP_PASS
// SMTP_USER e MAIL_TO ficam em functions/.env (modelo: functions/.env.example).
const app = express();
app.set('trust proxy', true);
app.use(express.json({ limit: '64kb' }));
app.use('/api', createApiRouter());

export const api = onRequest(
  { region: 'southamerica-east1', secrets: ['SMTP_PASS'], maxInstances: 3, timeoutSeconds: 30 },
  app
);
