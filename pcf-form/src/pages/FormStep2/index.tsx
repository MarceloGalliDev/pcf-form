import * as C from "./styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import axios from "axios"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


interface FormStep1Input {
  dateAcquisition: string;
  dateVisition: string;
}

const schema = yup.object({
  dateAcquisition: yup.string().required(),
  dateVisition: yup.string().required(),
}).required();

export const FormStep2 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const { register, handleSubmit, formState: {errors}} = useForm<FormStep1Input>({resolver: yupResolver(schema)})
  const onSubmit = handleSubmit(data => navigate('/formstep3'))


  const handleDateAcquisitionChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setDateAcquisition,
      payload: event.target.value
    });
  };

  const handleDateVisitionChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setName,
      payload: event.target.value
    });
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 2
    });
  }, []);

  return (
    <Theme>
      <C.Container>
        <p>Etapa {state.currentStep}/3</p>
        <h1>Características do PCF</h1>
        <hr />
        
        <div className="formQuestion">
          <label htmlFor="dateAcquisition">
            Data de adesão do município ao PCF:
            <span>{errors.dateAcquisition && " ⚠ *Campo obrigatório "}</span>
            <input
              {...register("dateAcquisition")}
              name="dateAcquisition"
              type="date"
              value={state.dateAcquisition}
              onChange={handleDateAcquisitionChange}
            />
          </label>
        </div>

        <div className="formQuestion">
          <label htmlFor="dateVisition">
            Data do início das visitas:
            <span>{errors.dateVisition && " ⚠ *Campo obrigatório "}</span>
            <input
              {...register("dateVisition")}
              name="dateVisition"
              type="date"
              value={state.dateVisition}
              onChange={handleDateVisitionChange}
            />
          </label>
        </div>

        <div className="formQuestion">
          <p className="lastMonth">
            Qual é o último mês do ano de 2022 do qual o município possui dados dos gastos com o PCF?
            <span>{errors.dateVisition && " ⚠ *Campo obrigatório "}</span>
            <label id="lastMonth" htmlFor="">Janeiro
              <input
                {...register("dateVisition")}
                name="dateVisition"
                type="radio"
                value={state.dateVisition}
                onChange={handleDateVisitionChange}
              />
            </label>
          </p>
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

