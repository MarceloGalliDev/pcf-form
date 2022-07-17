import * as SC from "../../../styles/styles";
import { Theme } from "../../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { database } from "../../../services/firebase";
import { ref, push, set } from "firebase/database";
import { Item } from "../../../components/Questions/QuestionRecursosCustos/types/Item";
import { Item1 } from "../../../components/Questions/QuestionOutrosCustos1/types/Item1";
import { Item2 } from "../../../components/Questions/QuestionOutrosCustos2/types/Item2";
import { InputArea } from "../../../components/Questions/QuestionRecursosCustos/components/InputArea";
import { TableArea } from "../../../components/Questions/QuestionRecursosCustos/components/TableArea";
import { InputAreaOutrosCustos1 } from "../../../components/Questions/QuestionOutrosCustos1/components/InputArea";
import { TableAreaOutrosCustos1 } from "../../../components/Questions/QuestionOutrosCustos1/components/TableArea";
import { InputAreaOutrosCustos2 } from "../../../components/Questions/QuestionOutrosCustos2/components/InputArea";
import { TableAreaOutrosCustos2 } from "../../../components/Questions/QuestionOutrosCustos2/components/TableArea";
import { CheckCircle } from 'phosphor-react';
import { Alert } from 'reactstrap';


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
  j_veiculoCaminhandoBicicleta: boolean;
  k_veiculoOutro: boolean;
  l_veiculoOutroText: string;
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
    j_veiculoCaminhandoBicicleta: false,
    k_veiculoOutro: false,
    l_veiculoOutroText: '',
  });
  const [list1, setList1] = useState<Item1[]>([]);
  const [filteredList1, setFilteredList1] = useState<Item1[]>([]);
  const [list2, setList2] = useState<Item2[]>([]);
  const [filteredList2, setFilteredList2] = useState<Item2[]>([]);
  const [questionSix, setQuestionSix] = useState('');

  const [isAlert, setIsAlert] = useState(false);

  function handleAddItemOthersCosts(item: Item) {
    let newList = [...list]
    newList.push(item)
    setList(newList)
  };
  function removerDaListaOthersCosts(index: number) {
    setList((previous) => previous.filter((item, indexPrevious) => index !== indexPrevious))
    return setList
  };

  function handleAddItemOthersCosts1(item1: Item1) {
    let newList1 = [...list1]
    newList1.push(item1)
    setList1(newList1)
  };
  function removerDaListaOthersCosts1(index1: number) {
    setList1((previous1) => previous1.filter((item1, indexPrevious1) => index1 !== indexPrevious1))
    return setList1
  };

  function handleAddItemOthersCosts2(item2: Item2) {
    let newList2 = [...list2]
    newList2.push(item2)
    setList2(newList2)
  };
  function removerDaListaOthersCosts2(index2: number) {
    setList2((previous2) => previous2.filter((item2, indexPrevious2) => index2 !== indexPrevious2))
    return setList2
  };

  async function handleSendOtherCosts(event: FormEvent) {
    event.preventDefault();

    const question = {
      J_Outros_Custos: {
        questao55: filteredList,
        questao56: questionTwo,
        questao57: questionThree,
        questao58: filteredList1,
        questao59: filteredList2,
        questao60: questionSix,
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/aderidos/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question);

    if (confirm('Tem certeza que deseja finalizar o questionário?')) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    };
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

  const handleMonthlyRecordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionSix(event.target.value);
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

  useEffect(() => {
    setFilteredList1(list1)
  }, [list1]);

  useEffect(() => {
    setFilteredList2(list2)
  }, [list2]);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Recursos e Custos do PCF</h1>
        <p>Recursos e custos mensais diretos do PCF no município (incluindo recursos humanos, materiais, infraestrutura etc.)</p>
        <hr />
      </SC.Container>

      <SC.SubSection>
        <div className="bgSubSection">
          <p>Subseção outros recursos</p>
        </div>

        <div className="formQuestionV2">
          <SC.ContainerV2>
            <SC.Body>

              <InputArea onAdd={handleAddItemOthersCosts} />

              <TableArea
                list={filteredList}
                remover={removerDaListaOthersCosts}
              />

            </SC.Body>
          </SC.ContainerV2>
        </div>
      </SC.SubSection>

      <SC.SubSection>
        <div className="bgSubSection">
          <p>Subseção outros custos</p>
        </div>
        <div className="formQuestionV2">

          <SC.ButtonTypeRadioV2>
            <form onSubmit={handleSendOtherCosts}>
              <div className="formQuestion">
                <p className="textFormRadioButton">
                  O visitador paga pelo seu próprio transporte?
                </p>
                <div id="containerOption">
                  <div id="containerOptionSixOption">

                    <div id="containerInputLabelRadioButton">
                      <input
                        required
                        id="visitorPaysTransportYes"
                        name="visitorPaysTransport"
                        type="radio"
                        value="Sim"
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
                        value="As_vezes"
                        onChange={handleVisitorPaysTransportChange}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="visitorPaysTransportSometimes"
                      >As vezes
                      </label>
                    </div>

                  </div>
                </div>
              </div>
            </form>
          </SC.ButtonTypeRadioV2>

          <SC.ButtonTypeCheckbox>
            <form onSubmit={handleSendOtherCosts}>
              <div className="formQuestion">
                <p className="textFormRadioButton">
                  Qual o transporte utilizado para as visitas?
                </p>

                <div id="containerOption">
                  <div id="containerOptionSixOption">

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionThree?.a_veiculoProprioSupervisorComAjuda && 
                          !questionThree.b_veiculoProprioSupervisorSemAjuda &&
                          !questionThree.c_veiculoProprioVisitadorComAjuda &&
                          !questionThree.d_veiculoProprioVisitadorSemAjuda &&
                          !questionThree.e_veiculoProprioPCF &&
                          !questionThree.f_veiculoAlugadoPCF &&
                          !questionThree.g_veiculoMunicipio &&
                          !questionThree.h_veiculoContratado &&
                          !questionThree.i_veiculoUberTaxi &&
                          !questionThree.j_veiculoCaminhandoBicicleta &&
                          !questionThree.k_veiculoOutro &&
                          !questionThree.l_veiculoOutroText
                        }
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
                        required={
                          !questionThree?.a_veiculoProprioSupervisorComAjuda && 
                          !questionThree.b_veiculoProprioSupervisorSemAjuda &&
                          !questionThree.c_veiculoProprioVisitadorComAjuda &&
                          !questionThree.d_veiculoProprioVisitadorSemAjuda &&
                          !questionThree.e_veiculoProprioPCF &&
                          !questionThree.f_veiculoAlugadoPCF &&
                          !questionThree.g_veiculoMunicipio &&
                          !questionThree.h_veiculoContratado &&
                          !questionThree.i_veiculoUberTaxi &&
                          !questionThree.j_veiculoCaminhandoBicicleta &&
                          !questionThree.k_veiculoOutro &&
                          !questionThree.l_veiculoOutroText
                        }
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
                        required={
                          !questionThree?.a_veiculoProprioSupervisorComAjuda && 
                          !questionThree.b_veiculoProprioSupervisorSemAjuda &&
                          !questionThree.c_veiculoProprioVisitadorComAjuda &&
                          !questionThree.d_veiculoProprioVisitadorSemAjuda &&
                          !questionThree.e_veiculoProprioPCF &&
                          !questionThree.f_veiculoAlugadoPCF &&
                          !questionThree.g_veiculoMunicipio &&
                          !questionThree.h_veiculoContratado &&
                          !questionThree.i_veiculoUberTaxi &&
                          !questionThree.j_veiculoCaminhandoBicicleta &&
                          !questionThree.k_veiculoOutro &&
                          !questionThree.l_veiculoOutroText
                        }
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
                        required={
                          !questionThree?.a_veiculoProprioSupervisorComAjuda && 
                          !questionThree.b_veiculoProprioSupervisorSemAjuda &&
                          !questionThree.c_veiculoProprioVisitadorComAjuda &&
                          !questionThree.d_veiculoProprioVisitadorSemAjuda &&
                          !questionThree.e_veiculoProprioPCF &&
                          !questionThree.f_veiculoAlugadoPCF &&
                          !questionThree.g_veiculoMunicipio &&
                          !questionThree.h_veiculoContratado &&
                          !questionThree.i_veiculoUberTaxi &&
                          !questionThree.j_veiculoCaminhandoBicicleta &&
                          !questionThree.k_veiculoOutro &&
                          !questionThree.l_veiculoOutroText
                        }
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
                        required={
                          !questionThree?.a_veiculoProprioSupervisorComAjuda && 
                          !questionThree.b_veiculoProprioSupervisorSemAjuda &&
                          !questionThree.c_veiculoProprioVisitadorComAjuda &&
                          !questionThree.d_veiculoProprioVisitadorSemAjuda &&
                          !questionThree.e_veiculoProprioPCF &&
                          !questionThree.f_veiculoAlugadoPCF &&
                          !questionThree.g_veiculoMunicipio &&
                          !questionThree.h_veiculoContratado &&
                          !questionThree.i_veiculoUberTaxi &&
                          !questionThree.j_veiculoCaminhandoBicicleta &&
                          !questionThree.k_veiculoOutro &&
                          !questionThree.l_veiculoOutroText
                        }
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
                        required={
                          !questionThree?.a_veiculoProprioSupervisorComAjuda && 
                          !questionThree.b_veiculoProprioSupervisorSemAjuda &&
                          !questionThree.c_veiculoProprioVisitadorComAjuda &&
                          !questionThree.d_veiculoProprioVisitadorSemAjuda &&
                          !questionThree.e_veiculoProprioPCF &&
                          !questionThree.f_veiculoAlugadoPCF &&
                          !questionThree.g_veiculoMunicipio &&
                          !questionThree.h_veiculoContratado &&
                          !questionThree.i_veiculoUberTaxi &&
                          !questionThree.j_veiculoCaminhandoBicicleta &&
                          !questionThree.k_veiculoOutro &&
                          !questionThree.l_veiculoOutroText
                        }
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
                        required={
                          !questionThree?.a_veiculoProprioSupervisorComAjuda && 
                          !questionThree.b_veiculoProprioSupervisorSemAjuda &&
                          !questionThree.c_veiculoProprioVisitadorComAjuda &&
                          !questionThree.d_veiculoProprioVisitadorSemAjuda &&
                          !questionThree.e_veiculoProprioPCF &&
                          !questionThree.f_veiculoAlugadoPCF &&
                          !questionThree.g_veiculoMunicipio &&
                          !questionThree.h_veiculoContratado &&
                          !questionThree.i_veiculoUberTaxi &&
                          !questionThree.j_veiculoCaminhandoBicicleta &&
                          !questionThree.k_veiculoOutro &&
                          !questionThree.l_veiculoOutroText
                        }
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
                        required={
                          !questionThree?.a_veiculoProprioSupervisorComAjuda && 
                          !questionThree.b_veiculoProprioSupervisorSemAjuda &&
                          !questionThree.c_veiculoProprioVisitadorComAjuda &&
                          !questionThree.d_veiculoProprioVisitadorSemAjuda &&
                          !questionThree.e_veiculoProprioPCF &&
                          !questionThree.f_veiculoAlugadoPCF &&
                          !questionThree.g_veiculoMunicipio &&
                          !questionThree.h_veiculoContratado &&
                          !questionThree.i_veiculoUberTaxi &&
                          !questionThree.j_veiculoCaminhandoBicicleta &&
                          !questionThree.k_veiculoOutro &&
                          !questionThree.l_veiculoOutroText
                        }
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
                        required={
                          !questionThree?.a_veiculoProprioSupervisorComAjuda && 
                          !questionThree.b_veiculoProprioSupervisorSemAjuda &&
                          !questionThree.c_veiculoProprioVisitadorComAjuda &&
                          !questionThree.d_veiculoProprioVisitadorSemAjuda &&
                          !questionThree.e_veiculoProprioPCF &&
                          !questionThree.f_veiculoAlugadoPCF &&
                          !questionThree.g_veiculoMunicipio &&
                          !questionThree.h_veiculoContratado &&
                          !questionThree.i_veiculoUberTaxi &&
                          !questionThree.j_veiculoCaminhandoBicicleta &&
                          !questionThree.k_veiculoOutro &&
                          !questionThree.l_veiculoOutroText
                        }
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
                      >Taxi/Uber contratado pelo município
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionThree?.a_veiculoProprioSupervisorComAjuda && 
                          !questionThree.b_veiculoProprioSupervisorSemAjuda &&
                          !questionThree.c_veiculoProprioVisitadorComAjuda &&
                          !questionThree.d_veiculoProprioVisitadorSemAjuda &&
                          !questionThree.e_veiculoProprioPCF &&
                          !questionThree.f_veiculoAlugadoPCF &&
                          !questionThree.g_veiculoMunicipio &&
                          !questionThree.h_veiculoContratado &&
                          !questionThree.i_veiculoUberTaxi &&
                          !questionThree.j_veiculoCaminhandoBicicleta &&
                          !questionThree.k_veiculoOutro &&
                          !questionThree.l_veiculoOutroText
                        }
                        id="j_veiculoCaminhandoBicicleta"
                        name="j_veiculoCaminhandoBicicleta"
                        type="checkbox"
                        checked={questionThree.j_veiculoCaminhandoBicicleta}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          j_veiculoCaminhandoBicicleta: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="j_veiculoCaminhandoBicicleta"
                      >Caminhando/bicicleta
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionThree?.a_veiculoProprioSupervisorComAjuda && 
                          !questionThree.b_veiculoProprioSupervisorSemAjuda &&
                          !questionThree.c_veiculoProprioVisitadorComAjuda &&
                          !questionThree.d_veiculoProprioVisitadorSemAjuda &&
                          !questionThree.e_veiculoProprioPCF &&
                          !questionThree.f_veiculoAlugadoPCF &&
                          !questionThree.g_veiculoMunicipio &&
                          !questionThree.h_veiculoContratado &&
                          !questionThree.i_veiculoUberTaxi &&
                          !questionThree.j_veiculoCaminhandoBicicleta &&
                          !questionThree.k_veiculoOutro
                        }
                        id="k_veiculoOutro"
                        name="k_veiculoOutro"
                        type="checkbox"
                        checked={questionThree.k_veiculoOutro}
                        onChange={(event) => setQuestionThree({
                          ...questionThree,
                          k_veiculoOutro: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="k_veiculoOutro"
                      >Outros
                      </label>
                      <input
                        required={
                          !questionThree?.a_veiculoProprioSupervisorComAjuda && 
                          !questionThree.b_veiculoProprioSupervisorSemAjuda &&
                          !questionThree.c_veiculoProprioVisitadorComAjuda &&
                          !questionThree.d_veiculoProprioVisitadorSemAjuda &&
                          !questionThree.e_veiculoProprioPCF &&
                          !questionThree.f_veiculoAlugadoPCF &&
                          !questionThree.g_veiculoMunicipio &&
                          !questionThree.h_veiculoContratado &&
                          !questionThree.i_veiculoUberTaxi &&
                          !questionThree.j_veiculoCaminhandoBicicleta &&
                          !questionThree.l_veiculoOutroText
                        }
                        id="l_veiculoOutroText"
                        className="inputPlaceholderOther"
                        name="l_veiculoOutroText"
                        type="text"
                        value={questionThree.l_veiculoOutroText}
                        onChange={handleUsedTransporteChange}
                        placeholder="Escreva aqui"
                      />
                    </div>
            
                  </div>
                </div>
              </div>
            </form>
          </SC.ButtonTypeCheckbox>

          <div className="formQuestionV1">
            <p>Há algum outro custo direto pago com recurso do PCF?</p>
            <SC.Body>
              <InputAreaOutrosCustos1 onAdd1={handleAddItemOthersCosts1} />

              <TableAreaOutrosCustos1
                list1={filteredList1}
                remover1={removerDaListaOthersCosts1}
              />
            </SC.Body>
          </div>

          <div className="formQuestionV1">
            <p>Existem outros gastos que são importantes para o funcionamento do programa e que não são cobertos pelos recursos repassados pelo PCF? </p>
            <SC.Body>
              <InputAreaOutrosCustos2 onAdd2={handleAddItemOthersCosts2} />

              <TableAreaOutrosCustos2
                list2={filteredList2}
                remover2={removerDaListaOthersCosts2}
              />
            </SC.Body>
          </div>

          <SC.ButtonTypeRadio>
            <form onSubmit={handleSendOtherCosts}>
              <div className="formQuestion">
                <p className="textFormRadioButton">
                  Há registros mensais destes custos?
                </p>
                <div id="containerOption">
                  <div id="containerOptionSixOption">

                    <div id="containerInputLabelRadioButton">
                      <input
                        required
                        id="monthlyRecordYes"
                        name="monthlyRecord"
                        type="radio"
                        value="Sim"
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
                        value="Não"
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
            </form>
          </SC.ButtonTypeRadio>
        </div>
      </SC.SubSection>

      <form onSubmit={handleSendOtherCosts}>
        <SC.AllButtons>
          <Link className="buttonAll" to={`/${roomId}/formstep9`}>Voltar</Link>
          <button
            className="buttonAll"
            type="submit"
            onClick={() => setIsAlert(true)}
            >Finalizar
          </button>
          {isAlert === true && (
            <Alert className="success">
              <CheckCircle size={20} color="#2dd24e" weight="light" />
              Formulário enviado com sucesso!
            </Alert>
          )}
        </SC.AllButtons>
      </form>
    </Theme>
  )
};