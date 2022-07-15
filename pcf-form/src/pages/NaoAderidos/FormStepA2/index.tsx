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

interface ReasonForGivingUpChange {
  a_recursoFinanceiroInsuficiente: boolean;
  b_naoHaInteresseMunicipio: boolean;
  c_possuiPrograma: boolean;
  d_naoConhecePrograma: boolean;
};


export const FormStepA2 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const [questionTwo, setQuestionTwo] = useState('');
  const [questionThree, setQuestionThree] = useState('');
  const [questionFour, setQuestionFour] = useState('');
  const [questionFive, setQuestionFive] = useState<ReasonForGivingUpChange>({
    a_recursoFinanceiroInsuficiente: false,
    b_naoHaInteresseMunicipio: false,
    c_possuiPrograma: false,
    d_naoConhecePrograma: false,
  });
  const [questionSix, setQuestionSix] = useState('');
  const [questionSeven, setQuestionSeven] = useState('');
  const [questionEight, setQuestionEight] = useState('');
  const [questionNine, setQuestionNine] = useState('');
  const [questionTen, setQuestionTen] = useState('');
  
  const [isCheckA2Q08, setIsCheckA2Q08] = useState('');
  const [isCheckA2Q13, setIsCheckA2Q13] = useState('');


  async function handleEligibleMunicipalities(event: FormEvent) {
    event.preventDefault();

    const question = {
      A_Elegiveis_ao_PCF: {
        questao07:
        {
          questionTwo,
          questionThree,
          questionFour,
        },
        questao08:
        {
          questionFive,
          questionEight,
          questionNine,
          questionTen,
        },
        questao09:
        {
          questionSix,
          questionSeven,
        },
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/nao_aderidos/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

    if (confirm('Tem certeza que deseja finalizar o questionário?')) {
      navigate(`/`)
    }
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

  const handleExplainTheReasonChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionSix(event.target.value);
  };

  const handleExplainTheReasonTextChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionSeven(event.target.value);
  };

  const handleTargetAudiencePCFTextNameCheckedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionEight(event.target.value);
  };

  const handleTargetAudiencePCFTextBeneficiaryCheckedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionNine(event.target.value);
  };

  const handleTargetAudiencePCFTextValueCheckedChange =(event:ChangeEvent<HTMLInputElement>) => {
    setQuestionTen(event.target.value);
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
                      onClick={() => setIsCheckA2Q08("sim_Q08")}
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
                      onClick={() => setIsCheckA2Q08("nao_Q08")}
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
            {isCheckA2Q08 === "sim_Q08" && (
              <>
                <div className="containerBgLabel">
                  <label className="containerTextLabel" htmlFor="targetAudiencePCFTextBeneficiary">
                    Quantos beneficiários são atendidos por este programa?
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
                    Qual o valor mensal gasto com esse Programa? 
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

        <SC.ButtonTypeCheckboxV1>
          <div className="formQuestion">
            <div className="formQuestion">
              <p className="textFormRadioButton">
              Qual o motivo do seu município não ter aderido ao Programa Criança Feliz?
              </p>
              <div id="containerOption">
                <div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="recursoFinanceiroInsuficiente"
                      name="a_recursoFinanceiroInsuficiente"
                      type="checkbox"
                      checked={questionFive.a_recursoFinanceiroInsuficiente}
                      onChange={(event) => setQuestionFive({
                        ...questionFive,
                        a_recursoFinanceiroInsuficiente: !!event.currentTarget?.checked
                      })}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="recursoFinanceiroInsuficiente"
                    >A transferência de recurso financeiro é insuficiente para o município manter o programa
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="naoHaInteresseMunicipio"
                      name="b_naoHaInteresseMunicipio"
                      type="checkbox"
                      checked={questionFive.b_naoHaInteresseMunicipio}
                      onChange={(event) => setQuestionFive({
                        ...questionFive,
                        b_naoHaInteresseMunicipio: !!event.currentTarget?.checked
                      })}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="naoHaInteresseMunicipio"
                    >Não houve interesse do município em manter o programa
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="possuiPrograma"
                      name="c_possuiPrograma"
                      type="checkbox"
                      checked={questionFive.c_possuiPrograma}
                      onChange={(event) => setQuestionFive({
                        ...questionFive,
                        c_possuiPrograma: !!event.currentTarget?.checked
                      })}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="possuiPrograma"
                    >O município possui um programa semelhante ao Criança Feliz
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="naoConhecePrograma"
                      name="d_naoConhecePrograma"
                      type="checkbox"
                      checked={questionFive.d_naoConhecePrograma}
                      onChange={(event) => setQuestionFive({
                        ...questionFive,
                        d_naoConhecePrograma: !!event.currentTarget?.checked
                      })}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="naoConhecePrograma"
                    >O município não conhece o Programa Criança Feliz
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {questionFive.c_possuiPrograma === true && (
              <>
                <div className="containerBgLabel">
                  <label className="containerTextLabel" htmlFor="targetAudiencePCFTextBeneficiary">
                    Qual o nome desse programa?
                    <input
                      id="targetAudiencePCFTextBeneficiary"
                      name="targetAudiencePCFTextBeneficiary"
                      type="text"
                      value={questionEight}
                      onChange={handleTargetAudiencePCFTextNameCheckedChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>

                <div className="containerBgLabel">
                  <label className="containerTextLabel" htmlFor="targetAudiencePCFTextBeneficiary">
                    Quantos beneficiários são atendidos por este programa?
                    <input
                      id="targetAudiencePCFTextBeneficiary"
                      name="targetAudiencePCFTextBeneficiary"
                      type="text"
                      value={questionNine}
                      onChange={handleTargetAudiencePCFTextBeneficiaryCheckedChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>

                <div className="containerBgLabel">
                  <label className="containerTextLabel" htmlFor="targetAudiencePCFTextValue">
                    Qual o valor mensal gasto com esse Programa?
                    <input
                      id="targetAudiencePCFTextValue"
                      name="targetAudiencePCFTextValue"
                      type="text"
                      value={questionTen}
                      onChange={handleTargetAudiencePCFTextValueCheckedChange}
                      placeholder="Sua resposta"
                    />
                  </label>
                </div>
              </>
            )}
          </div>
        </SC.ButtonTypeCheckboxV1>

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
                      onClick={() => setIsCheckA2Q13("sim_Q13")}
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
                      onClick={() => setIsCheckA2Q13("nao_Q13")}
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
            
            {isCheckA2Q13 === "sim_Q13" && (
              <>
                <div className="containerBgLabel">
                  <label
                    className="containerTextLabel" htmlFor="explainTheReasonText"
                  >Qual?
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
          <Link className="buttonAll" to={`/${roomId}/formstepA1`}>Voltar</Link>
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