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
  lastMonthSpentData: 'janeiro' | 'fevereiro' | 'marco' | 'abril' | 'maio' | 'junho' | 'julho' | 'agosto' | 'setembro' | 'outubro' | 'novembro' | 'dezembro';
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

  //verificando se foi respondi, não passa apra próxima etapa
  useEffect(() => {
    if (state.name === '' ||
      state.phoneNumber === '' ||
      state.email === '' ||
      state.functionPCF === '' ||
      state.uf === '' ||
      state.city === '') {
      navigate('/')
    } else {
      dispatch({
        type: FormActions.setCurrentStep,
        payload: 2
      });
    }
  }, []);

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
            <span>{errors.lastMonthSpentData && " ⚠ *Campo obrigatório "}</span>
          </p>
          <div id="containerOptionYear">
            <div id="containerOptionSixMonth">
              <div id="containerLastMonth">
                <input
                    {...register("lastMonthSpentData")}
                    id="lastMonthSpentJaneiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="janeiro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="lastMonthLabel"
                  htmlFor="lastMonthSpentJaneiro"
                >Janeiro
                </label>
              </div>
              <div id="containerLastMonth">
                <input
                    id="lastMonthSpentFevereiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Fevereiro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="lastMonthLabel"
                  htmlFor="lastMonthSpentFevereiro"
                >Fevereiro
                </label>
              </div>
              <div id="containerLastMonth">
                <input
                    id="lastMonthSpentMarco"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Março"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="lastMonthLabel"
                  htmlFor="lastMonthSpentMarco"
                >Março
                </label>
              </div>
              <div id="containerLastMonth">
                <input
                    id="lastMonthSpentAbril"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Abril"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="lastMonthLabel"
                  htmlFor="lastMonthSpentAbril"
                >Abril
                </label>
              </div>
              <div id="containerLastMonth">
                <input
                    id="lastMonthSpentMaio"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Maio"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="lastMonthLabel"
                  htmlFor="lastMonthSpentMaio"
                >Maio
                </label>
              </div>
              <div id="containerLastMonth">
                <input
                    id="lastMonthSpentJunho"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Junho"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="lastMonthLabel"
                  htmlFor="lastMonthSpentJunho"
                >Junho
                </label>
              </div>
            </div>
            <div id="containerOptionSixMonth">
              <div id="containerLastMonth">
                <input
                    id="lastMonthSpentJulho"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Julho"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="lastMonthLabel"
                  htmlFor="lastMonthSpentJulho"
                >Julho
                </label>
              </div>
              <div id="containerLastMonth">
                <input
                    id="lastMonthSpentAgosto"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Agosto"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="lastMonthLabel"
                  htmlFor="lastMonthSpentAgosto"
                >Agosto
                </label>
              </div>
              <div id="containerLastMonth">
                <input
                    id="lastMonthSpentSetembro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Setembro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="lastMonthLabel"
                  htmlFor="lastMonthSpentSetembro"
                >Setembro
                </label>
              </div>
              <div id="containerLastMonth">
                <input
                    id="lastMonthSpentOutubro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Outubro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="lastMonthLabel"
                  htmlFor="lastMonthSpentOutubro"
                >Outubro
                </label>
              </div>
              <div id="containerLastMonth">
                <input
                    id="lastMonthSpentNovembro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Novembro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="lastMonthLabel"
                  htmlFor="lastMonthSpentNovembro"
                >Novembro
                </label>
              </div>
              <div id="containerLastMonth">
                <input
                    id="lastMonthSpentDezembro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Dezembro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="lastMonthLabel"
                  htmlFor="lastMonthSpentDezembro"
                >Dezembro
                </label>
              </div>
            </div>
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

