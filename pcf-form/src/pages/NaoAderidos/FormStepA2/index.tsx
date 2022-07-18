import * as SC from "../../../styles/styles";
import { ThemeA1 } from "../../../components/ThemeA1";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import { push, ref, set, update } from "firebase/database";
import { database } from "../../../services/firebase";
import { CheckCircle } from 'phosphor-react';
import { Alert } from 'reactstrap';
import { useRoomA } from "../../../hooks/useRoomA";
import { Button } from "../../../components/ButtonFinished";

type RoomParams = {
  id: string;
};

interface ReasonForGivingUpChange {
  a_recursoFinanceiroInsuficiente: boolean;
  b_naoHaInteresseMunicipio: boolean;
  c_possuiPrograma: boolean;
  d_naoConhecePrograma: boolean;
};


export const FormStepA2 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const [aQuestionTwo, setAQuestionTwo] = useState('');
  const [bQuestionThree, setBQuestionThree] = useState('');
  const [cQuestionFour, setCQuestionFour] = useState('');
  const [aQuestionFive, setAQuestionFive] = useState<ReasonForGivingUpChange>({
    a_recursoFinanceiroInsuficiente: false,
    b_naoHaInteresseMunicipio: false,
    c_possuiPrograma: false,
    d_naoConhecePrograma: false,
  });
  const [aQuestionSix, setAQuestionSix] = useState('');
  const [bQuestionSeven, setBQuestionSeven] = useState('');
  const [bQuestionEight, setBQuestionEight] = useState('');
  const [cQuestionNine, setCQuestionNine] = useState('');
  const [dQuestionTen, setDQuestionTen] = useState('');
  const [isCheckA2Q08, setIsCheckA2Q08] = useState('');
  const [isCheckA2Q13, setIsCheckA2Q13] = useState('');
  const [isAlert, setIsAlert] = useState(false);

  const [question] = useRoomA();

  async function handleEligibleMunicipalities(event: FormEvent) {
    event.preventDefault();

    const questionReq = {
      B_Elegiveis_ao_PCF: {
        questao07:
        {
          aQuestionTwo,
          bQuestionThree,
          cQuestionFour,
        },
        questao08:
        {
          aQuestionFive,
          bQuestionEight,
          cQuestionNine,
          dQuestionTen,
        },
        questao09:
        {
          aQuestionSix,
          bQuestionSeven,
        },
      }
    };

    if (question.length === 0) {
      const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/nao_aderidos/`);
      const firebaseQuestion = await push(firebaseRoomsQuestion);
      set(firebaseQuestion, questionReq);
    } else {
      const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/nao_aderidos/${question[0].idForm}`);
      await update(firebaseRoomsQuestion, questionReq)
    };

    if (confirm('Tem certeza que deseja finalizar o questionário?')) {
      await update(ref(database, `rooms/${roomId}/nao_aderidos/`), { endedAt: new Date() })
      setIsAlert(true);
      setTimeout(() => {
        navigate('/')
      }, 2000)
    };
  };

  const handleTargetAudiencePCFChange =(event:ChangeEvent<HTMLInputElement>) => {
    setAQuestionTwo(event.target.value);
  };

  const handleTargetAudiencePCFTextBeneficiaryChange =(event:ChangeEvent<HTMLInputElement>) => {
    setBQuestionThree(event.target.value);
  };

  const handleTargetAudiencePCFTextValueChange =(event:ChangeEvent<HTMLInputElement>) => {
    setCQuestionFour(event.target.value);
  };

  const handleExplainTheReasonChange =(event:ChangeEvent<HTMLInputElement>) => {
    setAQuestionSix(event.target.value);
  };

  const handleExplainTheReasonTextChange =(event:ChangeEvent<HTMLInputElement>) => {
    setBQuestionSeven(event.target.value);
  };

  const handleTargetAudiencePCFTextNameCheckedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setBQuestionEight(event.target.value);
  };

  const handleTargetAudiencePCFTextBeneficiaryCheckedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setCQuestionNine(event.target.value);
  };

  const handleTargetAudiencePCFTextValueCheckedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setDQuestionTen(event.target.value);
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 2
    });
  }, []);

  return (
    <ThemeA1>
      <SC.Container>
        <p>Etapa {state.currentStep}/2</p>
        <h1>Municípios Elegíveis</h1>
        <p>Municípios elegíveis, mas que não aderiram ao programa</p>
        <hr />
      </SC.Container>

      <form onSubmit={handleEligibleMunicipalities}>

        <SC.ButtonTypeRadioText>
          <div className="formQuestion">
            <p>O seu município possui algum Programa ou Serviço com o mesmo público-alvo do Programa Criança Feliz?</p>

            <div className="formQuestion">
              <div id="containerOption">
                <div id="containerOptionSixOption">
                  
                  <div id="containerInputLabelRadioButton">
                    <input
                      required
                      id="targetAudiencePCFYes"
                      name="targetAudiencePCF"
                      type="radio"
                      value={"sim_Q08"}
                      onClick={() => setIsCheckA2Q08("sim_Q08")}
                      onChange={handleTargetAudiencePCFChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="targetAudiencePCFYes"
                    >Sim
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="targetAudiencePCFNo"
                      name="targetAudiencePCF"
                      type="radio"
                      value={"nao_Q08"}
                      onClick={() => setIsCheckA2Q08("nao_Q08")}
                      onChange={handleTargetAudiencePCFChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="targetAudiencePCFNo"
                    >Não
                    </label>
                  </div>

                </div>
              </div>
            </div>
            {isCheckA2Q08 === "sim_Q08" && (
              <>
                <div className="containerBgLabel">
                  <label className="containerTextLabel" htmlFor="targetAudiencePCFTextBeneficiary">
                    Quantos beneficiários são atendidos por este programa?
                    <input
                      required
                      id="targetAudiencePCFTextBeneficiary"
                      name="targetAudiencePCFTextBeneficiary"
                      type="number"
                      value={bQuestionThree}
                      onChange={handleTargetAudiencePCFTextBeneficiaryChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>

                <div className="containerBgLabel">
                  <label className="containerTextLabel" htmlFor="targetAudiencePCFTextValue">
                    Qual o valor mensal gasto com esse Programa? 
                    <input
                      required
                      id="targetAudiencePCFTextValue"
                      name="targetAudiencePCFTextValue"
                      type=" number"
                      value={cQuestionFour}
                      onChange={handleTargetAudiencePCFTextValueChange}
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
              Qual o motivo do seu município não ter aderido ao Programa Criança Feliz?
              </p>
              <div id="containerOption">
                <div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      required={
                        !aQuestionFive?.a_recursoFinanceiroInsuficiente && 
                        !aQuestionFive.b_naoHaInteresseMunicipio &&
                        !aQuestionFive.c_possuiPrograma &&
                        !aQuestionFive.d_naoConhecePrograma
                      }
                      id="recursoFinanceiroInsuficiente"
                      name="a_recursoFinanceiroInsuficiente"
                      type="checkbox"
                      checked={aQuestionFive.a_recursoFinanceiroInsuficiente}
                      onChange={(event) => setAQuestionFive({
                        ...aQuestionFive,
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
                      required={
                        !aQuestionFive?.a_recursoFinanceiroInsuficiente && 
                        !aQuestionFive.b_naoHaInteresseMunicipio &&
                        !aQuestionFive.c_possuiPrograma &&
                        !aQuestionFive.d_naoConhecePrograma
                      }
                      id="naoHaInteresseMunicipio"
                      name="b_naoHaInteresseMunicipio"
                      type="checkbox"
                      checked={aQuestionFive.b_naoHaInteresseMunicipio}
                      onChange={(event) => setAQuestionFive({
                        ...aQuestionFive,
                        b_naoHaInteresseMunicipio: !!event.currentTarget?.checked
                      })}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="naoHaInteresseMunicipio"
                    >Não houve interesse do município em manter o programa
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      required={
                        !aQuestionFive?.a_recursoFinanceiroInsuficiente && 
                        !aQuestionFive.b_naoHaInteresseMunicipio &&
                        !aQuestionFive.c_possuiPrograma &&
                        !aQuestionFive.d_naoConhecePrograma
                      }
                      id="possuiPrograma"
                      name="c_possuiPrograma"
                      type="checkbox"
                      checked={aQuestionFive.c_possuiPrograma}
                      onChange={(event) => setAQuestionFive({
                        ...aQuestionFive,
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
                      required={
                        !aQuestionFive?.a_recursoFinanceiroInsuficiente && 
                        !aQuestionFive.b_naoHaInteresseMunicipio &&
                        !aQuestionFive.c_possuiPrograma &&
                        !aQuestionFive.d_naoConhecePrograma
                      }
                      id="naoConhecePrograma"
                      name="d_naoConhecePrograma"
                      type="checkbox"
                      checked={aQuestionFive.d_naoConhecePrograma}
                      onChange={(event) => setAQuestionFive({
                        ...aQuestionFive,
                        d_naoConhecePrograma: !!event.currentTarget?.checked
                      })}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="naoConhecePrograma"
                    >O município não conhece o Programa Criança Feliz
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {aQuestionFive.c_possuiPrograma === true && (
              <>
                <div className="containerBgLabel">
                  <label className="containerTextLabel" htmlFor="targetAudiencePCFTextBeneficiary">
                    Qual o nome desse programa?
                    <input
                      required
                      autoComplete="no"
                      id="targetAudiencePCFTextBeneficiary"
                      name="targetAudiencePCFTextBeneficiary"
                      type="text"
                      value={bQuestionEight}
                      onChange={handleTargetAudiencePCFTextNameCheckedChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>

                <div className="containerBgLabel">
                  <label className="containerTextLabel" htmlFor="targetAudiencePCFTextBeneficiary">
                    Quantos beneficiários são atendidos por este programa?
                    <input
                      required
                      autoComplete="no"
                      id="targetAudiencePCFTextBeneficiary"
                      name="targetAudiencePCFTextBeneficiary"
                      type="number"
                      value={cQuestionNine}
                      onChange={handleTargetAudiencePCFTextBeneficiaryCheckedChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>

                <div className="containerBgLabel">
                  <label className="containerTextLabel" htmlFor="targetAudiencePCFTextValue">
                    Qual o valor mensal gasto com esse Programa?
                    <input
                      required
                      autoComplete="no"
                      id="targetAudiencePCFTextValue"
                      name="targetAudiencePCFTextValue"
                      type="number"
                      value={dQuestionTen}
                      onChange={handleTargetAudiencePCFTextValueCheckedChange}
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
              Existe algum outro motivo que explique o fato de o município não ter aderido ao Programa Criança Feliz e que não foi mencionado na questão anterior?
            </p>

            <div className="formQuestion">
              <div id="containerOption">
                <div id="containerOptionSixOption">
                  
                  <div id="containerInputLabelRadioButton">
                    <input
                      required
                      id="explainTheReasonYes"
                      name="explainTheReason"
                      type="radio"
                      value={"sim_Q13"}
                      onClick={() => setIsCheckA2Q13("sim_Q13")}
                      onChange={handleExplainTheReasonChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="explainTheReasonYes"
                    >Sim
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="explainTheReasonNo"
                      name="explainTheReason"
                      type="radio"
                      value={"nao_Q13"}
                      onClick={() => setIsCheckA2Q13("nao_Q13")}
                      onChange={handleExplainTheReasonChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="explainTheReasonNo"
                    >Não
                    </label>
                  </div>

                </div>
              </div>
            </div>
            
            {isCheckA2Q13 === "sim_Q13" && (
              <>
                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="explainTheReasonText"
                  >Qual?
                    <input
                      required
                      autoComplete="no"
                      id="explainTheReasonText"
                      name="explainTheReasonText"
                      type="text"
                      value={bQuestionSeven}
                      onChange={handleExplainTheReasonTextChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>
              </>
            )}

          </div>
        </SC.ButtonTypeRadioText>

        <SC.AllButtons>
          <Link className="buttonAll" to={`/${roomId}/formstepA1`}>Voltar</Link>
          <Button
            isOutlined
            className="buttonAll"
            type="submit"
            onClick={() => setIsAlert}
            >Finalizar
          </Button>
          {isAlert === true && (
            <Alert className="success">
              <CheckCircle size={20} color="#2dd24e" weight="light" />
              Formulário enviado com sucesso!
            </Alert>
          )}
        </SC.AllButtons>
      </form>
    </ThemeA1>
  );
};
