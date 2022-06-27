
export const initialWorkload: Workload = {
  workloadCheckbox: '',
  workloadOthers: '',
};

export enum setWorkloadActions {
  setWorkloadCheckbox,
  setWorkloadOthers,
};

export interface Workload {
  workloadCheckbox: string;
  workloadOthers?: string;
};

export interface FormStep4Input {
  numberOfSupervisors: string;
  averagePay: string;
  workload: Workload;
};

