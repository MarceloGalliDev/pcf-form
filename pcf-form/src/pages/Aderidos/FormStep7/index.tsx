import * as SC from "../../../styles/styles";
import { Theme } from "../../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { database } from "../../../services/firebase";
import { ref, push, set, update } from "firebase/database";
import { useRoom } from "../../../hooks/useRoom";

type RoomParams = {
  id: string;
};

export const FormStep7 = () => {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState('');
  const [questionTwo, setQuestionTwo] = useState('');
  const [questionThree, setQuestionThree] = useState('');
  const [questionFour, setQuestionFour] = useState('');

  const [question] = useRoom();

  async function handleSendPublicServed(event: FormEvent) {
    event.preventDefault();

    if (questionOne.trim() === '') {
      return;
    };
    if (questionTwo.trim() === '') {
      return;
    };
    if (questionThree.trim() === '') {
      return;
    };
    if (questionFour.trim() === '') {
      return;
    };

    const questionReq = {
      G_Publico_Atendido_PCF: {
        questao45: questionOne,
        questao46: questionTwo,
        questao47: questionThree,
        questao48: questionFour,
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

    navigate(`/${roomId}/formstep8`)
  };

  const handlePregnantChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
  };
  
  const handleChildrenAged_0_36Change = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };

  const handleChildrenAged_0_72Change = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionThree(event.target.value);
  };

  const handleNumberOfChildrenChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionFour(event.target.value);
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 7
    });
  }, []);

  useEffect(() => {
    if (question?.length > 0) {
      setQuestionOne(question[0].G_Publico_Atendido_PCF.questao45)
      setQuestionTwo(question[0].G_Publico_Atendido_PCF.questao46)
      setQuestionThree(question[0].G_Publico_Atendido_PCF.questao47)
      setQuestionFour(question[0].G_Publico_Atendido_PCF.questao48)
    }
    console.log(question)
  }, [question]);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Público atendido pelo PCF em seu município</h1>
        <p>Perfil das famílias acompanhadas pelo PCF em seu município</p>
        <hr />
      </SC.Container>

      <form onSubmit={handleSendPublicServed}>
        <SC.ButtonTypeTextV2>
          <div className="formQuestion">
            <p>Indique o número de pessoas atendidas pelo Programa Criança Feliz em seu município:</p>
            <div className="containerBgLabel">
              <label
                className="containerTextLabel"
                htmlFor="gravidaInput"
              >Gestantes:
                <input
                  required
                  autoComplete="off"
                  id="gravidaInput"
                  name="pregnant"
                  type="number"
                  min={0}
                  max={999}
                  value={questionOne}
                  onChange={handlePregnantChange}
                  placeholder="Quantidade"
                />
              </label>
            </div>
            <div className="containerBgLabel">
              <label
                className="containerTextLabel"
                htmlFor="crianca_0_36"
              >Crianças de 0-36 meses:
                <input
                  required
                  autoComplete="off"
                  id="crianca_0_36"
                  name="childrenAged_0_36"
                  type="number"
                  min={0}
                  max={999}
                  value={questionTwo}
                  onChange={handleChildrenAged_0_36Change}
                  placeholder="Quantidade"
                />
              </label>
            </div>
            <div className="containerBgLabel">
              <label className="containerTextLabel" htmlFor="crianca_0_72">
                Crianças de 36-72 meses:
                <input
                  required
                  autoComplete="off"
                  id="crianca_0_72"
                  name="childrenAged_0_72"
                  type="number"
                  min={0}
                  max={999}
                  value={questionThree}
                  onChange={handleChildrenAged_0_72Change}
                  placeholder="Quantidade"
                />
              </label>
            </div>
            <div className="containerBgLabel">
              <label className="containerTextLabel" htmlFor="quantidadeDeCriancas">
                Quantos domicílios no seu município possuem mais de uma criança sendo acompanhadas pelo PCF?
                <input
                  required
                  autoComplete="off"
                  id="quantidadeDeCriancas"
                  name="numberOfChildren"
                  type="number"
                  min={0}
                  max={999}
                  value={questionFour}
                  onChange={handleNumberOfChildrenChange}
                  placeholder="Quantidade"
                />
              </label>
            </div>
          </div>
        </SC.ButtonTypeTextV2>

        <SC.AllButtons>
          <Link className="buttonAll" to={`/${roomId}/formstep6`}>Voltar</Link>
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

