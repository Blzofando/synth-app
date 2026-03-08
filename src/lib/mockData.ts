export type Video = {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  type: string;
};

export type Anotacao = {
  id: number;
  data: string;
  titulo: string;
  conteudoPreview: string;
  documentoRef?: string;
};

export type Materia = {
  id: number;
  subject: string;
  professor: string;
  time: string;
  iconColor: string;
  videos: Video[];
  anotacoes: Anotacao[];
};

export const mockMaterias: Materia[] = [
  {
    id: 1,
    subject: "Cálculo III",
    professor: "Prof. Dr. Ricardo Santos",
    time: "08:00 - 09:30",
    iconColor: "bg-blue-600/20 text-blue-400 border-blue-600/30",
    anotacoes: [
      { id: 10, data: "12/12", titulo: "Integrais Duplas e Volume", conteudoPreview: "Resumo e principais dicas sobre o teorema de Fubini...", documentoRef: "calculo3_aula4.pdf" },
      { id: 11, data: "10/12", titulo: "Coordenadas Polares", conteudoPreview: "Mudança de variáveis na integral dupla.", documentoRef: "anotacao_polares.pdf" }
    ],
    videos: [
      { id: 101, title: "Revisão: Integrais Duplas", thumbnail: "bg-blue-900", duration: "15:20", type: "Revisão" },
      { id: 102, title: "Introdução às Coord. Cilíndricas", thumbnail: "bg-blue-800", duration: "45:00", type: "Aula" },
      { id: 103, title: "Exercícios Resolvidos: Lista 3", thumbnail: "bg-blue-700", duration: "25:10", type: "Prática" },
      { id: 104, title: "Aplicações em Física", thumbnail: "bg-blue-950", duration: "30:00", type: "Extra" },
    ]
  },
  {
    id: 2,
    subject: "Algoritmos Estruturados",
    professor: "Dra. Amanda Oliveira",
    time: "10:00 - 11:30",
    iconColor: "bg-emerald-600/20 text-emerald-400 border-emerald-600/30",
    anotacoes: [
       { id: 20, data: "11/12", titulo: "Árvores Binárias (Implementação)", conteudoPreview: "Código em C e Python feito em sala sobre inserção recursiva.", documentoRef: "arvore.c" }
    ],
    videos: [
      { id: 201, title: "Árvores Binárias de Busca", thumbnail: "bg-emerald-900", duration: "50:00", type: "Aula" },
      { id: 202, title: "Resolução do Desafio de Pilhas", thumbnail: "bg-emerald-800", duration: "18:30", type: "Revisão" },
      { id: 203, title: "Grafos: Algoritmo de Dijkstra", thumbnail: "bg-emerald-700", duration: "42:15", type: "Aula" },
    ]
  },
  {
    id: 3,
    subject: "Física Experimental II",
    professor: "Prof. Marcos Souza",
    time: "13:30 - 15:00",
    iconColor: "bg-rose-600/20 text-rose-400 border-rose-600/30",
    anotacoes: [],
    videos: [
      { id: 301, title: "Medidas de Precisão", thumbnail: "bg-rose-900", duration: "12:00", type: "Laboratório" },
      { id: 302, title: "Montagem do Pêndulo", thumbnail: "bg-rose-800", duration: "22:45", type: "Prática" },
    ]
  },
  {
    id: 4,
    subject: "Engenharia de Software",
    professor: "Prof. Carlos Mendes",
    time: "15:30 - 17:00",
    iconColor: "bg-purple-600/20 text-purple-400 border-purple-600/30",
    anotacoes: [],
    videos: [
      { id: 401, title: "Metodologias Ágeis: Scrum", thumbnail: "bg-purple-900", duration: "35:00", type: "Aula" },
      { id: 402, title: "Padrões de Projeto: Singleton", thumbnail: "bg-purple-800", duration: "28:00", type: "Aula" },
      { id: 403, title: "Requisitos Não Funcionais", thumbnail: "bg-purple-700", duration: "40:20", type: "Aula" },
    ]
  },
  {
    id: 5,
    subject: "Inteligência Artificial",
    professor: "Dra. Sofia Lima",
    time: "19:00 - 20:30",
    iconColor: "bg-amber-600/20 text-amber-400 border-amber-600/30",
    anotacoes: [],
    videos: [
      { id: 501, title: "Redes Neurais Artificiais", thumbnail: "bg-amber-900", duration: "55:00", type: "Aula" },
      { id: 502, title: "Aplicações de Machine Learning", thumbnail: "bg-amber-800", duration: "32:10", type: "Extra" },
      { id: 503, title: "Trabalho Final: Orientações", thumbnail: "bg-amber-700", duration: "15:00", type: "Aviso" },
    ]
  }
];
