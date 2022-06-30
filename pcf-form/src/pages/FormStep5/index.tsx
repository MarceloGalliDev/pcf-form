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
  horasSemanais40: boolean;
  horasSemanais30: boolean;
  horasSemanais20: boolean;
  horasSemanaisOutros: boolean;
  horasSemanaisOutrosDescricao: string;
};

interface VisitorsQualification {
  superiorIncompleto: string;
  superiorCompleto: string;
  especializacao: string;
  mestrado: string;
  doutorado: string;
};

export const FormStep5 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState('')
  const [questionTwo, setQuestionTwo] = useState('')
  const [questionThree, setQuestionThree] = useState<WorkHoursVisitors>({
    horasSemanais40: false,
    horasSemanais30: false,
    horasSemanais20: false,
    horasSemanaisOutros: false,
    horasSemanaisOutrosDescricao: '',
  });
  const [questionFour, setQuestionFour] = useState<VisitorsQualification>({
    superiorIncompleto: '',
    superiorCompleto: '',
    especializacao: '',
    mestrado: '',
    doutorado: '',
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

      <SC.SubSection>
        <div className="bgSubSection">
          <p>Subseção Visitadores</p>
        </div>
        <div className="formQuestionV2">

          <form onSubmit={handleSendQuestion}>

            <SC.ButtonTypeText>
              <div className="formQuestion">
                <label htmlFor="name">
                  Quantos Visitadores existem na equipe do PCF no seu município?
                  <input
                    name="name"
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
                <label htmlFor="name">
                  Qual a remuneração média em R$ (reais) dos Visitadores?
                  <input
                    name="name"
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
                        name="horasSemanais40"
                        type="checkbox"
                        checked={questionThree.horasSemanais40}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          horasSemanais40: !!event.currentTarget?.checked
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
                        checked={questionThree.horasSemanais30}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          horasSemanais30: !!event.currentTarget?.checked
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
                        checked={questionThree.horasSemanais20}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          horasSemanais20: !!event.currentTarget?.checked
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
                        checked={questionThree.horasSemanaisOutros}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          horasSemanaisOutros: !!event.currentTarget?.checked
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
                        value={questionThree.horasSemanaisOutrosDescricao}
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
                <label htmlFor="">
                  Quantos Visitadores da equipe do PCF tem em seu município:

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="incompleteSuperiorVisitor">Superior Incompleto:</label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="incompleteSuperiorVisitor"
                      name="superiorIncompleto"
                      type="text"
                      value={questionFour.superiorIncompleto}
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
                      name="superiorCompleto"
                      type="text"
                      value={questionFour.superiorCompleto}
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
                      name="especializacao"
                      type="text"
                      value={state.name}
                      onChange={handleNumberOfSupervisors}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="">Mestrado:</label>
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
                      htmlFor=""
                    >Doutorado:
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

                </label>
              </div>
            </SC.ButtonTypeTextV3>

            <SC.ButtonTypeTextV3>
              <div className="formQuestion">
                <label htmlFor="name">
                  Quantos Visitadores da equipe do PCF são contratados nas seguintes categorias em seu município:
                  <div id="containerLabelCheckboxBorder">

                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor=""
                      >Servidor(a) efetivo(a):
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
          </form>

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
    </Theme>
  );
};

