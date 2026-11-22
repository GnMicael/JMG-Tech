// Copia o backend (server/) para functions/server/ antes do deploy da Cloud Function,
// para a API ter um único código-fonte: o mesmo que roda no `npm run dev`.
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, 'functions', 'server');
const files = ['api.js', 'contact-core.js', 'mailer.js', 'notify.js'];

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
for (const f of files) cpSync(path.join(root, 'server', f), path.join(target, f));
console.log(`Backend copiado para functions/server (${files.length} arquivos).`);
