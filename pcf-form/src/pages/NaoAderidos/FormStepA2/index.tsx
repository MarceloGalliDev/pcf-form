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
  c_naoConhecePrograma: boolean;
};


export const FormStepA2 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const [aQuestionOne, setAQuestionOne] = useState('');
  const [bQuestionTwo, setBQuestionTwo] = useState('');
  const [cQuestionThree, setCQuestionThree] = useState('');
  const [dQuestionFour, setDQuestionFour] = useState('');
  const [aQuestionFive, setAQuestionFive] = useState<ReasonForGivingUpChange>({
    a_recursoFinanceiroInsuficiente: false,
    b_naoHaInteresseMunicipio: false,
    c_naoConhecePrograma: false,
  });
  const [aQuestionSix, setAQuestionSix] = useState('');
  const [bQuestionSeven, setBQuestionSeven] = useState('');

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
          questao07a: aQuestionOne,
          questao07b: bQuestionTwo,
          questao07c: cQuestionThree,
          questao07d: dQuestionFour,
        },
        questao08: aQuestionFive,
        questao09:
        {
          questao09a: aQuestionSix,
          questao09b: bQuestionSeven,
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
        alert(`Seu questionário foi finalizado e enviado para análise.\n Agradecemos sua participação!`)
        navigate('/')
      }, 2000)
    };
  };

  const handleTargetAudiencePCFChange =(event:ChangeEvent<HTMLInputElement>) => {
    setAQuestionOne(event.target.value);
  };

  const handleTargetAudiencePCFTextNameCheckedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setBQuestionTwo(event.target.value);
  };

  const handleTargetAudiencePCFTextBeneficiaryChange =(event:ChangeEvent<HTMLInputElement>) => {
    setCQuestionThree(event.target.value);
  };

  const handleTargetAudiencePCFTextValueChange =(event:ChangeEvent<HTMLInputElement>) => {
    setDQuestionFour(event.target.value);
  };

  const handleExplainTheReasonChange =(event:ChangeEvent<HTMLInputElement>) => {
    setAQuestionSix(event.target.value);
  };

  const handleExplainTheReasonTextChange =(event:ChangeEvent<HTMLInputElement>) => {
    setBQuestionSeven(event.target.value);
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 2
    });
  }, []);

  useEffect(() => {
    if (question?.length > 0) {
      setAQuestionOne(question[0].B_Elegiveis_ao_PCF.questao07a)
      setBQuestionTwo(question[0].B_Elegiveis_ao_PCF.questao07b)
      setCQuestionThree(question[0].B_Elegiveis_ao_PCF.questao07c)
      setDQuestionFour(question[0].B_Elegiveis_ao_PCF.questao07d)
      setAQuestionFive(question[0].B_Elegiveis_ao_PCF.questao08)
      setAQuestionSix(question[0].B_Elegiveis_ao_PCF.questao09a)
      setBQuestionSeven(question[0].B_Elegiveis_ao_PCF.questao09b)
    }
  }, [question]);

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
                      checked={aQuestionOne === "sim_Q08"}
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
                      checked={aQuestionOne === "nao_Q08"}
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
                  <label className="containerTextLabel" htmlFor="TargetAudiencePCFTextNameChecked">
                    Qual o nome desse programa?
                    <input
                      required
                      autoComplete="off"
                      id="TargetAudiencePCFTextNameChecked"
                      name="TargetAudiencePCFTextNameChecked"
                      type="text"
                      value={bQuestionTwo}
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
                      autoComplete="off"
                      min={0}
                      max={9999999}
                      id="targetAudiencePCFTextBeneficiary"
                      name="targetAudiencePCFTextBeneficiary"
                      type="number"
                      value={cQuestionThree}
                      onChange={handleTargetAudiencePCFTextBeneficiaryChange}
                      placeholder="Quantidade"
                    />
                  </label>
                </div>

                <div className="containerBgLabel">
                  <label className="containerTextLabel" htmlFor="TargetAudiencePCFTextValue">
                    Qual o valor mensal gasto com esse Programa? 
                    <input
                      required
                      autoComplete="off"
                      min={0}
                      max={9999999}
                      id="TargetAudiencePCFTextValue"
                      name="TargetAudiencePCFTextValue"
                      type=" number"
                      value={dQuestionFour}
                      onChange={handleTargetAudiencePCFTextValueChange}
                      placeholder="Valor"
                    />
                  </label>
                </div>
              </>
            )}
          </div>
        </SC.ButtonTypeRadioText>

        <SC.ButtonTypeCheckboxV1>
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
                      !aQuestionFive.c_naoConhecePrograma
                    }
                    id="a_recursoFinanceiroInsuficiente"
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
                    htmlFor="a_recursoFinanceiroInsuficiente"
                  >A transferência de recurso financeiro é insuficiente para o município manter o programa
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    required={
                      !aQuestionFive?.a_recursoFinanceiroInsuficiente && 
                      !aQuestionFive.b_naoHaInteresseMunicipio &&
                      !aQuestionFive.c_naoConhecePrograma
                    }
                    id="b_naoHaInteresseMunicipio"
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
                    htmlFor="b_naoHaInteresseMunicipio"
                  >Não houve interesse do município em manter o programa
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    required={
                      !aQuestionFive?.a_recursoFinanceiroInsuficiente && 
                      !aQuestionFive.b_naoHaInteresseMunicipio &&
                      !aQuestionFive.c_naoConhecePrograma
                    }
                    id="c_naoConhecePrograma"
                    name="c_naoConhecePrograma"
                    type="checkbox"
                    checked={aQuestionFive.c_naoConhecePrograma}
                    onChange={(event) => setAQuestionFive({
                      ...aQuestionFive,
                      c_naoConhecePrograma: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="c_naoConhecePrograma"
                  >O município não conhece o Programa Criança Feliz
                  </label>
                </div>
              </div>
            </div>
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
