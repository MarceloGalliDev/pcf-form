import * as SC from "../../../styles/styles";
import { ThemeB1 } from "../../../components/ThemeB1";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import { push, ref, set, update } from "firebase/database";
import { database } from "../../../services/firebase";
import { CheckCircle } from 'phosphor-react';
import { Alert } from 'reactstrap';
import { useRoomB } from "../../../hooks/useRoomB";
import { Button } from "../../../components/ButtonFinished";

type RoomParams = {
  id: string;
};

interface ReasonForGivingUpChange {
  a_recursoFinanceiroInsuficiente: boolean;
  b_naoHaInteresseMunicipio: boolean;
  c_criouPrograma: boolean;
};

export const FormStepB2 = () => {
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
    c_criouPrograma: false,
  });
  const [bQuestionSix, setBQuestionSix] = useState('');
  const [cQuestionSeven, setCQuestionSeven] = useState('');
  const [dQuestionEight, setDQuestionEight] = useState('');
  const [aQuestionNine, setAQuestionNine] = useState('');
  const [bQuestionTen, setBQuestionTen] = useState('');

  const [isCheckQ02, setIsCheckQ02] = useState('');
  const [isCheckQ05, setIsCheckQ05] = useState('');

  const [isAlert, setIsAlert] = useState(false);

  const [question] = useRoomB();

  async function handleDropoutMunicipalities(event: FormEvent) {
    event.preventDefault();

    const questionReq = {
      B_Desistentes: {
        questao07:
        {
          questao07a: aQuestionOne,
          questao07b: bQuestionTwo,
          questao07c: cQuestionThree,
          questao07d: dQuestionFour,
        },
        questao08:
        {
          questao08a: aQuestionFive,
          questao08b: bQuestionSix,
          questao08c: cQuestionSeven,
          questao08d: dQuestionEight,
        }, 
        questao09:
        { 
          questao09a: aQuestionNine,
          questao09b: bQuestionTen,
        },
      }
    };

    if (question.length === 0) {
      const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/desistentes/`);
      const firebaseQuestion = await push(firebaseRoomsQuestion);
      set(firebaseQuestion, questionReq);
    } else {
      const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/desistentes/${question[0].idForm}`);
      await update(firebaseRoomsQuestion, questionReq)
    };

    if (confirm('Tem certeza que deseja finalizar o questionário?')) {
      await update(ref(database, `rooms/${roomId}/desistentes/`), { endedAt: new Date() })
      setIsAlert(true);
      setTimeout(() => {
        navigate('/')
      }, 2000)
    };
  };

  const handleHaveTargetAudiencePCFChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAQuestionOne(event.target.value);
  };

  const handleReasonGivingUpNameChange =(event:ChangeEvent<HTMLInputElement>) => {
    setBQuestionTwo(event.target.value);
  };

  const handleHaveTargetAudiencePCFBeneficiaryChange =(event:ChangeEvent<HTMLInputElement>) => {
    setCQuestionThree(event.target.value);
  };

  const handleHaveTargetAudiencePCFValueChange =(event:ChangeEvent<HTMLInputElement>) => {
    setDQuestionFour(event.target.value);
  };

  const handleReasonGivingUpNameCreatedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setBQuestionSix(event.target.value);
  };

  const handleReasonGivingUpBeneficiaryCreatedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setCQuestionSeven(event.target.value);
  };

  const handleReasonGivingUpValueCreatedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setDQuestionEight(event.target.value);
  };

  const handleReasonForDroppingOutChange =(event:ChangeEvent<HTMLInputElement>) => {
    setAQuestionNine(event.target.value);
  };

  const handleReasonForDroppingOutWhichChange =(event:ChangeEvent<HTMLInputElement>) => {
    setBQuestionTen(event.target.value);
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 2
    });
  }, []);

  useEffect(() => {
    if (question?.length > 0) {
      setAQuestionOne(question[0].B_Desistentes.questao07a)
      setBQuestionTwo(question[0].B_Desistentes.questao07b)
      setCQuestionThree(question[0].B_Desistentes.questao07c)
      setDQuestionFour(question[0].B_Desistentes.questao07d)
      setAQuestionFive(question[0].B_Desistentes.questao08a)
      setBQuestionSix(question[0].B_Desistentes.questao08b)
      setCQuestionSeven(question[0].B_Desistentes.questao08c)
      setDQuestionEight(question[0].B_Desistentes.questao08d)
      setAQuestionNine(question[0].B_Desistentes.questao09a)
      setBQuestionTen(question[0].B_Desistentes.questao09b)
    }
  }, [question]);

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
                      required
                      id="haveTargetAudiencePCFYes"
                      name="haveTargetAudiencePCF"
                      type="radio"
                      value="sim_Q02"
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
                      value="nao_Q02"
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
                    className="containerTextLabel" htmlFor="handleReasonGivingUpNameChange"
                  >Qual o nome desse programa que o município <u>possui</u>? 
                    <input
                      required
                      autoComplete="off"
                      id="handleReasonGivingUpNameChange"
                      name="handleReasonGivingUpNameChange"
                      type="text"
                      value={bQuestionTwo}
                      onChange={handleReasonGivingUpNameChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>

                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel"
                    htmlFor="haveTargetAudiencePCFBeneficiary"
                  >Quantos beneficiários são atendidos por este programa?
                    <input
                      required
                      autoComplete="no"
                      id="haveTargetAudiencePCFBeneficiary"
                      name="haveTargetAudiencePCFBeneficiary"
                      type="number"
                      value={cQuestionThree}
                      onChange={handleHaveTargetAudiencePCFBeneficiaryChange}
                      placeholder="Quantidade"
                    />
                  </label>
                </div>

                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel"
                    htmlFor="haveTargetAudiencePCFValue"
                  >Qual o valor mensal gasto com esse Programa? 
                    <input
                      required
                      autoComplete="no"
                      id="haveTargetAudiencePCFValue"
                      name="haveTargetAudiencePCFValue"
                      type="number"
                      value={dQuestionFour}
                      onChange={handleHaveTargetAudiencePCFValueChange}
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
            <div className="formQuestion">
              <p className="textFormRadioButton">
              Qual foi o motivo que levou seu município a deixar o Programa Criança Feliz?
              </p>
              <div id="containerOption">
                <div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      required={
                        !aQuestionFive?.a_recursoFinanceiroInsuficiente && 
                        !aQuestionFive.b_naoHaInteresseMunicipio &&
                        !aQuestionFive.c_criouPrograma
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
                        !aQuestionFive.c_criouPrograma
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
                    >Não há mais interesse do município em manter o programa
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      required={
                        !aQuestionFive?.a_recursoFinanceiroInsuficiente && 
                        !aQuestionFive.b_naoHaInteresseMunicipio &&
                        !aQuestionFive.c_criouPrograma
                      }
                      id="c_criouPrograma"
                      name="c_criouPrograma"
                      type="checkbox"
                      checked={aQuestionFive.c_criouPrograma}
                      onChange={(event) => setAQuestionFive({
                        ...aQuestionFive,
                        c_criouPrograma: !!event.currentTarget?.checked
                      })}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="c_criouPrograma"
                    >O município criou um programa semelhante ao Criança Feliz
                    </label>
                  </div>

                </div>
              </div>
            </div>
            {aQuestionFive.c_criouPrograma && (
              <>
                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="handleReasonGivingUpNameCreatedChange"
                  >Qual o nome desse programa que o município <u>criou</u>? 
                    <input
                      required
                      autoComplete="off"
                      id="handleReasonGivingUpNameCreatedChange"
                      name="handleReasonGivingUpNameCreatedChange"
                      type="text"
                      value={bQuestionSix}
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
                      required
                      autoComplete="off"
                      min={0}
                      max={9999999}
                      id="handleReasonGivingUpBeneficiaryCreatedChange"
                      name="handleReasonGivingUpBeneficiaryCreatedChange"
                      type="number"
                      value={cQuestionSeven}
                      onChange={handleReasonGivingUpBeneficiaryCreatedChange}
                      placeholder="Quantidade"
                    />
                  </label>
                </div>

                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="handleReasonGivingUpValueCreatedChange"
                  >
                    Qual o valor mensal gasto com esse programa que o município <u>criou</u>?
                    <input
                      required
                      autoComplete="off"
                      min={0}
                      max={9999999}
                      id="handleReasonGivingUpValueCreatedChange"
                      name="handleReasonGivingUpValueCreatedChange"
                      type="number"
                      value={dQuestionEight}
                      onChange={handleReasonGivingUpValueCreatedChange}
                      placeholder="Valor"
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
                      required
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
                  >Qual?
                    <input
                      required
                      autoComplete="off"
                      id="reasonForDroppingOutWhich"
                      name="reasonForDroppingOutWhich"
                      type="text"
                      value={bQuestionTen}
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
          <Link className="buttonAll" to={`/${roomId}/formstepB1`}>Voltar</Link>
          <Button
            isOutlined
            className="buttonAll"
            type="submit"
            onChange={() => setIsAlert}
            >Finalizar
          </Button>
          {isAlert && (
            <Alert className="success">
              <CheckCircle size={20} color="#2dd24e" weight="light" />
              Formulário enviado com sucesso!
            </Alert>
          )}
        </SC.AllButtons>
      </form>
    </ThemeB1>
  );
};