import * as C from "./styles"
import { Theme } from "../../components/Theme"
import { useNavigate } from "react-router-dom"
import { useForm, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect } from "react"




export const FormStep3 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useForm();

  const handleNextStep = () => {
    if (state.name !== '') {
      navigate('/formstep2')
    } else {
      alert("Preencha os dados.")
    }
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setName,
      payload: event.target.value
    });
  }//Aqui fizemos a função de troca de nome, usamos dispatch para realizar a troca, onde recebemos no payload o valor, e setamos no FormActions

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 3
    });
  }, [])

  return (
    <Theme>
      <C.Container>
        <p>Passo {state.currentStep}/3</p>
        <h1>Legal, {state.name}</h1>
        <p>Preencha com seu contato.</p>

        <hr/>

        <label htmlFor="">
          Qual seu e-mail?
          <input
            type="text"
            value={state.email}
            onChange={handleEmailChange}
          />
        </label>

        
        <button
          onClick={handleNextStep}
        >Próximo
        </button>
      </C.Container>
    </Theme>
  )
}