import * as SC from "../../../styles/styles";
import { Theme } from "../../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { database } from "../../../services/firebase";
import { ref, push, set, update } from "firebase/database";
import { RoomCode } from "../../../components/RoomCode";
import { useRoom } from "../../../hooks/useRoom";
import { TooltipText } from "../../../components/TooltipText";

type RoomParams = {
  id: string;
};

interface WorkHoursVisitors {
  a_visitadoresHorasSemanais40: boolean;
  b_visitadoresHorasSemanais30: boolean;
  c_visitadoresHorasSemanais20: boolean;
  d_visitadoresHorasSemanaisOutros: boolean;
  e_visitadoresHorasSemanaisOutrosDescricao: string;
};

interface VisitorsQualification {
  a_visitadoresEnsinoMedio: string;
  b_visitadoresGraduacaoIncompleto: string;
  c_visitadoresGraduacaoCompleto: string;
  d_visitadoresEspecializacao: string;
  e_visitadoresMestrado: string;
  f_visitadoresDoutorado: string;
};

interface VisitorsTypeRemunaration1 {
  a_visitadoresServidorEfetivo: string;
  b_visitadoresMediaRemuneracaoEfetivo: string;
};

interface VisitorTypeRemunaration2 {
  a_visitadoresCargoComissionado: string;
  b_visitadoresMediaRemuneracaoComissionado: string;
};

interface VisitorTypeRemunaration3 {
  a_visitadoresServidorTemporario: string;
  b_visitadoresMediaRemuneracaoTemporario: string;
};

interface VisitorTypeRemunaration4 {
  a_visitadoresBolsista: string;
  b_visitadoresMediaRemuneracaoBolsista: string;
};

interface VisitorTypeRemunaration5 {
  a_visitadoresEstagiarioNivelSuperior: string;
  b_visitadoresMediaRemuneracaoEstagiarioNivelSuperior: string;

};

interface VisitorTypeRemunaration6 {
  a_visitadoresAutonomos: string;
  b_visitadoresMediaRemuneracaoAutonomos: string;
};

interface VisitorTypeRemunaration7 {
  a_visitadoresOutrosCargos: string;
  b_visitadoresMediaRemuneracaoOutrosCargos: string;
};

export const FormStep5 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState('')
  const [questionTwo, setQuestionTwo] = useState('')
  const [questionThree, setQuestionThree] = useState<WorkHoursVisitors>({
    a_visitadoresHorasSemanais40: false,
    b_visitadoresHorasSemanais30: false,
    c_visitadoresHorasSemanais20: false,
    d_visitadoresHorasSemanaisOutros: false,
    e_visitadoresHorasSemanaisOutrosDescricao: '',
  });
  const [questionFour, setQuestionFour] = useState<VisitorsQualification>({
    a_visitadoresEnsinoMedio: '',
    b_visitadoresGraduacaoIncompleto: '',
    c_visitadoresGraduacaoCompleto: '',
    d_visitadoresEspecializacao: '',
    e_visitadoresMestrado: '',
    f_visitadoresDoutorado: '',
  });
  const [questionFive, setQuestionFive] = useState<VisitorsTypeRemunaration1>({
    a_visitadoresServidorEfetivo: '',
    b_visitadoresMediaRemuneracaoEfetivo: '',
  });
  const [questionSix, setQuestionSix] = useState<VisitorTypeRemunaration2>({
    a_visitadoresCargoComissionado: '',
    b_visitadoresMediaRemuneracaoComissionado: '',
  });
  const [questionSeven, setQuestionSeven] = useState<VisitorTypeRemunaration3>({
    a_visitadoresServidorTemporario: '',
    b_visitadoresMediaRemuneracaoTemporario: '',
  });
  const [questionEight, setQuestionEight] = useState<VisitorTypeRemunaration4>({
    a_visitadoresBolsista: '',
    b_visitadoresMediaRemuneracaoBolsista: '',
  });
  const [questionNine, setQuestionNine] = useState<VisitorTypeRemunaration5>({
    a_visitadoresEstagiarioNivelSuperior: '',
    b_visitadoresMediaRemuneracaoEstagiarioNivelSuperior: '',
  });
  const [questionTen, setQuestionTen] = useState<VisitorTypeRemunaration6>({
    a_visitadoresAutonomos: '',
    b_visitadoresMediaRemuneracaoAutonomos: '',
  });
  const [questionEleven, setQuestionEleven] = useState<VisitorTypeRemunaration7>({
    a_visitadoresOutrosCargos: '',
    b_visitadoresMediaRemuneracaoOutrosCargos: '',
  });

  const [question] = useRoom();

  async function handleSendQuestionVisitor(event: FormEvent) {
    event.preventDefault();

    const questionReq = {
      E_Visitadores_do_PCF: {
        questao32: questionOne,
        questao33: questionTwo,
        questao34: questionThree,
        questao35: questionFour,
        questao36: questionFive,
        questao37: questionSix,
        questao38: questionSeven,
        questao39: questionEight,
        questao40: questionNine,
        questao41: questionTen,
        questao42: questionEleven,
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

    navigate(`/${roomId}/formstep6`);
  };

  const handleNumberOfVisitorsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
  };

  const handleAvarageRemunerationSupervisorsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };

  const handleWorkHoursVisitorsChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionThree({
      ...questionThree,
      [name]: value,
    })
  }, [questionThree]);

  const handleVisitorsQualificationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
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

  const handleTopLevelInternChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionNine({
      ...questionNine,
      [name]: value,
    })
  }, [questionNine]);

  const handleAutonomousRemunerationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionTen({
      ...questionTen,
      [name]: value,
    })
  }, [questionTen]);

  const handleOthersRemunerationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionEleven({
      ...questionEleven,
      [name]: value,
    })
  }, [questionEleven]);

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 5
    });
  }, []);

  useEffect(() => {
    if (question?.length > 0) {
      setQuestionOne(question[0].E_Visitadores_do_PCF.questao32)
      setQuestionTwo(question[0].E_Visitadores_do_PCF.questao33)
      setQuestionThree(question[0].E_Visitadores_do_PCF.questao34)
      setQuestionFour(question[0].E_Visitadores_do_PCF.questao35)
      setQuestionFive(question[0].E_Visitadores_do_PCF.questao36)
      setQuestionSix(question[0].E_Visitadores_do_PCF.questao37)
      setQuestionSeven(question[0].E_Visitadores_do_PCF.questao38)
      setQuestionEight(question[0].E_Visitadores_do_PCF.questao39)
      setQuestionNine(question[0].E_Visitadores_do_PCF.questao40)
      setQuestionTen(question[0].E_Visitadores_do_PCF.questao41)
      setQuestionEleven(question[0].E_Visitadores_do_PCF.questao42)
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

      <form onSubmit={handleSendQuestionVisitor}>

        <SC.SubSection>
          <div className="bgSubSection">
            <p>Subseção Visitadores</p>
          </div>
          <div className="formQuestionV2">

            <SC.ButtonTypeRadio>
              <div className="formQuestion">
                <p
                  className="textFormRadioButton"
                >Quantos Visitadores existem na equipe do PCF no seu município?
                </p>
                <div id="containerOption">
                  <div id="containerOptionSixOption">

                    <div id="containerInputLabelRadioButton">
                      <input
                        required
                        id="NumberOfVisitorsZero"
                        name="NumberOfVisitors"
                        type="radio"
                        value="0"
                        checked={questionOne === "0"}
                        onChange={handleNumberOfVisitorsChange}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="NumberOfVisitorsZero"
                      >0
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="NumberOfVisitorsOne"
                        name="NumberOfVisitors"
                        type="radio"
                        value="1"
                        checked={questionOne === "1"}
                        onChange={handleNumberOfVisitorsChange}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="NumberOfVisitorsOne"
                      >1
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="NumberOfVisitorsTwo"
                        name="NumberOfVisitors"
                        type="radio"
                        value="2"
                        checked={questionOne === "2"}
                        onChange={handleNumberOfVisitorsChange}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="NumberOfVisitorsTwo"
                      >2
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="NumberOfVisitorsThree"
                        name="NumberOfVisitors"
                        type="radio"
                        value="3"
                        checked={questionOne === "3"}
                        onChange={handleNumberOfVisitorsChange}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="NumberOfVisitorsThree"
                      >3
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="NumberOfVisitorsFour"
                        name="NumberOfVisitors"
                        type="radio"
                        value="4_ou_mais"
                        checked={questionOne === "4_ou_mais"}
                        onChange={handleNumberOfVisitorsChange}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="NumberOfVisitorsFour"
                      >4 ou mais
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="NumberOfVisitorsNotApplicable"
                        name="NumberOfVisitors"
                        type="radio"
                        value="Não_se_aplica"
                        checked={questionOne === "Não_se_aplica"}
                        onChange={handleNumberOfVisitorsChange}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="NumberOfVisitorsNotApplicable"
                      >Não se aplica
                      </label>
                    </div>

                  </div>
                </div>
              </div>
            </SC.ButtonTypeRadio>

            <SC.ButtonTypeTextV4>
              <div className="formQuestion">
                <label
                  htmlFor="avarageRemunerationSupervisors"
                >Qual a remuneração média em R$ (reais) dos Visitadores?
                  <div className="textInfo">
                    <input
                      autoComplete="off"
                      required
                      id="avarageRemunerationSupervisors"
                      name="remuneracaoMediaVisitadores"
                      type="number"
                      value={questionTwo}
                      onChange={handleAvarageRemunerationSupervisorsChange}
                      placeholder="Valor em R$"
                    />
                    <TooltipText/>
                  </div>
                </label>
              </div>
            </SC.ButtonTypeTextV4>

            <SC.ButtonTypeCheckbox>
              <div className="formQuestion">
                <p
                  className="textFormRadioButton"
                >Qual a carga horária dos Visitadores?
                </p>
                <div id="containerOption">
                  <div id="containerOptionSixOption">

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionThree?.a_visitadoresHorasSemanais40 && 
                          !questionThree.b_visitadoresHorasSemanais30 &&
                          !questionThree.c_visitadoresHorasSemanais20 &&
                          !questionThree.d_visitadoresHorasSemanaisOutros &&
                          !questionThree.e_visitadoresHorasSemanaisOutrosDescricao
                        }
                        id="visitadoresHorasSemanais40"
                        name="a_visitadoresHorasSemanais40"
                        type="checkbox"
                        checked={questionThree.a_visitadoresHorasSemanais40}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          a_visitadoresHorasSemanais40: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="visitadoresHorasSemanais40"
                      >40 horas semanais
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionThree?.a_visitadoresHorasSemanais40 && 
                          !questionThree.b_visitadoresHorasSemanais30 &&
                          !questionThree.c_visitadoresHorasSemanais20 &&
                          !questionThree.d_visitadoresHorasSemanaisOutros &&
                          !questionThree.e_visitadoresHorasSemanaisOutrosDescricao
                        }
                        id="visitadoresHorasSemanais30"
                        name="b_visitadoresHorasSemanais30"
                        type="checkbox"
                        checked={questionThree.b_visitadoresHorasSemanais30}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          b_visitadoresHorasSemanais30: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="visitadoresHorasSemanais30"
                      >30 horas semanais
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionThree?.a_visitadoresHorasSemanais40 && 
                          !questionThree.b_visitadoresHorasSemanais30 &&
                          !questionThree.c_visitadoresHorasSemanais20 &&
                          !questionThree.d_visitadoresHorasSemanaisOutros &&
                          !questionThree.e_visitadoresHorasSemanaisOutrosDescricao
                        }
                        id="visitadoresHorasSemanais20"
                        name="c_visitadoresHorasSemanais20"
                        type="checkbox"
                        checked={questionThree.c_visitadoresHorasSemanais20}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          c_visitadoresHorasSemanais20: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="visitadoresHorasSemanais20"
                      >20 horas semanais
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionThree?.a_visitadoresHorasSemanais40 && 
                          !questionThree.b_visitadoresHorasSemanais30 &&
                          !questionThree.c_visitadoresHorasSemanais20 &&
                          !questionThree.d_visitadoresHorasSemanaisOutros
                        }
                        id="visitadoresHorasSemanaisOutros"
                        name="d_visitadoresHorasSemanaisOutros"
                        type="checkbox"
                        checked={questionThree.d_visitadoresHorasSemanaisOutros}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          d_visitadoresHorasSemanaisOutros: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="visitadoresHorasSemanaisOutros"
                      >Outros:
                      </label>
                      <input
                        required={
                          !questionThree?.a_visitadoresHorasSemanais40 && 
                          !questionThree.b_visitadoresHorasSemanais30 &&
                          !questionThree.c_visitadoresHorasSemanais20 &&
                          !questionThree.e_visitadoresHorasSemanaisOutrosDescricao
                        }
                        className="inputPlaceholderOther"
                        name="e_visitadoresHorasSemanaisOutrosDescricao"
                        type="text"
                        value={questionThree.e_visitadoresHorasSemanaisOutrosDescricao}
                        onChange={handleWorkHoursVisitorsChange}
                        placeholder="Escreva aqui"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SC.ButtonTypeCheckbox>

            <SC.ButtonTypeTextV3>
              <div className="formQuestion">
                <label
                  htmlFor="containerTextLabelCheckbox"
                >Quantos Visitadores da equipe do PCF tem em seu município:

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="a_visitadoresEnsinoMedio"
                    >Ensino médio:
                    </label>
                    <input
                      required
                      autoComplete="off"
                      className="inputForContainerTextLabelCheckbox"
                      id="a_visitadoresEnsinoMedio"
                      name="a_visitadoresEnsinoMedio"
                      type="number"
                      value={questionFour.a_visitadoresEnsinoMedio}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="b_visitadoresGraduacaoIncompleto"
                    >Superior Incompleto:
                    </label>
                    <input
                      required
                      autoComplete="off"
                      className="inputForContainerTextLabelCheckbox"
                      id="b_visitadoresGraduacaoIncompleto"
                      name="b_visitadoresGraduacaoIncompleto"
                      type="number"
                      value={questionFour.b_visitadoresGraduacaoIncompleto}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="c_visitadoresGraduacaoCompleto"
                    >Superior Completo:
                    </label>
                    <input
                      required
                      autoComplete="off"
                      className="inputForContainerTextLabelCheckbox"
                      id="c_visitadoresGraduacaoCompleto"
                      name="c_visitadoresGraduacaoCompleto"
                      type="number"
                      value={questionFour.c_visitadoresGraduacaoCompleto}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="d_visitadoresEspecializacao"
                    >Especialização:
                    </label>
                    <input
                      required
                      autoComplete="off"
                      className="inputForContainerTextLabelCheckbox"
                      id="d_visitadoresEspecializacao"
                      name="d_visitadoresEspecializacao"
                      type="number"
                      value={questionFour.d_visitadoresEspecializacao}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="e_visitadoresMestrado"
                    >Mestrado:
                    </label>
                    <input
                      required
                      autoComplete="off"
                      className="inputForContainerTextLabelCheckbox"
                      id="e_visitadoresMestrado"
                      name="e_visitadoresMestrado"
                      type="number"
                      value={questionFour.e_visitadoresMestrado}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="f_visitadoresDoutorado"
                    >Doutorado:
                    </label>
                    <input
                      required
                      autoComplete="off"
                      className="inputForContainerTextLabelCheckbox"
                      id="f_visitadoresDoutorado"
                      name="f_visitadoresDoutorado"
                      type="number"
                      value={questionFour.f_visitadoresDoutorado}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                </label>
              </div>
            </SC.ButtonTypeTextV3>

            <SC.ButtonTypeTextV3>
              <div className="formQuestion">
                <div className="testeV1"><TooltipText/></div>
                <label
                  htmlFor="containerLabelCheckboxBorder"
                >Quantos Visitadores da equipe do PCF são contratados nas seguintes categorias em seu município:

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="a_visitadoresServidorEfetivo"
                      >Servidor(a) efetivo(a):
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="a_visitadoresServidorEfetivo"
                        name="a_visitadoresServidorEfetivo"
                        type="number"
                        value={questionFive.a_visitadoresServidorEfetivo}
                        onChange={handleEffectiveRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="b_visitadoresMediaRemuneracaoEfetivo"
                      >Média Remuneração:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="b_visitadoresMediaRemuneracaoEfetivo"
                        name="b_visitadoresMediaRemuneracaoEfetivo"
                        type="number"
                        value={questionFive.b_visitadoresMediaRemuneracaoEfetivo}
                        onChange={handleEffectiveRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="a_visitadoresCargoComissionado"
                      >Cargo comissionado:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="a_visitadoresCargoComissionado"
                        name="a_visitadoresCargoComissionado"
                        type="number"
                        value={questionSix.a_visitadoresCargoComissionado}
                        onChange={handleCommissionedRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="b_visitadoresMediaRemuneracaoComissionado"
                      >Média Remuneração:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="b_visitadoresMediaRemuneracaoComissionado"
                        name="b_visitadoresMediaRemuneracaoComissionado"
                        type="number"
                        value={questionSix.b_visitadoresMediaRemuneracaoComissionado}
                        onChange={handleCommissionedRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="a_visitadoresServidorTemporario"
                      >Servidor temporário:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="a_visitadoresServidorTemporario"
                        name="a_visitadoresServidorTemporario"
                        type="number"
                        value={questionSeven.a_visitadoresServidorTemporario}
                        onChange={handleTemporaryRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="b_visitadoresMediaRemuneracaoTemporario"
                      >Média Remuneração:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="b_visitadoresMediaRemuneracaoTemporario"
                        name="b_visitadoresMediaRemuneracaoTemporario"
                        type="number"
                        value={questionSeven.b_visitadoresMediaRemuneracaoTemporario}
                        onChange={handleTemporaryRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="a_visitadoresBolsista"
                      >Bolsista:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="a_visitadoresBolsista"
                        name="a_visitadoresBolsista"
                        type="number"
                        value={questionEight.a_visitadoresBolsista}
                        onChange={handleScholarshipRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="b_visitadoresMediaRemuneracaoBolsista"
                      >Média Remuneração:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="b_visitadoresMediaRemuneracaoBolsista"
                        name="b_visitadoresMediaRemuneracaoBolsista"
                        type="number"
                        value={questionEight.b_visitadoresMediaRemuneracaoBolsista}
                        onChange={handleScholarshipRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="a_visitadoresEstagiarioNivelSuperior"
                      >Estagiário graduado/graduando:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="a_visitadoresEstagiarioNivelSuperior"
                        name="a_visitadoresEstagiarioNivelSuperior"
                        type="number"
                        value={questionNine.a_visitadoresEstagiarioNivelSuperior}
                        onChange={handleTopLevelInternChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="b_visitadoresMediaRemuneracaoEstagiarioNivelSuperior"
                      >Média Remuneração:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="b_visitadoresMediaRemuneracaoEstagiarioNivelSuperior"
                        name="b_visitadoresMediaRemuneracaoEstagiarioNivelSuperior"
                        type="number"
                        value={questionNine.b_visitadoresMediaRemuneracaoEstagiarioNivelSuperior}
                        onChange={handleTopLevelInternChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="a_visitadoresAutonomos"
                      >Profissional autônomo:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="a_visitadoresAutonomos"
                        name="a_visitadoresAutonomos"
                        type="number"
                        value={questionTen.a_visitadoresAutonomos}
                        onChange={handleAutonomousRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="b_visitadoresMediaRemuneracaoAutonomos"
                      >Média Remuneração:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="b_visitadoresMediaRemuneracaoAutonomos"
                        name="b_visitadoresMediaRemuneracaoAutonomos"
                        type="number"
                        value={questionTen.b_visitadoresMediaRemuneracaoAutonomos}
                        onChange={handleAutonomousRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>
                
                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="a_visitadoresOutrosCargos"
                      >Outros:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="outrosCargosa_visitadoresOutrosCargosVisitador"
                        name="a_visitadoresOutrosCargos"
                        type="number"
                        value={questionEleven.a_visitadoresOutrosCargos}
                        onChange={handleOthersRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="b_visitadoresMediaRemuneracaoOutrosCargos"
                      >Média Remuneração:
                      </label>
                      <input
                        required
                        autoComplete="off"
                        className="inputForContainerTextLabelCheckbox"
                        id="b_visitadoresMediaRemuneracaoOutrosCargos"
                        name="b_visitadoresMediaRemuneracaoOutrosCargos"
                        type="number"
                        value={questionEleven.b_visitadoresMediaRemuneracaoOutrosCargos}
                        onChange={handleOthersRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                </label>
              </div>
            </SC.ButtonTypeTextV3>

          </div>
        </SC.SubSection>

        <SC.AllButtons>
          <Link className="buttonAll" to={`/${roomId}/formstep4`}>Voltar</Link>
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
