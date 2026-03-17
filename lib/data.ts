export const candidates = [
  {
    id: 'ricardo-oliveira',
    name: 'Ricardo Oliveira',
    role: 'Diretor Comercial',
    experience: '12 anos',
    experienceYears: 12,
    projects: '45+',
    rating: 4.9,
    location: 'São Paulo, Brasil',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    summary: 'Diretor Comercial orientado a resultados com vasta experiência na construção de estratégias de vendas. Especialista em negociações complexas e expansão de mercado.',
    experiences: [
      {
        period: 'Out 2025 - Atualmente',
        role: 'Diretor Comercial',
        company: 'TechFlow Solutions',
        achievements: ['Liderança de equipe nacional', 'Crescimento de 120% no ARR']
      },
      {
        period: 'Mai 2025 - Set 2025',
        role: 'Gerente Nacional de Vendas',
        company: 'Inova Digital',
        achievements: ['Gestão de contas Enterprise']
      },
      {
        period: 'Jan 2025 - Abr 2025',
        role: 'Gerente de Vendas',
        company: 'NextGen Sales',
        achievements: ['Aumento de 30% no faturamento']
      },
      {
        period: 'Ago 2024 - Dez 2024',
        role: 'Executivo de Vendas',
        company: 'SalesForce One',
        achievements: ['Abertura de novos mercados']
      },
      {
        period: 'Mar 2024 - Jul 2024',
        role: 'Account Manager',
        company: 'CloudSystems',
        achievements: ['Retenção de clientes']
      },
      {
        period: 'Out 2023 - Fev 2024',
        role: 'Sales Supervisor',
        company: 'Prime Tech',
        achievements: ['Treinamento de SDRs']
      }
    ],
    education: [
      {
        degree: 'MBA em Gestão Comercial',
        institution: 'FGV',
        period: '2013 - 2015'
      }
    ],
    skills: ['Estratégia Comercial', 'Negociação', 'Gestão de Equipes', 'CRM'],
    riskScore: 0.85,
    alert: {
      type: 'Ocorrências Graves',
      judicial: { count: 3, description: 'registros encontrados (Cível, Trabalhista e Criminal)' },
      turnover: { average: '5 meses', status: 'Crítico' }
    },
    report: {
      cpf: '000.000.000-00',
      creditScore: 210,
      creditPendencies: [
        { bank: 'Banco Capital Sul S.A.', type: 'Pendência Financeira', date: '15/01/2024', value: 'R$ 12.450,00' },
        { bank: 'Financiera CrediMais', type: 'Restrição de Crédito', date: '02/11/2023', value: 'R$ 4.890,00' },
        { bank: 'InvestBank S.A.', type: 'Dívida Vencida', date: '20/02/2024', value: 'R$ 7.120,00' }
      ],
      turnover: {
        averageTime: '5 meses',
        totalCompanies: 6,
        description: 'O candidato apresenta um padrão de permanência curto (job hopping), com passagens que raramente superam os 6 meses.'
      },
      aiAnalysis: {
        title: 'Análise da IA LiberadoApp',
        summary: 'Ricardo Oliveira apresenta um perfil de altíssimo risco. Além da instabilidade profissional crônica, foram localizados 3 processos, incluindo uma ocorrência grave de agressão doméstica (Lei Maria da Penha), o que compromete totalmente a segurança corporativa e o fit cultural.'
      },
      judicialDetails: [
        {
          type: 'Criminal',
          status: 'Em Andamento',
          process: 'Processo nº 50293/2023-SP',
          description: 'Tribunal de Justiça de SP. Ação penal: Lesão corporal decorrente de violência doméstica.'
        },
        {
          type: 'Cível',
          status: 'Execução',
          process: 'Processo nº 10293/2022-SP',
          description: 'Ação de cobrança de honorários e dívidas não pagas.'
        },
        {
          type: 'Trabalhista',
          status: 'Arquivado',
          process: 'Processo nº 001245-88.2019.5.02.0001',
          description: 'Reclamação trabalhista movida contra ex-empregador.'
        }
      ],
      warrants: {
        status: 'Nada Consta',
        description: 'Nenhum mandado de prisão ativo localizado.'
      }
    }
  },
  {
    id: 'mariana-costa',
    name: 'Mariana Costa',
    role: 'Gerente Comercial',
    experience: '8 anos',
    experienceYears: 8,
    projects: '30+',
    rating: 4.8,
    location: 'Rio de Janeiro, Brasil',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    summary: 'Gerente Comercial com histórico comprovado de estabilidade e crescimento orgânico em empresas de tecnologia.',
    experiences: [
      {
        period: 'Jan 2021 - Atualmente',
        role: 'Gerente Comercial',
        company: 'InovaTech Solutions',
        achievements: ['Gestão de 15 vendedores', 'Aumento de 45% na conversão']
      },
      {
        period: 'Jul 2017 - Dez 2020',
        role: 'Coordenadora de Vendas',
        company: 'Digital Corp',
        achievements: ['Estruturação da área de Inside Sales']
      }
    ],
    education: [
      {
        degree: 'Bacharelado em Marketing',
        institution: 'UFRJ',
        period: '2012 - 2016'
      }
    ],
    skills: ['Gestão de Vendas', 'Inside Sales', 'Liderança', 'Métricas'],
    riskScore: 0.15,
    alert: {
      type: 'Ocorrências Leves',
      judicial: { count: 1, description: 'registro encontrado (Trabalhista)' },
      turnover: { average: '3.5 anos', status: 'Excelente' }
    },
    report: {
      cpf: '111.111.111-11',
      creditScore: 780,
      creditPendencies: [
        { bank: 'Banco Horizonte S.A.', type: 'Pendência Comercial', date: '05/03/2024', value: 'R$ 150,00' }
      ],
      turnover: {
        averageTime: '3.5 anos',
        totalCompanies: 1,
        description: 'A candidata possui excelente estabilidade, com passagens longas e consistentes nas empresas anteriores.'
      },
      aiAnalysis: {
        title: 'Análise da IA LiberadoApp',
        summary: 'Mariana Costa é uma candidata de baixo risco. Apresenta ótima estabilidade profissional e apenas uma pendência financeira irrelevante. O processo trabalhista é antigo e já resolvido.'
      },
      judicialDetails: [
        {
          type: 'Trabalhista',
          status: 'Concluído',
          process: 'Processo nº 20394/2018-RJ',
          description: 'Ação de reconhecimento de vínculo empregatício de período inicial de carreira.'
        }
      ],
      warrants: {
        status: 'Nada Consta',
        description: 'Nenhum mandado de prisão ativo localizado.'
      }
    }
  },
  {
    id: 'andre-santos',
    name: 'André Santos',
    role: 'Key Account Manager',
    experience: '15 anos',
    experienceYears: 15,
    projects: '100+',
    rating: 4.7,
    location: 'Belo Horizonte, Brasil',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    summary: 'Especialista em gestão de contas estratégicas e vendas complexas B2B com foco em relacionamento C-level.',
    experiences: [
      {
        period: 'Jan 2022 - Atualmente',
        role: 'Key Account Manager Sênior',
        company: 'Global Corp',
        achievements: ['Gestão de carteira de R$ 50M+', 'Churn Rate abaixo de 2%']
      },
      {
        period: 'Mar 2020 - Dez 2021',
        role: 'Executivo de Contas',
        company: 'Tech Sales BR',
        achievements: ['Top Performer por 2 anos']
      }
    ],
    education: [
      {
        degree: 'Bacharelado em Economia',
        institution: 'UFMG',
        period: '2005 - 2009'
      }
    ],
    skills: ['Gestão de Contas', 'Vendas B2B', 'Negociação'],
    riskScore: 0.45,
    alert: {
      type: 'Ocorrências Moderadas',
      judicial: { count: 2, description: 'registros encontrados (Cível e Trabalhista)' },
      turnover: { average: '2 anos', status: 'Bom' }
    },
    report: {
      cpf: '222.222.222-22',
      creditScore: 920,
      creditPendencies: [],
      turnover: {
        averageTime: '2 anos',
        totalCompanies: 2,
        description: 'O candidato possui um histórico de turnover saudável, compatível com o mercado de tecnologia.'
      },
      aiAnalysis: {
        title: 'Análise da IA LiberadoApp',
        summary: 'André Santos possui crédito impecável (Nada Consta). Os processos judiciais são de natureza civil (disputa imobiliária) e trabalhista, não representando risco direto à função comercial.'
      },
      judicialDetails: [
        {
          type: 'Cível',
          status: 'Em Andamento',
          process: 'Processo nº 0001234-56.2022.8.13.0001',
          description: 'Ação revisional de contrato de aluguel residencial.'
        },
        {
          type: 'Trabalhista',
          status: 'Arquivado',
          process: 'Processo nº 0009876-54.2019.5.03.0002',
          description: 'Pedido de pagamento de comissões retidas por ex-empregador.'
        }
      ],
      warrants: {
        status: 'Nada Consta',
        description: 'Nenhum mandado de prisão ativo localizado.'
      }
    }
  }
];
