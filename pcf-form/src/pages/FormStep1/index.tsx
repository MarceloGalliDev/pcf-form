import * as C from "./styles"
import { Theme } from "../../components/Theme"
import { useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { DropdownStateCity } from "../../components/DropdownStateCity"


interface FormStep1Input {
  name: string;
  phoneNumber: string;
  email: string;
  functionPCF: string;
}

const schema = yup.object({
  name: yup.string().required(),
  phoneNumber: yup.number().required(),
  email: yup.string().required(),
  functionPCF: yup.string().required(),
}).required();



export const FormStep1 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const { register, handleSubmit, formState: {errors}} = useForm<FormStep1Input>({resolver: yupResolver(schema)})
  const onSubmit = handleSubmit(data => navigate('/formstep2'))

//Aqui fizemos a função de troca de nome, usamos dispatch para realizar a troca, onde recebemos no payload o valor, e setamos no FormActions
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setName,
      payload: event.target.value
    });
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setEmail,
      payload: event.target.value
    });
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setPhoneNumber,
      payload: event.target.value
    });
  };

  const handleFunctionPCFChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setFunctionPCF,
      payload: event.target.value
    });
  };

  //Aqui ambiente da troca do passe, de acordo com a currentStep, controle de página
  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 1
    });
  }, [])

  return (
    <Theme>
      <C.Container>
        <p>Etapa {state.currentStep}/3</p>
        <h1>Informações gerais</h1>
        <hr />
        
        <div className="formQuestion">
          <label htmlFor="name">
            Nome do entrevistado:
            <span>{errors.name && " ⚠ *Campo obrigatório "}</span>
            <input
              {...register("name")}
              name="name"
              type="text"
              autoFocus
              value={state.name}
              onChange={handleNameChange}
              placeholder="Seu nome"
            />
          </label>
        </div>

        <div className="formQuestion">
          <label htmlFor="email">
            E-mail:
            <span>{errors.email && " ⚠ *Campo obrigatório "}</span>
            <input
              {...register("email")}
              name="email"
              type="email"
              value={state.email}
              onChange={handleEmailChange}
              placeholder="Seu e-mail"
            />
          </label>
        </div>

        <div className="formQuestion">
          <label htmlFor="phoneNumber">
            Telefone para contato:
            <span>{errors.phoneNumber && " ⚠ *Campo obrigatório "}</span>
            <input
              {...register("phoneNumber")}
              name="phoneNumber"
              type="text"
              value={state.phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="DDD + Telefone"
            />
          </label>
        </div>

        <div className="formQuestion">
          <label htmlFor="functionPCF">
            Função no PCF:
            <span>{errors.functionPCF && " ⚠ *Campo obrigatório "}</span>
            <input
              {...register("functionPCF")}
              name="functionPCF"
              type="text"
              value={state.functionPCF}
              onChange={handleFunctionPCFChange}
              placeholder="Sua resposta"
            />
          </label>
        </div>

        <div className="formQuestion">
          <label htmlFor="stateUF">
            Local em que atua no PCF:
            <span>{errors.functionPCF && " ⚠ *Campo obrigatório "}</span>
            <DropdownStateCity/>
          </label>
          
        </div>

        <button
          onClick={onSubmit}
        >Próximo
        </button>
      </C.Container>
    </Theme>
  )
}