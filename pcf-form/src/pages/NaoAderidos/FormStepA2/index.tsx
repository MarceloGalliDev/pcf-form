import * as SC from "../../../styles/styles";
import { ThemeA1 } from "../../../components/ThemeA1";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, useEffect, useState, useCallback, FormEvent } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../../services/firebase";

type RoomParams = {
  id: string;
};

export const FormStepA2 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const [questionOne, setQuestionOne] = useState('');
  const [questionTwo, setQuestionTwo] = useState('');
  const [questionThree, setQuestionThree] = useState('');
  const [questionFour, setQuestionFour] = useState('');
  const [questionFive, setQuestionFive] = useState('');
  const [questionSix, setQuestionSix] = useState('');
  const [questionSeven, setQuestionSeven] = useState('');
  
  const [isCheckQ08, setIsCheckQ08] = useState('');
  const [isCheckQ13, setIsCheckQ13] = useState('');


  async function handleEligibleMunicipalities(event: FormEvent) {
    event.preventDefault();

    const question = {
      A_Elegiveis_ao_PCF: {
        questao07: questionOne,
        questao08:
        {
          questionTwo,
          questionThree,
          questionFour,
        },
        questao09: questionFive,
        questao10:
        {
          questionSix,
          questionSeven,
        },
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/nao_aderidos/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

   navigate(`/`)
  };

  const handleYouKnowProgramPCFChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
  };

  const handleTargetAudiencePCFChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };

  const handleTargetAudiencePCFTextBeneficiaryChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionThree(event.target.value);
  };

  const handleTargetAudiencePCFTextValueChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionFour(event.target.value);
  };

  const handleReasonNotIncludedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionFive(event.target.value);
  };

  const handleExplainTheReasonChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionSix(event.target.value);
  };

  const handleExplainTheReasonTextChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionSeven(event.target.value);
  };


  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 2
    });
  }, []);

  return (
    <ThemeA1>
      <SC.Container>
        <p>Etapa {state.currentStep}/2</p>
        <h1>Municípios Elegíveis</h1>
        <p>Municípios elegíveis, mas que não aderiram ao programa</p>
        <hr />
      </SC.Container>

      <form onSubmit={handleEligibleMunicipalities}>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
             O seu município conhece o Programa Criança Feliz?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    id="youKnowProgramPCFYes"
                    name="youKnowProgramPCF"
                    type="radio"
                    value="Sim"
                    onChange={handleYouKnowProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="youKnowProgramPCFYes"
                  >Sim
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="youKnowProgramPCFNo"
                    name="youKnowProgramPCF"
                    type="radio"
                    value="Não"
                    onChange={handleYouKnowProgramPCFChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="youKnowProgramPCFNo"
                  >Não
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
                      id="targetAudiencePCFYes"
                      name="targetAudiencePCF"
                      type="radio"
                      value={"sim_Q08"}
                      onClick={() => setIsCheckQ08("sim_Q08")}
                      onChange={handleTargetAudiencePCFChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="targetAudiencePCFYes"
                    >Sim
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="targetAudiencePCFNo"
                      name="targetAudiencePCF"
                      type="radio"
                      value={"nao_Q08"}
                      onClick={() => setIsCheckQ08("nao_Q08")}
                      onChange={handleTargetAudiencePCFChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="targetAudiencePCFNo"
                    >Não
                    </label>
                  </div>

                </div>
              </div>
            </div>

            {isCheckQ08 === "sim_Q08" && (
              <>
                <div className="containerBgLabel">
                  <label className="containerTextLabel" htmlFor="targetAudiencePCFTextBeneficiary">
                    Se sim, quantos beneficiários são atendidos por este programa?
                    <input
                      id="targetAudiencePCFTextBeneficiary"
                      name="targetAudiencePCFTextBeneficiary"
                      type="text"
                      value={questionThree}
                      onChange={handleTargetAudiencePCFTextBeneficiaryChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>

                <div className="containerBgLabel">
                  <label className="containerTextLabel" htmlFor="targetAudiencePCFTextValue">
                    Se sim, qual o valor mensal gasto com esse Programa? 
                    <input
                      id="targetAudiencePCFTextValue"
                      name="targetAudiencePCFTextValue"
                      type="text"
                      value={questionFour}
                      onChange={handleTargetAudiencePCFTextValueChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>
              </>
            )}

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
                    id="reasonNotIncludedNotInterest"
                    name="reasonNotIncluded"
                    type="radio"
                    value="nao_houve_interesse_do_municipio"
                    onChange={handleReasonNotIncludedChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="reasonNotIncludedNotInterest"
                  >Não houve interesse do município 
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="reasonNotIncludedAlreadyHave"
                    name="reasonNotIncluded"
                    type="radio"
                    value="ja_possui_programa_semelhante"
                    onChange={handleReasonNotIncludedChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="reasonNotIncludedAlreadyHave"
                  >O município possui um programa semelhante ao Criança Feliz
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="reasonNotIncludedDontKnowThePCF"
                    name="reasonNotIncluded"
                    type="radio"
                    value="nao_conhece_o_PCF"
                    onChange={handleReasonNotIncludedChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="reasonNotIncludedDontKnowThePCF"
                  >O município não conhece o Programa Criança Feliz
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="reasonNotIncludedInsufficientResource"
                    name="reasonNotIncluded"
                    type="radio"
                    value="recurso_financeiro_insuficiente"
                    onChange={handleReasonNotIncludedChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="reasonNotIncludedInsufficientResource"
                  >A transferência de recurso financeiro é insuficiente para o município manter o programa
                  </label>
                </div>

              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeRadioText>
          <div className="formQuestion">
            <p>
              Existe algum outro motivo que explique o fato de o município não ter aderido ao Programa Criança Feliz e que não foi mencionado na questão anterior?
            </p>

            <div className="formQuestion">
              <div id="containerOption">
                <div id="containerOptionSixOption">
                  
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="explainTheReasonYes"
                      name="explainTheReason"
                      type="radio"
                      value={"sim_Q13"}
                      onClick={() => setIsCheckQ13("sim_Q13")}
                      onChange={handleExplainTheReasonChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="explainTheReasonYes"
                    >Sim
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="explainTheReasonNo"
                      name="explainTheReason"
                      type="radio"
                      value={"nao_Q13"}
                      onClick={() => setIsCheckQ13("nao_Q13")}
                      onChange={handleExplainTheReasonChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="explainTheReasonNo"
                    >Não
                    </label>
                  </div>

                </div>
              </div>
            </div>
            
            {isCheckQ13 === "sim_Q13" && (
              <>
                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="explainTheReasonText"
                  >Se sim, qual?
                    <input
                      id="explainTheReasonText"
                      name="explainTheReasonText"
                      type="text"
                      value={questionSeven}
                      onChange={handleExplainTheReasonTextChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>
              </>
            )}

          </div>
        </SC.ButtonTypeRadioText>
        
        <SC.AllButtons>
          <Link className="buttonAll" to="/:id/formstepA1">Voltar</Link>
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