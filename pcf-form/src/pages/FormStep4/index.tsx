import * as SC from "../../styles/styles";
import { Theme } from "../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../context/FormContext";
import { ChangeEvent, useEffect, useState, useCallback, FormEvent } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../services/firebase";

interface Workload {
  supervisoresHorasSemanais40: boolean;
  supervisoresHorasSemanais30: boolean;
  supervisoresHorasSemanais20: boolean;
  supervisoresHorasSemanaisOutros: boolean;
  supervisoresHorasSemanaisOutrosDescricao: string;
};

interface SupervisorQualification {
  supervisoresEspecializacao: string;
  supervisoresMestrado: string;
  supervisoresDoutorado: string;
};

interface SupervisorTypeRemunaration1 {
  supervisoresServidorEfetivo: string;
  supervisoresMediaRemuneracaoEfetivo: string;
};

interface SupervisorTypeRemunaration2 {
  supervisoresCargoComissionado: string;
  supervisoresMediaRemuneracaoComissionado: string;
};

interface SupervisorTypeRemunaration3 {
  supervisoresServidorTemporario: string;
  supervisoresMediaRemuneracaoTemporario: string;
};

interface SupervisorTypeRemunaration4 {
  supervisoresBolsista: string;
  supervisoresMediaRemuneracaoBolsista: string;
};

interface SupervisorTypeRemunaration5 {
  supervisoresOutrosCargos: string;
  supervisoresMediaRemuneracaoOutrosCargos: string;
};


type RoomParams = {
  id: string;
};

export const FormStep4 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState('')
  const [questionTwo, setQuestionTwo] = useState('')
  const [questionThree, setQuestionThree] = useState<Workload>({
    supervisoresHorasSemanais40: false,
    supervisoresHorasSemanais30: false,
    supervisoresHorasSemanais20: false,
    supervisoresHorasSemanaisOutros: false,
    supervisoresHorasSemanaisOutrosDescricao: '',
  });
  const [questionFive, setQuestionFive] =
  useState<SupervisorQualification>({
    supervisoresEspecializacao: '',
    supervisoresMestrado: '',
    supervisoresDoutorado: '',
  });
  const [questionSix, setQuestionSix] = useState<SupervisorTypeRemunaration1>({
    supervisoresServidorEfetivo: '',
    supervisoresMediaRemuneracaoEfetivo: '',
  });
  const [questionSeven, setQuestionSeven] = useState<SupervisorTypeRemunaration2>({
    supervisoresCargoComissionado: '',
    supervisoresMediaRemuneracaoComissionado: '',
  });
  const [questionEight, setQuestionEight] = useState<SupervisorTypeRemunaration3>({
    supervisoresServidorTemporario: '',
    supervisoresMediaRemuneracaoTemporario: '',
  });
  const [questionNine, setQuestionNine] = useState<SupervisorTypeRemunaration4>({
    supervisoresBolsista: '',
    supervisoresMediaRemuneracaoBolsista: '',
  });
  const [questionTen, setQuestionTen] = useState<SupervisorTypeRemunaration5>({
    supervisoresOutrosCargos: '',
    supervisoresMediaRemuneracaoOutrosCargos: '',
  });

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    const question = {
      D_Supervisores_do_PCF: {
        questao20: questionOne,
        questao21: questionTwo,
        questao22: questionThree,
        questao23: questionFive,
        questao24: questionSix,
        questao25: questionSeven,
        questao26: questionEight,
        questao27: questionNine,
        questao28: questionTen,
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

   navigate(`/${roomId}/formstep5`)
  };

  const handleNumberOfSupervisors = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
  };
  
  const handleAveragePayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };

  const handleWorkloadChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionThree({
      ...questionThree,
      [name]: value,
    })
  }, [questionThree]);

  const handleSupervisorQualificationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionFive({
      ...questionFive,
      [name]: value,
    })
  }, [questionFive]);

  const handleEffectiveRemunerationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionSix({
      ...questionSix,
      [name]: value,
    })
  }, [questionSix]);

  const handleCommissionedRemunerationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionSeven({
      ...questionSeven,
      [name]: value,
    })
  }, [questionSeven]);

  const handleTemporaryRemunerationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionEight({
      ...questionEight,
      [name]: value,
    })
  }, [questionEight]);

  const handleScholarshipRemunerationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionNine({
      ...questionNine,
      [name]: value,
    })
  }, [questionNine]);

  const handleOthersRemunerationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionTen({
      ...questionTen,
      [name]: value,
    })
  }, [questionTen]);

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 4
    });
  }, []);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Equipe do PCF</h1>
        <p>Informações sobre os atores/ participantes da equipe do PCF</p>
        <hr />
      </SC.Container>

      <form onSubmit={handleSendQuestion}>

        <SC.SubSection>
          <div className="bgSubSection">
            <p>Subseção Supervisores</p>
          </div>
          <div className="formQuestionV2">

            <SC.ButtonTypeText>
              <div className="formQuestion">
                <label htmlFor="numberOfSupervisors">
                  Quantos Supervisores existem na equipe do PCF no seu município?
                  <input
                    id="numberOfSupervisors"
                    name="numeroDeSupervisores"
                    type="text"
                    autoFocus
                    value={questionOne}
                    onChange={handleNumberOfSupervisors}
                    placeholder="Quantidade"
                  />
                </label>
              </div>
            </SC.ButtonTypeText>

            <SC.ButtonTypeText>
              <div className="formQuestion">
                <label htmlFor="averagePay">
                  Qual a remuneração média em R$ (reais) dos Supervisores?
                  <input
                    id="averagePay"
                    name="remuneracaoMediaSupervisor"
                    type="text"
                    value={questionTwo}
                    onChange={handleAveragePayChange}
                    placeholder="Valor em R$"
                  />
                </label>
              </div>
            </SC.ButtonTypeText>

            <SC.ButtonTypeCheckbox>
              <div className="formQuestion">
                <p className="textFormRadioButton">
                  Qual a carga horária dos Supervisores?
                </p>
                <div id="containerOption">
                  <div>
                    <div id="containerInputLabelRadioButton">
                      <input
                        id="workloadForty"
                        name="supervisoresHorasSemanais40"
                        type="checkbox"
                        checked={questionThree.supervisoresHorasSemanais40}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          supervisoresHorasSemanais40: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="workloadForty"
                      >40 horas semanais
                      </label>
                    </div>
                    <div id="containerInputLabelRadioButton">
                      <input
                        id="workloadThirty"
                        name="supervisoresHorasSemanais30"
                        type="checkbox"
                        checked={questionThree.supervisoresHorasSemanais30}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          supervisoresHorasSemanais30: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="workloadThirty"
                      >30 horas semanais
                      </label>
                    </div>
                    <div id="containerInputLabelRadioButton">
                      <input
                        id="workloadTwenty"
                        name="supervisoresHorasSemanais20"
                        type="checkbox"
                        checked={questionThree.supervisoresHorasSemanais20}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          supervisoresHorasSemanais20: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="workloadTwenty"
                      >20 horas semanais
                      </label>
                    </div>
        
                    <div id="containerInputLabelRadioButton">
                      <input
                        id="workloadOthers"
                        name="supervisoresHorasSemanaisOutros"
                        type="checkbox"
                        checked={questionThree.supervisoresHorasSemanaisOutros}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          supervisoresHorasSemanaisOutros: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="workloadOthers"
                      >Outro:
                      </label>
                      <input
                        className="inputPlaceholderOther"
                        name="supervisoresHorasSemanaisOutrosDescricao"
                        type="text"
                        value={questionThree.supervisoresHorasSemanaisOutrosDescricao}
                        onChange={handleWorkloadChange}
                        placeholder="Escreva aqui"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SC.ButtonTypeCheckbox>

            <SC.ButtonTypeTextV3>
              <div className="formQuestion">
                <label htmlFor="containerTextLabelCheckbox">
                  Quantos Supervisores da equipe do PCF tem em seu município:

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="supervisorSpecialization">
                      Especialização:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="supervisorSpecialization"
                      name="especializacaoSupervisor"
                      type="text"
                      value={questionFive.supervisoresEspecializacao}
                      onChange={handleSupervisorQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="supervisorMaster"
                    >Mestrado:
                    </label>
                    <input
                      id="supervisorMaster"
                      className="inputForContainerTextLabelCheckbox"
                      name="mestradoSupervisor"
                      type="text"
                      value={questionFive.supervisoresMestrado}
                      onChange={handleSupervisorQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="supervisorDoctor"
                    >Doutorado:
                    </label>
                    <input
                      id="supervisorDoctor"
                      className="inputForContainerTextLabelCheckbox"
                      name="doutoradoSupervisor"
                      type="text"
                      value={questionFive.supervisoresDoutorado}
                      onChange={handleSupervisorQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>
                </label>
              </div>
            </SC.ButtonTypeTextV3>

            <SC.ButtonTypeTextV3>
              <div className="formQuestion">
                <label htmlFor="containerLabelCheckboxBorder">
                  Quantos Supervisores da equipe do PCF são contratados nas seguintes categorias em seu município:

                  <div id="containerLabelCheckboxBorder">

                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="servidorEfetivoSupervisor"
                      >Servidor(a) efetivo(a):
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="servidorEfetivoSupervisor"
                        name="supervisoresServidorEfetivo"
                        type="text"
                        value={questionSix.supervisoresServidorEfetivo}
                        onChange={handleEffectiveRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>

                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoEfetivoSupervisor">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoEfetivoSupervisor"
                        name="supervisoresMediaRemuneracaoEfetivo"
                        type="text"
                        value={questionSix.supervisoresMediaRemuneracaoEfetivo}
                        onChange={handleEffectiveRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="cargoComissionadoSupervisor"
                      >Cargo comissionado:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="cargoComissionadoSupervisor"
                        name="supervisoresCargoComissionado"
                        type="text"
                        value={questionSeven.supervisoresCargoComissionado}
                        onChange={handleCommissionedRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoComissonadoSupervisor">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoComissonadoSupervisor"
                        name="supervisoresMediaRemuneracaoComissionado"
                        type="text"
                        value={questionSeven.supervisoresMediaRemuneracaoComissionado}
                        onChange={handleCommissionedRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="servidorTemporarioSupervisor"
                      >Servidor temporário:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="servidorTemporarioSupervisor"
                        name="supervisoresServidorTemporario"
                        type="text"
                        value={questionEight.supervisoresServidorTemporario}
                        onChange={handleTemporaryRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoTemporarioSupervisor">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoTemporarioSupervisor"
                        name="supervisoresMediaRemuneracaoTemporario"
                        type="text"
                        value={questionEight.supervisoresMediaRemuneracaoTemporario}
                        onChange={handleTemporaryRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="bolsistaSupervisor"
                      >Bolsista:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="bolsistaSupervisor"
                        name="supervisoresBolsista"
                        type="text"
                        value={questionNine.supervisoresBolsista}
                        onChange={handleScholarshipRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoBolsistaSupervisor">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoBolsistaSupervisor"
                        name="supervisoresMediaRemuneracaoBolsista"
                        type="text"
                        value={questionNine.supervisoresMediaRemuneracaoBolsista}
                        onChange={handleScholarshipRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="outrosCargosSupervisor"
                      >Outros:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="outrosCargosSupervisor"
                        name="supervisoresOutrosCargos"
                        type="text"
                        value={questionTen.supervisoresOutrosCargos}
                        onChange={handleOthersRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoOutrosCargosSupervisor">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoOutrosCargosSupervisor"
                        name="supervisoresMediaRemuneracaoOutrosCargos"
                        type="text"
                        value={questionTen.supervisoresMediaRemuneracaoOutrosCargos}
                        onChange={handleOthersRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                </label>
              </div>
            </SC.ButtonTypeTextV3>
          </div>
        </SC.SubSection>

        <SC.AllButtons>
          <Link className="buttonAll" to="/:id/formstep3">Voltar</Link>
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