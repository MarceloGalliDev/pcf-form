import * as SC from "../../styles/styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import axios from "axios"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  IBGEUFResponse,
  IBGECITYResponse,
  FormStep1Input
} from "../../types/FormStep1"
import { database } from "../../services/firebase"
import { ref, push, set } from "firebase/database"
import { useRoom } from "../../hooks/useRoom"


const schema = yup.object({
  name: yup.string().required(),
  phoneNumber: yup.number().required(),
  email: yup.string().required(),
  functionPCF: yup.string().required(),
  uf: yup.string().required(),
  city: yup.string().required(),
}).required();


export const FormStep1 = () => {
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECITYResponse[]>([]);
  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState('')
  const [questionTwo, setQuestionTwo] = useState('')


  type RoomParams = {
    id: string;
  };

  const params = useParams<RoomParams>()
  const roomId = params.id

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (questionOne.trim() === '') {
      return;
    };
    if (questionTwo.trim() === '') {
      return;
    };

    const question = {
      pagina1: {
        questao1: questionOne,
        questao2: questionTwo,
      }
    }

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)
    
    navigate('/formstep2')
  };
  
  
  //dropdown state e cities
  const { register, handleSubmit, formState: {errors}} = useForm<FormStep1Input>({resolver: yupResolver(schema)})
  
//Aqui fizemos a função de troca de nome, usamos dispatch para realizar a troca, onde recebemos no payload o valor, e setamos no FormActions
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
    dispatch({
      type: FormActions.setName,
      payload: event.target.value
    });
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setEmail,
      payload: event.target.value
    });
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setPhoneNumber,
      payload: event.target.value
    });
  };

  const handleFunctionPCFChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setFunctionPCF,
      payload: event.target.value
    });
  };

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value
    setSelectedUf(uf)
    dispatch({
      type: FormActions.setUf,
      payload: event.target.value
    });
  };
  
  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value
    setSelectedCity(city)
    dispatch({
      type: FormActions.setCity,
      payload: event.target.value
    });
  };

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then((response) => {setUfs(response.data)})
  }, []);
  
  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then((response) => {setCities(response.data)})
  }, [selectedUf]);//executa toda vez que {selectedUf} mudar
  ufs.sort((a,b) => a.nome.localeCompare(b.nome))
  
  //Aqui ambiente da troca do passe, de acordo com a currentStep, controle de página
  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 1
    });
  }, []);


  return (
    <Theme>
      <form onSubmit={handleSendQuestion}>

        <SC.Container>
          <p>Etapa {state.currentStep}/10</p>
          <h1>Informações gerais</h1>
          <p>Identificação do entrevistado</p>
          <hr/>
        </SC.Container>

        <SC.ButtonTypeText>
          <div className="formQuestion">
            <label htmlFor="name">
              Nome do entrevistado:
              <span>{errors.name && " ⚠ *Campo obrigatório "}</span>
              <input
                {...register("name")}
                name="name"
                type="text"
                autoFocus
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
              <span>{errors.email && " ⚠ *Campo obrigatório "}</span>
              <input
                {...register("email")}
                name="email"
                type="email"
                value={state.email}
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
              <span>{errors.phoneNumber && " ⚠ *Campo obrigatório "}</span>
              <input
                {...register("phoneNumber")}
                name="phoneNumber"
                type="tel"
                value={state.phoneNumber}
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
              <span>{errors.functionPCF && " ⚠ *Campo obrigatório "}</span>
              <input
                {...register("functionPCF")}
                name="functionPCF"
                type="text"
                value={state.functionPCF}
                onChange={handleFunctionPCFChange}
                placeholder="Sua resposta"
              />
            </label>
          </div>
        </SC.ButtonTypeText>

        <SC.ButtonTypeSelectOption>
          <div className="formQuestion">
            <label htmlFor="uf">
              Local em que atua no PCF:
              <span>{errors.uf && " ⚠ *Campo obrigatório "}</span>
              <select
                {...register("uf")}
                name="uf"
                id="uf"
                onChange={handleSelectedUf}
              >
                <option value="0">Selecione o Estado</option>
                {ufs.map(uf => (
                  <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
                ))}
              </select>
              <span>{errors.city && " ⚠ *Campo obrigatório "}</span>
              <select
                {...register("city")}
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
          <button
            className="buttonAll"
            type="submit"
          >Próximo
          </button>
          <Link className="buttonAll" to="/">Voltar</Link>
        </SC.AllButtons>

      </form>
    </Theme>
  )
}