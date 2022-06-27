//context, reducer, provider, hook
import { createContext, useReducer, useContext, ReactNode } from "react";
import { string } from "yup/lib/locale";
import { initialWorkload, Workload } from "../types/FormStep4";



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
  workload: Workload;
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
  workload: initialWorkload,
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
  setWorkloadOther,
  //enum = é uma forma de tipificar dados em um objeto, como listas, são autoincrementados, e podem ser números, podem haver strings sem valores.
};


const formReducer = (state: State, action: Action) => {//recebi os dados originais no state, qual a ação vou executar
  switch (action.type) {
    case FormActions.setCurrentStep://a ação é de o passo
      return { ...state, currentStep: action.payload };//pego o passo no action.payload, no currentStep e retorna o novo valor
    case FormActions.setName:
      return { ...state, name: action.payload };
    case FormActions.setEmail:
      return { ...state, email: action.payload };
    case FormActions.setPhoneNumber:
      return { ...state, phoneNumber: action.payload };
    case FormActions.setFunctionPCF:
      return { ...state, functionPCF: action.payload };
    case FormActions.setUf:
      return { ...state, uf: action.payload };
    case FormActions.setCity:
      return { ...state, city: action.payload };
    case FormActions.setDateAcquisition:
      return { ...state, dateAcquisition: action.payload };
    case FormActions.setDateVisition:
      return { ...state, dateVisition: action.payload };
    case FormActions.setLastMonthSpentData:
      return { ...state, lastMonthSpentData: action.payload };
    case FormActions.setPhasePCFCity:
      return { ...state, phasePCFCity: action.payload };
    case FormActions.setExpansionGoals:
      return { ...state, expansionGoals: action.payload };
    case FormActions.setReferenceCenter:
      return { ...state, referenceCenter: action.payload };
    case FormActions.setActionPlan:
      return { ...state, actionPlan: action.payload };
    case FormActions.setTeamCoordinator:
      return { ...state, teamCoordinator: action.payload };
    case FormActions.setMeetTheCoordinator:
      return { ...state, meetTheCoordinator: action.payload };
    case FormActions.setContactCoordinator:
      return { ...state, contactCoordinator: action.payload };
    case FormActions.setKnowTheMultiplier:
      return { ...state, knowTheMultiplier: action.payload };
    case FormActions.setSteeringCommittee:
      return { ...state, steeringCommittee: action.payload };
    case FormActions.setSteeringCommitteeMeeting:
      return { ...state, steeringCommitteeMeeting: action.payload };
    case FormActions.setNumberOfSupervisors:
      return { ...state, numberOfSupervisors: action.payload };
    case FormActions.setAveragePay:
      return { ...state, averagePay: action.payload };
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