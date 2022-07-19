import * as SC from "../../../styles/styles";
import { Theme } from "../../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { database } from "../../../services/firebase";
import { ref, push, set, update } from "firebase/database";
import { Item } from "../../../components/Questions/QuestionOrganizacoesParceiras/types/Item";
import { InputArea } from "../../../components/Questions/QuestionOrganizacoesParceiras/components/InputArea";
import { TableArea } from "../../../components/Questions/QuestionOrganizacoesParceiras/components/TableArea";
import { useRoom } from "../../../hooks/useRoom";


type RoomParams = {
  id: string;
};

export const FormStep8 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [questionTwo, setQuestionTwo] = useState('');
  const [question] = useRoom();

  const handleAddItemPartner = (item: Item) => {
    setList((previous) => [...previous, item])
    return setList
  };

  const removerDaLista = (index: number) => {
    setList((previous) => previous.filter((item, indexPrevious) => index !== indexPrevious))
    return setList
  };

  async function handleSendPartnerOrganizations(event: FormEvent) {
    event.preventDefault();

    const questionReq = {
      H_Organizacoes_Parceiras: {
        questao49: filteredList,
        questao50: questionTwo,
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

    navigate(`/${roomId}/formstep9`)
  };

  const handlePartnershipAndContractingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
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

  useEffect(() => {
    if (question?.length > 0) {
      question[0].H_Organizacoes_Parceiras.questao49.forEach((item: Item) => {
        handleAddItemPartner(item)
      })
      setQuestionTwo(question[0].H_Organizacoes_Parceiras.questao50)
    }
  }, [question]);

  return (
    <Theme>

      <SC.Container> 
        <p>Etapa {state.currentStep}/10</p>
        <h1>Organizações parceiras</h1>
        <p>Informações sobre as organizações participantes e parceiras do PCF</p>
        <hr/>
      </SC.Container>

      <SC.SubSection>
        <div className="formQuestionV1">
          <p>Com qual(is) a(s) organização(ões) possui parceria(s)?</p>

          <SC.Body>
            <InputArea onAdd={handleAddItemPartner} />

            <TableArea
              list={filteredList}
              remover={removerDaLista}
            />
          </SC.Body>

        </div>
      </SC.SubSection>

      <form onSubmit={handleSendPartnerOrganizations}>
        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              O município tem parcerias com organizações da sociedade civil para contratação de equipe?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    required
                    id="PartnershipAndContractingYes"
                    name="PartnershipAndContracting"
                    type="radio"
                    value="Sim"
                    checked={questionTwo === "Sim"}
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
                    checked={questionTwo === "Não"}
                    onChange={handlePartnershipAndContractingChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="PartnershipAndContractingNo"
                  >Não
                  </label>
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>


        <SC.AllButtons>
          <Link className="buttonAll" to={`/${roomId}/formstep7`}>Voltar</Link>
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

