import * as SC from "../../styles/styles";
import { Theme } from "../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../context/FormContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { database } from "../../services/firebase";
import { ref, push, set } from "firebase/database";

type RoomParams = {
  id: string;
};

export const FormStep6 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState('');
  const [questionTwo, setQuestionTwo] = useState('');
  const [questionThree, setQuestionThree] = useState('');

  async function handleSendQuestionOthersProfessionals(event: FormEvent) {
    event.preventDefault();

    const question = {
      E_Visitadores_do_PCF: {
        questao42: questionOne,
        questao43: questionTwo,
        questao44: questionThree,
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

    navigate(`/${roomId}/formstep7`)
  };

  const handleNumberOfVisitorsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
  };


  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 6
    });
  }, []);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Outros profissionais</h1>
        <p>Informações sobre os atores/ participantes da equipe do PCF</p>
        <hr/>
      </SC.Container>

      <form onSubmit={handleSendQuestionOthersProfessionals}>

        <SC.SubSection>
          <div className="bgSubSection">
            <p>Subseção Outros Profissionais</p>
          </div>
          <div className="formQuestionV2">

            <SC.ButtonTypeText>
              <div className="formQuestion">
                <label htmlFor="name">
                  Indique outros profissionais remunerados pelo PCF?
                  <input
                    name="name"
                    type="text"
                    value={state.name}
                    onChange={handleNumberOfVisitorsChange}
                    placeholder="Sua resposta"
                  />
                </label>
              </div>
            </SC.ButtonTypeText>

            <SC.ButtonTypeText>
              <div className="formQuestion">
                <label htmlFor="name">
                  Qual a remuneração média em R$ (reais) desses outros profissionais?
                  <input
                    name="name"
                    type="text"
                    value={state.name}
                    onChange={handleNumberOfVisitorsChange}
                    placeholder="Valor em R$"
                  />
                </label>
              </div>
            </SC.ButtonTypeText>

            <SC.ButtonTypeText>
              <div className="formQuestion">
                <label htmlFor="name">
                  Observações:
                  <input
                    name="name"
                    type="text"
                    value={state.name}
                    onChange={handleNumberOfVisitorsChange}
                    placeholder="Sua resposta"
                  />
                </label>
              </div>
            </SC.ButtonTypeText>
          </div>
        </SC.SubSection>

        <SC.AllButtons>
          <Link className="buttonAll" to="/:id/formstep5">Voltar</Link>
          <button
            className="buttonAll"
            type="submit"
            >Próximo
          </button>
        </SC.AllButtons>

      </form>
    </Theme>
  )
}

