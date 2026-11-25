/**
 * Todo o conteúdo do portfólio vive aqui.
 * Para personalizar o site, edite apenas este arquivo (textos, projetos,
 * equipe, serviços, números e contatos) — não é preciso mexer nos componentes.
 */

export const brand = {
  name: 'JMG Tech',
  tagline: 'Transforming Needs into Solutions',
  taglinePt: 'Transformando necessidades em soluções',
  logoUrl: '/images/logo-jmg-tech-600.png',
  logoOriginalUrl: '/images/logo-jmg-tech-original.png',
  heroImage: '/images/hero-neon.webp',
  foundedYear: 2026,
  city: 'Hortolândia — SP',
  email: 'jmg.tech7@gmail.com',
  attendance: 'Segunda a sexta, das 9h às 18h · atendimento remoto para todo o Brasil',
  /** Redes sociais: só aparecem no site as que tiverem endereço preenchido. */
  social: {
    linkedin: '',
    instagram: '',
    github: '',
  },
};

export const hero = {
  eyebrow: 'Estúdio de tecnologia',
  titleLead: 'Construímos software que',
  titleHighlight: 'resolve o problema certo',
  subtitle:
    'A JMG Tech projeto, desenvolve e coloca no ar sistemas, integrações e automações para empresas que precisam de resultado — não de mais uma ferramenta parada.',
  primaryCta: 'Ver projetos',
  secondaryCta: 'Falar com a equipe',
  card: {
    since: 'Desde',
    base: 'Base',
    focus: 'Foco',
    focusValue: 'Software, infra e automação',
  },
  navCta: 'Solicitar orçamento',
};

export type Project = {
  id: string;
  /** 'live' = projeto publicado; 'open' = vaga reservada para um projeto futuro. */
  status: 'live' | 'open';
  name: string;
  category: string;
  /** Opcional: ano ou intervalo (ex.: '2024'). */
  period?: string;
  summary: string;
  image: string;
  alt: string;
  /** Endereço do projeto no ar. Vazio enquanto o projeto não for publicado. */
  url?: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  challenge: string;
  solution: string;
  result: string;
  stack: string[];
};

/**
 * Exatamente 3 vagas de projeto. Para abrir uma vaga nova, use `status: 'open'`
 * (veja o formato em Project). Para preencher, use `status: 'live'` e complete os campos
 * (imagem em /public/images/projetos/, url, textos e métricas).
 */
export const projects: Project[] = [
  {
    id: 'reviso-ai',
    status: 'live',
    name: 'Revisô AI',
    category: 'Plataforma de IA para escrita',
    summary:
      'Correção de redações com inteligência artificial: o aluno envia o texto e recebe uma análise detalhada das cinco competências, histórico de notas e um plano de aulas.',
    image: '/images/projetos/reviso-ai.webp',
    alt: 'Painel do Revisô AI em tema escuro roxo, com média geral, melhor nota, plano de aulas e atalho para corrigir a primeira redação',
    url: 'https://reviso-tan.vercel.app',
    tags: ['IA', 'Educação', 'Web app', 'Redação'],
    metrics: [
      { label: 'Competências analisadas', value: '5' },
      { label: 'Áreas no painel', value: '6' },
    ],
    challenge:
      'Quem treina redação costuma esperar dias por uma correção, e o retorno raramente mostra por onde começar a melhorar.',
    solution:
      'O Revisô recebe o texto e devolve a análise das cinco competências na hora. O painel guarda o histórico, calcula média e melhor nota, sugere o próximo foco de estudo e organiza um plano de aulas e textos de apoio.',
    result:
      'O aluno acompanha a própria evolução em um só lugar e sabe qual competência treinar primeiro.',
    stack: ['Vercel', 'IA generativa', 'Painel com tema escuro'],
  },
  {
    id: 'evolua',
    status: 'live',
    name: 'Evolua',
    category: 'Pesquisa educacional',
    period: 'Desde 2023',
    summary:
      'Site de uma pesquisa com alunos e ex-alunos de escolas estaduais sobre como participar de projetos científicos abre caminhos para a universidade, a liderança e novas oportunidades.',
    image: '/images/projetos/evolua.webp',
    alt: 'Página inicial do Evolua em tema claro azul, com o título sobre participação em projetos científicos e os números da pesquisa',
    url: 'https://evolua-8faa4.web.app',
    tags: ['Pesquisa', 'Educação', 'Site institucional', 'Dados abertos'],
    metrics: [
      { label: 'Escolas participantes', value: '9' },
      { label: 'Pessoas impactadas', value: '300+' },
    ],
    challenge:
      'A pesquisa precisava mostrar à comunidade escolar, de forma clara, o que foi investigado e o que os dados revelam, usando apenas informações agregadas e aprovadas.',
    solution:
      'Criamos um site com as páginas do projeto, da pesquisa, dos resultados, das entrevistas e dos documentos, além de um convite para fazer ciência e um bloco que mostra os números da pesquisa logo na abertura.',
    result:
      'Mais de 300 pessoas impactadas, em 9 escolas, e mais de 20 entrevistas publicadas em um endereço fácil de compartilhar.',
    stack: ['Firebase Hosting', 'Site responsivo'],
  },
  {
    id: 'project-mind',
    status: 'live',
    name: 'Project Mind',
    category: 'Gestão de projetos',
    summary:
      'Plataforma para transformar ideias em projetos organizados: quadro com as colunas A fazer, Em andamento e Concluído, barra de progresso e tudo reunido em um só espaço.',
    image: '/images/projetos/project-mind.webp',
    alt: 'Página inicial do Project Mind em tema escuro com laranja, com o título "Sua mente cria. O Project Mind organiza." e um exemplo de quadro com tarefas por status',
    url: 'https://project-mind-3dd95.web.app',
    tags: ['Produtividade', 'Gestão de projetos', 'Web app', 'Quadro kanban'],
    metrics: [
      { label: 'Colunas de status', value: '3' },
      { label: 'Seções no site', value: '4' },
    ],
    challenge:
      'Ideias e tarefas costumam ficar espalhadas em anotações e conversas, o que dificulta saber o que já foi feito e o que falta.',
    solution:
      'O Project Mind reúne tudo em um quadro visual dividido em A fazer, Em andamento e Concluído, com barra de progresso para acompanhar o avanço. A página de entrada apresenta o produto com um exemplo de quadro e chamadas diretas para começar grátis ou conhecer os recursos.',
    result:
      'Uma porta de entrada clara, que mostra o produto em ação logo na primeira tela e leva a pessoa a criar a conta ou explorar os recursos.',
    stack: ['Interface escura', 'Quadro kanban', 'Landing page'],
  },
];

export type Member = {
  name: string;
  role: string;
  bio: string;
  /** Áreas de atuação mostradas como tags no cartão. */
  focus: string[];
  photo: string;
  alt: string;
  /** Telefone para exibição, ex.: '(19) 92015-3237'. */
  phone: string;
  /** Número com país e DDD, só dígitos, ex.: '5519920153237' (usado em wa.me e tel:). */
  whatsapp: string;
  /** Todos os links são opcionais: só aparecem os que estiverem preenchidos. */
  links: { github?: string; linkedin?: string; email?: string };
};

/** Duas pessoas. Fotos em /public/images/ (proporção 4:5). */
export const team: Member[] = [
  {
    name: 'Giovane Micael',
    role: 'Desenvolvimento & Criação de sites',
    bio: 'Cuida da parte técnica da JMG Tech: projeta e desenvolve os sites e sistemas, define a arquitetura e coloca tudo no ar. Também constrói, junto com o Matheus, as automações e os agentes de IA.',
    focus: ['Sites e sistemas', 'Arquitetura', 'Automação', 'Agentes de IA'],
    phone: '(19) 92015-3237',
    whatsapp: '5519920153237',
    photo: '/images/equipe-giovane-micael.webp',
    alt: 'Retrato de Giovane Micael, de óculos e terno, olhando para a janela de um ônibus',
    links: {
      email: brand.email,
    },
  },
  {
    name: 'Matheus Vasques',
    role: 'Marketing & Design digital',
    bio: 'Cuida do marketing e do design digital: identidade visual, interfaces e comunicação dos projetos, para que o que a equipe constrói seja fácil de entender e de usar. Também desenvolve, junto com o Giovane, as automações e os agentes de IA.',
    focus: ['Marketing', 'Design digital', 'Automação', 'Agentes de IA'],
    phone: '(19) 99558-2645',
    whatsapp: '5519995582645',
    photo: '/images/equipe-matheus-vasques.webp',
    alt: 'Retrato de Matheus Vasques à noite, com a orla iluminada ao fundo',
    links: {
      email: brand.email,
    },
  },
];

export type Service = {
  icon: 'code' | 'infra' | 'automation';
  title: string;
  description: string;
  items: string[];
};

export const services: Service[] = [
  {
    icon: 'code',
    title: 'Desenvolvimento de Software',
    description:
      'Sistemas web e aplicativos desenhados a partir do processo do cliente, com código legível e pronto para crescer.',
    items: ['Aplicações web', 'Apps mobile', 'APIs e integrações', 'Painéis gerenciais'],
  },
  {
    icon: 'infra',
    title: 'Infraestrutura & Cloud',
    description:
      'Ambiente estável, observável e sem sustos: deploy automatizado, monitoramento e plano de recuperação.',
    items: ['Deploy e CI/CD', 'Monitoramento', 'Banco de dados', 'Segurança e backup'],
  },
  {
    icon: 'automation',
    title: 'Automação de Processos',
    description:
      'Tarefa repetitiva vira rotina automática: integra sistemas, elimina retrabalho e libera a equipe.',
    items: ['Integração de sistemas', 'Rotinas agendadas', 'Relatórios automáticos', 'Chatbots e fluxos'],
  },
];

export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 2, suffix: '+', label: 'Projetos entregues' },
  { value: 2, suffix: '', label: 'Clientes atendidos' },
  { value: 1, suffix: ' ano', label: 'De atuação' },
  { value: 100, suffix: '%', label: 'Entregas no prazo' },
];

export const about = {
  eyebrow: 'Quem somos',
  title: 'Um estúdio pequeno, direto e obcecado por entrega',
  paragraphs: [
    'A JMG Tech nasceu de uma inconformidade simples: tecnologia cara, lenta e que resolve o problema errado. Trabalhamos com escopo enxuto, ciclos curtos e conversa direta com quem usa o sistema no dia a dia.',
    'Cada projeto começa entendendo o processo real — não a lista de desejos — e termina com a equipe do cliente usando a solução sem precisar de manual. Ficamos por perto depois do go-live, porque manutenção e evolução fazem parte do trabalho.',
  ],
  pillars: [
    { title: 'Diagnóstico antes do código', text: 'Mapeamos o processo atual e atacamos o gargalo que realmente custa dinheiro.' },
    { title: 'Entrega em ciclos curtos', text: 'Versão usable em semanas, feedback incorporado, sem projeto fantasma de um ano.' },
    { title: 'Código que outra pessoa lê', text: 'Documentação, testes e infraestrutura reproduzível. Sem dependência de herói.' },
  ],
};

export const process = [
  { step: '01', title: 'Descoberta', text: 'Reunião de diagnóstico, mapeamento do processo e definição do escopo mínimo viável.' },
  { step: '02', title: 'Proposta', text: 'Cronograma, tecnologia e investimento claros — sem letra miúda nem surpresa no meio do caminho.' },
  { step: '03', title: 'Construção', text: 'Sprints curtas com demonstração semanal em ambiente de homologação sempre no ar.' },
  { step: '04', title: 'Go-live', text: 'Migração de dados, treinamento da equipe e acompanhamento do uso real nas primeiras semanas.' },
];

/** Cabeçalhos e textos de apoio de cada seção. */
export const sectionCopy = {
  process: {
    eyebrow: 'Como trabalhamos',
    title: 'Da conversa inicial ao sistema rodando',
    lead: 'Um caminho curto e transparente, com demonstração toda semana.',
  },
  projects: {
    eyebrow: 'Portfólio',
    titleLead: 'Projetos que já',
    titleHighlight: 'estão no ar',
    lead: 'Abra o case para ver o problema, o que construímos e o resultado, ou visite o projeto publicado.',
    details: 'Ver case',
    openCase: 'Ver case',
    visit: 'Visitar projeto',
    openTitle: 'Próximo case',
    openCta: 'Propor um projeto',
    openBadge: 'Em breve',
  },
  team: {
    eyebrow: 'Equipe',
    titleLead: 'Duas pessoas, um',
    titleHighlight: 'compromisso só',
    lead: 'Você fala direto com quem constrói e com quem desenha a comunicação. Sem camada intermediária, sem “vou confirmar e te retorno”.',
    shared: 'Os dois cuidam de tudo em conjunto e dividem a frente de automação e agentes de IA.',
  },
  services: {
    eyebrow: 'Serviços',
    title: 'Três frentes de atuação',
    lead: 'Elas se combinam: quase todo projeto envolve construir, colocar no ar e automatizar o que antes era manual.',
  },
  contact: {
    eyebrow: 'Contato',
    titleLead: 'Conte o problema,',
    titleHighlight: 'a gente avalia',
    lead: 'Preencha o formulário com o contexto da sua operação. Quanto mais específico, mais útil é o retorno.',
    labels: { name: 'Nome', email: 'E-mail', message: 'Mensagem' },
    placeholders: {
      name: 'Como podemos te chamar?',
      email: 'voce@empresa.com.br',
      message: 'Descreva o processo ou desafio que você quer resolver.',
    },
    messageHint: 'Mínimo de 10 caracteres.',
    submit: 'Enviar mensagem',
    sending: 'Enviando…',
    sent: 'Recebemos sua mensagem. Respondemos em até 2 dias úteis.',
    notifyFallback: 'Sua mensagem chegou, mas o aviso automático falhou. Se não retornarmos, escreva para',
    failure: 'Não foi possível enviar pelo formulário agora. Use um dos canais abaixo ou escreva para',
    factLabels: { email: 'E-mail', phone: 'WhatsApp e telefone', base: 'Base', attendance: 'Atendimento' },
    whatsappGreeting: 'Olá! Vim pelo portfólio da JMG Tech e gostaria de conversar sobre um projeto.',
    whatsappLabel: 'WhatsApp',
    fallbackTitle: 'Prefere falar direto? Escolha um canal:',
    fallbackEmail: 'Enviar pelo meu e-mail',
    quick: 'Prefere falar agora?',
  },
};

export const cta = {
  title: 'Tem um processo travando sua operação?',
  text: 'Conte o problema no formulário. Em até 2 dias úteis retornamos com uma leitura honesta do que dá para fazer.',
  button: 'Solicitar diagnóstico',
};
