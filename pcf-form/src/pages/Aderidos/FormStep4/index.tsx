import * as SC from "../../../styles/styles";
import { Theme } from "../../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, useEffect, useState, useCallback, FormEvent } from "react";
import { push, ref, set, update } from "firebase/database";
import { database } from "../../../services/firebase";
import { useRoom } from "../../../hooks/useRoom";
import { TooltipText } from "../../../components/TooltipText";


interface Workload {
  a_supervisoresHorasSemanais40: boolean;
  b_supervisoresHorasSemanais30: boolean;
  c_supervisoresHorasSemanais20: boolean;
  d_supervisoresHorasSemanaisOutros: boolean;
  e_supervisoresHorasSemanaisOutrosDescricao: string;
};

interface SupervisorQualification {
  a_supervisoresGraduacaoIncompleta: string;
  b_supervisoresGraduacaoCompleta: string;
  c_supervisoresEspecializacao: string;
  d_supervisoresMestrado: string;
  e_supervisoresDoutorado: string;
};

interface SupervisorTypeRemunaration1 {
  a_supervisoresServidorEfetivo: string;
  b_supervisoresMediaRemuneracaoEfetivo: string;
};

interface SupervisorTypeRemunaration2 {
  a_supervisoresCargoComissionado: string;
  b_supervisoresMediaRemuneracaoComissionado: string;
};

interface SupervisorTypeRemunaration3 {
  a_supervisoresServidorTemporario: string;
  b_supervisoresMediaRemuneracaoTemporario: string;
};

interface SupervisorTypeRemunaration4 {
  a_supervisoresBolsista: string;
  b_supervisoresMediaRemuneracaoBolsista: string;
};

interface SupervisorTypeRemunaration5 {
  a_supervisoresProfissionalAutonomo: string;
  b_supervisoresMediaRemuneracaoProfissionalAutonomo: string;
};

interface SupervisorTypeRemunaration6 {
  a_supervisoresOutrosCargos: string;
  b_supervisoresMediaRemuneracaoOutrosCargos: string;
};

type RoomParams = {
  id: string;
};

export const FormStep4 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState('')
  const [questionTwo, setQuestionTwo] = useState('')
  const [questionThree, setQuestionThree] = useState<Workload>({
    a_supervisoresHorasSemanais40: false,
    b_supervisoresHorasSemanais30: false,
    c_supervisoresHorasSemanais20: false,
    d_supervisoresHorasSemanaisOutros: false,
    e_supervisoresHorasSemanaisOutrosDescricao: '',
  });
  const [questionFour, setQuestionFour] =
  useState<SupervisorQualification>({
    a_supervisoresGraduacaoIncompleta:'',
    b_supervisoresGraduacaoCompleta:'',
    c_supervisoresEspecializacao: '',
    d_supervisoresMestrado: '',
    e_supervisoresDoutorado: '',
  });
  const [questionFive, setQuestionFive] = useState<SupervisorTypeRemunaration1>({
    a_supervisoresServidorEfetivo: '',
    b_supervisoresMediaRemuneracaoEfetivo: '',
  });
  const [questionSix, setQuestionSix] = useState<SupervisorTypeRemunaration2>({
    a_supervisoresCargoComissionado: '',
    b_supervisoresMediaRemuneracaoComissionado: '',
  });
  const [questionSeven, setQuestionSeven] = useState<SupervisorTypeRemunaration3>({
    a_supervisoresServidorTemporario: '',
    b_supervisoresMediaRemuneracaoTemporario: '',
  });
  const [questionEight, setQuestionEight] = useState<SupervisorTypeRemunaration4>({
    a_supervisoresBolsista: '',
    b_supervisoresMediaRemuneracaoBolsista: '',
  });
  const [questionNine, setQuestionNine] = useState<SupervisorTypeRemunaration5>({
    a_supervisoresProfissionalAutonomo: '',
    b_supervisoresMediaRemuneracaoProfissionalAutonomo: '',
  });
  const [questionTen, setQuestionTen] = useState<SupervisorTypeRemunaration6>({
    a_supervisoresOutrosCargos: '',
    b_supervisoresMediaRemuneracaoOutrosCargos: '',
  });

  const [question] = useRoom();

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    const questionReq = {
      D_Supervisores_do_PCF: {
        questao22: questionOne,
        questao23: questionTwo,
        questao24: questionThree,
        questao25: questionFour,
        questao26: questionFive,
        questao27: questionSix,
        questao28: questionSeven,
        questao29: questionEight,
        questao30: questionNine,
        questao31: questionTen,
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

   navigate(`/${roomId}/formstep5`)
  };

  const handleNumberOfSupervisors = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
  };
  
  const handleAveragePayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };

  const handleWorkloadChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionThree({
      ...questionThree,
      [name]: value,
    })
  }, [questionThree]);

  const handleSupervisorQualificationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionFour({
      ...questionFour,
      [name]: value,
    })
  }, [questionFour]);

  const handleEffectiveRemunerationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionFive({
      ...questionFive,
      [name]: value,
    })
  }, [questionFive]);

  const handleCommissionedRemunerationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionSix({
      ...questionSix,
      [name]: value,
    })
  }, [questionSix]);

  const handleTemporaryRemunerationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionSeven({
      ...questionSeven,
      [name]: value,
    })
  }, [questionSeven]);

  const handleScholarshipRemunerationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionEight({
      ...questionEight,
      [name]: value,
    })
  }, [questionEight]);

  const handleAutonomousSupervisorChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionNine({
      ...questionNine,
      [name]: value,
    })
  }, [questionNine]);

  const handleOthersRemunerationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionTen({
      ...questionTen,
      [name]: value,
    })
  }, [questionTen]);

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 4
    });
  }, []);

  useEffect(() => {
    if (question?.length > 0) {
      setQuestionOne(question[0].D_Supervisores_do_PCF.questao22)
      setQuestionTwo(question[0].D_Supervisores_do_PCF.questao23)
      setQuestionThree(question[0].D_Supervisores_do_PCF.questao24)
      setQuestionFour(question[0].D_Supervisores_do_PCF.questao25)
      setQuestionFive(question[0].D_Supervisores_do_PCF.questao26)
      setQuestionSix(question[0].D_Supervisores_do_PCF.questao27)
      setQuestionSeven(question[0].D_Supervisores_do_PCF.questao28)
      setQuestionEight(question[0].D_Supervisores_do_PCF.questao29)
      setQuestionNine(question[0].D_Supervisores_do_PCF.questao30)
      setQuestionTen(question[0].D_Supervisores_do_PCF.questao31)
    }
    console.log(question)
  }, [question]);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Equipe do PCF</h1>
        <p>Informações sobre os atores/ participantes da equipe do PCF</p>
        <hr />
      </SC.Container>

      <form onSubmit={handleSendQuestion}>

        <SC.SubSection>
          <div className="bgSubSection">
            <p>Subseção Supervisores</p>
          </div>
          <div className="formQuestionV2">

            <SC.ButtonTypeRadio>
              <div className="formQuestion">
                <p className="textFormRadioButton">
                  Quantos Supervisores existem na equipe do PCF no seu município?
                </p>
                <div id="containerOption">
                  <div id="containerOptionSixOption">

                    <div id="containerInputLabelRadioButton">
                      <input
                        required
                        id="numberOfSupervisorsZero"
                        name="numberOfSupervisors"
                        type="radio"
                        value="0"
                        checked={questionOne === "0"}
                        onChange={handleNumberOfSupervisors}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="numberOfSupervisorsZero"
                      >0
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="numberOfSupervisorsOne"
                        name="numberOfSupervisors"
                        type="radio"
                        value="1"
                        checked={questionOne === "1"}
                        onChange={handleNumberOfSupervisors}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="numberOfSupervisorsOne"
                      >1
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="numberOfSupervisorsTwo"
                        name="numberOfSupervisors"
                        type="radio"
                        value="2"
                        checked={questionOne === "2"}
                        onChange={handleNumberOfSupervisors}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="numberOfSupervisorsTwo"
                      >2
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="numberOfSupervisorsThree"
                        name="numberOfSupervisors"
                        type="radio"
                        value="3"
                        checked={questionOne === "3"}
                        onChange={handleNumberOfSupervisors}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="numberOfSupervisorsThree"
                      >3
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="numberOfSupervisorsFour"
                        name="numberOfSupervisors"
                        type="radio"
                        value="4_ou_mais"
                        checked={questionOne === "4_ou_mais"}
                        onChange={handleNumberOfSupervisors}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="numberOfSupervisorsFour"
                      >4 ou mais
                      </label>
                    </div>

                  </div>
                </div>
              </div>
            </SC.ButtonTypeRadio>

            <SC.ButtonTypeTextV4>
              <div className="formQuestion">
                <label
                  htmlFor="averagePay"
                >Qual a remuneração média em R$ (reais) dos Supervisores?(Não incluir centavos*)
                  <div className="textInfo">
                    <input
                      required
                      autoComplete="off"
                      id="averagePay"
                      name="remuneracaoMediaSupervisor"
                      type="number"
                      min={0}
                      max={999999}
                      value={questionTwo}
                      onChange={handleAveragePayChange}
                      placeholder="Valor em R$"
                    />
                    <TooltipText/>
                  </div>
                </label>
              </div>
            </SC.ButtonTypeTextV4>

            <SC.ButtonTypeCheckbox>
              <div className="formQuestion">
                <p className="textFormRadioButton">
                  Qual a carga horária dos Supervisores?
                </p>
                <div id="containerOption">
                  <div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionThree?.a_supervisoresHorasSemanais40 && 
                          !questionThree.b_supervisoresHorasSemanais30 &&
                          !questionThree.c_supervisoresHorasSemanais20 &&
                          !questionThree.d_supervisoresHorasSemanaisOutros &&
                          !questionThree.e_supervisoresHorasSemanaisOutrosDescricao
                        }
                        id="workloadForty"
                        name="a_supervisoresHorasSemanais40"
                        type="checkbox"
                        checked={questionThree.a_supervisoresHorasSemanais40}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          a_supervisoresHorasSemanais40: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="workloadForty"
                      >40 horas semanais
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionThree?.a_supervisoresHorasSemanais40 && 
                          !questionThree.b_supervisoresHorasSemanais30 &&
                          !questionThree.c_supervisoresHorasSemanais20 &&
                          !questionThree.d_supervisoresHorasSemanaisOutros &&
                          !questionThree.e_supervisoresHorasSemanaisOutrosDescricao
                        }
                        id="workloadThirty"
                        name="b_supervisoresHorasSemanais30"
                        type="checkbox"
                        checked={questionThree.b_supervisoresHorasSemanais30}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          b_supervisoresHorasSemanais30: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="workloadThirty"
                      >30 horas semanais
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionThree?.a_supervisoresHorasSemanais40 && 
                          !questionThree.b_supervisoresHorasSemanais30 &&
                          !questionThree.c_supervisoresHorasSemanais20 &&
                          !questionThree.d_supervisoresHorasSemanaisOutros &&
                          !questionThree.e_supervisoresHorasSemanaisOutrosDescricao
                        }
                        id="workloadTwenty"
                        name="c_supervisoresHorasSemanais20"
                        type="checkbox"
                        checked={questionThree.c_supervisoresHorasSemanais20}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          c_supervisoresHorasSemanais20: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="workloadTwenty"
                      >20 horas semanais
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionThree?.a_supervisoresHorasSemanais40 && 
                          !questionThree.b_supervisoresHorasSemanais30 &&
                          !questionThree.c_supervisoresHorasSemanais20 &&
                          !questionThree.d_supervisoresHorasSemanaisOutros
                        }
                        id="workloadOthers"
                        name="d_supervisoresHorasSemanaisOutros"
                        type="checkbox"
                        checked={questionThree.d_supervisoresHorasSemanaisOutros}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          d_supervisoresHorasSemanaisOutros: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="workloadOthers"
                      >Outros:
                      </label>
                      <input
                        required={
                          !questionThree?.a_supervisoresHorasSemanais40 && 
                          !questionThree.b_supervisoresHorasSemanais30 &&
                          !questionThree.c_supervisoresHorasSemanais20 &&
                          !questionThree.e_supervisoresHorasSemanaisOutrosDescricao
                        }
                        className="inputPlaceholderOther"
                        name="e_supervisoresHorasSemanaisOutrosDescricao"
                        type="text"
                        value={questionThree.e_supervisoresHorasSemanaisOutrosDescricao}
                        onChange={handleWorkloadChange}
                        placeholder="Escreva aqui"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </SC.ButtonTypeCheckbox>

            <SC.ButtonTypeTextV3>
              <div className="formQuestion">
                <label htmlFor="containerTextLabelCheckbox">
                  Quantos Supervisores da equipe do PCF tem em seu município:

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="a_supervisoresGraduacaoIncompleta"
                    >Superior incompleto:
                    </label>
                    <input
                      required
                      autoComplete="off"
                      className="inputForContainerTextLabelCheckbox"
                      id="a_supervisoresGraduacaoIncompleta"
                      name="a_supervisoresGraduacaoIncompleta"
                      type="number"
                      min={0}
                      max={999}
                      value={questionFour.a_supervisoresGraduacaoIncompleta}
                      onChange={handleSupervisorQualificationChange}
                      placeholder="Quantidade"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="b_supervisoresGraduacaoCompleta"
                    >Superior completo:
                    </label>
                    <input
                      required
                      autoComplete="off"
                      className="inputForContainerTextLabelCheckbox"
                      id="b_supervisoresGraduacaoCompleta"
                      name="b_supervisoresGraduacaoCompleta"
                      type="number"
                      min={0}
                      max={999}
                      value={questionFour.b_supervisoresGraduacaoCompleta}
                      onChange={handleSupervisorQualificationChange}
                      placeholder="Quantidade"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="c_supervisoresEspecializacao"
                    >Especialização:
                    </label>
                    <input
                      required
                      autoComplete="off"
                      className="inputForContainerTextLabelCheckbox"
                      id="c_supervisoresEspecializacao"
                      name="c_supervisoresEspecializacao"
                      type="number"
                      min={0}
                      max={999}
                      value={questionFour.c_supervisoresEspecializacao}
                      onChange={handleSupervisorQualificationChange}
                      placeholder="Quantidade"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="d_supervisoresMestrado"
                    >Mestrado:
                    </label>
                    <input
                      required
                      autoComplete="off"
                      className="inputForContainerTextLabelCheckbox"
                      id="d_supervisoresMestrado"
                      name="d_supervisoresMestrado"
                      type="number"
                      min={0}
                      max={999}
                      value={questionFour.d_supervisoresMestrado}
                      onChange={handleSupervisorQualificationChange}
                      placeholder="Quantidade"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="e_supervisoresDoutorado"
                    >Doutorado:
                    </label>
                    <input
                      required
                      autoComplete="off"
                      id="e_supervisoresDoutorado"
                      className="inputForContainerTextLabelCheckbox"
                      name="e_supervisoresDoutorado"
                      type="number"
                      min={0}
                      max={999}
                      value={questionFour.e_supervisoresDoutorado}
                      onChange={handleSupervisorQualificationChange}
                      placeholder="Quantidade"
                    />
                  </div>

                </label>
              </div>
            </SC.ButtonTypeTextV3>

            <SC.ButtonTypeTextV3>
              <div className="formQuestion">
                <label htmlFor="containerLabelCheckboxBorder">
                Informe quantos Supervisores da equipe do PCF são contratados nas seguintes categorias em seu município e sua remuneração média:

                <div className="testeV1"><TooltipText/></div>
                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="a_supervisoresServidorEfetivo"
                      >Servidor(a) efetivo(a):
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="a_supervisoresServidorEfetivo"
                        name="a_supervisoresServidorEfetivo"
                        type="number"
                        min={0}
                        max={9999}
                        value={questionFive.a_supervisoresServidorEfetivo}
                        onChange={handleEffectiveRemunerationChange}
                        placeholder="Quantidade"
                      />
                    </div>

                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="b_supervisoresMediaRemuneracaoEfetivo"
                      >Média Remuneração:</label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="b_supervisoresMediaRemuneracaoEfetivo"
                        name="b_supervisoresMediaRemuneracaoEfetivo"
                        type="number"
                        min={0}
                        max={9999}
                        value={questionFive.b_supervisoresMediaRemuneracaoEfetivo}
                        onChange={handleEffectiveRemunerationChange}
                        placeholder="Valor"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="a_supervisoresCargoComissionado"
                      >Cargo comissionado:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="a_supervisoresCargoComissionado"
                        name="a_supervisoresCargoComissionado"
                        type="number"
                        min={0}
                        max={9999}
                        value={questionSix.a_supervisoresCargoComissionado}
                        onChange={handleCommissionedRemunerationChange}
                        placeholder="Quantidade"
                      />
                    </div>

                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="b_supervisoresMediaRemuneracaoComissionado"
                      >Média Remuneração:</label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="b_supervisoresMediaRemuneracaoComissionado"
                        name="b_supervisoresMediaRemuneracaoComissionado"
                        type="number"
                        min={0}
                        max={9999}
                        value={questionSix.b_supervisoresMediaRemuneracaoComissionado}
                        onChange={handleCommissionedRemunerationChange}
                        placeholder="Valor"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="a_supervisoresServidorTemporario"
                      >Servidor temporário:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="a_supervisoresServidorTemporario"
                        name="a_supervisoresServidorTemporario"
                        type="number"
                        min={0}
                        max={9999}
                        value={questionSeven.a_supervisoresServidorTemporario}
                        onChange={handleTemporaryRemunerationChange}
                        placeholder="Quantidade"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="b_supervisoresMediaRemuneracaoTemporario"
                      >Média Remuneração:</label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="b_supervisoresMediaRemuneracaoTemporario"
                        name="b_supervisoresMediaRemuneracaoTemporario"
                        type="number"
                        min={0}
                        max={9999}
                        value={questionSeven.b_supervisoresMediaRemuneracaoTemporario}
                        onChange={handleTemporaryRemunerationChange}
                        placeholder="Valor"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="a_supervisoresBolsista"
                      >Bolsista:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="a_supervisoresBolsista"
                        name="a_supervisoresBolsista"
                        type="number"
                        min={0}
                        max={9999}
                        value={questionEight.a_supervisoresBolsista}
                        onChange={handleScholarshipRemunerationChange}
                        placeholder="Quantidade"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="b_supervisoresMediaRemuneracaoBolsista"
                      >Média Remuneração:</label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="b_supervisoresMediaRemuneracaoBolsista"
                        name="b_supervisoresMediaRemuneracaoBolsista"
                        type="number"
                        min={0}
                        max={9999}
                        value={questionEight.b_supervisoresMediaRemuneracaoBolsista}
                        onChange={handleScholarshipRemunerationChange}
                        placeholder="Valor"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="a_supervisoresProfissionalAutonomo"
                      >Profissional autônomo:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="a_supervisoresProfissionalAutonomo"
                        name="a_supervisoresProfissionalAutonomo"
                        type="number"
                        min={0}
                        max={9999}
                        value={questionNine.a_supervisoresProfissionalAutonomo}
                        onChange={handleAutonomousSupervisorChange}
                        placeholder="Quantidade"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="b_supervisoresMediaRemuneracaoProfissionalAutonomo"
                      >Média Remuneração:</label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="b_supervisoresMediaRemuneracaoProfissionalAutonomo"
                        name="b_supervisoresMediaRemuneracaoProfissionalAutonomo"
                        type="number"
                        min={0}
                        max={9999}
                        value={questionNine.b_supervisoresMediaRemuneracaoProfissionalAutonomo}
                        onChange={handleAutonomousSupervisorChange}
                        placeholder="Valor"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="a_supervisoresOutrosCargos"
                      >Outros:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="a_supervisoresOutrosCargos"
                        name="a_supervisoresOutrosCargos"
                        type="number"
                        min={0}
                        max={9999}
                        value={questionTen.a_supervisoresOutrosCargos}
                        onChange={handleOthersRemunerationChange}
                        placeholder="Quantidade"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="b_supervisoresMediaRemuneracaoOutrosCargos"
                      >Média Remuneração:</label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="b_supervisoresMediaRemuneracaoOutrosCargos"
                        name="b_supervisoresMediaRemuneracaoOutrosCargos"
                        type="number"
                        min={0}
                        max={9999}
                        value={questionTen.b_supervisoresMediaRemuneracaoOutrosCargos}
                        onChange={handleOthersRemunerationChange}
                        placeholder="Valor"
                      />
                    </div>
                  </div>

                </label>
              </div>
            </SC.ButtonTypeTextV3>
          </div>
        </SC.SubSection>

        <SC.AllButtons>
          <Link className="buttonAll" to={`/${roomId}/formstep3`}>Voltar</Link>
          <button
            className="buttonAll"
            type="submit"
            >Próximo
          </button>
        </SC.AllButtons>
      </form>
    </Theme>
  );
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

  // const schema = yup.object({
  //   numberOfSupervisors: yup.string().required(),
  //   averagePay: yup.string().required(),
  //   workload: yup.string().required(),
  //   supervisorQualification: yup.string().required(),
  // }).required();

  // const { register, handleSubmit, formState: { errors } } = useForm<FormStep4Input>({ resolver: yupResolver(schema) })
  // const onSubmit = handleSubmit(data => navigate('/formstep3'))

  {/* <SC.ButtonTypeText>
  <div className="formQuestion">
    <label htmlFor="numberOfSupervisors">
      Quantos Supervisores existem na equipe do PCF no seu município?
      <input
        id="numberOfSupervisors"
        name="numeroDeSupervisores"
        type="text"
        autoFocus
        value={questionOne}
        onChange={handleNumberOfSupervisors}
        placeholder="Quantidade"
      />
    </label>
  </div>
  </SC.ButtonTypeText> */}