// TODO: substituir por dados reais

export interface Project {
  name: string;
  url: string;
  description: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: "Projeto Alpha",
    url: "https://example.com/alpha",
    description: "Sistema de gerenciamento de tarefas com interface intuitiva.",
    tags: ["TypeScript", "React", "Node.js"],
  },
  {
    name: "Projeto Beta",
    url: "https://example.com/beta",
    description: "API REST para processamento de dados em tempo real.",
    tags: ["Go", "PostgreSQL", "Docker"],
  },
  {
    name: "Projeto Gamma",
    url: "https://example.com/gamma",
    description: "Biblioteca open-source para visualização de grafos.",
    tags: ["TypeScript", "D3.js", "SVG"],
  },
];
