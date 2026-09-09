export const portfolio = {
  name: 'Caio Melo',
  identity: 'Desenvolvedor & Engenheiro de Software',
  education: 'Acadêmico de Engenharia de Software na Universidade Federal do Amazonas.',
  heroDescription: 'Criando soluções através da tecnologia. Entusiasta da computação e da engenharia de software.',
  about: [
    'Sou acadêmico de Engenharia de Software na Universidade Federal do Amazonas, interessado em desenvolvimento de software, computação e construção de aplicações web. Também tenho grande afinidade com matemática e raciocínio lógico, interesses que influenciam minha forma de analisar problemas e buscar soluções na programação.',
    'Atualmente, venho desenvolvendo minha base em programação, estruturas de dados, engenharia de software e desenvolvimento backend, enquanto transformo o conhecimento acadêmico em projetos práticos.',
    'Meu objetivo é evoluir continuamente como desenvolvedor, explorando diferentes tecnologias e aprendendo a construir sistemas cada vez mais eficientes, organizados e escaláveis.',
  ],
  interests: ['Desenvolvimento Web', 'Engenharia de Software', 'Backend', 'Inteligência Artificial', 'DevOps'],
  focus: ['Algoritmos & Estruturas de Dados em C', 'UI/UX Design'],
  stack: [
    { name: 'CORE', technologies: ['Java', 'Python', 'TypeScript', 'Go'], symbol: '⌘' },
    { name: 'WEB', technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Spring Boot', 'Django', 'Flask'], symbol: '</>' },
    { name: 'DATABASE', technologies: ['PostgreSQL', 'MongoDB'], symbol: '◫' },
    { name: 'DEVOPS', technologies: ['Git', 'GitHub', 'Docker', 'CI/CD'], symbol: '↗' },
  ],
  project: {
    title: 'Sistema Web para Personal Trainer',
    description: 'Sistema web desenvolvido para um personal trainer, com o objetivo de centralizar o gerenciamento de alunos, treinos e informações relacionadas ao acompanhamento dos clientes.',
    technologies: ['Python', 'Django'],
    status: 'Em desenvolvimento',
  },
  studies: [
    {
      title: 'Algoritmos & Estruturas de Dados em C',
      description: 'Aprofundando fundamentos de algoritmos e estruturas de dados, com foco em resolução de problemas e eficiência computacional.',
      image: '/assets/algoritmos-c.jpg',
      kind: 'blueprint',
    },
    {
      title: 'UI/UX Design',
      description: 'Explorando princípios de interface e experiência do usuário para criar aplicações funcionais, intuitivas e visualmente consistentes.',
      image: '/assets/ui-ux.jpg',
      kind: 'wireframe',
    },
  ],
} as const;

export const navItems = [
  { id: 'hero', label: 'Início' },
  { id: 'about', label: 'Sobre' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Projetos' },
  { id: 'studies', label: 'Estudos' },
  { id: 'contact', label: 'Contato' },
] as const;