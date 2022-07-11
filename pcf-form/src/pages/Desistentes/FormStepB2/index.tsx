import * as SC from "../../../styles/styles";
import { ThemeB1 } from "../../../components/ThemeB1";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../../services/firebase";

type RoomParams = {
  id: string;
};

export const FormStepB2 = () => {
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

  const [isCheckQ02, setIsCheckQ02] = useState('');
  const [isCheckQ05, setIsCheckQ05] = useState('');


  async function handleDropoutMunicipalities(event: FormEvent) {
    event.preventDefault();

    const question = {
      B_Desistentes: {
        questao07: questionOne,
        questao08: {
          questionTwo,
          questionThree,
          questionFour,
        },
        questao09: { 
          questionFive,
          questionSix,
        },
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/desistentes/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

   navigate(`/`)
  };

  const handleReasonForGivingUpChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
  };

  const handleHaveTargetAudiencePCFChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };

  const handleHaveTargetAudiencePCFBeneficiaryChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionThree(event.target.value);
  };

  const handleHaveTargetAudiencePCFValueChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionFour(event.target.value);
  };

  const handleReasonForDroppingOutChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionFive(event.target.value);
  };

  const handleReasonForDroppingOutWhichChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionSix(event.target.value);
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 2
    });
  }, []);

  return (
    <ThemeB1>
      <SC.Container>
        <p>Etapa {state.currentStep}/2</p>
        <h1>Municípios Desistentes</h1>
        <p>Municípios que deixaram de participar do PCF</p>
        <hr />
      </SC.Container>

      <form onSubmit={handleDropoutMunicipalities}>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
            Qual foi o motivo que levou seu município a deixar o Programa Criança Feliz?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    id="reasonForGivingUpInsufficientResources"
                    name="reasonForGivingUp"
                    type="radio"
                    value="recurso_financeiro_insuficiente"
                    onChange={handleReasonForGivingUpChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="reasonForGivingUpInsufficientResources"
                  >A transferência de recurso financeiro é insuficiente para o município manter o programa 
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="reasonForGivingUpNotInterest"
                    name="reasonForGivingUp"
                    type="radio"
                    value="nao_houve_interesse_do_municipio"
                    onChange={handleReasonForGivingUpChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="reasonForGivingUpNotInterest"
                  >Não há mais interesse do município em manter o programa
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="reasonForGivingUpAlreadyHave"
                    name="reasonForGivingUp"
                    type="radio"
                    value="ja_possui_programa_semelhante"
                    onChange={handleReasonForGivingUpChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="reasonForGivingUpAlreadyHave"
                  >O município possui um programa semelhante ao Criança Feliz
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="reasonForGivingUpCreatedProgramming"
                    name="reasonForGivingUp"
                    type="radio"
                    value="criou_programa_semelhante"
                    onChange={handleReasonForGivingUpChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="reasonForGivingUpCreatedProgramming"
                  >O município criou um programa semelhante ao Criança Feliz
                  </label>
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadioText>
          <div className="formQuestion">
            <p>Caso o seu município possua algum programa ou serviço do mesmo público-alvo: </p>
            <div className="formQuestion">
              <div id="containerOption">
                <div id="containerOptionSixOption">
                  
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="haveTargetAudiencePCFYes"
                      name="haveTargetAudiencePCF"
                      type="radio"
                      onClick={() => setIsCheckQ02("sim_Q02")}
                      onChange={handleHaveTargetAudiencePCFChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="haveTargetAudiencePCFYes"
                    >Sim
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="haveTargetAudiencePCFNo"
                      name="haveTargetAudiencePCF"
                      type="radio"
                      onClick={() => setIsCheckQ02("nao_Q02")}
                      onChange={handleHaveTargetAudiencePCFChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="haveTargetAudiencePCFNo"
                    >Não
                    </label>
                  </div>

                </div>
              </div>
            </div>

            {isCheckQ02 === "sim_Q02" && (
              <>
                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="haveTargetAudiencePCFBeneficiary"
                  >Se sim, quantos beneficiários são atendidos por este programa?
                    <input
                      id="haveTargetAudiencePCFBeneficiary"
                      name="haveTargetAudiencePCFBeneficiary"
                      type="text"
                      value={questionThree}
                      onChange={handleHaveTargetAudiencePCFBeneficiaryChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>
                  
                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel"
                    htmlFor="haveTargetAudiencePCFValue"
                  >Se sim, qual o valor mensal gasto com esse Programa? 
                    <input
                      id="haveTargetAudiencePCFValue"
                      name="haveTargetAudiencePCFValue"
                      type="text"
                      value={questionFour}
                      onChange={handleHaveTargetAudiencePCFValueChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>
              </>
            )}

          </div>
        </SC.ButtonTypeRadioText>

        <SC.ButtonTypeRadioText>
          <div className="formQuestion">
            <p>Existe algum outro motivo que explique o fato de o município ter deixado o Programa Criança Feliz?</p>

            <div className="formQuestion">
              <div id="containerOption">
                <div id="containerOptionSixOption">
                  
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="reasonForDroppingOutYes"
                      name="reasonForDroppingOut"
                      type="radio"
                      value={"sim_Q05"}
                      onClick={() => setIsCheckQ05("sim_Q05")}
                      onChange={handleReasonForDroppingOutChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="reasonForDroppingOutYes"
                    >Sim
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="reasonForDroppingOutNo"
                      name="reasonForDroppingOut"
                      type="radio"
                      value={"nao_Q05"}
                      onClick={() => setIsCheckQ05("nao_Q05")}
                      onChange={handleReasonForDroppingOutChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="reasonForDroppingOutNo"
                    >Não
                    </label>
                  </div>

                </div>
              </div>
            </div>
            {isCheckQ05 === "sim_Q05" && (
              <>
                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="reasonForDroppingOutWhich"
                  >Se sim, qual?
                    <input
                      id="reasonForDroppingOutWhich"
                      name="reasonForDroppingOutWhich"
                      type="text"
                      value={questionSix}
                      onChange={handleReasonForDroppingOutWhichChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>
              </>
            )}

          </div>
        </SC.ButtonTypeRadioText>

        <SC.AllButtons>
          <Link className="buttonAll" to="/">Voltar</Link>
          <button
            className="buttonAll"
            type="submit"
            >Finalizar
          </button>
        </SC.AllButtons>
      </form>
    </ThemeB1>
  );
};