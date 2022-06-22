import * as C from "./styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect } from "react"

export const FormStep3 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

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
    if (
      state.name !== '') {
      console.log(state)
    } else {
      alert("Preencha os dados")
    }
  };

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