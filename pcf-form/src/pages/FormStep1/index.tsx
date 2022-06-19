import * as C from "./styles"
import { Theme } from "../../components/Theme"
import { useNavigate } from "react-router-dom"
import { useForm, FormActions } from "../../context/FormContext"
import { ChangeEvent } from "react"




export const FormStep1 = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useForm();

  const handleNextStep = () => {
    navigate('/formstep2')
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setName,
      payload: event.target.value
    });
  }//Aqui fizemos a função de troca de nome, usamos dispatch para realizar a troca, onde recebemos no payload o valor, e setamos no FormActions

  return (
    <Theme>
      <C.Container>
        <p>Passo 1/3 - { state.name }</p>
        <h1>Vamos começar com seu nome</h1>
        <p>Preencha o campo abaixo com seu nome completo.</p>

        <hr/>

        <label htmlFor="">
          Seu nome completo
          <input
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