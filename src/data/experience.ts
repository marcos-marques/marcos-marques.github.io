// TODO: substituir por dados reais

export interface Job {
  title: string;
  company: string;
  start: string;
  end: string | null;
}

export const experience: Job[] = [
  { title: "Engenheiro de Software Sênior", company: "Exemplo Corp",    start: "2023-03", end: null       },
  { title: "Engenheiro de Software Pleno",  company: "Acme Tecnologia",  start: "2020-06", end: "2023-02" },
  { title: "Desenvolvedor Full-Stack Jr.",  company: "StartupXYZ",       start: "2018-01", end: "2020-05" },
];
