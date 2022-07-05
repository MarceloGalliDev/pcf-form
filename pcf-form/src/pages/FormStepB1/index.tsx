import * as SC from "../../styles/styles";
import { ThemeB1 } from "../../components/ThemeB1";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../context/FormContext";
import { ChangeEvent, useEffect, useState, useCallback, FormEvent } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../services/firebase";

type RoomParams = {
  id: string;
};

export const FormStepB1 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const [questionOne, setQuestionOne] = useState('')
  const [questionTwo, setQuestionTwo] = useState('')
  const [questionThree, setQuestionThree] = useState('')
  const [questionFour, setQuestionFour] = useState('')


  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    const question = {
      A_Elegiveis_ao_PCF: {
        questao01: questionOne,
        questao02: questionTwo,
        questao03: questionThree,
        questao04: questionFour,

      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

   navigate(`/`)
  };

  const handleProgramPCFChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
  };

  const handleTargetAudiencePCFChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };

  const handleTargetAudiencePCFTextChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionThree(event.target.value);
  };

  const handleAdherenceReasonChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionFour(event.target.value);
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 1
    });
  }, []);

  return (
    <ThemeB1>
      <SC.Container>
        <p>Etapa {state.currentStep}</p>
        <h1>Municípios Desistentes</h1>
        <p>Municípios que deixaram de participar do PCF</p>
        <hr />
      </SC.Container>

      <form onSubmit={handleSendQuestion}>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
            Qual foi o motivo que levou seu município a deixar o Programa Criança Feliz?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    id="programPCFYes"
                    name="programPCF"
                    type="radio"
                    value="Sim"
                    onChange={handleProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="teamCoordinatorYes"
                  >A transferência de recurso financeiro é insuficiente para o município manter o programa 
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="programPCFNo"
                    name="programPCF"
                    type="radio"
                    value="Não"
                    onChange={handleProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="programPCFNo"
                  >Não há mais interesse do município em manter o programa
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="programPCFNo"
                    name="programPCF"
                    type="radio"
                    value="Não"
                    onChange={handleProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="programPCFNo"
                  >O município possui um programa semelhante ao Criança Feliz
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="programPCFNo"
                    name="programPCF"
                    type="radio"
                    value="Não"
                    onChange={handleProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="programPCFNo"
                  >O município criou um programa semelhante ao Criança Feliz
                  </label>
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadioText>
          <div className="formQuestion">
            <p>Existe algum outro motivo que explique o fato de o município ter deixado o Programa Criança Feliz?</p>

            <div className="formQuestion">
              <div id="containerOption">
                <div id="containerOptionSixOption">
                  
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentJaneiro"
                      name="lastMonthSpentData"
                      type="radio"
                      value="sim"
                      onChange={handleTargetAudiencePCFChange}
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
                      onChange={handleTargetAudiencePCFChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >Não
                    </label>
                  </div>

                </div>
              </div>
            </div>

            <div className="containerBgLabel">
              <label className="containerTextLabel" htmlFor="name">
                Se sim, qual?
                <input
                  name="name"
                  type="text"
                  autoFocus
                  value={state.name}
                  onChange={handleTargetAudiencePCFTextChange}
                  placeholder="Sua resposta"
                />
              </label>
            </div>

          </div>
        </SC.ButtonTypeRadioText>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
             O seu município conhece o Programa Criança Feliz?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    id="programPCFYes"
                    name="programPCF"
                    type="radio"
                    value="Sim"
                    onChange={handleProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="teamCoordinatorYes"
                  >Sim
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="programPCFNo"
                    name="programPCF"
                    type="radio"
                    value="Não"
                    onChange={handleProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="programPCFNo"
                  >Não
                  </label>
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>


        <SC.ButtonTypeRadioText>
          <div className="formQuestion">
            <p>O seu município possui algum programa ou serviço com o mesmo público-alvo do Programa Criança Feliz?</p>

            <div className="formQuestion">
              <div id="containerOption">
                <div id="containerOptionSixOption">
                  
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentJaneiro"
                      name="lastMonthSpentData"
                      type="radio"
                      value="sim"
                      onChange={handleTargetAudiencePCFChange}
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
                      onChange={handleTargetAudiencePCFChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >Não
                    </label>
                  </div>

                </div>
              </div>
            </div>

            <div className="containerBgLabel">
              <label className="containerTextLabel" htmlFor="name">
                Se sim, quantos beneficiários são atendidos por este programa?
                <input
                  name="name"
                  type="text"
                  autoFocus
                  value={state.name}
                  onChange={handleTargetAudiencePCFTextChange}
                  placeholder="Sua resposta"
                />
              </label>
            </div>
              
            <div className="containerBgLabel">
              <label className="containerTextLabel" htmlFor="name">
                Se sim, qual o valor mensal gasto com esse Programa? 
                <input
                  name="name"
                  type="text"
                  autoFocus
                  value={state.name}
                  onChange={handleTargetAudiencePCFTextChange}
                  placeholder="Sua resposta"
                />
              </label>
            </div>

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