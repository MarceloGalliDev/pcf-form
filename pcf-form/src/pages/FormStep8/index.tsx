import * as SC from "../../styles/styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { database } from "../../services/firebase";
import { ref, push, set } from "firebase/database";

type RoomParams = {
  id: string;
};

export const FormStep8 = () => {
  const params = useParams<RoomParams>()
  const roomId = params.id
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();
  const [questionOne, setQuestionOne] = useState('')
  const [questionTwo, setQuestionTwo] = useState('')
  const [questionThree, setQuestionThree] = useState('')

  async function handleSendPartnerOrganizations(event: FormEvent) {
    event.preventDefault();

    if (questionOne.trim() === '') {
      return;
    };
    if (questionThree.trim() === '') {
      return;
    };

    const question = {
      H_Organizacoes_Parceiras: {
        questao48: questionOne,
        questao49: questionTwo,
        questao50: questionThree,
      }
    };

    const firebaseRoomsQuestion = ref(database, `rooms/${roomId}/question`);
    const firebaseQuestion = await push(firebaseRoomsQuestion);
    set(firebaseQuestion, question)

    navigate(`/${roomId}/formstep9`)
  };

  const handlePartnershipsOrganizationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionOne(event.target.value);
  };

  const handleFinancialSupportChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionTwo(event.target.value);
  };

  const handleFinancialValuationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionThree(event.target.value)
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 8
    });
  }, []);

  return (
    <Theme>
      <SC.Container> 
        <p>Etapa {state.currentStep}/10</p>
        <h1>Organizações parceiras</h1>
        <p>Informações sobre as organizações participantes e parceiras do PCF</p>
        <hr/>
      </SC.Container>

      <form onSubmit={handleSendPartnerOrganizations}>

        <SC.ButtonTypeText>
          <div className="formQuestion">
            <label htmlFor="parceriasComOrganizacoes">
              Com qual(is) a(s) organização(ões) possui parceria?
              <p>exemplo: CIEE, ...</p>
              <input
                id="parceriasComOrganizacoes"
                name="PartnershipsOrganization"
                type="text"
                value={questionOne}
                onChange={handlePartnershipsOrganizationChange}
                placeholder="Sua resposta"
              />
            </label>
          </div>
        </SC.ButtonTypeText>

        <SC.ButtonTypeRadio>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              Essas organizaões fazem aporte financeiros para o PCF?
            </p>
            <div id="containerOption">
              <div id="containerOptionSixOption">
        
                <div id="containerInputLabelRadioButton">
                  <input
                    id="aporteFinanceiroYes"
                    name="financialSupport"
                    type="radio"
                    value="sim"
                    onChange={handleFinancialSupportChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="aporteFinanceiroYes"
                  >Sim
                  </label>
                </div>
                <div id="containerInputLabelRadioButton">
                  <input
                    id="aporteFinanceiroNo"
                    name="financialSupport"
                    type="radio"
                    value="Não"
                    onChange={handleFinancialSupportChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="aporteFinanceiroNo"
                  >Não
                  </label>
                </div>
                <div id="containerInputLabelRadioButton">
                  <input
                    id="aporteFinanceiroDontKnow"
                    name="financialSupport"
                    type="radio"
                    value="Não sei"
                    onChange={handleFinancialSupportChange}
                  />
                  <label
                    className="containerTextLabel"
                    htmlFor="aporteFinanceiroDontKnow"
                  >Não sei
                  </label>
                </div>
              </div>
            </div>
          </div>
        </SC.ButtonTypeRadio>

        <SC.ButtonTypeText>
          <div className="formQuestion">
            <label htmlFor="valorDoAporte">
              Qual o valor em Reais (R$) desse aporte financeiro?
              <input
                id="valorDoAporte"
                name="financialValuation"
                type="text"
                value={questionThree}
                onChange={handleFinancialValuationChange}
                placeholder="Sua resposta"
              />
            </label>
          </div>
        </SC.ButtonTypeText>

        <SC.AllButtons>
            <Link className="buttonAll" to="/:id/formstep9">Voltar</Link>
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

