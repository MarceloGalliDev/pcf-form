export interface FormStep2Input {
  dateAcquisition: string;
  dateVisition: string;
  lastMonthSpentData: 'janeiro' | 'fevereiro' | 'marco' | 'abril' | 'maio' | 'junho' | 'julho' | 'agosto' | 'setembro' | 'outubro' | 'novembro' | 'dezembro';
  phasePCFCity: 'Implantação (até 4 meses)' | 'Execução Fase I (entre o 5º e o 7º mês do início da implantação)' | 'Execução Fase II (a partir do 8º mês da implantação)';
  expansionGoals: 'Sim' | 'Não' | 'Não sei';
  referenceCenter: 'Sim' | 'Não' | 'Não sei';
  actionPlan: 'Sim' | 'Não' | 'Não sei';
};