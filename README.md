# JMG Tech — Portfólio

Portfólio institucional de página única da JMG Tech (React + Vite no navegador, Node.js + Express no servidor),
com a paleta neon da logo: violeta `#9226FF`, azul `#265CFF`, azul-claro `#2692FF` e ciano `#26C8FF` sobre `#05060A`.

## Começando

Requer Node.js 22 ou mais novo.

```bash
npm install
cp .env.example .env     # preencha SMTP_PASS (veja "Formulário de contato")
npm run dev              # site + API em http://localhost:3000
```

Um único comando sobe tudo: o servidor Node (`server/index.js`) roda a API e o Vite dentro do mesmo processo,
com atualização automática ao salvar.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Desenvolvimento: site + API na porta 3000 |
| `npm run build` | Gera o site estático em `dist/` |
| `npm start` | Produção: serve `dist/` e a API (rode `npm run build` antes) |
| `npm run typecheck` | Confere os tipos do TypeScript |
| `npm run deploy:hosting` | Faz o build e publica só o site no Firebase Hosting |
| `npm run deploy` | Publica site + API (Firebase Hosting + Cloud Function) |

## Contatos

- E-mail: jmg.tech7@gmail.com
- Giovane Micael: (19) 92015-3237
- Matheus Vasques: (19) 99558-2645

Os números e o e-mail ficam em `src/content.ts` (`brand.email` e `team[].phone` / `team[].whatsapp`).
No site aparecem na seção Equipe (ícone de WhatsApp), na seção Contato (telefones e botões de WhatsApp) e no
formulário. O `whatsapp` é só dígitos com país e DDD, por exemplo `5519920153237`.

## O que tem no site

| Seção | Conteúdo |
| --- | --- |
| Cabeçalho | Logo, navegação com destaque da seção atual e menu recolhível no celular |
| Hero | Título, slogan, dois CTAs e arte neon |
| Sobre | Texto da empresa, três pilares e o processo em 4 etapas |
| Projetos | Revisô AI e Evolua no ar (com "Visitar projeto") e uma vaga em aberto; modal com o case |
| Equipe | Giovane Micael e Matheus Vasques, com foto, descrição, áreas e WhatsApp |
| Serviços | Software, infraestrutura & cloud e automação |
| Números | Faixa de destaques com contagem animada |
| Contato | Formulário que envia e-mail, telefones, botões de WhatsApp e e-mail direto |
| Rodapé | Logo, navegação, direitos reservados |

## Como personalizar

Todo o texto, os projetos, as fotos e os links ficam em **`src/content.ts`**. A paleta e a tipografia ficam em
`src/index.css`.

- Imagens em `public/images/` (servidas por `/images/...`). Fotos da equipe em proporção 4:5; prints de projeto em 2:1.
- Redes sociais (`brand.social`): só aparecem as que tiverem endereço preenchido.
- Terceiro projeto: no item `proximo-projeto` de `projects`, troque `status` para `'live'` e preencha `name`,
  `category`, `summary`, `url`, `tags`, `metrics`, `challenge`, `solution`, `result`, `stack`, além de `image` e `alt`
  (print em `public/images/projetos/`).

## Formulário de contato

O formulário envia `POST /api/contact`. O backend (Node.js puro, em `server/`) valida os campos, bloqueia robôs
(campo-isca) e limita a 5 envios por IP a cada 10 minutos, e entrega a mensagem por:

1. **E-mail (SMTP):** para `MAIL_TO` (padrão `jmg.tech7@gmail.com`). No Gmail, ative a verificação em duas etapas e crie
   uma *senha de app* em <https://myaccount.google.com/apppasswords>; use-a em `SMTP_PASS`. O e-mail chega com
   "responder para" apontando para o visitante.
2. **Webhook (opcional):** defina `CONTACT_WEBHOOK_URL` (Discord, Slack, Make, Zapier, n8n) para receber também por lá.

Se nenhum canal estiver configurado, ou se o site estiver só no Firebase Hosting sem a API, o formulário mostra botões
para e-mail e WhatsApp já com a mensagem preenchida. Nenhuma mensagem se perde em silêncio.

Variáveis (`.env`): `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`, `SMTP_HOST`, `SMTP_PORT`, `CONTACT_WEBHOOK_URL`, `PORT`.

## Firebase Hosting

1. Crie um projeto em <https://console.firebase.google.com> (um projeto da JMG Tech, separado do `evolua-8faa4`).
2. Entre no Firebase e ligue o projeto: `npx firebase-tools login` e `npx firebase-tools use --add`
   (ou troque `SEU-PROJETO-FIREBASE` em `.firebaserc` pelo ID do projeto).
3. **Só o site:** `npm run deploy:hosting`. Funciona no plano gratuito. O formulário cai nos botões de e-mail e WhatsApp.
4. **Site + formulário por e-mail:** a API roda como Cloud Function Node.js 22 (região `southamerica-east1`), que exige o
   plano Blaze (pago conforme o uso, com cota gratuita). Passos:
   ```bash
   cp functions/.env.example functions/.env
   npx firebase-tools functions:secrets:set SMTP_PASS   # cole a senha de app
   npm run deploy
   ```
   O `deploy` copia o backend de `server/` para `functions/server/` (`scripts/sync-functions.js`), então a API é a mesma
   do `npm run dev`. O Hosting encaminha `/api/**` para a função (`firebase.json`).
5. Domínio próprio: Firebase Console → Hosting → Adicionar domínio personalizado.
6. Depois de publicar, aponte `og:image` e `twitter:image` em `index.html` para
   `https://SEU-DOMINIO/images/hero-neon.webp` (as redes sociais exigem endereço absoluto).

## Outras hospedagens

`npm run build && npm start` roda o site e a API juntos em qualquer servidor com Node.js 22. O `Dockerfile` faz o mesmo
em contêiner (`PORT` padrão 3000, verificação de saúde em `/api/health`).

## Estrutura

```
index.html               HTML inicial com metadados e conteúdo para buscadores
src/content.ts           conteúdo editável do site
src/contact.ts           links de WhatsApp, e-mail e telefone
src/index.css            paleta, tipografia e utilitários visuais
src/components/          uma seção por arquivo
server/index.js          Node/Express: `npm run dev` (com Vite) e `npm start`
server/api.js            rotas /api/health e /api/contact
server/contact-core.js   validação, limite de envios e entrega da mensagem
server/mailer.js         e-mail por SMTP (nodemailer)
server/notify.js         webhook opcional
functions/               Cloud Function que reutiliza o backend no Firebase
firebase.json            Hosting + rewrite de /api/** para a função
public/                  imagens e 404.html
```
