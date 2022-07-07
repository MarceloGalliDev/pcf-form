import * as SC from "../../styles/styles";
import { Theme } from "../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../context/FormContext";
import { ChangeEvent, useEffect, useState, useCallback, FormEvent } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../services/firebase";

interface Workload {
  a_supervisoresHorasSemanais40: boolean;
  b_supervisoresHorasSemanais30: boolean;
  c_supervisoresHorasSemanais20: boolean;
  d_supervisoresHorasSemanaisOutros: boolean;
  e_supervisoresHorasSemanaisOutrosDescricao: string;
};

interface SupervisorQualification {
  a_supervisoresGraduacaoIncompleta: string;
  b_supervisoresGraduacaoCompleta: string;
  c_supervisoresEspecializacao: string;
  d_supervisoresMestrado: string;
  e_supervisoresDoutorado: string;
};

interface SupervisorTypeRemunaration1 {
  a_supervisoresServidorEfetivo: string;
  b_supervisoresMediaRemuneracaoEfetivo: string;
};

interface SupervisorTypeRemunaration2 {
  a_supervisoresCargoComissionado: string;
  b_supervisoresMediaRemuneracaoComissionado: string;
};

interface SupervisorTypeRemunaration3 {
  a_supervisoresServidorTemporario: string;
  b_supervisoresMediaRemuneracaoTemporario: string;
};

interface SupervisorTypeRemunaration4 {
  a_supervisoresBolsista: string;
  b_supervisoresMediaRemuneracaoBolsista: string;
};

interface SupervisorTypeRemunaration5 {
  a_supervisoresProfissionalAutonomo: string;
  b_supervisoresMediaRemuneracaoProfissionalAutonomo: string;
};

interface SupervisorTypeRemunaration6 {
  a_supervisoresOutrosCargos: string;
  b_supervisoresMediaRemuneracaoOutrosCargos: string;
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
    a_supervisoresHorasSemanais40: false,
    b_supervisoresHorasSemanais30: false,
    c_supervisoresHorasSemanais20: false,
    d_supervisoresHorasSemanaisOutros: false,
    e_supervisoresHorasSemanaisOutrosDescricao: '',
  });
  const [questionFive, setQuestionFive] =
  useState<SupervisorQualification>({
    a_supervisoresGraduacaoIncompleta:'',
    b_supervisoresGraduacaoCompleta:'',
    c_supervisoresEspecializacao: '',
    d_supervisoresMestrado: '',
    e_supervisoresDoutorado: '',
  });
  const [questionSix, setQuestionSix] = useState<SupervisorTypeRemunaration1>({
    a_supervisoresServidorEfetivo: '',
    b_supervisoresMediaRemuneracaoEfetivo: '',
  });
  const [questionSeven, setQuestionSeven] = useState<SupervisorTypeRemunaration2>({
    a_supervisoresCargoComissionado: '',
    b_supervisoresMediaRemuneracaoComissionado: '',
  });
  const [questionEight, setQuestionEight] = useState<SupervisorTypeRemunaration3>({
    a_supervisoresServidorTemporario: '',
    b_supervisoresMediaRemuneracaoTemporario: '',
  });
  const [questionNine, setQuestionNine] = useState<SupervisorTypeRemunaration4>({
    a_supervisoresBolsista: '',
    b_supervisoresMediaRemuneracaoBolsista: '',
  });
  const [questionTen, setQuestionTen] = useState<SupervisorTypeRemunaration5>({
    a_supervisoresProfissionalAutonomo: '',
    b_supervisoresMediaRemuneracaoProfissionalAutonomo: '',
  });
  const [questionEleven, setQuestionEleven] = useState<SupervisorTypeRemunaration6>({
    a_supervisoresOutrosCargos: '',
    b_supervisoresMediaRemuneracaoOutrosCargos: '',
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
        questao29: questionEleven,
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

  const handleAutonomousSupervisorChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionTen({
      ...questionTen,
      [name]: value,
    })
  }, [questionTen]);

  const handleOthersRemunerationChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionEleven({
      ...questionEleven,
      [name]: value,
    })
  }, [questionEleven]);

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

            <SC.ButtonTypeRadio>
              <div className="formQuestion">
                <p className="textFormRadioButton">
                  Quantos Supervisores existem na equipe do PCF no seu município?
                </p>
                <div id="containerOption">
                  <div id="containerOptionSixOption">

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="numberOfSupervisorsZero"
                        name="numberOfSupervisors"
                        type="radio"
                        value="0"
                        onChange={handleNumberOfSupervisors}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="numberOfSupervisorsZero"
                      >0
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="numberOfSupervisorsOne"
                        name="numberOfSupervisors"
                        type="radio"
                        value="1"
                        onChange={handleNumberOfSupervisors}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="numberOfSupervisorsOne"
                      >1
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="numberOfSupervisorsTwo"
                        name="numberOfSupervisors"
                        type="radio"
                        value="2"
                        onChange={handleNumberOfSupervisors}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="numberOfSupervisorsTwo"
                      >2
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="numberOfSupervisorsThree"
                        name="numberOfSupervisors"
                        type="radio"
                        value="3"
                        onChange={handleNumberOfSupervisors}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="numberOfSupervisorsThree"
                      >3
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="numberOfSupervisorsFour"
                        name="numberOfSupervisors"
                        type="radio"
                        value="4_ou_mais"
                        onChange={handleNumberOfSupervisors}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="numberOfSupervisorsFour"
                      >4 ou mais
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="numberOfSupervisorsNotApplicable"
                        name="numberOfSupervisors"
                        type="radio"
                        value="Não_se_aplica"
                        onChange={handleNumberOfSupervisors}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="numberOfSupervisorsNotApplicable"
                      >Não se aplica
                      </label>
                    </div>

                  </div>
                </div>
              </div>
            </SC.ButtonTypeRadio>

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
                        name="a_supervisoresHorasSemanais40"
                        type="checkbox"
                        checked={questionThree.a_supervisoresHorasSemanais40}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          a_supervisoresHorasSemanais40: !!event.currentTarget?.checked
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
                        name="b_supervisoresHorasSemanais30"
                        type="checkbox"
                        checked={questionThree.b_supervisoresHorasSemanais30}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          b_supervisoresHorasSemanais30: !!event.currentTarget?.checked
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
                        name="c_supervisoresHorasSemanais20"
                        type="checkbox"
                        checked={questionThree.c_supervisoresHorasSemanais20}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          c_supervisoresHorasSemanais20: !!event.currentTarget?.checked
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
                        name="d_supervisoresHorasSemanaisOutros"
                        type="checkbox"
                        checked={questionThree.d_supervisoresHorasSemanaisOutros}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          d_supervisoresHorasSemanaisOutros: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="workloadOthers"
                      >Outros:
                      </label>
                      <input
                        className="inputPlaceholderOther"
                        name="e_supervisoresHorasSemanaisOutrosDescricao"
                        type="text"
                        value={questionThree.e_supervisoresHorasSemanaisOutrosDescricao}
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
                      htmlFor="supervisorGraduationIncomplete">
                      Superior incompleto:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="supervisorGraduationIncomplete"
                      name="a_supervisoresGraduacaoIncompleta"
                      type="text"
                      value={questionFive.a_supervisoresGraduacaoIncompleta}
                      onChange={handleSupervisorQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="supervisorGraduationComplete">
                      Superior completo:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="supervisorGraduationComplete"
                      name="b_supervisoresGraduacaoCompleta"
                      type="text"
                      value={questionFive.b_supervisoresGraduacaoCompleta}
                      onChange={handleSupervisorQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="supervisorSpecialization">
                      Especialização:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      id="supervisorSpecialization"
                      name="c_especializacaoSupervisor"
                      type="text"
                      value={questionFive.c_supervisoresEspecializacao}
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
                      name="d_mestradoSupervisor"
                      type="text"
                      value={questionFive.d_supervisoresMestrado}
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
                      name="e_doutoradoSupervisor"
                      type="text"
                      value={questionFive.e_supervisoresDoutorado}
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
                Informe quantos Supervisores da equipe do PCF são contratados nas seguintes categorias em seu município e sua remuneração média:

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
                        value={questionSix.a_supervisoresServidorEfetivo}
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
                        value={questionSix.b_supervisoresMediaRemuneracaoEfetivo}
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
                        value={questionSeven.a_supervisoresCargoComissionado}
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
                        value={questionSeven.b_supervisoresMediaRemuneracaoComissionado}
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
                        value={questionEight.a_supervisoresServidorTemporario}
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
                        value={questionEight.b_supervisoresMediaRemuneracaoTemporario}
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
                        value={questionNine.a_supervisoresBolsista}
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
                        value={questionNine.b_supervisoresMediaRemuneracaoBolsista}
                        onChange={handleScholarshipRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="profissionalAutonomoSupervisor"
                      >Profissional autônomo:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="profissionalAutonomoSupervisor"
                        name="supervisoresOutrosCargos"
                        type="text"
                        value={questionTen.a_supervisoresProfissionalAutonomo}
                        onChange={handleAutonomousSupervisorChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoProfissionalAutonomoSupervisor">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoProfissionalAutonomoSupervisor"
                        name="supervisoresMediaRemuneracaoOutrosCargos"
                        type="text"
                        value={questionTen.b_supervisoresMediaRemuneracaoProfissionalAutonomo}
                        onChange={handleAutonomousSupervisorChange}
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
                        value={questionEleven.a_supervisoresOutrosCargos}
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
                        value={questionEleven.b_supervisoresMediaRemuneracaoOutrosCargos}
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

  {/* <SC.ButtonTypeText>
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
  </SC.ButtonTypeText> */}