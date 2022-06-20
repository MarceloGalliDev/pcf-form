import * as C from "./styles";
import { Theme } from "../../components/Theme";
import { useNavigate } from "react-router-dom";
import { useForm, FormActions } from "../../context/FormContext";
import { ChangeEvent, useEffect } from "react";
import { SelectOption } from "../../components/SelectOption";




export const FormStep2 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useForm();

  const handleNextStep = () => {
    if (state.name !== '') {
      navigate('/formstep3')
    } else {
      alert("Preencha os dados.")
    }
  }

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 2
    });
  }, [])

  return (
    <Theme>
      <C.Container>
        <p>Passo {state.currentStep}/3 - {state.name}</p>
        <h1>Vamos começar com seu nome</h1>
        <p>Preencha o campo abaixo com seu nome completo.</p>

        <hr/>

        <SelectOption
          title="Sou iniciante"
          description="Comecei a programar há menos de 2 anos"
          selected={state.level === 0}
        />

        <SelectOption
          title="Sou programador"
          description="Já programo há 2 anos ou mais"
          selected={state.level === 1}
        />

        <button
          onClick={handleNextStep}
        >Próximo
        </button>
      </C.Container>
    </Theme>
  )
}