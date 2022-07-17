import * as SC from "../../../styles/styles";
import { Theme } from "../../../components/Theme";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormPage, FormActions } from "../../../context/FormContext";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../../services/firebase";

type RoomParams = {
  id: string;
};

interface DistributionCriterion {
  a_proximidadeDomicilioFamilia: boolean;
  b_proximidadeDomicilioVisitadores: boolean;
  c_caracteristicasCrianca: boolean;
  d_atribuicaoPorVaga: boolean;
  e_sorteio: boolean;
  f_outroDistribuicao: boolean;
  g_outroDistribuicaoText: string;
};

export const FormStep9 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState<DistributionCriterion>({
    a_proximidadeDomicilioFamilia: false,
    b_proximidadeDomicilioVisitadores: false,
    c_caracteristicasCrianca: false,
    d_atribuicaoPorVaga: false,
    e_sorteio: false,
    f_outroDistribuicao: false,
    g_outroDistribuicaoText: '',
  })
  const [questionTwo, setQuestionTwo] = useState('')

  async function handleSendOtherCostsAndResources(event: FormEvent) {
    event.preventDefault();

    if (questionTwo.trim() === '') {
      return;
    };

    const question = {
      I_Recursos_E_Custos : {
        questao53: questionOne,
        questao54: questionTwo,
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/aderidos/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

    navigate(`/${roomId}/formstep10`)
  };

  const handleDistributionCriterionChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;
    setQuestionOne({
      ...questionOne,
      [name]: value,
    })
  }, [questionOne]);

  const handleNumberOfVisitsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 9
    });
  }, []);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Visitas domiciliares</h1>
        <p>Recursos e custos mensais diretos do PCF no município (incluindo recursos humanos, materiais, infraestrutura etc.)</p>
        <hr/>
      </SC.Container>

      <form onSubmit={handleSendOtherCostsAndResources}>

        <SC.SubSection>
          <div className="bgSubSection">
            <p>Recursos e custos diretos do PCF</p>
          </div>
          <div className="formQuestionV2">

          <SC.ButtonTypeCheckbox>
            <div className="formQuestion">
              <p className="textFormRadioButton">
              Qual o critério de distribuição das famílias por Visitador?
              </p>
                <div id="containerOption">
                  <div id="containerOptionSixOption">

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionOne.a_proximidadeDomicilioFamilia && 
                          !questionOne.b_proximidadeDomicilioVisitadores &&
                          !questionOne.c_caracteristicasCrianca &&
                          !questionOne.d_atribuicaoPorVaga &&
                          !questionOne.e_sorteio &&
                          !questionOne.f_outroDistribuicao &&
                          !questionOne.g_outroDistribuicaoText
                        }
                        id="a_proximidadeDomicilioFamilia"
                        name="a_proximidadeDomicilioFamilia"
                        type="checkbox"
                        checked={questionOne.a_proximidadeDomicilioFamilia}
                        onChange={(event) => setQuestionOne({
                          ...questionOne,
                          a_proximidadeDomicilioFamilia: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="a_proximidadeDomicilioFamilia"
                      >Proximidade entre os domicílios das famílias atendendias pelo PCF
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionOne.a_proximidadeDomicilioFamilia && 
                          !questionOne.b_proximidadeDomicilioVisitadores &&
                          !questionOne.c_caracteristicasCrianca &&
                          !questionOne.d_atribuicaoPorVaga &&
                          !questionOne.e_sorteio &&
                          !questionOne.f_outroDistribuicao &&
                          !questionOne.g_outroDistribuicaoText
                        }
                        id="b_proximidadeDomicilioVisitadores"
                        name="b_proximidadeDomicilioVisitadores"
                        type="checkbox"
                        checked={questionOne.b_proximidadeDomicilioVisitadores}
                        onChange={(event) => setQuestionOne({
                          ...questionOne,
                          b_proximidadeDomicilioVisitadores: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="b_proximidadeDomicilioVisitadores"
                      >Proximidade entre os domicílios dos visitadores e das famílias
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionOne.a_proximidadeDomicilioFamilia && 
                          !questionOne.b_proximidadeDomicilioVisitadores &&
                          !questionOne.c_caracteristicasCrianca &&
                          !questionOne.d_atribuicaoPorVaga &&
                          !questionOne.e_sorteio &&
                          !questionOne.f_outroDistribuicao &&
                          !questionOne.g_outroDistribuicaoText
                        }
                        id="c_caracteristicasCrianca"
                        name="c_caracteristicasCrianca"
                        type="checkbox"
                        checked={questionOne.c_caracteristicasCrianca}
                        onChange={(event) => setQuestionOne({
                          ...questionOne,
                          c_caracteristicasCrianca: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="c_caracteristicasCrianca"
                      >Característica da criança
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionOne.a_proximidadeDomicilioFamilia && 
                          !questionOne.b_proximidadeDomicilioVisitadores &&
                          !questionOne.c_caracteristicasCrianca &&
                          !questionOne.d_atribuicaoPorVaga &&
                          !questionOne.e_sorteio &&
                          !questionOne.f_outroDistribuicao &&
                          !questionOne.g_outroDistribuicaoText
                        }
                        id="d_atribuicaoPorVaga"
                        name="d_atribuicaoPorVaga"
                        type="checkbox"
                        checked={questionOne.d_atribuicaoPorVaga}
                        onChange={(event) => setQuestionOne({
                          ...questionOne,
                          d_atribuicaoPorVaga: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="d_atribuicaoPorVaga"
                      >Atribuição por vaga na agenda do visitador
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionOne.a_proximidadeDomicilioFamilia && 
                          !questionOne.b_proximidadeDomicilioVisitadores &&
                          !questionOne.c_caracteristicasCrianca &&
                          !questionOne.d_atribuicaoPorVaga &&
                          !questionOne.e_sorteio &&
                          !questionOne.f_outroDistribuicao &&
                          !questionOne.g_outroDistribuicaoText
                        }
                        id="e_sorteio"
                        name="e_sorteio"
                        type="checkbox"
                        checked={questionOne.e_sorteio}
                        onChange={(event) => setQuestionOne({
                          ...questionOne,
                          e_sorteio: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="e_sorteio"
                      >Sorteio
                      </label>
                    </div>

                    <div id="containerInputLabelRadioButton">
                      <input
                        required={
                          !questionOne.a_proximidadeDomicilioFamilia && 
                          !questionOne.b_proximidadeDomicilioVisitadores &&
                          !questionOne.c_caracteristicasCrianca &&
                          !questionOne.d_atribuicaoPorVaga &&
                          !questionOne.e_sorteio &&
                          !questionOne.f_outroDistribuicao
                        }
                        id="f_outroDistribuicao"
                        name="f_outroDistribuicao"
                        type="checkbox"
                        checked={questionOne.f_outroDistribuicao}
                        onChange={(event) => setQuestionOne({
                          ...questionOne,
                          f_outroDistribuicao: !!event.currentTarget?.checked
                        })}
                      />
                      <label
                        className="containerTextLabel"
                        htmlFor="f_outroDistribuicao"
                      >Outro:
                      </label>
                      <input
                        required={
                          !questionOne.a_proximidadeDomicilioFamilia && 
                          !questionOne.b_proximidadeDomicilioVisitadores &&
                          !questionOne.c_caracteristicasCrianca &&
                          !questionOne.d_atribuicaoPorVaga &&
                          !questionOne.e_sorteio &&
                          !questionOne.g_outroDistribuicaoText
                        }
                          className="inputPlaceholderOther"
                          id="g_outroDistribuicaoText"
                          name="g_outroDistribuicaoText"
                          type="text"
                          value={questionOne.g_outroDistribuicaoText}
                          onChange={handleDistributionCriterionChange}
                          placeholder="Escreva aqui"
                        />
                    </div>
                </div>
              </div>
            </div>
          </SC.ButtonTypeCheckbox>
            
          <SC.ButtonTypeText>
            <div className="formQuestion">
              <label htmlFor="numeroDeVisitas">
                Qual número médio de visitas que o visitador realiza por dia:
                  <input
                    required
                    autoComplete="off"
                    id="numeroDeVisitas"
                    name="numberOfVisits"
                    type="number"
                    value={questionTwo}
                    onChange={handleNumberOfVisitsChange}
                    placeholder="Sua resposta"
                  />
              </label>
            </div>
          </SC.ButtonTypeText>
          </div>
        </SC.SubSection>

        <SC.AllButtons>
          <Link className="buttonAll" to={`/${roomId}/formstep8`}>Voltar</Link>
          <button
            className="buttonAll"
            type="submit"
            >Próximo
          </button>
        </SC.AllButtons>
      </form>
    </Theme>
  )
}

