import * as SC from "../../styles/styles";
import { Theme } from "../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../context/FormContext";
import { ChangeEvent, useEffect, useState, useCallback, FormEvent } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../services/firebase";

interface Workload {
  horasSemanais40: boolean;
  horasSemanais30: boolean;
  horasSemanais20: boolean;
  horasSemanaisOutros: boolean;
  horasSemanaisOutrosDescricao: string;
};

interface SupervisorQualification {
  especializacao: string;
  mestrado: string;
  doutorado: string;
};

interface SupervisorTypeRemunaration1 {
  ServidorEfetivo: string;
  MédiaRemuneraçãoEfetivo: string;
};
interface SupervisorTypeRemunaration2 {
  CargoComissionado: string;
  MédiaRemuneraçãoComissionado: string;
};
interface SupervisorTypeRemunaration3 {
  ServidorTemporário: string;
  MédiaRemuneraçãoTemporário: string;
};
interface SupervisorTypeRemunaration4 {
  Bolsista: string;
  MédiaRemuneraçãoBolsista: string;
};
interface SupervisorTypeRemunaration5 {
  OutrosCargos: string;
  MédiaRemuneraçãoOutrosCargos: string;
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
    horasSemanais40: false,
    horasSemanais30: false,
    horasSemanais20: false,
    horasSemanaisOutros: false,
    horasSemanaisOutrosDescricao: '',
  });
  const [questionFive, setQuestionFive] =
  useState<SupervisorQualification>({
    especializacao: '',
    mestrado: '',
    doutorado: '',
  });
  const [questionSix, setQuestionSix] = useState<SupervisorTypeRemunaration1>({
    ServidorEfetivo: '',
    MédiaRemuneraçãoEfetivo: '',
  });
  const [questionSeven, setQuestionSeven] = useState<SupervisorTypeRemunaration2>({
    CargoComissionado: '',
    MédiaRemuneraçãoComissionado: '',
  });
  const [questionEight, setQuestionEight] = useState<SupervisorTypeRemunaration3>({
    ServidorTemporário: '',
    MédiaRemuneraçãoTemporário: '',
  });
  const [questionNine, setQuestionNine] = useState<SupervisorTypeRemunaration4>({
    Bolsista: '',
    MédiaRemuneraçãoBolsista: '',
  });
  const [questionTen, setQuestionTen] = useState<SupervisorTypeRemunaration5>({
    OutrosCargos: '',
    MédiaRemuneraçãoOutrosCargos: '',
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
                    name="numberOfSupervisors"
                    type="text"
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
                    name="averagePay"
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
                        name="horasSemanais40"
                        type="checkbox"
                        checked={questionThree.horasSemanais40}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          horasSemanais40: !!event.currentTarget?.checked
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
                        name="horasSemanais30"
                        type="checkbox"
                        checked={questionThree.horasSemanais30}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          horasSemanais30: !!event.currentTarget?.checked
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
                        name="horasSemanais20"
                        type="checkbox"
                        checked={questionThree.horasSemanais20}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          horasSemanais20: !!event.currentTarget?.checked
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
                        id="workload"
                        name="horasSemanaisOutros"
                        type="checkbox"
                        checked={questionThree.horasSemanaisOutros}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          horasSemanaisOutros: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="workload"
                      >Outro:
                      </label>
                      <input
                        className="inputPlaceholderOther"
                        name="horasSemanaisOutrosDescricao"
                        type="text"
                        value={questionThree.horasSemanaisOutrosDescricao}
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
                <label htmlFor="">
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
                      name="especializacao"
                      type="text"
                      value={questionFive.especializacao}
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
                      name="mestrado"
                      type="text"
                      value={questionFive.mestrado}
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
                      name="doutorado"
                      type="text"
                      value={questionFive.doutorado}
                      onChange={handleSupervisorQualificationChange}
                      placeholder="Sua resposta"
                    />
                  </div>
                </label>
              </div>
            </SC.ButtonTypeTextV3>

            <SC.ButtonTypeTextV3>
              <div className="formQuestion">
                <label htmlFor="name">
                  Quantos Supervisores da equipe do PCF são contratados nas seguintes categorias em seu município:

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="servidorefetivo"
                      >Servidor(a) efetivo(a):
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="servidorefetivo"
                        name="ServidorEfetivo"
                        type="text"
                        value={questionSix.ServidorEfetivo}
                        onChange={handleEffectiveRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoEfetivo">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoEfetivo"
                        name="MédiaRemuneraçãoEfetivo"
                        type="text"
                        value={questionSix.MédiaRemuneraçãoEfetivo}
                        onChange={handleEffectiveRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="cargoComissionado"
                      >Cargo comissionado:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="cargoComissionado"
                        name="CargoComissionado"
                        type="text"
                        value={questionSeven.CargoComissionado}
                        onChange={handleCommissionedRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoComissonado">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoComissonado"
                        name="MédiaRemuneraçãoComissionado"
                        type="text"
                        value={questionSeven.MédiaRemuneraçãoComissionado}
                        onChange={handleCommissionedRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="servidorTemporario"
                      >Servidor temporário:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="servidorTemporario"
                        name="ServidorTemporário"
                        type="text"
                        value={questionEight.ServidorTemporário}
                        onChange={handleTemporaryRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoTemporario">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoTemporario"
                        name="MédiaRemuneraçãoTemporário"
                        type="text"
                        value={questionEight.MédiaRemuneraçãoTemporário}
                        onChange={handleTemporaryRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="bolsista"
                      >Bolsista:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="bolsista"
                        name="Bolsista"
                        type="text"
                        value={questionNine.Bolsista}
                        onChange={handleScholarshipRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoBolsista">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoBolsista"
                        name="MédiaRemuneraçãoBolsista"
                        type="text"
                        value={questionNine.MédiaRemuneraçãoBolsista}
                        onChange={handleScholarshipRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                  </div>

                  <div id="containerLabelCheckboxBorder">
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="outrosCargos"
                      >Outros:
                      </label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="outrosCargos"
                        name="OutrosCargos"
                        type="text"
                        value={questionTen.OutrosCargos}
                        onChange={handleOthersRemunerationChange}
                        placeholder="Sua resposta"
                      />
                    </div>
                    <div id="containerTextLabelCheckbox">
                      <label
                        className="labelForContainerTextLabelCheckbox"
                        htmlFor="mediaRemuneracaoOutrosCargos">Média Remuneração:</label>
                      <input
                        className="inputForContainerTextLabelCheckbox"
                        id="mediaRemuneracaoOutrosCargos"
                        name="MédiaRemuneraçãoOutrosCargos"
                        type="text"
                        value={questionTen.MédiaRemuneraçãoOutrosCargos}
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