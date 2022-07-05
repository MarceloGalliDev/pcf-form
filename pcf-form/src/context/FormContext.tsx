//context, reducer, provider, hook
import { createContext, useReducer, useContext, ReactNode } from "react";

//tipando os dados
type State = {
  currentStep: number;
  name: string;
  email: string;
  phoneNumber: string;
  functionPCF: string;
  uf: string;
  city: string;
  dateAcquisition: string;
  dateVisition: string;
  lastMonthSpentData: string;
  phasePCFCity: string;
  expansionGoals: string;
  referenceCenter: string;
  actionPlan: string;
  teamCoordinator: string;
  meetTheCoordinator: string;
  contactCoordinator: string;
  knowTheMultiplier: string;
  steeringCommittee: string;
  steeringCommitteeMeeting: string;
  numberOfSupervisors: string;
  averagePay: string;
  workload: string;
  workloadOthers: string;
  supervisorQualification: string;

  }
  //é o tipo de informação que está dentro do meu state

type Action = {
  type: FormActions;
  payload: any;
  //é o tipo de ação que será executando nos dados
};
type ContextType = {
  state: State;
  dispatch: (action: Action) => void;
}
type FormProviderProps = {
  children: ReactNode;
};
//diferença entre Type e Interface o interface faz uso do extends para incorporar a tipagem ao dado
//interface podemos alterar campos em nossa definição o types não, podemos ter duas interface com mesmo nome, types não
//

const initialData: State = {
  currentStep: 0,
  name: '',
  email: '',
  phoneNumber: '',
  functionPCF: '',
  uf: '',
  city: '',
  dateAcquisition: '',
  dateVisition: '',
  lastMonthSpentData: '',
  phasePCFCity: '',
  expansionGoals: '',
  referenceCenter: '',
  actionPlan: '',
  teamCoordinator: '',
  meetTheCoordinator: '',
  contactCoordinator: '',
  knowTheMultiplier: '',
  steeringCommittee: '',
  steeringCommitteeMeeting: '',
  numberOfSupervisors: '',
  averagePay: '',
  workload: '', workloadOthers: '',
  supervisorQualification: '',

  //são os dados iniciais
};

//Context - onde fica o contexto da nossa aplicação
const FormContext = createContext<ContextType | undefined>(undefined);//o createContext começa com undefined

//Reducer - Recebo os dados, executo uma ação e retorno os dados
export enum FormActions {
  setCurrentStep,
  setName,
  setEmail,
  setPhoneNumber,
  setFunctionPCF,
  setUf,
  setCity,
  setDateAcquisition,
  setDateVisition,
  setLastMonthSpentData,
  setPhasePCFCity,
  setExpansionGoals,
  setReferenceCenter,
  setActionPlan,
  setTeamCoordinator,
  setMeetTheCoordinator,
  setContactCoordinator,
  setKnowTheMultiplier,
  setSteeringCommittee,
  setSteeringCommitteeMeeting,
  setNumberOfSupervisors,
  setAveragePay,
  setWorkload,
  setWorkloadOthers,
  setSupervisorQualification,
  //enum = é uma forma de tipificar dados em um objeto, como listas, são autoincrementados, e podem ser números, podem haver strings sem valores.
};


const formReducer = (state: State, action: Action) => {//recebi os dados originais no state, qual a ação vou executar
  switch (action.type) {
    case FormActions.setCurrentStep://a ação é de o passo
      return { ...state, currentStep: action.payload };//pego o passo no action.payload, no currentStep e retorna o novo valor
    default://se não existir está ação retorna o state do jeito que veio
      return state;
  }
  //{... state} estamos clonando os dados de state
  //payload é os dados
};
//Provider - o ambiente geral para gerenciar os dados, componente principal
export const FormProvider = ({ children }: FormProviderProps) => {
  const [state, dispatch] = useReducer(formReducer, initialData);
  const value = { state, dispatch };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
  //dispatch - função que eu uso para executar minhas ações
  //children serve para recebe o conteúdo que está dentro de FormProvider
  //cria o site inteiro e coloca dentro do FormContext, que será passado para o children
};
//Context hook
export const useFormPage = () => {
  const context = useContext(FormContext);//esta enviado FormContext
  if (context === undefined) {
    throw new Error('useForm precisa ser usado dentro do FormProvider');
  }
  return context;
};