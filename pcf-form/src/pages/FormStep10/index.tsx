import * as SC from "../../styles/styles";
import { Theme } from "../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../context/FormContext";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { database } from "../../services/firebase";
import { ref, push, set } from "firebase/database";
import { InputArea } from "../../components/Questions/TableQuestion/components/InputArea";
import { TableArea } from "../../components/Questions/TableQuestion/components/TableArea";
import { Item } from "../../components/Questions/TableQuestion/types/Item";

type RoomParams = {
  id: string;
};

interface UsedTransport {
  a_veiculoProprioSupervisorComAjuda: boolean;
  b_veiculoProprioSupervisorSemAjuda: boolean;
  c_veiculoProprioVisitadorComAjuda: boolean;
  d_veiculoProprioVisitadorSemAjuda: boolean;
  e_veiculoProprioPCF: boolean;
  f_veiculoAlugadoPCF: boolean;
  g_veiculoMunicipio: boolean;
  h_veiculoContratado: boolean;
  i_veiculoUberTaxi: boolean;
  j_veiculoOutro: boolean;
  k_veiculoOutroText: string;
};

export const FormStep10 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [questionTwo, setQuestionTwo] = useState('');
  const [questionTwoText, setquestionTwoText] = useState('');
  const [questionThree, setQuestionThree] = useState<UsedTransport>({
    a_veiculoProprioSupervisorComAjuda: false,
    b_veiculoProprioSupervisorSemAjuda: false,
    c_veiculoProprioVisitadorComAjuda: false,
    d_veiculoProprioVisitadorSemAjuda: false,
    e_veiculoProprioPCF: false,
    f_veiculoAlugadoPCF: false,
    g_veiculoMunicipio: false,
    h_veiculoContratado: false,
    i_veiculoUberTaxi: false,
    j_veiculoOutro: false,
    k_veiculoOutroText: '',
  });
  const [questionFour, setQuestionFour] = useState('');
  const [questionFive, setQuestionFive] = useState('');
  const [questionSix, setQuestionSix] = useState('');
  const [questionSeven, setQuestionSeven] = useState('');
  const [questionEight, setQuestionEight] = useState('');

  const [isCheckQ57, setIsCheckQ57] = useState<string>();
  const [isCheckQ59, setIsCheckQ59] = useState<string>();

  function handleAddItem(item: Item) {
    let newList = [...list]
    newList.push(item)
    setList(newList)
  };

  function removerDaLista(index: number) {
    setFilteredList((previous) => previous.filter((item, indexPrevious) => index !== indexPrevious))
  };

  async function handleSendOtherCosts(event: FormEvent) {
    event.preventDefault();

    const question = {
      J_Outros_Custos: {
        questao53: filteredList,
        questao54:
        {
          questionTwo,
          questionTwoText,
        },
        questao55: questionThree,
        questao56: questionFour,
        questao57: questionFive,
        questao58: questionSix,
        questao59: questionSeven,
        questao60: questionEight,
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

    navigate(`/${roomId}/formstep7`)
  };

  const handleVisitorPaysTransportChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };

  const handleVisitorPaysTransportTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setquestionTwoText(event.target.value);
  };
  
  const handleUsedTransporteChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionThree({
      ...questionThree,
      [name]: value,
    })
  }, [questionThree]);

  const handleDirectCostPCFChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionFour(event.target.value);
  };

  const handleDirectCostPCFTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionFive(event.target.value);
  };

  const handleOtherImportantCostsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionSix(event.target.value);
  };

  const handleOtherImportantCostsTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionSeven(event.target.value);
  };

  const handleMonthlyRecordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionEight(event.target.value);
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 10
    });
  }, []);

  useEffect(() => {
    setFilteredList(list)
  }, [list]);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Recursos e Custos do PCF</h1>
        <p>Recursos e custos mensais diretos do PCF no município (incluindo recursos humanos, materiais, infraestrutura etc.)</p>
        <hr />
      </SC.Container>

      <form onSubmit={handleSendOtherCosts}>
        <SC.SubSection>
          <div className="bgSubSection">
            <p>Outros custos</p>
          </div>

          <div className="formQuestionV2">
            <SC.ContainerV2>
              <SC.Body>

                <InputArea onAdd={handleAddItem} />

                <TableArea list={filteredList} />

              </SC.Body>
            </SC.ContainerV2>
          </div>

          <SC.ButtonTypeRadioV2>
            <div className="formQuestion">
              <p className="textFormRadioButton">
                O visitador paga pelo seu próprio transporte?
              </p>
              <div id="containerOption">
                <div id="containerOptionSixOption">

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="visitorPaysTransportYes"
                      name="visitorPaysTransport"
                      type="radio"
                      value="sim"
                      onChange={handleVisitorPaysTransportChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="visitorPaysTransportYes"
                    >Sim
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="visitorPaysTransportNo"
                      name="visitorPaysTransport"
                      type="radio"
                      value="Não"
                      onChange={handleVisitorPaysTransportChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="visitorPaysTransportNo"
                    >Não
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="visitorPaysTransportSometimes"
                      name="visitorPaysTransport"
                      type="radio"
                      value="As vezes"
                      onChange={handleVisitorPaysTransportChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="visitorPaysTransportSometimes"
                    >As vezes
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="visitorPaysTransportOtherPays"
                      name="visitorPaysTransport"
                      type="radio"
                      value="Outros"
                      onChange={handleVisitorPaysTransportChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="visitorPaysTransportOtherPays"
                    >Outros
                    </label>
                    <input
                      className="inputPlaceholderOther"
                      id="visitorPaysTransportOtherPaysText"
                      name="visitorPaysTransport"
                      type="text"
                      value={questionTwoText}
                      onChange={handleVisitorPaysTransportTextChange}
                      placeholder="Escreva aqui"
                    />
                  </div>

                </div>
              </div>
            </div>
          </SC.ButtonTypeRadioV2>
        
        </SC.SubSection>

        <SC.ButtonTypeCheckbox>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              Qual o transporte utilizado para as visitas?
            </p>

            <div id="containerOption">
              <div id="containerOptionSixOption">

                <div id="containerInputLabelRadioButton">
                  <input
                    id="a_veiculoProprioSupervisorComAjuda"
                    name="a_veiculoProprioSupervisorComAjuda"
                    type="checkbox"
                    checked={questionThree.a_veiculoProprioSupervisorComAjuda}
                    onChange={(event) => setQuestionThree({
                      ...questionThree,
                      a_veiculoProprioSupervisorComAjuda: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="a_veiculoProprioSupervisorComAjuda"
                  >Veículo próprio do Supervisor (com ajuda de custo)
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="b_veiculoProprioSupervisorSemAjuda"
                    name="b_veiculoProprioSupervisorSemAjuda"
                    type="checkbox"
                    checked={questionThree.b_veiculoProprioSupervisorSemAjuda}
                    onChange={(event) => setQuestionThree({
                      ...questionThree,
                      b_veiculoProprioSupervisorSemAjuda: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="b_veiculoProprioSupervisorSemAjuda"
                  >Veículo próprio do Supervisor (sem ajuda de custo)
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="c_veiculoProprioVisitadorComAjuda"
                    name="c_veiculoProprioVisitadorComAjuda"
                    type="checkbox"
                    checked={questionThree.c_veiculoProprioVisitadorComAjuda}
                    onChange={(event) => setQuestionThree({
                      ...questionThree,
                      c_veiculoProprioVisitadorComAjuda: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="c_veiculoProprioVisitadorComAjuda"
                  >Veículo próprio do Visitador (com ajuda de custo)
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="d_veiculoProprioVisitadorSemAjuda"
                    name="d_veiculoProprioVisitadorSemAjuda"
                    type="checkbox"
                    checked={questionThree.d_veiculoProprioVisitadorSemAjuda}
                    onChange={(event) => setQuestionThree({
                      ...questionThree,
                      d_veiculoProprioVisitadorSemAjuda: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="d_veiculoProprioVisitadorSemAjuda"
                  >Veículo próprio do Visitador (sem ajuda de custo)
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="e_veiculoProprioPCF"
                    name="e_veiculoProprioPCF"
                    type="checkbox"
                    checked={questionThree.e_veiculoProprioPCF}
                    onChange={(event) => setQuestionThree({
                      ...questionThree,
                      e_veiculoProprioPCF: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="lastMonthSpentJaneiro"
                  >Veículo próprio do PCF
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="f_veiculoAlugadoPCF"
                    name="f_veiculoAlugadoPCF"
                    type="checkbox"
                    checked={questionThree.f_veiculoAlugadoPCF}
                    onChange={(event) => setQuestionThree({
                      ...questionThree,
                      f_veiculoAlugadoPCF: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="f_veiculoAlugadoPCF"
                  >Veículo alugado para o PCF
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="g_veiculoMunicipio"
                    name="g_veiculoMunicipio"
                    type="checkbox"
                    checked={questionThree.g_veiculoMunicipio}
                    onChange={(event) => setQuestionThree({
                      ...questionThree,
                      g_veiculoMunicipio: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="g_veiculoMunicipio"
                  >Veículo do município
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="h_veiculoContratado"
                    name="h_veiculoContratado"
                    type="checkbox"
                    checked={questionThree.h_veiculoContratado}
                    onChange={(event) => setQuestionThree({
                      ...questionThree,
                      h_veiculoContratado: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="h_veiculoContratado"
                  >Moto contratada/alugada
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="i_veiculoUberTaxi"
                    name="i_veiculoUberTaxi"
                    type="checkbox"
                    checked={questionThree.i_veiculoUberTaxi}
                    onChange={(event) => setQuestionThree({
                      ...questionThree,
                      i_veiculoUberTaxi: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="i_veiculoUberTaxi"
                  >Taxi ou Uber contratado pelo município
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="j_veiculoOutro"
                    name="j_veiculoOutro"
                    type="checkbox"
                    checked={questionThree.j_veiculoOutro}
                    onChange={(event) => setQuestionThree({
                      ...questionThree,
                      j_veiculoOutro: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="j_veiculoOutro"
                  >Outros
                  </label>
                  <input
                    id="k_veiculoOutroText"
                    className="inputPlaceholderOther"
                    name="k_veiculoOutroText"
                    type="text"
                    value={questionThree.k_veiculoOutroText}
                    onChange={handleUsedTransporteChange}
                    placeholder="Escreva aqui"
                  />
                </div>
        
              </div>
            </div>
          </div>
        </SC.ButtonTypeCheckbox>

        <SC.SubSection>
          <div className="bgSubSection">
            <p>Subseção Outros Custos</p>
          </div>
          <div className="formQuestionV2">
            <SC.ButtonTypeRadioText>
              <div className="formQuestion">
                <p>Há algum outro custo direto pago com recurso do PCF?</p>
                <div className="formQuestion">
                  <div id="containerOption">
                    <div id="containerOptionSixOption">
            
                      <div id="containerInputLabelRadioButton">
                        <input
                          
                          id="directCostPCFYes"
                          name="directCostPCF"
                          type="radio"
                          value={"sim_Q57"}
                          onClick={() => setIsCheckQ57("sim_Q57")}
                          onChange={handleDirectCostPCFChange}
                        />
                        <label
                          className="containerTextLabel"
                          htmlFor="directCostPCFYes"
                        >Sim
                        </label>
                      </div>

                      <div id="containerInputLabelRadioButton">
                        <input
                          id="directCostPCFNo"
                          name="directCostPCF"
                          type="radio"
                          value={"nao_Q57"}
                          onClick={() => setIsCheckQ57("nao_Q57")}
                          onChange={handleDirectCostPCFChange}
                        />
                        <label
                          className="containerTextLabel"
                          htmlFor="directCostPCFNo"
                        >Não
                        </label>
                      </div>

                      <div id="containerInputLabelRadioButton">
                        <input
                          id="directCostPCFDontKnow"
                          name="directCostPCF"
                          type="radio"
                          value={"naoSei_Q57"}
                          onClick={() => setIsCheckQ57("naoSei_Q57")}
                          onChange={handleDirectCostPCFChange}
                        />
                        <label
                          className="containerTextLabel"
                          htmlFor="directCostPCFDontKnow"
                        >Desconheço
                        </label>
                      </div>

                    </div>
                  </div>
                </div>

                {isCheckQ57 === "sim_Q57" && (
                  <>
                    <div className="containerBgLabel">
                      <label className="containerTextLabel" htmlFor="name">
                        Quais?
                        <input
                          name="otherImportantCostsText"
                          type="text"
                          value={questionFive}
                          onChange={handleDirectCostPCFTextChange}
                          placeholder="Sua resposta"
                        />
                      </label>
                    </div>
                  </>
                )}
              </div>
            </SC.ButtonTypeRadioText>

            <SC.ButtonTypeRadioText>
              <div className="formQuestion">
                <p>
                Existem outros gastos que são importantes para o funcionamento do programa e que não são cobertos pelos recursos repassados pelo PCF? (exemplo: protetor solar, guarda-chuva etc.)
                </p>
                <div className="formQuestion">
                  <div id="containerOption">
                    <div id="containerOptionSixOption">
            
                      <div id="containerInputLabelRadioButton">
                        <input
                          id="otherImportantCostsYes"
                          name="otherImportantCosts"
                          type="radio"
                          value={"sim_Q59"}
                          onClick={() => setIsCheckQ59("sim_Q59")}
                          onChange={handleOtherImportantCostsChange}
                        />
                        <label
                          className="containerTextLabel"
                          htmlFor="otherImportantCostsYes"
                        >Sim
                        </label>
                      </div>

                      <div id="containerInputLabelRadioButton">
                        <input
                          id="otherImportantCostsNo"
                          name="otherImportantCosts"
                          type="radio"
                          value={"nao_Q59"}
                          onClick={() => setIsCheckQ59("nao_Q59")}
                          onChange={handleOtherImportantCostsChange}
                        />
                        <label
                          className="containerTextLabel"
                          htmlFor="otherImportantCostsNo"
                        >Não
                        </label>
                      </div>

                    </div>
                  </div>
                </div>

                {isCheckQ59 === "sim_Q59" && (
                  <>
                    <div className="containerBgLabel">
                      <label className="containerTextLabel" htmlFor="name">
                        Quais?
                        <input
                          name="otherImportantCostsText"
                          type="text"
                          value={questionSeven}
                          onChange={handleOtherImportantCostsTextChange}
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
                  Há registros mensais destes custos?
                </p>
                <div id="containerOption">
                  <div id="containerOptionSixOption">

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="monthlyRecordYes"
                        name="monthlyRecord"
                        type="radio"
                        value="sim"
                        onChange={handleMonthlyRecordChange}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="monthlyRecordYes"
                      >Sim
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        id="monthlyRecordNo"
                        name="monthlyRecord"
                        type="radio"
                        value="nao"
                        onChange={handleMonthlyRecordChange}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="monthlyRecordNo"
                      >Não
                      </label>
                    </div>

                  </div>
                </div>
              </div>
            </SC.ButtonTypeRadio>
          </div>
        </SC.SubSection>

        <SC.AllButtons>
            <Link className="buttonAll" to="/:id/formstep9">Voltar</Link>
            <button
              className="buttonAll"
              type="submit"
              >Finalizar
            </button>
          </SC.AllButtons>
      </form>
    </Theme>
  )
};

