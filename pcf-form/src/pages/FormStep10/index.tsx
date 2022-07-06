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
  f_veiculoMunicipio: boolean;
  f_veiculoContratado: boolean;
  f_veiculoUberTaxi: boolean;
  g_veiculoOutroText: string;
}

export const FormStep10 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [questionTwo, setQuestionTwo] = useState('');
  const [questionThree, setQuestionThree] = useState<UsedTransport>({
    a_veiculoProprioSupervisorComAjuda: false,
    b_veiculoProprioSupervisorSemAjuda: false,
    c_veiculoProprioVisitadorComAjuda: false,
    d_veiculoProprioVisitadorSemAjuda: false,
    e_veiculoProprioPCF: false,
    f_veiculoAlugadoPCF: false,
    f_veiculoMunicipio: false,
    f_veiculoContratado: false,
    f_veiculoUberTaxi: false,
    g_veiculoOutroText: '',
  });
  const [questionFour, setQuestionFour] = useState('');
  const [questionFive, setQuestionFive] = useState('');
  const [questionSix, setQuestionSix] = useState('');
  const [questionSeven, setQuestionSeven] = useState('');
  const [questionEight, setQuestionEight] = useState('');
  const [questionNine, setQuestionNine] = useState('');
  const [questionTen, setQuestionTen] = useState('');
  

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
        questao54: questionTwo,
        questao55: questionThree,
        questao56: questionFour,
        questao57: questionFive,
        questao58: questionSix,
        questao59: questionSeven,
        questao60: questionEight,
        questao61: questionNine,
        questao62: questionTen,
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

  const handleUsedTransporteChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionThree({
      ...questionThree,
      [name]: value,
    })
  }, [questionThree]);

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
        <h1>Outros Custos</h1>
        <p>Outros custos com transporte, diárias e recursos materiais.</p>
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
                      value={questionTwo}
                      onChange={handleVisitorPaysTransportChange}
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
                    id="f_veiculoMunicipio"
                    name="f_veiculoMunicipio"
                    type="checkbox"
                    checked={questionThree.f_veiculoMunicipio}
                    onChange={(event) => setQuestionThree({
                      ...questionThree,
                      f_veiculoMunicipio: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="f_veiculoMunicipio"
                  >Veículo do município
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="f_veiculoContratado"
                    name="f_veiculoContratado"
                    type="checkbox"
                    checked={questionThree.f_veiculoContratado}
                    onChange={(event) => setQuestionThree({
                      ...questionThree,
                      f_veiculoContratado: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="f_veiculoContratado"
                  >Moto contratada/alugada
                  </label>
                </div>

                <div id="containerInputLabelRadioButton">
                  <input
                    id="lastMonthSpentFevereiro"
                    name="lastMonthSpentData"
                    type="checkbox"
                    checked={questionOne.f_outroDistribuicao}
                    onChange={(event) => setQuestionOne({
                      ...questionOne,
                      f_outroDistribuicao: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="lastMonthSpentFevereiro"
                  >Taxi ou Uber contratado pelo município
                  </label>
                </div>
                <div id="containerInputLabelRadioButton">
                  <input
                    id="lastMonthSpentFevereiro"
                    name="lastMonthSpentData"
                    type="checkbox"
                    checked={questionOne.f_outroDistribuicao}
                    onChange={(event) => setQuestionOne({
                      ...questionOne,
                      f_outroDistribuicao: !!event.currentTarget?.checked
                    })}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="lastMonthSpentFevereiro"
                  >Outros
                  </label>
                  <input
                    id="g_veiculoOutroText"
                    className="inputPlaceholderOther"
                    name="g_veiculoOutroText"
                    type="text"
                    value={questionThree.g_veiculoOutroText}
                    onChange={handleUsedTransporteChange}
                    placeholder="Escreva aqui"
                  />
                </div>
        
              </div>
            </div>
          </div>
        </SC.ButtonTypeCheckbox>

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
                      onChange={handleLastMonthSpentDataChange}
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
                      onChange={handleLastMonthSpentDataChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >Não
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentFevereiro"
                      name="lastMonthSpentData"
                      type="radio"
                      value="Não"
                      onChange={handleLastMonthSpentDataChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >Não sei
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="containerBgLabel">
              <label className="containerTextLabel" htmlFor="name">
                Se sim, Quais?
                <input
                  name="name"
                  type="text"
                  autoFocus
                  value={state.name}
                  onChange={handleVisitorPaysTransportChange}
                  placeholder="Sua resposta"
                />
              </label>
            </div>
          </div>
        </SC.ButtonTypeRadioText>

        <SC.ButtonTypeRadioText>
          <div className="formQuestion">
            <p>
              Há algum outro custo considerado importante para o PCF não especificado anteriormente?
            </p>
            <div className="formQuestion">
              <div id="containerOption">
                <div id="containerOptionSixOption">
        
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentJaneiro"
                      name="lastMonthSpentData"
                      type="radio"
                      value="sim"
                      onChange={handleLastMonthSpentDataChange}
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
                      onChange={handleLastMonthSpentDataChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >Não
                    </label>
                  </div>
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentFevereiro"
                      name="lastMonthSpentData"
                      type="radio"
                      value="Não"
                      onChange={handleLastMonthSpentDataChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >Não sei
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="containerBgLabel">
              <label className="containerTextLabel" htmlFor="name">
                Se sim, Quais?
                <input
                  name="name"
                  type="text"
                  autoFocus
                  value={state.name}
                  onChange={handleVisitorPaysTransportChange}
                  placeholder="Sua resposta"
                />
              </label>
            </div>
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
                    id="lastMonthSpentJaneiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="sim"
                    onChange={handleLastMonthSpentDataChange}
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
                    onChange={handleLastMonthSpentDataChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="lastMonthSpentFevereiro"
                  >Não
                  </label>
                </div>
                <div id="containerInputLabelRadioButton">
                  <input
                    id="lastMonthSpentFevereiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Não"
                    onChange={handleLastMonthSpentDataChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="lastMonthSpentFevereiro"
                  >Não sei
                  </label>
                </div>
              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

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

