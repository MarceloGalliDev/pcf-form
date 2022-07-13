import * as SC from "../../../styles/styles";
import { ThemeB1 } from "../../../components/ThemeB1";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, useEffect, useState, FormEvent, useCallback } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../../services/firebase";

type RoomParams = {
  id: string;
};

interface ReasonForGivingUpChange {
  a_recursoFinanceiroInsuficiente: boolean;
  b_naoHaInteresseMunicipio: boolean;
  c_possuiPrograma: boolean;
  d_criouPrograma: boolean;
};

export const FormStepB2 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const [questionOne, setQuestionOne] = useState<ReasonForGivingUpChange>({
    a_recursoFinanceiroInsuficiente: false,
    b_naoHaInteresseMunicipio: false,
    c_possuiPrograma: false,
    d_criouPrograma: false,
  });
  const [questionTwo, setQuestionTwo] = useState('');
  const [questionThree, setQuestionThree] = useState('');
  const [questionFour, setQuestionFour] = useState('');
  const [questionFive, setQuestionFive] = useState('');
  const [questionSix, setQuestionSix] = useState('');
  const [questionSeven, setQuestionSeven] = useState('');
  const [questionEight, setQuestionEight] = useState('');
  const [questionNine, setQuestionNine] = useState('');
  const [questionTen, setQuestionTen] = useState('');
  const [questionEleven, setQuestionEleven] = useState('');
  const [questionTwelve, setQuestionTwelve] = useState('');
  const [isCheckQ02, setIsCheckQ02] = useState('');
  const [isCheckQ05, setIsCheckQ05] = useState('');


  async function handleDropoutMunicipalities(event: FormEvent) {
    event.preventDefault();

    const question = {
      B_Desistentes: {
        questao07:
        {
          questionTwo,
          questionThree,
          questionFour,
        },
        questao08:
        {
          questionOne,
          questionSeven,
          questionEight,
          questionNine,
          questionTen,
          questionEleven,
          questionTwelve,
        }, 
        questao09:
        { 
          questionFive,
          questionSix,
        },
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/desistentes/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

    if (confirm('Tem certeza que deseja finalizar o questionário?')) {
      navigate(`/`)
    }
  };

  const handleHaveTargetAudiencePCFChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleReasonGivingUpNameChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionSeven(event.target.value);
  };

  const handleReasonGivingUpBeneficiaryChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionEight(event.target.value);
  };

  const handleReasonGivingUpValueChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionNine(event.target.value);
  };

  const handleReasonGivingUpNameCreatedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionTen(event.target.value);
  };

  const handleReasonGivingUpBeneficiaryCreatedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionEleven(event.target.value);
  };

  const handleReasonGivingUpValueCreatedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionTwelve(event.target.value);
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

        <SC.ButtonTypeRadioText>
          <div className="formQuestion">
            <p>O seu município possui algum programa ou serviço do mesmo público-alvo: </p>
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
                    className="containerTextLabel"
                    htmlFor="haveTargetAudiencePCFBeneficiary"
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

        <SC.ButtonTypeCheckboxV1>
          <div className="formQuestion">
            <div className="formQuestion">
              <p className="textFormRadioButton">
              Qual foi o motivo que levou seu município a deixar o Programa Criança Feliz?
              </p>
              <div id="containerOption">
                <div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="recursoFinanceiroInsuficiente"
                      name="a_recursoFinanceiroInsuficiente"
                      type="checkbox"
                      checked={questionOne.a_recursoFinanceiroInsuficiente}
                      onChange={(event) => setQuestionOne({
                        ...questionOne,
                        a_recursoFinanceiroInsuficiente: !!event.currentTarget?.checked
                      })}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="recursoFinanceiroInsuficiente"
                    >A transferência de recurso financeiro é insuficiente para o município manter o programa
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="naoHaInteresseMunicipio"
                      name="b_naoHaInteresseMunicipio"
                      type="checkbox"
                      checked={questionOne.b_naoHaInteresseMunicipio}
                      onChange={(event) => setQuestionOne({
                        ...questionOne,
                        b_naoHaInteresseMunicipio: !!event.currentTarget?.checked
                      })}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="naoHaInteresseMunicipio"
                    >Não há mais interesse do município em manter o programa
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="possuiPrograma"
                      name="c_possuiPrograma"
                      type="checkbox"
                      checked={questionOne.c_possuiPrograma}
                      onChange={(event) => setQuestionOne({
                        ...questionOne,
                        c_possuiPrograma: !!event.currentTarget?.checked
                      })}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="possuiPrograma"
                    >O município possui um programa semelhante ao Criança Feliz
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="criouPrograma"
                      name="d_criouPrograma"
                      type="checkbox"
                      checked={questionOne.d_criouPrograma}
                      onChange={(event) => setQuestionOne({
                        ...questionOne,
                        d_criouPrograma: !!event.currentTarget?.checked
                      })}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="criouPrograma"
                    >O município criou um programa semelhante ao Criança Feliz
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {questionOne.c_possuiPrograma === true && (
              <>
                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="handleReasonGivingUpNameChange"
                  >Qual o nome desse programa que o município <u>possui</u>? 
                    <input
                      id="handleReasonGivingUpNameChange"
                      name="handleReasonGivingUpNameChange"
                      type="text"
                      value={questionSeven}
                      onChange={handleReasonGivingUpNameChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>
                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="handleReasonGivingUpBeneficiaryChange"
                  >Quantos beneficiários são atendidos por este programa que o município <u>possui</u>?
                    <input
                      id="handleReasonGivingUpBeneficiaryChange"
                      name="handleReasonGivingUpBeneficiaryChange"
                      type="text"
                      value={questionEight}
                      onChange={handleReasonGivingUpBeneficiaryChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>
                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="handleReasonGivingUpValueChange"
                  >Qual o valor mensal gasto com esse programa que o município <u>possui</u>?
                    <input
                      id="handleReasonGivingUpValueChange"
                      name="handleReasonGivingUpValueChange"
                      type="text"
                      value={questionNine}
                      onChange={handleReasonGivingUpValueChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>
              </>
            )}
             {questionOne.d_criouPrograma === true && (
              <>
                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="handleReasonGivingUpNameCreatedChange"
                  >Qual o nome desse programa que o município <u>criou</u>? 
                    <input
                      id="handleReasonGivingUpNameCreatedChange"
                      name="handleReasonGivingUpNameCreatedChange"
                      type="text"
                      value={questionTen}
                      onChange={handleReasonGivingUpNameCreatedChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>

                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="handleReasonGivingUpBeneficiaryCreatedChange"
                  >Quantos beneficiários são atendidos por este programa que o município <u>criou</u>?
                    <input
                      id="handleReasonGivingUpBeneficiaryCreatedChange"
                      name="handleReasonGivingUpBeneficiaryCreatedChange"
                      type="text"
                      value={questionEleven}
                      onChange={handleReasonGivingUpBeneficiaryCreatedChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>

                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="handleReasonGivingUpValueCreatedChange"
                  >
                    Qual o valor mensal gasto com esse programa que o município <u>criou</u>?
                    <input
                      id="handleReasonGivingUpValueCreatedChange"
                      name="handleReasonGivingUpValueCreatedChange"
                      type="text"
                      value={questionTwelve}
                      onChange={handleReasonGivingUpValueCreatedChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>
              </>
            )}
          </div>
        </SC.ButtonTypeCheckboxV1>

        <SC.ButtonTypeRadioText>
          <div className="formQuestion">
            <p>
              Existe algum outro motivo que explique o fato de o município ter deixado o Programa Criança Feliz?
            </p>
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