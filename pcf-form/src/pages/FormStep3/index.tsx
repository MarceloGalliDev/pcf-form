import * as SC from "../../styles/styles";
import { Theme } from "../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../context/FormContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../services/firebase";

type RoomParams = {
  id: string;
};

export const FormStep3 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState('')
  const [questionTwo, setQuestionTwo] = useState('')
  const [questionThree, setQuestionThree] = useState('')
  const [questionFour, setQuestionFour] = useState('')
  const [questionFive, setQuestionFive] = useState('')
  const [questionSix, setQuestionSix] = useState('')

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    const question = {
      C_Gestao_do_PCF: {
        questao14: questionOne,
        questao15: questionTwo,
        questao16: questionThree,
        questao17: questionFour,
        questao18: questionFive,
        questao19: questionSix,
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

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

  const handleSteeringCommitteeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionFive(event.target.value);
  };
  
  const handleSteeringCommitteeMeetingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionSix(event.target.value);
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 3
    });
  }, []);

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
                    id="teamCoordinatorYes"
                    name="teamCoordinator"
                    type="radio"
                    value="Sim"
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
                    onChange={handleTeamCoordinatorChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="teamCoordinatorNo"
                  >Não
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="teamCoordinatorDontKnow"
                    name="teamCoordinator"
                    type="radio"
                    value="Não"
                    onChange={handleTeamCoordinatorChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="teamCoordinatorDontKnow"
                  >Não sei
                  </label>
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              Você conhece o Coordenador Estadual do PCF?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">
        
                <div id="containerInputLabelRadioButton">
                  <input
                    id="meetTheCoordinatorYes"
                    name="meetTheCoordinator"
                    type="radio"
                    value="Sim"
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
                    value="Não"
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
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              Quantas vezes teve contato com ele(a) nos últimos 12 meses?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">
        
                <div id="containerInputLabelRadioButton">
                  <input
                    id="contactCoordinatorZero"
                    name="contactCoordinator"
                    type="radio"
                    value="0"
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
                    value="4 ou mais"
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

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              Você conhece o Multiplicador Estadual do PCF?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">
        
                <div id="containerInputLabelRadioButton">
                  <input
                    id="knowTheMultiplierYes"
                    name="knowTheMultiplier"
                    type="radio"
                    value="Sim"
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
                    value="Não"
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
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              O município possui Comitê Gestor Municipal do PCF?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">
        
                <div id="containerInputLabelRadioButton">
                  <input
                    id="steeringCommitteeYes"
                    name="steeringCommittee"
                    type="radio"
                    value="Sim"
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
                    value="Não"
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
                    value="Não sei"
                    onChange={handleSteeringCommitteeChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="steeringCommitteeDontKnow"
                  >Não sei
                  </label>
                </div>
              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              Quantas vezes o Comitê Gestor Municipal se reuniu nos últimos 12 meses?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">
        
                <div id="containerInputLabelRadioButton">
                  <input
                    id="steeringCommitteeMeetingZero"
                    name="steeringCommitteeMeeting"
                    type="radio"
                    value="0"
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
                    value="4 ou mais"
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

        <SC.AllButtons>
          <Link className="buttonAll" to="/:id/formstep2">Voltar</Link>
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
