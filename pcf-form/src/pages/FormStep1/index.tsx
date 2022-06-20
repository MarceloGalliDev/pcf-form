import * as C from "./styles"
import { Theme } from "../../components/Theme"
import { useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


interface FormStep1Input {
  name: string;
  phone: string;
}

const schema = yup.object({
  name: yup.string().required(),
  phone: yup.number().required(),
}).required();

export const FormStep1 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const { register, handleSubmit, formState: {errors}} = useForm<FormStep1Input>({resolver: yupResolver(schema)})

  const onSubmit = handleSubmit(data => navigate('/formstep2'))

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setName,
      payload: event.target.value
    });
  }//Aqui fizemos a função de troca de nome, usamos dispatch para realizar a troca, onde recebemos no payload o valor, e setamos no FormActions

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setPhoneNumber,
      payload: event.target.value
    });
  }

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
              placeholder="Sua resposta"
            />
          </label>
        </div>

        <div className="formQuestion">
          <label htmlFor="phonenumber">
            Telefone para contato:
            <span>{errors.phone && " ⚠ *Campo obrigatório "}</span>
            <input
              {...register("phone")}
              name="phone"
              type="text"
              autoFocus
              value={state.phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="DDD + Telefone"
            />
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