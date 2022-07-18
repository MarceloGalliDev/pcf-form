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
  c_possuiPrograma: boolean;
  d_criouPrograma: boolean;
};

export const FormStepB2 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const [aQuestionOne, setAQuestionOne] = useState<ReasonForGivingUpChange>({
    a_recursoFinanceiroInsuficiente: false,
    b_naoHaInteresseMunicipio: false,
    c_possuiPrograma: false,
    d_criouPrograma: false,
  });
  const [aQuestionTwo, setAQuestionTwo] = useState('');
  const [bQuestionThree, setBQuestionThree] = useState('');
  const [cQuestionFour, setCQuestionFour] = useState('');
  const [aQuestionFive, setAQuestionFive] = useState('');
  const [bQuestionSix, setBQuestionSix] = useState('');
  const [bQuestionSeven_C, setBQuestionSeven_C] = useState('');
  const [cQuestionEight_C, setCQuestionEight_C] = useState('');
  const [dQuestionNine_C, setDQuestionNine_C] = useState('');
  const [eQuestionTen_D, setEQuestionTen_D] = useState('');
  const [fQuestionEleven_D, setFQuestionEleven_D] = useState('');
  const [gQuestionTwelve_D, setGQuestionTwelve_D] = useState('');
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
          aQuestionTwo,
          bQuestionThree,
          cQuestionFour,
        },
        questao08:
        {
          aQuestionOne,
          bQuestionSeven_C,
          cQuestionEight_C,
          dQuestionNine_C,
          eQuestionTen_D,
          fQuestionEleven_D,
          gQuestionTwelve_D,
        }, 
        questao09:
        { 
          aQuestionFive,
          bQuestionSix,
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
    setAQuestionTwo(event.target.value);
  };

  const handleHaveTargetAudiencePCFBeneficiaryChange =(event:ChangeEvent<HTMLInputElement>) => {
    setBQuestionThree(event.target.value);
  };

  const handleHaveTargetAudiencePCFValueChange =(event:ChangeEvent<HTMLInputElement>) => {
    setCQuestionFour(event.target.value);
  };

  const handleReasonForDroppingOutChange =(event:ChangeEvent<HTMLInputElement>) => {
    setAQuestionFive(event.target.value);
  };

  const handleReasonForDroppingOutWhichChange =(event:ChangeEvent<HTMLInputElement>) => {
    setBQuestionSix(event.target.value);
  };

  const handleReasonGivingUpNameChange =(event:ChangeEvent<HTMLInputElement>) => {
    setBQuestionSeven_C(event.target.value);
  };

  const handleReasonGivingUpBeneficiaryChange =(event:ChangeEvent<HTMLInputElement>) => {
    setCQuestionEight_C(event.target.value);
  };

  const handleReasonGivingUpValueChange =(event:ChangeEvent<HTMLInputElement>) => {
    setDQuestionNine_C(event.target.value);
  };

  const handleReasonGivingUpNameCreatedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setEQuestionTen_D(event.target.value);
  };

  const handleReasonGivingUpBeneficiaryCreatedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setFQuestionEleven_D(event.target.value);
  };

  const handleReasonGivingUpValueCreatedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setGQuestionTwelve_D(event.target.value);
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
                    className="containerTextLabel"
                    htmlFor="haveTargetAudiencePCFBeneficiary"
                  >Se sim, quantos beneficiários são atendidos por este programa?
                    <input
                      required
                      autoComplete="no"
                      id="haveTargetAudiencePCFBeneficiary"
                      name="haveTargetAudiencePCFBeneficiary"
                      type="number"
                      value={bQuestionThree}
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
                      required
                      autoComplete="no"
                      id="haveTargetAudiencePCFValue"
                      name="haveTargetAudiencePCFValue"
                      type="number"
                      value={cQuestionFour}
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
                      required={
                        !aQuestionOne?.a_recursoFinanceiroInsuficiente && 
                        !aQuestionOne.b_naoHaInteresseMunicipio &&
                        !aQuestionOne.c_possuiPrograma &&
                        !aQuestionOne.d_criouPrograma
                      }
                      id="recursoFinanceiroInsuficiente"
                      name="a_recursoFinanceiroInsuficiente"
                      type="checkbox"
                      checked={aQuestionOne.a_recursoFinanceiroInsuficiente}
                      onChange={(event) => setAQuestionOne({
                        ...aQuestionOne,
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
                        !aQuestionOne?.a_recursoFinanceiroInsuficiente && 
                        !aQuestionOne.b_naoHaInteresseMunicipio &&
                        !aQuestionOne.c_possuiPrograma &&
                        !aQuestionOne.d_criouPrograma
                      }
                      id="naoHaInteresseMunicipio"
                      name="b_naoHaInteresseMunicipio"
                      type="checkbox"
                      checked={aQuestionOne.b_naoHaInteresseMunicipio}
                      onChange={(event) => setAQuestionOne({
                        ...aQuestionOne,
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
                      required={
                        !aQuestionOne?.a_recursoFinanceiroInsuficiente && 
                        !aQuestionOne.b_naoHaInteresseMunicipio &&
                        !aQuestionOne.c_possuiPrograma &&
                        !aQuestionOne.d_criouPrograma
                      }
                      id="possuiPrograma"
                      name="c_possuiPrograma"
                      type="checkbox"
                      checked={aQuestionOne.c_possuiPrograma}
                      onChange={(event) => setAQuestionOne({
                        ...aQuestionOne,
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
                        !aQuestionOne?.a_recursoFinanceiroInsuficiente && 
                        !aQuestionOne.b_naoHaInteresseMunicipio &&
                        !aQuestionOne.c_possuiPrograma &&
                        !aQuestionOne.d_criouPrograma
                      }
                      id="criouPrograma"
                      name="d_criouPrograma"
                      type="checkbox"
                      checked={aQuestionOne.d_criouPrograma}
                      onChange={(event) => setAQuestionOne({
                        ...aQuestionOne,
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
            {aQuestionOne.c_possuiPrograma && (
              <>
                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="handleReasonGivingUpNameChange"
                  >Qual o nome desse programa que o município <u>possui</u>? 
                    <input
                      required
                      autoComplete="no"
                      id="handleReasonGivingUpNameChange"
                      name="handleReasonGivingUpNameChange"
                      type="text"
                      value={bQuestionSeven_C}
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
                      required
                      autoComplete="no"
                      id="handleReasonGivingUpBeneficiaryChange"
                      name="handleReasonGivingUpBeneficiaryChange"
                      type="number"
                      value={cQuestionEight_C}
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
                      required
                      autoComplete="no"
                      id="handleReasonGivingUpValueChange"
                      name="handleReasonGivingUpValueChange"
                      type="text"
                      value={dQuestionNine_C}
                      onChange={handleReasonGivingUpValueChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>
              </>
            )}
             {aQuestionOne.d_criouPrograma && (
              <>
                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="handleReasonGivingUpNameCreatedChange"
                  >Qual o nome desse programa que o município <u>criou</u>? 
                    <input
                      required
                      autoComplete="no"
                      id="handleReasonGivingUpNameCreatedChange"
                      name="handleReasonGivingUpNameCreatedChange"
                      type="text"
                      value={eQuestionTen_D}
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
                      autoComplete="no"
                      id="handleReasonGivingUpBeneficiaryCreatedChange"
                      name="handleReasonGivingUpBeneficiaryCreatedChange"
                      type="number"
                      value={fQuestionEleven_D}
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
                      required
                      autoComplete="no"
                      id="handleReasonGivingUpValueCreatedChange"
                      name="handleReasonGivingUpValueCreatedChange"
                      type="number"
                      value={gQuestionTwelve_D}
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
                  >Se sim, qual?
                    <input
                      required
                      autoComplete="no"
                      id="reasonForDroppingOutWhich"
                      name="reasonForDroppingOutWhich"
                      type="text"
                      value={bQuestionSix}
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