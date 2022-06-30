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
  visitadoresSuperiorIncompleto: string;
  visitadoresSuperiorCompleto: string;
  visitadoresEspecializacao: string;
  visitadoresMestrado: string;
  doutoradoVisitadores: string;
};

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
    visitadoresSuperiorIncompleto: '',
    visitadoresSuperiorCompleto: '',
    visitadoresEspecializacao: '',
    visitadoresMestrado: '',
    visitadoresDoutorado: '',
  });
  const [questionFive, setQuestionFive] = useState('')
  const [questionSix, setQuestionSix] = useState('')
  const [questionSeven, setQuestionSeven] = useState('')
  const [questionEight, setQuestionEight] = useState('')
  const [questionNine, setQuestionNine] = useState('')
  const [questionTen, setQuestionTen] = useState('')
  const [questionEleven, setQuestionEleven] = useState('')
  const [questionTwelve, setQuestionTwelve] = useState('')

  async function handleSendQuestion(event: FormEvent) {
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

  const handleVisotorsQualificationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionFour({
      ...questionFour,
      [name]: value,
    })
  }, [questionFour]);

  const handleNumberOfSupervisors = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
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
        <p>Etapa {state.currentStep}/8</p>
        <h1>Equipe do PCF</h1>
        <p>Informações sobre os atores/ participantes da equipe do PCF</p>
        <hr />
      </SC.Container>

      <form onSubmit={handleSendQuestion}>

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
                          name="name"
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
                        htmlFor="incompleteSuperiorVisitor">Superior Incompleto:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="incompleteSuperiorVisitor"
                        name="superiorIncompletoVisitador"
                        type="text"
                        value={questionFour.visitadoresSuperiorIncompleto}
                        onChange={handleVisotorsQualificationChange}
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
                        name="superiorCompletoVisitador"
                        type="text"
                        value={questionFour.superiorCompletoVisitadores}
                        onChange={handleVisotorsQualificationChange}
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
                        name="especializacaoVisitador"
                        type="text"
                        value={questionFour.especializacaoVisitadores}
                        onChange={handleVisotorsQualificationChange}
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
                        name="masterVisitor"
                        type="text"
                        value={questionFour.mestradoVisitadores}
                        onChange={handleVisotorsQualificationChange}
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
                        name="doctorVisitador"
                        type="text"
                        value={questionFour.doutoradoVisitadores}
                        onChange={handleVisotorsQualificationChange}
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
                          name="servidorEfetivoVisitadores"
                          type="text"
                          value={state.name}
                          onChange={handleNumberOfSupervisors}
                          placeholder="Sua resposta"
                        />
                      </div>
                      <div id="containerTextLabelCheckbox">
                        <label
                          className="labelForContainerTextLabelCheckbox"
                          htmlFor="">Média Remuneração:</label>
                        <input
                          className="inputForContainerTextLabelCheckbox"
                          name="name"
                          type="text"
                          value={state.name}
                          onChange={handleNumberOfSupervisors}
                          placeholder="Sua resposta"
                        />
                      </div>
                    </div>

                    <div id="containerLabelCheckboxBorder">
                      <div id="containerTextLabelCheckbox">
                        <label
                          className="labelForContainerTextLabelCheckbox"
                          htmlFor=""
                        >Cargo comissionado:
                        </label>
                        <input
                          className="inputForContainerTextLabelCheckbox"
                          name="name"
                          type="text"
                          value={state.name}
                          onChange={handleNumberOfSupervisors}
                          placeholder="Sua resposta"
                        />
                      </div>
                      <div id="containerTextLabelCheckbox">
                        <label
                          className="labelForContainerTextLabelCheckbox"
                          htmlFor="">Média Remuneração:</label>
                        <input
                          className="inputForContainerTextLabelCheckbox"
                          name="name"
                          type="text"
                          value={state.name}
                          onChange={handleNumberOfSupervisors}
                          placeholder="Sua resposta"
                        />
                      </div>
                    </div>

                    <div id="containerLabelCheckboxBorder">
                      <div id="containerTextLabelCheckbox">
                        <label
                          className="labelForContainerTextLabelCheckbox"
                          htmlFor=""
                        >Servidor temporário:
                        </label>
                        <input
                          className="inputForContainerTextLabelCheckbox"
                          name="name"
                          type="text"
                          value={state.name}
                          onChange={handleNumberOfSupervisors}
                          placeholder="Sua resposta"
                        />
                      </div>
                      <div id="containerTextLabelCheckbox">
                        <label
                          className="labelForContainerTextLabelCheckbox"
                          htmlFor="">Média Remuneração:</label>
                        <input
                          className="inputForContainerTextLabelCheckbox"
                          name="name"
                          type="text"
                          value={state.name}
                          onChange={handleNumberOfSupervisors}
                          placeholder="Sua resposta"
                        />
                      </div>
                    </div>

                    <div id="containerLabelCheckboxBorder">
                      <div id="containerTextLabelCheckbox">
                        <label
                          className="labelForContainerTextLabelCheckbox"
                          htmlFor=""
                        >Bolsista:
                        </label>
                        <input
                          className="inputForContainerTextLabelCheckbox"
                          name="name"
                          type="text"
                          value={state.name}
                          onChange={handleNumberOfSupervisors}
                          placeholder="Sua resposta"
                        />
                      </div>
                      <div id="containerTextLabelCheckbox">
                        <label
                          className="labelForContainerTextLabelCheckbox"
                          htmlFor="">Média Remuneração:</label>
                        <input
                          className="inputForContainerTextLabelCheckbox"
                          name="name"
                          type="text"
                          value={state.name}
                          onChange={handleNumberOfSupervisors}
                          placeholder="Sua resposta"
                        />
                      </div>
                    </div>

                    <div id="containerLabelCheckboxBorder">
                      <div id="containerTextLabelCheckbox">
                        <label
                          className="labelForContainerTextLabelCheckbox"
                          htmlFor=""
                        >Estagiário de nivel superior:
                        </label>
                        <input
                          className="inputForContainerTextLabelCheckbox"
                          name="name"
                          type="text"
                          value={state.name}
                          onChange={handleNumberOfSupervisors}
                          placeholder="Sua resposta"
                        />
                      </div>
                      <div id="containerTextLabelCheckbox">
                        <label
                          className="labelForContainerTextLabelCheckbox"
                          htmlFor="">Média Remuneração:</label>
                        <input
                          className="inputForContainerTextLabelCheckbox"
                          name="name"
                          type="text"
                          value={state.name}
                          onChange={handleNumberOfSupervisors}
                          placeholder="Sua resposta"
                        />
                      </div>
                    </div>

                    <div id="containerLabelCheckboxBorder">
                      <div id="containerTextLabelCheckbox">
                        <label
                          className="labelForContainerTextLabelCheckbox"
                          htmlFor=""
                        >Outros:
                        </label>
                        <input
                          className="inputForContainerTextLabelCheckbox"
                          name="name"
                          type="text"
                          value={state.name}
                          onChange={handleNumberOfSupervisors}
                          placeholder="Sua resposta"
                        />
                      </div>
                      <div id="containerTextLabelCheckbox">
                        <label
                          className="labelForContainerTextLabelCheckbox"
                          htmlFor="">Média Remuneração:</label>
                        <input
                          className="inputForContainerTextLabelCheckbox"
                          name="name"
                          type="text"
                          value={state.name}
                          onChange={handleNumberOfSupervisors}
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
                          id="lastMonthSpentJaneiro"
                          name="lastMonthSpentData"
                          type="checkbox"
                          value="sim"
                          onChange={handleNumberOfSupervisors}
                        />
                        <label
                          className="containerTextLabel"
                          htmlFor="lastMonthSpentJaneiro"
                        >Edital
                        </label>
                      </div>
                      <div id="containerInputLabelRadioButton">
                        <input
                          id="lastMonthSpentFevereiro"
                          name="lastMonthSpentData"
                          type="checkbox"
                          value="Não"
                          onChange={handleNumberOfSupervisors}
                        />
                        <label
                          className="containerTextLabel"
                          htmlFor="lastMonthSpentFevereiro"
                        >Equipe própria
                        </label>
                      </div>
                      <div id="containerInputLabelRadioButton">
                        <input
                          id="lastMonthSpentFevereiro"
                          name="lastMonthSpentData"
                          type="checkbox"
                          value="Não"
                          onChange={handleNumberOfSupervisors}
                        />
                        <label
                          className="containerTextLabel"
                          htmlFor="lastMonthSpentFevereiro"
                        >Contratação direta
                        </label>
                      </div>
                      <div id="containerInputLabelRadioButton">
                        <input
                          id="lastMonthSpentFevereiro"
                          name="lastMonthSpentData"
                          type="checkbox"
                          value="Não"
                          onChange={handleNumberOfSupervisors}
                        />
                        <label
                          className="containerTextLabel"
                          htmlFor="lastMonthSpentFevereiro"
                        >Outro:
                        </label>
                        <input
                          className="inputPlaceholderOther"
                          name="name"
                          type="text"
                          value={state.name}
                          onChange={handleNumberOfSupervisors}
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
                          id="lastMonthSpentJaneiro"
                          name="lastMonthSpentData"
                          type="radio"
                          value="sim"
                          onChange={handleNumberOfSupervisors}
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
                          onChange={handleNumberOfSupervisors}
                        />
                        <label
                          className="containerTextLabel"
                          htmlFor="lastMonthSpentFevereiro"
                        >Não
                        </label>
                      </div>
                      <div id="containerInputLabelRadioButton">
                        <input
                          id="lastMonthSpentFevereiro"
                          name="lastMonthSpentData"
                          type="radio"
                          value="Não"
                          onChange={handleNumberOfSupervisors}
                        />
                        <label
                          className="containerTextLabel"
                          htmlFor="lastMonthSpentFevereiro"
                        >Não sei
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </SC.ButtonTypeRadio>

          </div>
        </SC.SubSection>
      </form>

      <SC.AllButtons>
        <Link className="buttonAll" to="/:id/formstep4">Voltar</Link>
        <button
          className="buttonAll"
          type="submit"
        >Próximo
        </button>
      </SC.AllButtons>
    </Theme>
  );
};

