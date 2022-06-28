export type IBGEUFResponse = {
  id: number;
  sigla: string;
  nome: string;
};

export type IBGECITYResponse = {
  id: number;
  nome: string;
};

export interface FormStep1Input {
  name: string;
  email: string;
  phoneNumber: string;
  functionPCF: string;
  uf: string;
  city: string;
};