import * as SC from "../../styles/styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { push, ref, set } from "firebase/database"
import { database } from "../../services/firebase"

type RoomParams = {
  id: string;
};

export const FormStep2 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState('')
  const [questionTwo, setQuestionTwo] = useState('')
  const [questionThree, setQuestionThree] = useState('')
  const [questionFour, setQuestionFour] = useState('')
  const [questionFive, setQuestionFive] = useState('')
  const [questionSix, setQuestionSix] = useState('')
  const [questionSeven, setQuestionSeven] = useState('')


  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    const question = {
      pagina2: {
        questao1: questionOne,
        questao2: questionTwo,
        questao3: questionThree,
        questao4: questionFour,
        questao5: questionFive,
        questao6: questionSix,
        questao7: questionSeven,
      }
    }

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

    navigate(`/${roomId}/formstep3`)
  };

  const handleDateAcquisitionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
  };

  const handleDateVisitionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };

  const handleLastMonthSpentDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionThree(event.target.value);
  };

  const handlePhasePCFCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionFour(event.target.value);
  };

  const handleExpansionGoalsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionFive(event.target.value);
  };

  const handleReferenceCenterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionSix(event.target.value);
  };

  const handleActionPlanChange = (event:
    ChangeEvent<HTMLInputElement>) => {
    setQuestionSeven(event.target.value)
  };

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
        <hr />
      </SC.Container>

      <form onSubmit={handleSendQuestion}>

        <SC.ButtonTypeDate>
          <div className="formQuestion">
            <label htmlFor="dateAcquisition">
              Data de adesão do município ao PCF:
              <input
                name="dateAcquisition"
                type="date"
                value={questionOne}
                onChange={handleDateAcquisitionChange}
              />
            </label>
          </div>
        </SC.ButtonTypeDate>

        <SC.ButtonTypeDate>
          <div className="formQuestion">
            <label htmlFor="dateVisition">
              Data do início das visitas:
              <input
                name="dateVisition"
                type="date"
                value={questionTwo}
                onChange={handleDateVisitionChange}
              />
            </label>
          </div>
        </SC.ButtonTypeDate>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              Qual é o último mês do ano de 2022 do qual o município possui dados dos gastos com o PCF:
            </p>
            <div id="containerOption">
              <div>
                <div id="containerInputLabelRadioButton">
                  <input
                    id="lastMonthSpentJaneiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Janeiro"
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
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">
        
                <div id="containerInputLabelRadioButton">
                  <input
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
                    id="phaseExecutionI"
                    name="phasePCFCity"
                    type="radio"
                    value={"Execução Fase I (entre o 5º e o 7º mês do início da implantação"}
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
                    id="phaseExecutionII"
                    name="phasePCFCity"
                    type="radio"
                    value={"Execução Fase II (a partir do 8º mês da implantação"}
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
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">
        
                <div id="containerInputLabelRadioButton">
                  <input
                    id="expansionGoalsYes"
                    name="expansionGoals"
                    type="radio"
                    value={"Sim"}
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
                    id="expansionGoalsNo"
                    name="expansionGoals"
                    type="radio"
                    value={"Não"}
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
                    id="expansionGoalsDontKnow"
                    name="expansionGoals"
                    type="radio"
                    value={"Não sei"}
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
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">
        
                <div id="containerInputLabelRadioButton">
                  <input
                    id="referenceCenterYes"
                    name="referenceCenter"
                    type="radio"
                    value={"Sim"}
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
                    id="referenceCenterNo"
                    name="referenceCenter"
                    type="radio"
                    value={"Não"}
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
                    id="referenceCenterDontKnow"
                    name="referenceCenter"
                    type="radio"
                    value={"Não sei"}
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
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">
        
                <div id="containerInputLabelRadioButton">
                  <input
                    id="actionPlanYes"
                    name="actionPlan"
                    type="radio"
                    value={"Sim"}
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
                    id="actionPlanNo"
                    name="actionPlan"
                    type="radio"
                    value={"Não"}
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
                    id="actionPlanDontKnow"
                    name="actionPlan"
                    type="radio"
                    value={"Não sei"}
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
          <Link className="buttonAll" to="/:id/formstep1">Voltar</Link>
          <Link className="buttonAll" to="/:id/formstep3">Próximo</Link>
          {/* <button
            className="buttonAll"
            type="submit"
          >Próximo
          </button> */}
        </SC.AllButtons>
      </form>
    </Theme>
  );
};

  // const { register, handleSubmit, formState: { errors } } = useForm<FormStep2Input>({ resolver: yupResolver(schema) })
  // const onSubmit = handleSubmit(data => navigate('/formstep3'))

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

  // const schema = yup.object({
  //   dateAcquisition: yup.string().required(),
  //   dateVisition: yup.string().required(),
  //   lastMonthSpentData: yup.string().required(),
  //   phasePCFCity: yup.string().required(),
  //   expansionGoals: yup.string().required(),
  //   referenceCenter: yup.string().required(),
  //   actionPlan: yup.string().required(),
  // }).required();