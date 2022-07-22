import * as SC from "../../../styles/styles";
import { Theme } from "../../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState }from "react";
import { push, ref, set, update } from "firebase/database";
import { database } from "../../../services/firebase";
import { useRoom } from "../../../hooks/useRoom";

type RoomParams = {
  id: string;
};

interface HiringVisitorSupervisor {
  a_visitadoresEdital: boolean;
  b_visitadoresEquipePropria: boolean;
  c_visitadoresContratacaoDireta: boolean;
  d_visitadoresContratacaoEstagio: boolean,
  e_visitadoresNaoSeAplica: boolean;
  f_visitadoresOutro: boolean;
  g_visitadoresOutrosDescricao: string;
}

export const FormStep3 = () => {
  const params = useParams<RoomParams>();
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const [questionOne, setQuestionOne] = useState('');
  const [questionTwo, setQuestionTwo] = useState('');
  const [questionThree, setQuestionThree] = useState('');
  const [questionFour, setQuestionFour] = useState('');
  const [questionFive, setQuestionFive] = useState('');
  const [questionSix, setQuestionSix] = useState('');
  const [questionSeven, setQuestionSeven] = useState('');
  const [questionEight, setQuestionEight] = useState<HiringVisitorSupervisor>({
    a_visitadoresEdital: false,
    b_visitadoresEquipePropria: false,
    c_visitadoresContratacaoDireta: false,
    d_visitadoresContratacaoEstagio: false,
    e_visitadoresNaoSeAplica: false,
    f_visitadoresOutro: false,
    g_visitadoresOutrosDescricao: '',
  });

  const [isCheckTwo, setIsCheckTwo] = useState('');
  const [isCheckFour, setIsCheckFour] = useState('');
  const [isCheckSix, setIsCheckSix] = useState('');

  const [ question ] = useRoom();

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    const questionReq = {
      C_Gestao_do_PCF: {
        questao14: questionOne,
        questao15: questionTwo,
        questao16: questionThree,
        questao17: questionFour,
        questao18: questionFive,
        questao19: questionSix,
        questao20: questionSeven,
        questao21: questionEight,
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

    navigate(`/${roomId}/formstep4`)
  };

  const handleTeamCoordinatorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
  };

  const handleMeetTheCoordinatorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };
  
  const handleContactCoordinatorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionThree(event.target.value);
  };

  const handleKnowTheMultiplierChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionFour(event.target.value);
  };

  const handleKnowTheMultiplierContactChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionFive(event.target.value);
  };

  const handleSteeringCommitteeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionSix(event.target.value);
  };
  
  const handleSteeringCommitteeMeetingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionSeven(event.target.value);
  };

  const handleHiringVisitorSupervisorChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionEight({
      ...questionEight,
      [name]: value,
    })
  }, [questionEight]);


  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 3
    });
  }, []);

  useEffect(() => {
    if (question?.length > 0) {
      setQuestionOne(question[0].C_Gestao_do_PCF?.questao14)
      setQuestionTwo(question[0].C_Gestao_do_PCF?.questao15)
      setQuestionThree(question[0].C_Gestao_do_PCF?.questao16)
      setQuestionFour(question[0].C_Gestao_do_PCF?.questao17)
      setQuestionFive(question[0].C_Gestao_do_PCF?.questao18)
      setQuestionSix(question[0].C_Gestao_do_PCF?.questao19)
      setQuestionSeven(question[0].C_Gestao_do_PCF?.questao20)
      setQuestionEight(question[0].C_Gestao_do_PCF?.questao21)
    }
    console.log(question)
  }, [question]);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Gestão do PCF</h1>
        <p>Gestão, comitê e equipe do PCF</p>
        <hr />
      </SC.Container>

      <form onSubmit={handleSendQuestion}>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              A equipe do PCF em seu município tem Coordenador?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    required
                    id="teamCoordinatorYes"
                    name="teamCoordinator"
                    type="radio"
                    value="Sim"
                    checked={questionOne === "Sim"}
                    onChange={handleTeamCoordinatorChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="teamCoordinatorYes"
                  >Sim
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="teamCoordinatorNo"
                    name="teamCoordinator"
                    type="radio"
                    value="Não"
                    checked={questionOne === "Não"}
                    onChange={handleTeamCoordinatorChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="teamCoordinatorNo"
                  >Não
                  </label>
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <div className="formQuestion">
              <p className="textFormRadioButton">
                Você conhece o Coordenador Estadual do PCF?
              </p>
              <div id="containerOption">
                <div id="containerOptionSixOption">
                  <div id="containerInputLabelRadioButton">
                    <input
                      required
                      id="meetTheCoordinatorYes"
                      name="meetTheCoordinator"
                      type="radio"
                      value={"sim_Two"}
                      checked={questionTwo === "sim_Two"}
                      onClick={() => setIsCheckTwo("sim_Two")}
                      onChange={handleMeetTheCoordinatorChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="meetTheCoordinatorYes"
                    >Sim
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="meetTheCoordinatorNo"
                      name="meetTheCoordinator"
                      type="radio"
                      value={"nao_Two"}
                      checked={questionTwo === "nao_Two"}
                      onClick={() => setIsCheckTwo("nao_Two")}
                      onChange={handleMeetTheCoordinatorChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="meetTheCoordinatorNo"
                    >Não
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {isCheckTwo === "sim_Two" && (
              <>
                <SC.ButtonTypeRadio>
                  <div className="formQuestion">
                    <p className="textFormRadioButton">
                      Quantas vezes teve contato com ele(a) nos últimos 12 meses?
                    </p>
                    <div id="containerOption">
                      <div id="containerOptionSixOption">
                        <div id="containerInputLabelRadioButton">
                          <input
                            required
                            id="contactCoordinatorZero"
                            name="contactCoordinator"
                            type="radio"
                            value="0"
                            checked={questionThree === "0"}
                            onChange={handleContactCoordinatorChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="contactCoordinatorZero"
                          >0
                          </label>
                        </div>
                        <div id="containerInputLabelRadioButton">
                          <input
                            id="contactCoordinatorOne"
                            name="contactCoordinator"
                            type="radio"
                            value="1"
                            checked={questionThree === "1"}
                            onChange={handleContactCoordinatorChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="contactCoordinatorOne"
                          >1
                          </label>
                        </div>
                        <div id="containerInputLabelRadioButton">
                          <input
                            id="contactCoordinatorTwo"
                            name="contactCoordinator"
                            type="radio"
                            value="2"
                            checked={questionThree === "2"}
                            onChange={handleContactCoordinatorChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="contactCoordinatorTwo"
                          >2
                          </label>
                        </div>
                        <div id="containerInputLabelRadioButton">
                          <input
                            id="contactCoordinatorThree"
                            name="contactCoordinator"
                            type="radio"
                            value="3"
                            checked={questionThree === "3"}
                            onChange={handleContactCoordinatorChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="contactCoordinatorThree"
                          >3
                          </label>
                        </div>
                        <div id="containerInputLabelRadioButton">
                          <input
                            id="contactCoordinatorFour"
                            name="contactCoordinator"
                            type="radio"
                            value="4_ou_mais"
                            checked={questionThree === "4_ou_mais"}
                            onChange={handleContactCoordinatorChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="contactCoordinatorFour"
                          >4 ou mais
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </SC.ButtonTypeRadio>
              </>
            )}
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <div className="formQuestion">
              <p className="textFormRadioButton">
                Você conhece o Multiplicador Estadual do PCF?
              </p>
              <div id="containerOption">
                <div id="containerOptionSixOption">
                  <div id="containerInputLabelRadioButton">
                    <input
                      required
                      id="knowTheMultiplierYes"
                      name="knowTheMultiplier"
                      type="radio"
                      value={"sim_Four"}
                      checked={questionFour === "sim_Four"}
                      onClick={() => setIsCheckFour("sim_Four")}
                      onChange={handleKnowTheMultiplierChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="knowTheMultiplierYes"
                    >Sim
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="knowTheMultiplierNo"
                      name="knowTheMultiplier"
                      type="radio"
                      value={"nao_Four"}
                      checked={questionFour === "nao_Four"}
                      onClick={() => setIsCheckFour("nao_Four")}
                      onChange={handleKnowTheMultiplierChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="knowTheMultiplierNo"
                    >Não
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {isCheckFour === "sim_Four" && (
              <>
                <SC.ButtonTypeRadio>
                  <div className="formQuestion">
                    <p className="textFormRadioButton">
                      Quantas vezes teve contato com ele(a) nos últimos 12 meses?
                    </p>
                    <div id="containerOption">
                      <div id="containerOptionSixOption">
                        <div id="containerInputLabelRadioButton">
                          <input
                            required
                            id="contactMultiplierZero"
                            name="knowTheMultiplierContact"
                            type="radio"
                            value="0"
                            checked={questionFive === "0"}
                            onChange={handleKnowTheMultiplierContactChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="contactMultiplierZero"
                          >0
                          </label>
                        </div>
                        <div id="containerInputLabelRadioButton">
                          <input
                            id="contactMultiplierOne"
                            name="knowTheMultiplierContact"
                            type="radio"
                            value="1"
                            checked={questionFive === "1"}
                            onChange={handleKnowTheMultiplierContactChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="contactMultiplierOne"
                          >1
                          </label>
                        </div>
                        <div id="containerInputLabelRadioButton">
                          <input
                            id="contactMultiplierTwo"
                            name="knowTheMultiplierContact"
                            type="radio"
                            value="2"
                            checked={questionFive === "2"}
                            onChange={handleKnowTheMultiplierContactChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="contactMultiplierTwo"
                          >2
                          </label>
                        </div>
                        <div id="containerInputLabelRadioButton">
                          <input
                            id="contactMultiplierThree"
                            name="knowTheMultiplierContact"
                            type="radio"
                            value="3"
                            checked={questionFive === "3"}
                            onChange={handleKnowTheMultiplierContactChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="contactMultiplierThree"
                          >3
                          </label>
                        </div>
                        <div id="containerInputLabelRadioButton">
                          <input
                            id="contactMultiplierFour"
                            name="knowTheMultiplierContact"
                            type="radio"
                            value="4_ou_mais"
                            checked={questionFive === "4_ou_mais"}
                            onChange={handleKnowTheMultiplierContactChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="contactMultiplierFour"
                          >4 ou mais
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </SC.ButtonTypeRadio>
              </>
            )}
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <div className="formQuestion">
              <p className="textFormRadioButton">
                O município possui Comitê Gestor Municipal do PCF?
              </p>
              <div id="containerOption">
                <div id="containerOptionSixOption">
                  <div id="containerInputLabelRadioButton">
                    <input
                      required
                      id="steeringCommitteeYes"
                      name="steeringCommittee"
                      type="radio"
                      value="sim_Six"
                      checked={questionSix === "sim_Six"}
                      onClick={() => setIsCheckSix("sim_Six")}
                      onChange={handleSteeringCommitteeChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="steeringCommitteeYes"
                    >Sim
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="steeringCommitteeNo"
                      name="steeringCommittee"
                      type="radio"
                      value="nao_Six"
                      checked={questionSix === "nao_Six"}
                      onClick={() => setIsCheckSix("nao_Six")}
                      onChange={handleSteeringCommitteeChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="steeringCommitteeNo"
                    >Não
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="steeringCommitteeDontKnow"
                      name="steeringCommittee"
                      type="radio"
                      value="outros"
                      checked={questionSix === "outros"}
                      onClick={() => setIsCheckSix("outros")}
                      onChange={handleSteeringCommitteeChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="steeringCommitteeDontKnow"
                    >Outros
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="steeringCommitteeNotAplicable"
                      name="steeringCommittee"
                      type="radio"
                      value="nao_se_aplica"
                      checked={questionSix === "nao_se_aplica"}
                      onClick={() => setIsCheckSix("nao_se_aplica")}
                      onChange={handleSteeringCommitteeChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="steeringCommitteeNotAplicable"
                    >Não se aplica
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {isCheckSix === "sim_Six" && (
              <>
                <SC.ButtonTypeRadio>
                  <div className="formQuestion">
                    <p className="textFormRadioButton">
                      Quantas vezes o Comitê Gestor Municipal se reuniu nos últimos 12 meses?
                    </p>
                    <div id="containerOption">
                      <div id="containerOptionSixOption">
                        <div id="containerInputLabelRadioButton">
                          <input
                            required
                            id="steeringCommitteeMeetingZero"
                            name="steeringCommitteeMeeting"
                            type="radio"
                            value="0"
                            checked={questionSeven === "0"}
                            onChange={handleSteeringCommitteeMeetingChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="steeringCommitteeMeetingZero"
                          >0
                          </label>
                        </div>
                        <div id="containerInputLabelRadioButton">
                          <input
                            id="steeringCommitteeMeetingOne"
                            name="steeringCommitteeMeeting"
                            type="radio"
                            value="1"
                            checked={questionSeven === "1"}
                            onChange={handleSteeringCommitteeMeetingChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="steeringCommitteeMeetingOne"
                          >1
                          </label>
                        </div>
                        <div id="containerInputLabelRadioButton">
                          <input
                            id="steeringCommitteeMeetingTwo"
                            name="steeringCommitteeMeeting"
                            type="radio"
                            value="2"
                            checked={questionSeven === "2"}
                            onChange={handleSteeringCommitteeMeetingChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="steeringCommitteeMeetingTwo"
                          >2
                          </label>
                        </div>
                        <div id="containerInputLabelRadioButton">
                          <input
                            id="steeringCommitteeMeetingThree"
                            name="steeringCommitteeMeeting"
                            type="radio"
                            value="3"
                            checked={questionSeven === "3"}
                            onChange={handleSteeringCommitteeMeetingChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="steeringCommitteeMeetingThree"
                          >3
                          </label>
                        </div>
                        <div id="containerInputLabelRadioButton">
                          <input
                            id="steeringCommitteeMeetingFour"
                            name="steeringCommitteeMeeting"
                            type="radio"
                            value="4_ou_mais"
                            checked={questionSeven === "4_ou_mais"}
                            onChange={handleSteeringCommitteeMeetingChange}
                          />
                          <label
                            className="containerTextLabel"
                            htmlFor="steeringCommitteeMeetingFour"
                          >4 ou mais
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </SC.ButtonTypeRadio>
              </>
            )}
          </div>
        </SC.ButtonTypeRadio>


        <SC.ButtonTypeCheckbox>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              Como são realizadas as contratações dos profissionais em seu município?
            </p>
        
            <div id="containerOption">
              <div id="containerOptionSixOption">
                <div id="containerInputLabelRadioButton">
                  <input
                    required={
                      !questionEight?.a_visitadoresEdital && 
                      !questionEight?.b_visitadoresEquipePropria &&
                      !questionEight?.c_visitadoresContratacaoDireta &&
                      !questionEight?.d_visitadoresContratacaoEstagio &&
                      !questionEight?.e_visitadoresNaoSeAplica
                    }
                    id="hiringVisitorSupervisorEdital"
                    name="a_visitadoresEdital"
                    type="checkbox"
                    checked={questionEight.a_visitadoresEdital}
                    onChange={(event) => setQuestionEight({
                      ...questionEight,
                      a_visitadoresEdital: !!event.currentTarget?.checked
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
                    required={
                      !questionEight?.a_visitadoresEdital && 
                      !questionEight?.b_visitadoresEquipePropria &&
                      !questionEight?.c_visitadoresContratacaoDireta &&
                      !questionEight?.d_visitadoresContratacaoEstagio &&
                      !questionEight?.e_visitadoresNaoSeAplica
                    }
                    id="hiringVisitorSupervisorOwnTeam"
                    name="b_visitadoresEquipePropria"
                    type="checkbox"
                    checked={questionEight.b_visitadoresEquipePropria}
                    onChange={(event) => setQuestionEight({
                      ...questionEight,
                      b_visitadoresEquipePropria: !!event.currentTarget?.checked
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
                    required={
                      !questionEight?.a_visitadoresEdital && 
                      !questionEight?.b_visitadoresEquipePropria &&
                      !questionEight?.c_visitadoresContratacaoDireta &&
                      !questionEight?.d_visitadoresContratacaoEstagio &&
                      !questionEight?.e_visitadoresNaoSeAplica
                    }
                    id="hiringVisitorSupervisorDirectContracting"
                    name="c_visitadoresContratacaoDireta"
                    type="checkbox"
                    checked={questionEight.c_visitadoresContratacaoDireta}
                    onChange={(event) => setQuestionEight({
                      ...questionEight,
                      c_visitadoresContratacaoDireta: !!event.currentTarget?.checked
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
                    required={
                      !questionEight?.a_visitadoresEdital && 
                      !questionEight?.b_visitadoresEquipePropria &&
                      !questionEight?.c_visitadoresContratacaoDireta &&
                      !questionEight?.d_visitadoresContratacaoEstagio &&
                      !questionEight?.e_visitadoresNaoSeAplica
                    }
                    id="hiringVisitorSupervisorDirectContractingStage"
                    name="d_visitadoresContratacaoEstagio"
                    type="checkbox"
                    checked={questionEight.d_visitadoresContratacaoEstagio}
                    onChange={(event) => setQuestionEight({
                      ...questionEight,
                      d_visitadoresContratacaoEstagio: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="hiringVisitorSupervisorDirectContractingStage"
                  >Contratação via estágio
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    required={
                      !questionEight?.a_visitadoresEdital && 
                      !questionEight?.b_visitadoresEquipePropria &&
                      !questionEight?.c_visitadoresContratacaoDireta &&
                      !questionEight?.d_visitadoresContratacaoEstagio &&
                      !questionEight?.e_visitadoresNaoSeAplica
                    }
                    id="hiringVisitorSupervisorNotApplicable"
                    name="e_visitadoresNaoSeAplica"
                    type="checkbox"
                    checked={questionEight.e_visitadoresNaoSeAplica}
                    onChange={(event) => setQuestionEight({
                      ...questionEight,
                      e_visitadoresNaoSeAplica: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="hiringVisitorSupervisorNotApplicable"
                  >Não se aplica
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    required={
                      !questionEight?.a_visitadoresEdital && 
                      !questionEight?.b_visitadoresEquipePropria &&
                      !questionEight?.c_visitadoresContratacaoDireta &&
                      !questionEight?.d_visitadoresContratacaoEstagio &&
                      !questionEight?.e_visitadoresNaoSeAplica
                    }
                    id="hiringVisitorSupervisorOthers"
                    name="f_visitadoresOutro"
                    type="checkbox"
                    checked={questionEight.f_visitadoresOutro}
                    onChange={(event) => setQuestionEight({
                      ...questionEight,
                      f_visitadoresOutro: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="hiringVisitorSupervisorOthers"
                  >Outros:
                  </label>
                  <input
                    className="inputPlaceholderOther"
                    name="g_visitadoresOutrosDescricao"
                    type="text"
                    value={questionEight.g_visitadoresOutrosDescricao}
                    onChange={handleHiringVisitorSupervisorChange}
                    placeholder="Escreva aqui"
                  />
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeCheckbox>

        <SC.AllButtons>
          <Link className="buttonAll" to={`/${roomId}/formstep2`}>Voltar</Link>
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

  // const { register, handleSubmit, formState: { errors } } = useForm<FormStep3Input>({ resolver: yupResolver(schema) })
  // const onSubmit = handleSubmit(data => navigate('/formstep3'));

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

  // a_visitadoresEdital == false &&
  //       b_visitadoresEquipePropria == false &&
  //       c_visitadoresContratacaoDireta == false &&
  //       d_visitadoresContratacaoEstagio == false &&
  //       e_visitadoresNaoSeAplica == false &&
  //       f_visitadoresOutro == false &&
  //       g_visitadoresOutrosDescricao == ''
