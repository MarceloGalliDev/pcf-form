import * as C from "./styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate } from "react-router-dom"
import { useForm, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect } from "react"

export const FormStep3 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useForm();

  useEffect(() => {
    if (state.name === '') {
      navigate('/')
    } else {
      dispatch({
        type: FormActions.setCurrentStep,
        payload: 3
      });
    }
  }, []);

  const handleNextStep = () => {
    if (state.email !== '' && state.github !== '') {
      console.log(state)
    } else {
      alert("Preencha os dados")
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setEmail,
      payload: event.target.value
    })
  };//Aqui fizemos a função de troca de nome, usamos dispatch para realizar a troca, onde recebemos no payload o valor, e setamos no FormActions

  const handleGithubChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setGithub,
      payload: event.target.value
    })
  };


  return (
    <Theme>
      <C.Container>
        <p>Passo {state.currentStep}/3</p>
        <h1>Legal, {state.name}</h1>
        <p>Preencha com seu contato.</p>

        <hr/>

        <label htmlFor="email">
          Qual seu e-mail?
          <input
            name="email"
            type="email"
            value={state.email}
            onChange={handleEmailChange}
          />
        </label>

        <label htmlFor="github">
          Qual seu Github?
          <input
            name="github"
            type="url"
            value={state.github}
            onChange={handleGithubChange}
          />
        </label>

        <Link className="backButton" to="/">Voltar</Link>
        <button
          onClick={handleNextStep}
        >Finalizar Cadastro
        </button>
      </C.Container>
    </Theme>
  )
}