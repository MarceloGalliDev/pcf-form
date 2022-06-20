import * as C from "./styles";
import { Theme } from "../../components/Theme";
import { useNavigate, Link } from "react-router-dom";
import { useForm, FormActions } from "../../context/FormContext";
import { ChangeEvent, useEffect } from "react";
import { SelectOption } from "../../components/SelectOption";





export const FormStep2 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useForm();

  useEffect(() => {
    if (state.name === '') {
      navigate('/')
    } else {
      dispatch({
        type: FormActions.setCurrentStep,
        payload: 2
      });
    }
  }, []);

  const handleNextStep = () => {
    if (state.name !== '') {
      navigate('/formstep3')
    } else {
      alert("Preencha os dados.")
    }
  }
  
  const setLevel = (level: number) => {
    dispatch({
      type: FormActions.setLevel,
      payload: level
    })
  }


  return (
    <Theme>
      <C.Container>
        <p>Passo {state.currentStep}/3</p>
        <h1>{state.name}, escolha seu grau de aprendizado</h1>
        <p>Preencha o campo abaixo com uma opção.</p>

        <hr/>

        <SelectOption
          title="Sou iniciante"
          description="Comecei a programar há menos de 2 anos"
          selected={state.level === 0}
          onClick={()=>setLevel(0)}
        />

        <SelectOption
          title="Sou programador"
          description="Já programo há 2 anos ou mais"
          selected={state.level === 1}
          onClick={()=>setLevel(1)}
        />


        <Link className="backButton" to="/">Voltar</Link>
        <button
          onClick={handleNextStep}
        >Próximo
        </button>
      </C.Container>
    </Theme>
  )
}