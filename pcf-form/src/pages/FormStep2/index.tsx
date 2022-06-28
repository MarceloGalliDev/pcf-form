import * as SC from "../../styles/styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FormStep2Input } from "../../types/FormStep2"


const schema = yup.object({
  dateAcquisition: yup.string().required(),
  dateVisition: yup.string().required(),
  lastMonthSpentData: yup.string().required(),
  phasePCFCity: yup.string().required(),
  expansionGoals: yup.string().required(),
  referenceCenter: yup.string().required(),
  actionPlan: yup.string().required(),
}).required();

export const FormStep2 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const { register, handleSubmit, formState: { errors } } = useForm<FormStep2Input>({ resolver: yupResolver(schema) })
  const onSubmit = handleSubmit(data => navigate('/formstep3'))
  


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

  const handlePhasePCFCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setPhasePCFCity,
      payload: event.target.value
    });
  };

  const handleExpansionGoalsChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setExpansionGoals,
      payload: event.target.value
    });
  };

  const handleReferenceCenterChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setReferenceCenter,
      payload: event.target.value
    });
  };

  const handleActionPlanChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setActionPlan,
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
                  {...register("lastMonthSpentData")}
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
                  {...register("lastMonthSpentData")}
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
                  {...register("lastMonthSpentData")}
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
                  {...register("lastMonthSpentData")}
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
                  {...register("lastMonthSpentData")}
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
                  {...register("lastMonthSpentData")}
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
                  {...register("lastMonthSpentData")}
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
                  {...register("lastMonthSpentData")}
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
                  {...register("lastMonthSpentData")}
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
                  {...register("lastMonthSpentData")}
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
                  {...register("lastMonthSpentData")}
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
                  {...register("lastMonthSpentData")}
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
            <span>{errors.phasePCFCity && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                  {...register("phasePCFCity")}
                  id="phaseImplatation"
                  name="phasePCFCity"
                  type="radio"
                  value="Implantação (até 4 meses)"
                  onChange={handlePhasePCFCityChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="phaseImplatation"
                >Implantação (até 4 meses)
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    {...register("phasePCFCity")}
                    id="phaseExecutionI"
                    name="phasePCFCity"
                    type="radio"
                    value="Execução Fase I (entre o 5º e o 7º mês do início da implantação)"
                    onChange={handlePhasePCFCityChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="phaseExecutionI"
                >Execução Fase I (entre o 5º e o 7º mês do início da implantação)
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                    {...register("phasePCFCity")}
                    id="phaseExecutionII"
                    name="phasePCFCity"
                    type="radio"
                    value="Execução Fase II (a partir do 8º mês da implantação)"
                    onChange={handlePhasePCFCityChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="phaseExecutionII"
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
            <span>{errors.expansionGoals && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                  {...register("expansionGoals")}
                  id="expansionGoalsYes"
                  name="expansionGoals"
                  type="radio"
                  value="sim"
                  onChange={handleExpansionGoalsChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="expansionGoalsYes"
                >Sim
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("expansionGoals")}
                  id="expansionGoalsNo"
                  name="expansionGoals"
                  type="radio"
                  value="Não"
                  onChange={handleExpansionGoalsChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="expansionGoalsNo"
                >Não
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("expansionGoals")}
                  id="expansionGoalsDontKnow"
                  name="expansionGoals"
                  type="radio"
                  value="Não sei"
                  onChange={handleExpansionGoalsChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="expansionGoalsDontKnow"
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
            <span>{errors.referenceCenter && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                  {...register("referenceCenter")}
                  id="referenceCenterYes"
                  name="referenceCenter"
                  type="radio"
                  value="sim"
                  onChange={handleReferenceCenterChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="referenceCenterYes"
                >Sim
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("referenceCenter")}
                  id="referenceCenterNo"
                  name="referenceCenter"
                  type="radio"
                  value="Não"
                  onChange={handleReferenceCenterChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="referenceCenterNo"
                >Não
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("referenceCenter")}
                  id="referenceCenterDontKnow"
                  name="referenceCenter"
                  type="radio"
                  value="Não sei"
                  onChange={handleReferenceCenterChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="referenceCenterDontKnow"
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
            <span>{errors.actionPlan && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                  {...register("actionPlan")}
                  id="actionPlanYes"
                  name="actionPlan"
                  type="radio"
                  value="sim"
                  onChange={handleActionPlanChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="actionPlanYes"
                >Sim
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("actionPlan")}
                  id="actionPlanNo"
                  name="actionPlan"
                  type="radio"
                  value="Não"
                  onChange={handleActionPlanChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="actionPlanNo"
                >Não
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("actionPlan")}
                  id="actionPlanDontKnow"
                  name="actionPlan"
                  type="radio"
                  value="Não sei"
                  onChange={handleActionPlanChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="actionPlanDontKnow"
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

