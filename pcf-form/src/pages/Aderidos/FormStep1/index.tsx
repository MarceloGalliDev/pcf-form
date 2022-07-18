import * as SC from "../../../styles/styles";
import { Theme } from "../../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import {
  IBGEUFResponse,
  IBGECITYResponse,
} from "../../../types/IBGE";
import { database } from "../../../services/firebase";
import { ref, push, set, update } from "firebase/database";
import { useRoom } from "../../../hooks/useRoom";
import { userJoin } from "../../../context/joinContext";

type RoomParams = {
  id: string;
};

export const FormStep1 = () => {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECITYResponse[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState('');
  const [questionTwo, setQuestionTwo] = useState('');
  const [questionThree, setQuestionThree] = useState('');
  const [questionFour, setQuestionFour] = useState('');

  const [question] = useRoom();
  
  async function handleSendQuestion(event: FormEvent) {
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
      A_Informacoes_Gerais: {
        questao01: questionOne,
        questao02: questionTwo,
        questao03: questionThree,
        questao04: questionFour,
        questao05: selectedUf,
        questao06: selectedCity,
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

    navigate(`/${roomId}/formstep2`)
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value)
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionThree(event.target.value)
  };

  const handleFunctionPCFChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionFour(event.target.value)
  };

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value
    setSelectedUf(uf)
  };
  
  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value
    setSelectedCity(city)
  };

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then((response) => { setUfs(response.data) })
  }, []);
  
  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then((response) => { setCities(response.data) })
  }, [selectedUf]);//executa toda vez que {selectedUf} mudar
  ufs.sort((a, b) => a.nome.localeCompare(b.nome))

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 1
    });
  }, []);

  useEffect(() => {
    if (question?.length > 0) {
      debugger
      setQuestionOne(question[0].A_Informacoes_Gerais.questao01)
      setQuestionTwo(question[0].A_Informacoes_Gerais.questao02)
      setQuestionThree(question[0].A_Informacoes_Gerais.questao03)
      setQuestionFour(question[0].A_Informacoes_Gerais.questao04)
      setSelectedUf(question[0].A_Informacoes_Gerais.questao05)
      setSelectedCity(question[0].A_Informacoes_Gerais.questao06)
    }
    console.log(question)
  }, [question])

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Informações gerais</h1>
        <p>Informações do responsável por responder este questionário</p>
        <hr />
      </SC.Container>
      <form onSubmit={handleSendQuestion}>

        <SC.ButtonTypeText>
          <div className="formQuestion">
            <label
              htmlFor="name"
            >Nome do entrevistado:
              <input
                required
                autoComplete="no"
                name="name"
                type="text"
                value={questionOne}
                onChange={handleNameChange}
                placeholder="Seu nome"
              />
            </label>
          </div>
        </SC.ButtonTypeText>

        <SC.ButtonTypeText>
          <div className="formQuestion">
            <label
              htmlFor="email"
            >E-mail:
              <input
                required
                autoComplete="no"
                name="email"
                type="email"
                value={questionTwo}
                onChange={handleEmailChange}
                placeholder="Seu e-mail"
              />
            </label>
          </div>
        </SC.ButtonTypeText>

        <SC.ButtonTypeText>
          <div className="formQuestion">
            <label
              htmlFor="phoneNumber"
            >Telefone para contato:
              <input
                required
                autoComplete="no"
                name="phoneNumber"
                type="tel"
                value={questionThree}
                onChange={handlePhoneNumberChange}
                placeholder="DDD + Telefone"
              />
            </label>
          </div>
        </SC.ButtonTypeText>

        <SC.ButtonTypeText>
          <div className="formQuestion">
            <label
              htmlFor="functionPCF"
            >Função no PCF:
              <input
                required
                autoComplete="no"
                name="functionPCF"
                type="text"
                value={questionFour}
                onChange={handleFunctionPCFChange}
                placeholder="Sua resposta"
              />
            </label>
          </div>
        </SC.ButtonTypeText>

        <SC.ButtonTypeSelectOption>
          <div className="formQuestion">
            <label
              htmlFor="uf"
            >Local em que atua no PCF
              <select
                required
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectedUf}
              >
                <option value="">Selecione o Estado</option>
                {ufs.map(uf => (
                  <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
                ))}
              </select>
              <select
                required
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectedCity}
              >
                <option value="">Selecione o Município</option>
                {cities.map(city => (
                  <option key={city.id} value={city.nome}>{city.nome}</option>
                ))}
              </select>
            </label>
          </div>
        </SC.ButtonTypeSelectOption>

        <SC.AllButtons>
          <Link className="buttonAll" to="/">Voltar</Link>
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

{/* <span>{errors.name && " ⚠ *Campo obrigatório "}</span> */}


// type FormStep1 = {
//   A_Informacoes_Gerais: {
//     questao01: string,
//     questao02: string,
//     questao03: string,
//     questao04: string,
//     questao05: string,
//     questao06: string,
//   }
// };

// type Props = {
//   onQuestion: (formStep1: FormStep1) => void
// }

  // const [newQuestion, setNewQuestion] = useState<FormStep1[]>([]);
  // const handleStorageQuestion = ({onQuestion}: Props) => {
  //   let newQuestion = question
  //   newQuestion.push(question)
  // }

  // useEffect(() => {
  //   if (questionOne === '' ||
  //     questionTwo === '' ||
  //     questionThree === '' ||
  //     questionFour === '' ||
  //     selectedUf === '' ||
  //     selectedCity === '') {
  //     alert('Iniciado Formulário')
  //   } else {
  //     dispatch({
  //       type: FormActions.setCurrentStep,
  //       payload: 2
  //     });
  //   }
  // }, []);