import * as SC from "../../styles/styles"
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

export const FormStep7 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const { register, handleSubmit, formState: { errors } } = useForm<FormStep1Input>({ resolver: yupResolver(schema) })
  const onSubmit = handleSubmit(data => navigate('/formstep3'))

  //função de captura de valores
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setName,
      payload: event.target.value
    });
  };
  
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
      payload: 7
    });
  }, []);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Público atendido pelo PCF em seu município</h1>
        <p>Perfil das famílias atendidas pelo PCF em seu município</p>
        <hr />
      </SC.Container>

      <SC.ButtonTypeTextV2>
        <div className="formQuestion">
          <p>Indique o número de pessoas atendidas pelo Programa em seu município no mês de referência mencionado anteriormente:</p>

          <div className="containerBgLabel">
            <label className="containerTextLabel" htmlFor="name">
              Gestantes (inseridas no CadÚnico):
              <span>{errors.name && " ⚠ *Campo obrigatório "}</span>
              <input
                {...register("name")}
                name="name"
                type="text"
                autoFocus
                value={state.name}
                onChange={handleNameChange}
                placeholder="Quantidade"
              />
            </label>
          </div>

          <div className="containerBgLabel">
            <label className="containerTextLabel" htmlFor="name">
              Crianças de 0-36 meses (inseridas no CadÚnico):
              <span>{errors.name && " ⚠ *Campo obrigatório "}</span>
              <input
                {...register("name")}
                name="name"
                type="text"
                value={state.name}
                onChange={handleNameChange}
                placeholder="Quantidade"
              />
            </label>
          </div>

          <div className="containerBgLabel">
            <label className="containerTextLabel" htmlFor="name">
              Crianças de 0-72 meses (Beneficiárias do BPC):
              <span>{errors.name && " ⚠ *Campo obrigatório "}</span>
              <input
                {...register("name")}
                name="name"
                type="text"
                value={state.name}
                onChange={handleNameChange}
                placeholder="Quantidade"
              />
            </label>
          </div>

          <div className="containerBgLabel">
            <label className="containerTextLabel" htmlFor="name">
              Crianças de até 6 anos afastadas do convívio familiar:
              <span>{errors.name && " ⚠ *Campo obrigatório "}</span>
              <input
                {...register("name")}
                name="name"
                type="text"
                value={state.name}
                onChange={handleNameChange}
                placeholder="Quantidade"
              />
            </label>
          </div>
          
          <div className="containerBgLabel">
            <label className="containerTextLabel" htmlFor="name">
              Crianças de até 6 anos inseridas no CadÚnico, que perderam ao menos um de seus responsáveis familiares, independente da causa de morte, durante o período de Emergência em Saúde Pública de Importância Nacional (ESPIN) decorrente da Covid-19:
              <span>{errors.name && " ⚠ *Campo obrigatório "}</span>
              <input
                {...register("name")}
                name="name"
                type="text"
                value={state.name}
                onChange={handleNameChange}
                placeholder="Quantidade"
              />
            </label>
          </div>

          <div className="containerBgLabel">
            <label className="containerTextLabel" htmlFor="name">
              Crianças atendidas que não pertencem ao grupo prioritário do PCF:
              <span>{errors.name && " ⚠ *Campo obrigatório "}</span>
              <input
                {...register("name")}
                name="name"
                type="text"
                value={state.name}
                onChange={handleNameChange}
                placeholder="Quantidade"
              />
            </label>
          </div>

          <div className="containerBgLabel">
            <label className="containerTextLabel" htmlFor="name">
              Quantos domicílios no seu município possuem mais de uma criança sendo atendida pelo PCF?
              <span>{errors.name && " ⚠ *Campo obrigatório "}</span>
              <input
                {...register("name")}
                name="name"
                type="text"
                value={state.name}
                onChange={handleNameChange}
                placeholder="Quantidade"
              />
            </label>
          </div>

        </div>
      </SC.ButtonTypeTextV2>

      <SC.AllButtons>
          <Link className="buttonAll" to="/:id/formstep6">Voltar</Link>
          <button
            className="buttonAll"
            type="submit"
            >Próximo
          </button>
        </SC.AllButtons>
    </Theme>
  )
};

