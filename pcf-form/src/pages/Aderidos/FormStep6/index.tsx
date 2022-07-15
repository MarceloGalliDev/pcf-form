import * as SC from "../../../styles/styles";
import { Theme } from "../../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { database } from "../../../services/firebase";
import { ref, push, set } from "firebase/database";
import { InputArea } from "../../../components/Questions/QuestionOutrosProfissionais/components/InputArea";
import { TableArea } from "../../../components/Questions/QuestionOutrosProfissionais/components/TableArea";
import { Item } from "../../../components/Questions/QuestionOutrosProfissionais/types/Item";


type RoomParams = {
  id: string;
};

export const FormStep6 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [questionTwo, setQuestionTwo] = useState('');

  function handleAddItemText(item: Item) {
    let newList = [...list]
    newList.push(item)
    setList(newList)
  };

  const removerDaLista = (index: number) => {
    setList((previous) => previous.filter((item, indexPrevious) => index !== indexPrevious))
    return setList
  };

  async function handleSendQuestionOthersProfessionals(event: FormEvent) {
    event.preventDefault();

    const question = {
      F_Outros_Profissionais: {
        questao43: filteredList,
        questao44: questionTwo,
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/aderidos/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

    navigate(`/${roomId}/formstep7`)
  };

  const handleObservationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 6
    });
  }, []);

  useEffect(() => {
    setFilteredList(list)
  }, [list]);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Outros profissionais</h1>
        <p>Informações sobre os atores/ participantes da equipe do PCF</p>
        <hr />
      </SC.Container>

      <SC.SubSection>
        <div className="bgSubSection">
          <p>Subseção Outros Profissionais</p>
        </div>
        <div className="formQuestionV2">
          <SC.ContainerV2>
            <SC.Body>

              <InputArea onAdd={handleAddItemText} />

              <TableArea
                list={filteredList}
                remover={removerDaLista}
              />

            </SC.Body>
          </SC.ContainerV2>
        </div>
      </SC.SubSection>

      <form onSubmit={handleSendQuestionOthersProfessionals}>
        <SC.ButtonTypeText>
          <div className="formQuestion">
            <label
              htmlFor="observacaoText"
            >Observações:
              <input
                id="observacaoText"
                name="observation"
                type="text"
                value={questionTwo}
                onChange={handleObservationChange}
                placeholder="Sua resposta"
              />
            </label>
          </div>
        </SC.ButtonTypeText>


        <SC.AllButtons>
          <Link className="buttonAll" to={`/${roomId}/formstep5`}>Voltar</Link>
          <button
            className="buttonAll"
            type="submit"
          >Próximo
          </button>
        </SC.AllButtons>
      </form>

    </Theme>
  )
};



