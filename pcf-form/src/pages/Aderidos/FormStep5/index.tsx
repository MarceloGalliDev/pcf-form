import * as SC from "../../../styles/styles";
import { Theme } from "../../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { database } from "../../../services/firebase";
import { ref, push, set } from "firebase/database";
import { RoomCode } from "../../../components/RoomCode";

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
 

  async function handleSendQuestionVisitor(event: FormEvent) {
    event.preventDefault();

    const question = {
      E_Visitadores_do_PCF: {
        questao30: questionOne,
        questao31: questionTwo,
        questao32: questionThree,
        questao33: questionFour,
        questao34: questionFive,
        questao35: questionSix,
        questao36: questionSeven,
        questao37: questionEight,
        questao38: questionNine,
        questao39: questionTen,
        questao40: questionEleven,
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question);

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
                        id="NumberOfVisitorsZero"
                        name="NumberOfVisitors"
                        type="radio"
                        value="0"
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

            <SC.ButtonTypeText>
              <div className="formQuestion">
                <label
                  htmlFor="avarageRemunerationSupervisors"
                >Qual a remuneração média em R$ (reais) dos Visitadores?
                <input
                  id="avarageRemunerationSupervisors"
                  name="remuneracaoMediaVisitadores"
                  type="text"
                  value={questionTwo}
                  onChange={handleAvarageRemunerationSupervisorsChange}
                  placeholder="Valor em R$"
                  />
                </label>
              </div>
            </SC.ButtonTypeText>

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
                      htmlFor="highSchoolVisitor"
                    >Ensino médio:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="highSchoolVisitor"
                      name="a_visitadoresEnsinoMedio"
                      type="text"
                      value={questionFour.a_visitadoresEnsinoMedio}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="visitadoresSuperiorIncompleto"
                    >Superior Incompleto:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="visitadoresSuperiorIncompleto"
                      name="b_visitadoresGraduacaoIncompleto"
                      type="text"
                      value={questionFour.b_visitadoresGraduacaoIncompleto}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="visitadoresGraduacaoCompleto"
                    >Superior Completo:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="visitadoresGraduacaoCompleto"
                      name="c_visitadoresGraduacaoCompleto"
                      type="text"
                      value={questionFour.c_visitadoresGraduacaoCompleto}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="specialistVisitor"
                    >Especialização:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="specialistVisitor"
                      name="d_visitadoresEspecializacao"
                      type="text"
                      value={questionFour.d_visitadoresEspecializacao}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="mestradoVisitador"
                    >Mestrado:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="mestradoVisitador"
                      name="e_visitadoresMestrado"
                      type="text"
                      value={questionFour.e_visitadoresMestrado}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="doutoradoVisitador"
                    >Doutorado:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="doutoradoVisitador"
                      name="f_visitadoresDoutorado"
                      type="text"
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
                <label
                  htmlFor="containerLabelCheckboxBorder"
                >Quantos Visitadores da equipe do PCF são contratados nas seguintes categorias em seu município:

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="servidorefetivoVisitadores"
                      >Servidor(a) efetivo(a):
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="servidorEfetivoVisitadores"
                        name="a_visitadoresServidorEfetivo"
                        type="text"
                        value={questionFive.a_visitadoresServidorEfetivo}
                        onChange={handleEffectiveRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoEfetivoVisitadores"
                      >Média Remuneração:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoEfetivoVisitadores"
                        name="b_visitadoresMediaRemuneracaoEfetivo"
                        type="text"
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
                        htmlFor="cargoComissionadoVisitadores"
                      >Cargo comissionado:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="cargoComissionadoVisitadores"
                        name="a_visitadoresCargoComissionado"
                        type="text"
                        value={questionSix.a_visitadoresCargoComissionado}
                        onChange={handleCommissionedRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoComissonadoVisitador"
                      >Média Remuneração:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="b_mediaRemuneracaoComissonadoVisitador"
                        name="visitadoresMediaRemuneracaoComissionado"
                        type="text"
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
                        htmlFor="servidorTemporarioVisitador"
                      >Servidor temporário:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="servidorTemporarioSupervisor"
                        name="a_visitadoresServidorTemporario"
                        type="text"
                        value={questionSeven.a_visitadoresServidorTemporario}
                        onChange={handleTemporaryRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoTemporarioVisitador"
                      >Média Remuneração:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoTemporarioVisitador"
                        name="b_visitadoresMediaRemuneracaoTemporario"
                        type="text"
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
                        htmlFor="bolsistaVisitador"
                      >Bolsista:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="bolsistaVisitador"
                        name="a_visitadoresBolsista"
                        type="text"
                        value={questionEight.a_visitadoresBolsista}
                        onChange={handleScholarshipRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoBolsistaVisitador"
                      >Média Remuneração:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoBolsistaVisitador"
                        name="b_visitadoresMediaRemuneracaoBolsista"
                        type="text"
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
                        htmlFor="estagiarioNivelSuperiorVisitador"
                      >Estagiário graduado/graduando:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="estagiarioNivelSuperiorVisitador"
                        name="a_visitadoresEstagiarioNivelSuperior"
                        type="text"
                        value={questionNine.a_visitadoresEstagiarioNivelSuperior}
                        onChange={handleTopLevelInternChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoEstagiarioNivelSuperior"
                      >Média Remuneração:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoEstagiarioNivelSuperior"
                        name="b_visitadoresMediaRemuneracaoEstagiarioNivelSuperior"
                        type="text"
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
                        htmlFor="autonomoVisitador"
                      >Profissional autônomo:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="autonomoVisitador"
                        name="a_visitadoresAutonomos"
                        type="text"
                        value={questionTen.a_visitadoresAutonomos}
                        onChange={handleAutonomousRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoAutonomoVisitador"
                      >Média Remuneração:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoAutonomoVisitador"
                        name="b_visitadoresMediaRemuneracaoAutonomos"
                        type="text"
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
                        htmlFor="outrosCargosVisitador"
                      >Outros:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="outrosCargosVisitador"
                        name="a_visitadoresOutrosCargos"
                        type="text"
                        value={questionEleven.a_visitadoresOutrosCargos}
                        onChange={handleOthersRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoOutrosCargosVisitador"
                      >Média Remuneração:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoOutrosCargosVisitador"
                        name="b_visitadoresMediaRemuneracaoOutrosCargos"
                        type="text"
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
          <Link className="buttonAll" to="/:id/formstep4">Voltar</Link>
          <button
            className="buttonAll"
            type="submit"
            >Próximo
          </button>
          <RoomCode/>
        </SC.AllButtons>
      </form>
    </Theme>
  );
};
