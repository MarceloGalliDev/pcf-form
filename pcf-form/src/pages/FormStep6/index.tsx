import * as SC from "../../styles/styles";
import { Theme } from "../../components/Theme";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../context/FormContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { database } from "../../services/firebase";
import { ref, push, set } from "firebase/database";
import { InputArea } from "../../components/Questions/TableQuestionText/components/InputArea";
import { TableArea } from "../../components/Questions/TableQuestionText/components/TableArea";
import { Item } from "../../components/Questions/TableQuestionText/types/Item";
import { Info } from "phosphor-react";

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

  console.log(filteredList)

  function handleEventPrevent(event: FormEvent) {
    event.preventDefault();
  }

  const removerDaLista = (index: number) => {
    setFilteredList((previous) => previous.filter((item, indexPrevious) => index !== indexPrevious))
    return setFilteredList
  };

  async function handleSendQuestionOthersProfessionals(event: FormEvent) {
    event.preventDefault();

    const question = {
      F_Outros_Profissionais: {
        questao42: filteredList,
        questao43: questionTwo,
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/question`);
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

      <form onSubmit={handleSendQuestionOthersProfessionals}>
        <SC.SubSection>
          <div className="bgSubSection">
            <p>Subseção Outros Profissionais</p>
          </div>
          <div className="formQuestionV2">

            <div className="formQuestionV3">
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

            <SC.ButtonTypeText>
              <div className="formQuestion">
                <label htmlFor="observacaoText">
                  Observações:
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
};



