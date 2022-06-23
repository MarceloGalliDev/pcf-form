import * as C from "./styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


interface FormStep1Input {
  name: string;
  dateAcquisition: string;
  dateVisition: string;
  lastMonthSpentData: 'janeiro' | 'fevereiro' | 'marco' | 'abril' | 'maio' | 'junho' | 'julho' | 'agosto' | 'setembro' | 'outubro' | 'novembro' | 'dezembro';
}

const schema = yup.object({
  dateAcquisition: yup.string().required(),
  dateVisition: yup.string().required(),
}).required();

export const FormStep8 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const { register, handleSubmit, formState: {errors}} = useForm<FormStep1Input>({resolver: yupResolver(schema)})
  const onSubmit = handleSubmit(data => navigate('/formstep3'))

//função de captura de valores
  const handleDateAcquisitionChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setDateAcquisition,
      payload: event.target.value
    });
  };

  const handleDateVisitionChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setDateVisition,
      payload: event.target.value
    });
  };

  const handleLastMonthSpentDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setLastMonthSpentData,
      payload: event.target.value
    });
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setName,
      payload: event.target.value
    });
  };

  //verificando se foi respondida, não passa para próxima etapa
  // useEffect(() => {
  //   if (state.name === '' ||
  //     state.phoneNumber === '' ||
  //     state.email === '' ||
  //     state.functionPCF === '' ||
  //     state.uf === '' ||
  //     state.city === '') {
  //     navigate('/')
  //   } else {
  //     dispatch({
  //       type: FormActions.setCurrentStep,
  //       payload: 2
  //     });
  //   }
  // }, []);

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 8
    });
  }, []);

  return (
    <Theme>
      <C.Container>
        <p>Etapa {state.currentStep}/8</p>
        <h1>Outros profissionais</h1>
        <p>Informações sobre os atores/ participantes da equipe do PCF</p>
        <hr />

        <div className="formQuestion">
          <p>Subseção Outros Profissionais</p>

          <div className="formQuestion">
            <label htmlFor="name">
              Indique outros profissionais remunerados pelo PCF?
              <input
                {...register("name")}
                name="name"
                type="text"
                value={state.name}
                onChange={handleNameChange}
                placeholder="Sua resposta"
              />
            </label>
          </div>

          <div className="formQuestion">
            <label htmlFor="name">
              Qual a remuneração média em R$ (reais) desses outros profissionais?
              <input
                {...register("name")}
                name="name"
                type="text"
                value={state.name}
                onChange={handleNameChange}
                placeholder="Valor em R$"
              />
            </label>
          </div>

          <div className="formQuestion">
            <label htmlFor="name">
              Observações:
              <input
                {...register("name")}
                name="name"
                type="text"
                value={state.name}
                onChange={handleNameChange}
                placeholder="Sua resposta"
              />
            </label>
          </div>

        </div>

        <Link className="backButton" to="/">Voltar</Link>
        <button
          onClick={onSubmit}
        >Próximo
        </button>
      </C.Container>
    </Theme>
  )
}

