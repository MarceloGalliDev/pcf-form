import * as C from "./styles"
import { Theme } from "../../components/Theme"
import { useNavigate } from "react-router-dom"
import { useForm, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect } from "react"




export const FormStep1 = () => {
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
      payload: 1
    });
  }, [])

  return (
    <Theme>
      <C.Container>
        <p>Etapa {state.currentStep}/3</p>
        <h1>Vamos começar com seu nome</h1>
        <p>Preencha o campo abaixo com seu nome completo.</p>

        <hr/>

        <label htmlFor="name">
          Seu nome completo
          <input
            name="name"
            type="text"
            autoFocus
            value={state.name}
            onChange={handleNameChange}
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