import * as SC from "../../styles/styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { database } from "../../services/firebase";
import { ref, push, set } from "firebase/database";
import { Item } from "../../components/Questions/QuestionOrganizacoesParceiras/types/Item"
import { InputArea } from "../../components/Questions/QuestionOrganizacoesParceiras/components/InputArea"
import { TableArea } from "../../components/Questions/QuestionOrganizacoesParceiras/components/TableArea"


type RoomParams = {
  id: string;
};

export const FormStep8 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  
  const [questionOne, setQuestionOne] = useState('')
  const [questionTwo, setQuestionTwo] = useState('')
  const [questionThree, setQuestionThree] = useState('')

  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([]);

  function handleAddItemPartner(item: Item) {
    let newList = [...list]
    newList.push(item)
    setList(newList)
  };

  const removerDaLista = (index: number) => {
    setFilteredList((previous) => previous.filter((item, indexPrevious) => index !== indexPrevious))
    return setFilteredList
  };

  async function handleSendPartnerOrganizations(event: FormEvent) {
    event.preventDefault();

    const question = {
      H_Organizacoes_Parceiras: {
        questao48: questionOne,
        questao49: filteredList,
        questao50: questionThree,
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

    navigate(`/${roomId}/formstep9`)
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 8
    });
  }, []);

  useEffect(() => {
    setFilteredList(list)
  }, [list]);

  return (
    <Theme>

      <SC.Container> 
        <p>Etapa {state.currentStep}/10</p>
        <h1>Organizações parceiras</h1>
        <p>Informações sobre as organizações participantes e parceiras do PCF</p>
        <hr/>
      </SC.Container>

      <form onSubmit={handleSendPartnerOrganizations}>
        <SC.SubSection>
          <div className="formQuestionV1">
            <p>Com qual(is) a(s) organização(ões) possui parceria(s)?</p>

              <div className="containerTable">
                <SC.Body>
                  <InputArea onAdd={handleAddItemPartner} />
                  <TableArea
                    list={filteredList}
                    remover={removerDaLista}
                  />
                </SC.Body>
              </div>

          </div>
        </SC.SubSection>



        <SC.AllButtons>
          <Link className="buttonAll" to="/:id/formstep9">Voltar</Link>
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

