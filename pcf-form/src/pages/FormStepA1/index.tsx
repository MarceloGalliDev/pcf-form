import * as SC from "../../styles/styles";
import { ThemeA1 } from "../../components/ThemeA1";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../context/FormContext";
import { ChangeEvent, useEffect, useState, useCallback, FormEvent } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../services/firebase";

type RoomParams = {
  id: string;
};

export const FormStepA1 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const [questionOne, setQuestionOne] = useState('')
  const [questionTwo, setQuestionTwo] = useState('')
  const [questionThree, setQuestionThree] = useState('')
  const [questionFour, setQuestionFour] = useState('')


  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    const question = {
      A_Elegiveis_ao_PCF: {
        questao01: questionOne,
        questao02: questionTwo,
        questao03: questionThree,
        questao04: questionFour,

      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

   navigate(`/`)
  };

  const handleProgramPCFChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
  };

  const handleTargetAudiencePCFChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };

  const handleTargetAudiencePCFTextChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionThree(event.target.value);
  };

  const handleAdherenceReasonChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionFour(event.target.value);
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 1
    });
  }, []);

  return (
    <ThemeA1>
      <SC.Container>
        <p>Etapa {state.currentStep}</p>
        <h1>Municípios Elegíveis</h1>
        <p>Municípios elegíveis, mas que não aderiram ao programa</p>
        <hr />
      </SC.Container>

      <form onSubmit={handleSendQuestion}>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
             O seu município conhece o Programa Criança Feliz?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    id="programPCFYes"
                    name="programPCF"
                    type="radio"
                    value="Sim"
                    onChange={handleProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="teamCoordinatorYes"
                  >Sim
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="programPCFNo"
                    name="programPCF"
                    type="radio"
                    value="Não"
                    onChange={handleProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="programPCFNo"
                  >Não
                  </label>
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadioText>
          <div className="formQuestion">
            <p>Há algum outro custo direto pago com recurso do PCF?</p>

            <div className="formQuestion">
              <div id="containerOption">
                <div id="containerOptionSixOption">
                  
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentJaneiro"
                      name="lastMonthSpentData"
                      type="radio"
                      value="sim"
                      onChange={handleTargetAudiencePCFChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentJaneiro"
                    >Sim
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentFevereiro"
                      name="lastMonthSpentData"
                      type="radio"
                      value="Não"
                      onChange={handleTargetAudiencePCFChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >Não
                    </label>
                  </div>

                </div>
              </div>
            </div>

            <div className="containerBgLabel">
              <label className="containerTextLabel" htmlFor="name">
                Se sim, quantos beneficiários são atendidos por este programa?
                <input
                  name="name"
                  type="text"
                  autoFocus
                  value={state.name}
                  onChange={handleTargetAudiencePCFTextChange}
                  placeholder="Sua resposta"
                />
              </label>
            </div>
              
            <div className="containerBgLabel">
              <label className="containerTextLabel" htmlFor="name">
                Se sim, qual o valor mensal gasto com esse Programa? 
                <input
                  name="name"
                  type="text"
                  autoFocus
                  value={state.name}
                  onChange={handleTargetAudiencePCFTextChange}
                  placeholder="Sua resposta"
                />
              </label>
            </div>

          </div>
        </SC.ButtonTypeRadioText>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
            Qual o motivo do seu município não ter aderido ao Programa Criança Feliz?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    id="programPCFYes"
                    name="programPCF"
                    type="radio"
                    value="Sim"
                    onChange={handleProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="teamCoordinatorYes"
                  >Não houve interesse do município 
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="programPCFNo"
                    name="programPCF"
                    type="radio"
                    value="Não"
                    onChange={handleProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="programPCFNo"
                  >O município já possui um programa semelhante ao Criança Feliz
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="programPCFNo"
                    name="programPCF"
                    type="radio"
                    value="Não"
                    onChange={handleProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="programPCFNo"
                  >O município não conhece o Programa Criança Feliz
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="programPCFNo"
                    name="programPCF"
                    type="radio"
                    value="Não"
                    onChange={handleProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="programPCFNo"
                  >A transferência de recurso financeiro é insuficiente para o município aderir ao programa
                  </label>
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadioText>
          <div className="formQuestion">
            <p>O seu município possui algum Programa ou Serviço com o mesmo público-alvo do Programa Criança Feliz?</p>

            <div className="formQuestion">
              <div id="containerOption">
                <div id="containerOptionSixOption">
                  
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentJaneiro"
                      name="lastMonthSpentData"
                      type="radio"
                      value="sim"
                      onChange={handleTargetAudiencePCFChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentJaneiro"
                    >Sim
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentFevereiro"
                      name="lastMonthSpentData"
                      type="radio"
                      value="Não"
                      onChange={handleTargetAudiencePCFChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >Não
                    </label>
                  </div>

                </div>
              </div>
            </div>

            <div className="containerBgLabel">
              <label className="containerTextLabel" htmlFor="name">
                Se sim, qual?
                <input
                  name="name"
                  type="text"
                  autoFocus
                  value={state.name}
                  onChange={handleTargetAudiencePCFTextChange}
                  placeholder="Sua resposta"
                />
              </label>
            </div>

          </div>
        </SC.ButtonTypeRadioText>
        
        <SC.AllButtons>
          <Link className="buttonAll" to="/">Voltar</Link>
          <button
            className="buttonAll"
            type="submit"
            >Finalizar
          </button>
        </SC.AllButtons>
      </form>
    </ThemeA1>
  );
};


  //verificando se foi respondida, não passa para próxima etapa
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

  // const schema = yup.object({
  //   numberOfSupervisors: yup.string().required(),
  //   averagePay: yup.string().required(),
  //   workload: yup.string().required(),
  //   supervisorQualification: yup.string().required(),
  // }).required();

  // const { register, handleSubmit, formState: { errors } } = useForm<FormStep4Input>({ resolver: yupResolver(schema) })
  // const onSubmit = handleSubmit(data => navigate('/formstep3'))