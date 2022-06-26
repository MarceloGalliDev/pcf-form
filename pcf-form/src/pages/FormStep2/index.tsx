import * as SC from "../../styles/styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
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
      payload: 2
    });
  }, []);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Características do PCF</h1>
        <p>Características gerais do PCF</p>
        <hr/>
      </SC.Container>

      <SC.ButtonTypeDate>
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
      </SC.ButtonTypeDate>

      <SC.ButtonTypeDate>
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
      </SC.ButtonTypeDate>


      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Qual é o último mês do ano de 2022 do qual o município possui dados dos gastos com o PCF:
            <span>{errors.lastMonthSpentData && " ⚠ *Campo obrigatório "}</span>
          </p>
          <div id="containerOption">
            <div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentJaneiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="janeiro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentJaneiro"
                >Janeiro
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentFevereiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Fevereiro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentFevereiro"
                >Fevereiro
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentMarco"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Março"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentMarco"
                >Março
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentAbril"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Abril"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentAbril"
                >Abril
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentMaio"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Maio"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentMaio"
                >Maio
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentJunho"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Junho"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentJunho"
                >Junho
                </label>
              </div>
            </div>

            <div id="containerOptionSixOption">

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentJulho"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Julho"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentJulho"
                >Julho
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentAgosto"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Agosto"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentAgosto"
                >Agosto
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentSetembro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Setembro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentSetembro"
                >Setembro
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentOutubro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Outubro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentOutubro"
                >Outubro
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentNovembro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Novembro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentNovembro"
                >Novembro
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentDezembro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Dezembro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentDezembro"
                >Dezembro
                </label>
              </div>

            </div>
          </div>
        </div>
      </SC.ButtonTypeRadio>

      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Fase do PCF em seu município:
            <span>{errors.lastMonthSpentData && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentJaneiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="janeiro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentJaneiro"
                >Implantação (até 4 meses)
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentFevereiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Fevereiro"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentFevereiro"
                >Execução Fase I (entre o 5º e o 7º mês do início da implantação)
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentMarco"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Março"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentMarco"
                >Execução Fase II (a partir do 8º mês da implantação)
                </label>
              </div>

            </div>
          </div>
        </div>
      </SC.ButtonTypeRadio>

      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            O município ampliou suas metas (de atendimento de famílias) no Programa?
            <span>{errors.lastMonthSpentData && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentJaneiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="sim"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentJaneiro"
                >Sim
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentFevereiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Não"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentFevereiro"
                >Não
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentMarco"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Não sei"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentMarco"
                >Não sei
                </label>
              </div>

            </div>
          </div>
        </div>
      </SC.ButtonTypeRadio>

      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Seu município tem Centro de Referência de Assistência Social (CRAS)?
            <span>{errors.lastMonthSpentData && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentJaneiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="sim"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentJaneiro"
                >Sim
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentFevereiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Não"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentFevereiro"
                >Não
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentMarco"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Não sei"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentMarco"
                >Não sei
                </label>
              </div>

            </div>
          </div>
        </div>
      </SC.ButtonTypeRadio>

      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            O município possui Plano de Ação do PCF?
            <span>{errors.lastMonthSpentData && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentJaneiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="sim"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentJaneiro"
                >Sim
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentFevereiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Não"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentFevereiro"
                >Não
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    id="lastMonthSpentMarco"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Não sei"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentMarco"
                >Não sei
                </label>
              </div>

            </div>
          </div>
        </div>
      </SC.ButtonTypeRadio>

      <SC.AllButtons>
        <Link className="buttonBack" to="/">Voltar</Link>
        <button
          className="buttonNext"
          onClick={onSubmit}
        >Próximo
        </button>
      </SC.AllButtons>
    </Theme>
  )
}

