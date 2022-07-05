import * as SC from "../../styles/styles";
import { Theme } from "../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../context/FormContext";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { database } from "../../services/firebase";
import { ref, push, set } from "firebase/database";

type RoomParams = {
  id: string;
};

interface WorkHoursVisitors {
  visitadoresHorasSemanais40: boolean;
  visitadoresHorasSemanais30: boolean;
  visitadoresHorasSemanais20: boolean;
  visitadoresHorasSemanaisOutros: boolean;
  visitadoresHorasSemanaisOutrosDescricao: string;
};

interface VisitorsQualification {
  visitadoresEnsinoMedio: string;
  visitadoresSuperiorIncompleto: string;
  visitadoresSuperiorCompleto: string;
  visitadoresEspecializacao: string;
  visitadoresMestrado: string;
  visitadoresDoutorado: string;
};

interface VisitorsTypeRemunaration1 {
  visitadoresServidorEfetivo: string;
  visitadoresMediaRemuneracaoEfetivo: string;
};

interface VisitorTypeRemunaration2 {
  visitadoresCargoComissionado: string;
  visitadoresMediaRemuneracaoComissionado: string;
};

interface VisitorTypeRemunaration3 {
  visitadoresServidorTemporario: string;
  visitadoresMediaRemuneracaoTemporario: string;
};

interface VisitorTypeRemunaration4 {
  visitadoresBolsista: string;
  visitadoresMediaRemuneracaoBolsista: string;
};

interface VisitorTypeRemunaration5 {
  visitadoresEstagiarioNivelSuperior: string;
  visitadoresMediaRemuneracaoEstagiarioNivelSuperior: string;

};

interface VisitorTypeRemunaration6 {
  visitadoresAutonomos: string;
  visitadoresMediaRemuneracaoAutonomos: string;
};

interface VisitorTypeRemunaration7 {
  visitadoresOutrosCargos: string;
  visitadoresMediaRemuneracaoOutrosCargos: string;
};

interface HiringVisitorSupervisor {
  visitadoresEdital: boolean;
  visitadoresEquipePropria: boolean;
  visitadoresContratacaoDireta: boolean;
  visitadoresOutro: boolean;
  visitadoresOutrosDescricao: string;
}

export const FormStep5 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState('')
  const [questionTwo, setQuestionTwo] = useState('')
  const [questionThree, setQuestionThree] = useState<WorkHoursVisitors>({
    visitadoresHorasSemanais40: false,
    visitadoresHorasSemanais30: false,
    visitadoresHorasSemanais20: false,
    visitadoresHorasSemanaisOutros: false,
    visitadoresHorasSemanaisOutrosDescricao: '',
  });
  const [questionFour, setQuestionFour] = useState<VisitorsQualification>({
    visitadoresEnsinoMedio: '',
    visitadoresSuperiorIncompleto: '',
    visitadoresSuperiorCompleto: '',
    visitadoresEspecializacao: '',
    visitadoresMestrado: '',
    visitadoresDoutorado: '',
  });
  const [questionFive, setQuestionFive] = useState<VisitorsTypeRemunaration1>({
    visitadoresServidorEfetivo: '',
    visitadoresMediaRemuneracaoEfetivo: '',
  });
  const [questionSix, setQuestionSix] = useState<VisitorTypeRemunaration2>({
    visitadoresCargoComissionado: '',
    visitadoresMediaRemuneracaoComissionado: '',
  });
  const [questionSeven, setQuestionSeven] = useState<VisitorTypeRemunaration3>({
    visitadoresServidorTemporario: '',
    visitadoresMediaRemuneracaoTemporario: '',
  });
  const [questionEight, setQuestionEight] = useState<VisitorTypeRemunaration4>({
    visitadoresBolsista: '',
    visitadoresMediaRemuneracaoBolsista: '',
  });
  const [questionNine, setQuestionNine] = useState<VisitorTypeRemunaration5>({
    visitadoresEstagiarioNivelSuperior: '',
    visitadoresMediaRemuneracaoEstagiarioNivelSuperior: '',
  });
  const [questionTen, setQuestionTen] = useState<VisitorTypeRemunaration6>({
    visitadoresAutonomos: '',
    visitadoresMediaRemuneracaoAutonomos: '',
  });
  const [questionEleven, setQuestionEleven] = useState<VisitorTypeRemunaration7>({
    visitadoresOutrosCargos: '',
    visitadoresMediaRemuneracaoOutrosCargos: '',
  });
  const [questionTwelve, setQuestionTwelve] = useState<HiringVisitorSupervisor>({
    visitadoresEdital: false,
    visitadoresEquipePropria: false,
    visitadoresContratacaoDireta: false,
    visitadoresOutro: false,
    visitadoresOutrosDescricao: '',
  });
  const [questionThirteen, setQuestionThirteen] = useState('');

  async function handleSendQuestionVisitor(event: FormEvent) {
    event.preventDefault();

    if (questionOne.trim() === '') {
      return;
    };
    if (questionTwo.trim() === '') {
      return;
    };

    const question = {
      E_Visitadores_do_PCF: {
        questao29: questionOne,
        questao30: questionTwo,
        questao31: questionThree,
        questao32: questionFour,
        questao33: questionFive,
        questao34: questionSix,
        questao35: questionSeven,
        questao36: questionEight,
        questao37: questionNine,
        questao38: questionTen,
        questao39: questionEleven,
        questao40: questionTwelve,
        questap41: questionThirteen,
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

    navigate(`/${roomId}/formstep6`)
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

  const handleHiringVisitorSupervisorChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionTwelve({
      ...questionTwelve,
      [name]: value,
    })
  }, [questionTwelve]);

  const handlePartnershipAndContractingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionThirteen(event.target.value);
  };

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


            <SC.ButtonTypeText>
              <div className="formQuestion">
                <label htmlFor="numberOfVisitors">
                  Quantos Visitadores existem na equipe do PCF no seu município?
                  <input
                    id="numberOfVisitors"
                    name="numeroDeVisitadores"
                    type="text"
                    autoFocus
                    value={questionOne}
                    onChange={handleNumberOfVisitorsChange}
                    placeholder="Quantidade"
                  />
                </label>
              </div>
            </SC.ButtonTypeText>

            <SC.ButtonTypeText>
              <div className="formQuestion">
                <label htmlFor="avarageRemunerationSupervisors">
                  Qual a remuneração média em R$ (reais) dos Visitadores?
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
                <p className="textFormRadioButton">
                  Qual a carga horária dos Visitadores?
                </p>
                <div id="containerOption">
                  <div id="containerOptionSixOption">

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="WorkHoursForty"
                        name="visitadoresHorasSemanais40"
                        type="checkbox"
                        checked={questionThree.visitadoresHorasSemanais40}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          visitadoresHorasSemanais40: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="WorkHoursForty"
                      >40 horas semanais
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="WorkHoursThirty"
                        name="horasSemanais30"
                        type="checkbox"
                        checked={questionThree.visitadoresHorasSemanais30}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          visitadoresHorasSemanais30: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="lastMonthSpentFevereiro"
                      >30 horas semanais
                      </label>
                    </div>
                    <div id="containerInputLabelRadioButton">
                      <input
                        id="lastMonthSpentFevereiro"
                        name="horasSemanais20"
                        type="checkbox"
                        checked={questionThree.visitadoresHorasSemanais20}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          visitadoresHorasSemanais20: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="lastMonthSpentFevereiro"
                      >20 horas semanais
                      </label>
                    </div>
            
                    <div id="containerInputLabelRadioButton">
                      <input
                        id="lastMonthSpentFevereiro"
                        name="horasSemanaisOutros"
                        type="checkbox"
                        checked={questionThree.visitadoresHorasSemanaisOutros}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          visitadoresHorasSemanaisOutros: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="lastMonthSpentFevereiro"
                      >Outro:
                      </label>
                      <input
                        className="inputPlaceholderOther"
                        name="visitadoresHorasSemanaisOutrosDescricao"
                        type="text"
                        value={questionThree.visitadoresHorasSemanaisOutrosDescricao}
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
                <label htmlFor="containerTextLabelCheckbox">
                  Quantos Visitadores da equipe do PCF tem em seu município:
                
                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="highSchoolVisitor">Ensino médio:</label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="highSchoolVisitor"
                      name="visitadoresEnsinoMedio"
                      type="text"
                      value={questionFour.visitadoresEnsinoMedio}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="incompleteSuperiorVisitor">Superior Incompleto:</label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="incompleteSuperiorVisitor"
                      name="visitadoresSuperiorIncompleto"
                      type="text"
                      value={questionFour.visitadoresSuperiorIncompleto}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="completeSuperiorVisitor">Superior Completo:</label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="completeSuperiorVisitor"
                      name="visitadoresSuperiorCompleto"
                      type="text"
                      value={questionFour.visitadoresSuperiorCompleto}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="specialistVisitor">Especialização:</label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="specialistVisitor"
                      name="visitadoresEspecializacao"
                      type="text"
                      value={questionFour.visitadoresEspecializacao}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="mestradoVisitador">Mestrado:</label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="mestradoVisitador"
                      name="visitadoresMestrado"
                      type="text"
                      value={questionFour.visitadoresMestrado}
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
                      name="visitadoresDoutorado"
                      type="text"
                      value={questionFour.visitadoresDoutorado}
                      onChange={handleVisitorsQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                </label>
              </div>
            </SC.ButtonTypeTextV3>

            <SC.ButtonTypeTextV3>
              <div className="formQuestion">
                <label htmlFor="containerLabelCheckboxBorder">
                  Quantos Visitadores da equipe do PCF são contratados nas seguintes categorias em seu município:

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
                        name="visitadoresServidorEfetivo"
                        type="text"
                        value={questionFive.visitadoresServidorEfetivo}
                        onChange={handleEffectiveRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoEfetivoVisitadores">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoEfetivoVisitadores"
                        name="visitadoresMediaRemuneracaoEfetivo"
                        type="text"
                        value={questionFive.visitadoresMediaRemuneracaoEfetivo}
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
                        name="visitadoresCargoComissionado"
                        type="text"
                        value={questionSix.visitadoresCargoComissionado}
                        onChange={handleCommissionedRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoComissonadoVisitador">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoComissonadoVisitador"
                        name="visitadoresMediaRemuneracaoComissionado"
                        type="text"
                        value={questionSix.visitadoresMediaRemuneracaoComissionado}
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
                        name="visitadoresServidorTemporario"
                        type="text"
                        value={questionSeven.visitadoresServidorTemporario}
                        onChange={handleTemporaryRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoTemporarioVisitador">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoTemporarioVisitador"
                        name="visitadoresMediaRemuneracaoTemporario"
                        type="text"
                        value={questionSeven.visitadoresMediaRemuneracaoTemporario}
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
                        name="visitadoresBolsista"
                        type="text"
                        value={questionEight.visitadoresBolsista}
                        onChange={handleScholarshipRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoBolsistaVisitador">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoBolsistaVisitador"
                        name="visitadoresMediaRemuneracaoBolsista"
                        type="text"
                        value={questionEight.visitadoresMediaRemuneracaoBolsista}
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
                      >Estagiário de nivel superior:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="estagiarioNivelSuperiorVisitador"
                        name="visitadoresEstagiarioNivelSuperior"
                        type="text"
                        value={questionNine.visitadoresEstagiarioNivelSuperior}
                        onChange={handleTopLevelInternChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoEstagiarioNivelSuperior">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoEstagiarioNivelSuperior"
                        name="visitadoresMediaRemuneracaoEstagiarioNivelSuperior"
                        type="text"
                        value={questionNine.visitadoresMediaRemuneracaoEstagiarioNivelSuperior}
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
                      >Autônomo:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="autonomoVisitador"
                        name="visitadoresAutonomos"
                        type="text"
                        value={questionTen.visitadoresAutonomos}
                        onChange={handleAutonomousRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoAutonomoVisitador">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoAutonomoVisitador"
                        name="visitadoresMediaRemuneracaoAutonomos"
                        type="text"
                        value={questionTen.visitadoresMediaRemuneracaoAutonomos}
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
                        name="visitadoresOutrosCargos"
                        type="text"
                        value={questionEleven.visitadoresOutrosCargos}
                        onChange={handleOthersRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoOutrosCargosVisitador">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoOutrosCargosVisitador"
                        name="visitadoresMediaRemuneracaoOutrosCargos"
                        type="text"
                        value={questionEleven.visitadoresMediaRemuneracaoOutrosCargos}
                        onChange={handleOthersRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                </label>
              </div>
            </SC.ButtonTypeTextV3>

            <SC.ButtonTypeCheckbox>
              <div className="formQuestion">
                <p className="textFormRadioButton">
                  Como são realizadas as contratações dos Visitadores e/ou Supervisores em seu município?
                </p>
            
                <div id="containerOption">
                  <div id="containerOptionSixOption">

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="hiringVisitorSupervisorEdital"
                        name="visitadoresEdital"
                        type="checkbox"
                        checked={questionTwelve.visitadoresEdital}
                        onChange={(event) => setQuestionTwelve({
                          ...questionTwelve,
                          visitadoresEdital: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="hiringVisitorSupervisorEdital"
                      >Edital
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="hiringVisitorSupervisorOwnTeam"
                        name="visitadoresEquipePropria"
                        type="checkbox"
                        checked={questionTwelve.visitadoresEquipePropria}
                        onChange={(event) => setQuestionTwelve({
                          ...questionTwelve,
                          visitadoresEquipePropria: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="hiringVisitorSupervisorOwnTeam"
                      >Equipe própria
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="hiringVisitorSupervisorDirectContracting"
                        name="visitadoresContratacaoDireta"
                        type="checkbox"
                        checked={questionTwelve.visitadoresContratacaoDireta}
                        onChange={(event) => setQuestionTwelve({
                          ...questionTwelve,
                          visitadoresContratacaoDireta: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="hiringVisitorSupervisorDirectContracting"
                      >Contratação direta
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="hiringVisitorSupervisorOthers"
                        name="visitadoresOutro"
                        type="checkbox"
                        checked={questionTwelve.visitadoresOutro}
                        onChange={(event) => setQuestionTwelve({
                          ...questionTwelve,
                          visitadoresOutro: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="hiringVisitorSupervisorOthers"
                      >Outro:
                      </label>
                      <input
                        className="inputPlaceholderOther"
                        name="visitadoresOutrosDescricao"
                        type="text"
                        value={questionTwelve.visitadoresOutrosDescricao}
                        onChange={handleHiringVisitorSupervisorChange}
                        placeholder="Escreva aqui"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SC.ButtonTypeCheckbox>
            
            <SC.ButtonTypeRadio>
              <div className="formQuestion">
                <p className="textFormRadioButton">
                  O município tem parcerias com organizações da sociedade civil para contratação de equipe?
                </p>
                <div id="containerOption">
                  <div id="containerOptionSixOption">

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="PartnershipAndContractingYes"
                        name="PartnershipAndContracting"
                        type="radio"
                        value="sim"
                        onChange={handlePartnershipAndContractingChange}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="PartnershipAndContractingYes"
                      >Sim
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="PartnershipAndContractingNo"
                        name="PartnershipAndContracting"
                        type="radio"
                        value="Não"
                        onChange={handlePartnershipAndContractingChange}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="PartnershipAndContractingNo"
                      >Não
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="PartnershipAndContractingDontKnow"
                        name="PartnershipAndContracting"
                        type="radio"
                        value="Não Sei"
                        onChange={handlePartnershipAndContractingChange}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="PartnershipAndContractingDontKnow"
                      >Não sei
                      </label>
                    </div>

                  </div>
                </div>
              </div>
            </SC.ButtonTypeRadio>

          </div>
        </SC.SubSection>

        <SC.AllButtons>
          <Link className="buttonAll" to="/:id/formstep4">Voltar</Link>
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

