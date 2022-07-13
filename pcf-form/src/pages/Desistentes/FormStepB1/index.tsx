import * as SC from "../../../styles/styles";
import { ThemeB1 } from "../../../components/ThemeB1";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import {
  IBGEUFResponse,
  IBGECITYResponse,
} from "../../../types/IBGE";
import { database } from "../../../services/firebase";
import { ref, push, set } from "firebase/database";

type RoomParams = {
  id: string;
};

export const FormStepB1 = () => {
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

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    const question = {
      A_Informacoes_Gerais_Desistentes: {
        questao01: questionOne,
        questao02: questionTwo,
        questao03: questionThree,
        questao04: questionFour,
        questao05: selectedUf,
        questao06: selectedCity,
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/desistentes/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

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

  return (
    <ThemeB1>
      <SC.Container>
        <p>Etapa {state.currentStep}/2</p>
        <h1>Informações gerais</h1>
        <p>Informações do responsável por responder este questionário</p>
        <hr />
      </SC.Container>

      <form onSubmit={handleSendQuestion}>

        <SC.ButtonTypeText>
          <div className="formQuestion">
            <label htmlFor="name">
              Nome do entrevistado:
              <input
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
            <label htmlFor="email">
              E-mail:
              <input
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
            <label htmlFor="phoneNumber">
              Telefone para contato:
              <input
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
            <label htmlFor="functionPCF">
              Função no PCF:
              <input
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
            <label htmlFor="uf">
              Local em que atua no PCF
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectedUf}
              >
                <option value="0">Selecione o Estado</option>
                {ufs.map(uf => (
                  <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
                ))}
              </select>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectedCity}
              >
                <option value="0">Selecione o Município</option>
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
    </ThemeB1>
  );
};

{/* <span>{errors.name && " ⚠ *Campo obrigatório "}</span> */}

  // const schema = yup.object({
  //   name: yup.string().required(),
  //   email: yup.string().required(),
  //   phoneNumber: yup.number().required(),
  //   functionPCF: yup.string().required(),
  // }).required();