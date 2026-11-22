# JMG Tech — Portfólio

Portfólio institucional de página única da JMG Tech (React + Vite, publicado no Firebase Hosting; Node.js + Express para o desenvolvimento local e hospedagem própria),
com a paleta neon da logo: violeta `#9226FF`, azul `#265CFF`, azul-claro `#2692FF` e ciano `#26C8FF` sobre `#05060A`.

## Começando

Requer Node.js 22 ou mais novo.

```bash
npm install
cp .env.example .env     # preencha as chaves do seu projeto Firebase
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
| `npm run deploy` | Build + publica o site (Hosting) e as regras do Firestore |
| `npm run deploy:hosting` | Build + publica só o site |
| `npm run deploy:rules` | Publica só as regras do Firestore |

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
| Contato | Formulário (grava no Firestore), telefones, botões de WhatsApp e e-mail direto |
| Rodapé | Logo, navegação, direitos reservados |

## Como personalizar

Todo o texto, os projetos, as fotos e os links ficam em **`src/content.ts`**. A paleta e a tipografia ficam em
`src/index.css`.

- Imagens em `public/images/` (servidas por `/images/...`). Fotos da equipe em proporção 4:5; prints de projeto em 2:1.
- Redes sociais (`brand.social`): só aparecem as que tiverem endereço preenchido.
- Terceiro projeto: no item `proximo-projeto` de `projects`, troque `status` para `'live'` e preencha `name`,
  `category`, `summary`, `url`, `tags`, `metrics`, `challenge`, `solution`, `result`, `stack`, além de `image` e `alt`
  (print em `public/images/projetos/`).

## Firebase (plano Spark)

O site roda no **Firebase Hosting** e o formulário grava no **Firestore**, os dois disponíveis no plano Spark (gratuito).
Não há Cloud Functions.

### 1. Chaves do projeto no `.env`

No Console do Firebase: engrenagem ao lado de "Visão geral do projeto" → **Configurações do projeto** → **Geral** →
**Seus apps**. Se ainda não houver um app Web, clique em **</>**, dê um nome e registre (não precisa marcar o Hosting).
Em **Configuração do SDK**, escolha **Config** e copie os valores para o `.env` (modelo em `.env.example`):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Essas chaves identificam o projeto e são públicas por natureza. A proteção dos dados está nas regras
(`firestore.rules`): qualquer pessoa pode **enviar** uma mensagem, mas ninguém consegue ler, alterar ou apagar pelo site.

### 2. Criar o Firestore

Console → **Firestore Database** → **Criar banco de dados** → modo de **produção** → região (por exemplo
`southamerica-east1`, São Paulo). As regras do repositório substituem as do console no deploy.

### 3. Publicar

```bash
npx firebase-tools login
npx firebase-tools use --add     # escolha o projeto (ou troque SEU-PROJETO-FIREBASE em .firebaserc)
npm run deploy                   # build + Hosting + regras do Firestore
```

O `npm run build` embute as chaves do `.env` no site, então o `.env` precisa estar preenchido na máquina que publica.
Domínio próprio: Console → Hosting → **Adicionar domínio personalizado**.

### 4. Onde ver as mensagens

Console → Firestore Database → coleção **`mensagens`** (nome, e-mail, mensagem e data). O plano Spark não tem aviso
automático por e-mail (a extensão "Trigger Email" exige o plano Blaze), então confira a coleção com frequência. O visitante
também vê, no próprio formulário, os botões de e-mail e WhatsApp.

### Dev com o Firebase

`npm run dev` também grava no Firestore de verdade quando o `.env` está preenchido. Use um projeto de testes se não quiser
misturar mensagens de teste com as reais.

## Formulário de contato

1. **Com as chaves `VITE_FIREBASE_*` preenchidas:** grava em `mensagens` no Firestore (validado também nas regras).
2. **Sem elas (servidor próprio com Node):** usa a API `POST /api/contact` de `server/`, que envia e-mail por SMTP
   (`SMTP_USER`, `SMTP_PASS` com senha de app do Gmail, `MAIL_TO`) e/ou por webhook (`CONTACT_WEBHOOK_URL`),
   com limite de 5 envios por IP a cada 10 minutos.
3. **Se o envio falhar:** o formulário mostra botões de e-mail e WhatsApp já com a mensagem preenchida.

O campo-isca invisível descarta robôs simples. Para bloquear abuso mais pesado no Firestore, ative o **App Check** no
Console do Firebase.

## Outras hospedagens

`npm run build && npm start` roda o site e a API Node juntos em qualquer servidor com Node.js 22. O `Dockerfile` faz o mesmo
em contêiner (`PORT` padrão 3000, verificação de saúde em `/api/health`). Sem as chaves do Firebase no build, o formulário
usa a API Node e o e-mail por SMTP.

## Estrutura

```
index.html               HTML inicial com metadados e conteúdo para buscadores
src/content.ts           conteúdo editável do site
src/contact.ts           links de WhatsApp, e-mail e telefone
src/sendContact.ts       envio do formulário (Firestore ou API Node)
src/index.css            paleta, tipografia e utilitários visuais
src/components/          uma seção por arquivo
server/index.js          Node/Express: `npm run dev` (com Vite) e `npm start`
server/api.js            rotas /api/health e /api/contact
server/contact-core.js   validação, limite de envios e entrega da mensagem
server/mailer.js         e-mail por SMTP (nodemailer)
server/notify.js         webhook opcional
firebase.json            Hosting + Firestore
firestore.rules          regras: só criar mensagens, ninguém lê pelo site
.env.example             modelo do .env (chaves do Firebase)
public/                  imagens e 404.html
```
