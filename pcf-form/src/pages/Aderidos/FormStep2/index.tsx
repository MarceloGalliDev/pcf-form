import * as SC from "../../../styles/styles";
import { Theme } from "../../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { push, ref, set, update } from "firebase/database";
import { database } from "../../../services/firebase";
import { useRoom } from "../../../hooks/useRoom";
import { Info } from 'phosphor-react';

type RoomParams = {
  id: string;
};

export const FormStep2 = () => {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState('');
  const [questionTwo, setQuestionTwo] = useState('');
  const [questionThree, setQuestionThree] = useState('');
  const [questionFour, setQuestionFour] = useState('');
  const [questionFive, setQuestionFive] = useState('');
  const [questionSix, setQuestionSix] = useState('');
  const [questionSeven, setQuestionSeven] = useState('');

  const [ question ] = useRoom();
  
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    
    const questionReq = {
      B_Caracteristicas_do_PCF: {
        questao07: questionOne,
        questao08: questionTwo,
        questao09: questionThree,
        questao10: questionFour,
        questao11: questionFive,
        questao12: questionSix,
        questao13: questionSeven,
      }
    };

    if (question.length === 0) {
      const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/aderidos/`);
      const firebaseQuestion = await push(firebaseRoomsQuestion);
      set(firebaseQuestion, questionReq);
    } else {
      const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/aderidos/${question[0].idForm}`);
      await update(firebaseRoomsQuestion, questionReq)
    };

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

  useEffect(() => {
    if (question?.length > 0) {
      setQuestionOne(question[0].B_Caracteristicas_do_PCF.questao07)
      setQuestionTwo(question[0].B_Caracteristicas_do_PCF.questao08)
      setQuestionThree(question[0].B_Caracteristicas_do_PCF.questao09)
      setQuestionFour(question[0].B_Caracteristicas_do_PCF.questao10)
      setQuestionFive(question[0].B_Caracteristicas_do_PCF.questao11)
      setQuestionSix(question[0].B_Caracteristicas_do_PCF.questao12)
      setQuestionSeven(question[0].B_Caracteristicas_do_PCF.questao13)
    }
    console.log(question)
  }, [question])

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Caracter??sticas do PCF</h1>
        <p>Caracter??sticas gerais do PCF</p>
        <hr />
      </SC.Container>

      <form onSubmit={handleSendQuestion}>

        <SC.ButtonTypeDate>
          <div className="formQuestion">
            <label
              htmlFor="dateAcquisition"
            >Data de ades??o do munic??pio ao PCF:
              <div className="informationIcon">
                <input
                  autoComplete="no"
                  name="dateAcquisition"
                  type="date"
                  value={questionOne}
                  onChange={handleDateAcquisitionChange}
                />
                <span
                  data-tooltip="*N??o obrigat??rio"
                >
                  <Info
                    size={20}
                    color="#2d56d2"
                    weight="light"
                  />
                </span>
              </div>
            </label>
          </div>
        </SC.ButtonTypeDate>

        <SC.ButtonTypeDate>
          <div className="formQuestion">
            <label
              htmlFor="dateVisition"
            >Data do in??cio das visitas:
              <div className="informationIcon">
                <input
                  autoComplete="no"
                  name="dateVisition"
                  type="date"
                  value={questionTwo}
                  onChange={handleDateVisitionChange}
                />
                <span
                  data-tooltip="*N??o obrigat??rio"
                >
                  <Info
                    size={20}
                    color="#2d56d2"
                    weight="light"
                  />
                </span>
              </div>
            </label>
          </div>
        </SC.ButtonTypeDate>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              Qual ?? o ??ltimo m??s do ano de 2022 no qual o munic??pio possui dados de gastos com o PCF:
            </p>
            <div id="containerOption">

              <div>
                <div id="containerInputLabelRadioButton">
                  <input
                    required
                    id="lastMonthSpentJaneiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Janeiro"
                    checked={questionThree === "Janeiro"}
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
                    checked={questionThree === "Fevereiro"}
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
                    value="Mar??o"
                    checked={questionThree === "Mar??o"}
                    onChange={handleLastMonthSpentDataChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="lastMonthSpentMarco"
                  >Mar??o
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="lastMonthSpentAbril"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Abril"
                    checked={questionThree === "Abril"}
                    onChange={handleLastMonthSpentDataChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="lastMonthSpentAbril"
                  >Abril
                  </label>
                </div>
              </div>

              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    id="lastMonthSpentMaio"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Maio"
                    checked={questionThree === "Maio"}
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
                    checked={questionThree === "Junho"}
                    onChange={handleLastMonthSpentDataChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="lastMonthSpentJunho"
                  >Junho
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="lastMonthSpentJulho"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Julho"
                    checked={questionThree === "Julho"}
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
                    checked={questionThree === "Agosto"}
                    onChange={handleLastMonthSpentDataChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="lastMonthSpentAgosto"
                  >Agosto
                  </label>
                </div>
              </div>

              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    id="lastMonthSpentNotApplicable"
                    name="lastMonthSpentData"
                    type="radio"
                    value="N??o_se_aplica"
                    checked={questionThree === "N??o_se_aplica"}
                    onChange={handleLastMonthSpentDataChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="lastMonthSpentNotApplicable"
                  >N??o se aplica
                  </label>
                </div>
              </div>

            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              Fase do PCF em seu munic??pio:
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    required
                    id="phaseImplatation"
                    name="phasePCFCity"
                    type="radio"
                    value="Implanta????o_(at??_4_meses)"
                    checked={questionFour === "Implanta????o_(at??_4_meses)"}
                    onChange={handlePhasePCFCityChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="phaseImplatation"
                  >Implanta????o (at?? 4 meses)
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="phaseExecutionI"
                    name="phasePCFCity"
                    type="radio"
                    value="Execu????o_Fase_I_(entre_o_5??_e_7??_m??s_do_in??cio_da_implanta????o"
                    checked={questionFour === "Execu????o_Fase_I_(entre_o_5??_e_7??_m??s_do_in??cio_da_implanta????o"}
                    onChange={handlePhasePCFCityChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="phaseExecutionI"
                  >Execu????o Fase I (entre o 5?? e o 7?? m??s do in??cio da implanta????o)
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="phaseExecutionII"
                    name="phasePCFCity"
                    type="radio"
                    value="Execu????o_Fase_II_(a_partir_do_8??_m??s_da_implanta????o"
                    checked={questionFour === "Execu????o_Fase_II_(a_partir_do_8??_m??s_da_implanta????o"}
                    onChange={handlePhasePCFCityChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="phaseExecutionII"
                  >Execu????o Fase II (a partir do 8?? m??s da implanta????o)
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="phaseExecutionNotApplicable"
                    name="phasePCFCity"
                    type="radio"
                    value="N??o_se_Aplica"
                    checked={questionFour === "N??o_se_Aplica"}
                    onChange={handlePhasePCFCityChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="phaseExecutionNotApplicable"
                  >N??o se Aplica
                  </label>
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              O munic??pio ampliou suas metas (de atendimento de fam??lias) no Programa?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    required
                    id="expansionGoalsYes"
                    name="expansionGoals"
                    type="radio"
                    value="Sim"
                    checked={questionFive === "Sim"}
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
                    value="N??o"
                    checked={questionFive === "N??o"}
                    onChange={handleExpansionGoalsChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="expansionGoalsNo"
                  >N??o
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="expansionGoalsNotApplicable"
                    name="expansionGoals"
                    type="radio"
                    value="N??o_se_aplica"
                    checked={questionFive === "N??o_se_aplica"}
                    onChange={handleExpansionGoalsChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="expansionGoalsNotApplicable"
                  >N??o se aplica
                  </label>
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              Seu munic??pio tem Centro de Refer??ncia de Assist??ncia Social (CRAS)?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    required
                    id="referenceCenterYes"
                    name="referenceCenter"
                    type="radio"
                    value="Sim"
                    checked={questionSix === "Sim"}
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
                    value="N??o"
                    checked={questionSix === "N??o"}
                    onChange={handleReferenceCenterChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="referenceCenterNo"
                  >N??o
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="referenceCenterNotApplicable"
                    name="referenceCenter"
                    type="radio"
                    value="N??o_se_aplica"
                    checked={questionSix === "N??o_se_aplica"}
                    onChange={handleReferenceCenterChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="referenceCenterNotApplicable"
                  >N??o se aplica
                  </label>
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              O munic??pio possui Plano de A????o do PCF?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    required
                    id="actionPlanYes"
                    name="actionPlan"
                    type="radio"
                    value="Sim"
                    checked={questionSeven === "Sim"}
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
                    value="N??o"
                    checked={questionSeven === "N??o"}
                    onChange={handleActionPlanChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="actionPlanNo"
                  >N??o
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="actionPlanNotApplicable"
                    name="actionPlan"
                    type="radio"
                    value="N??o_se_aplica"
                    checked={questionSeven === "N??o_se_aplica"}
                    onChange={handleActionPlanChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="actionPlanNotApplicable"
                  >N??o se aplica
                  </label>
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.AllButtons>
          <Link className="buttonAll" to={`/${roomId}/formstep1`}>Voltar</Link>
          <button
            className="buttonAll"
            type="submit"
          >Pr??ximo
          </button>
        </SC.AllButtons>
      </form>
    </Theme>
  );
};

  //verificando se foi respondida, n??o passa para pr??xima etapa
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


