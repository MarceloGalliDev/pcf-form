import * as SC from "../../styles/styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


interface FormStep1Input {
  name: string;
  dateAcquisition: string;
  dateVisition: string;
  lastMonthSpentData: 'janeiro' | 'fevereiro' | 'marco' | 'abril' | 'maio' | 'junho' | 'julho' | 'agosto' | 'setembro' | 'outubro' | 'novembro' | 'dezembro';
}

const schema = yup.object({
  dateAcquisition: yup.string().required(),
  dateVisition: yup.string().required(),
}).required();

export const FormStep8 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const { register, handleSubmit, formState: {errors}} = useForm<FormStep1Input>({resolver: yupResolver(schema)})
  const onSubmit = handleSubmit(data => navigate('/formstep3'))

//função de captura de valores
  const handleDateAcquisitionChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setDateAcquisition,
      payload: event.target.value
    });
  };

  const handleDateVisitionChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setDateVisition,
      payload: event.target.value
    });
  };

  const handleLastMonthSpentDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setLastMonthSpentData,
      payload: event.target.value
    });
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setName,
      payload: event.target.value
    });
  };

  //verificando se foi respondida, não passa para próxima etapa
  // useEffect(() => {
  //   if (state.name === '' ||
  //     state.phoneNumber === '' ||
  //     state.email === '' ||
  //     state.functionPCF === '' ||
  //     state.uf === '' ||
  //     state.city === '') {
  //     navigate('/')
  //   } else {
  //     dispatch({
  //       type: FormActions.setCurrentStep,
  //       payload: 2
  //     });
  //   }
  // }, []);

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

      <SC.ButtonTypeText>
        <div className="formQuestion">
          <label htmlFor="name">
            Com qual(is) a(s) organização(ões) possui parceria?
            <input
              {...register("name")}
              name="name"
              type="text"
              value={state.name}
              onChange={handleNameChange}
              placeholder="Sua resposta"
            />
          </label>
        </div>
      </SC.ButtonTypeText>

      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Essas organizaões fazem aporte financeiros para o PCF?
            <span>{errors.lastMonthSpentData && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                  id="lastMonthSpentJaneiro"
                  name="lastMonthSpentData"
                  type="radio"
                  value="sim"
                  onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentJaneiro"
                >Sim
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  id="lastMonthSpentFevereiro"
                  name="lastMonthSpentData"
                  type="radio"
                  value="Não"
                  onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentFevereiro"
                >Não
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  id="lastMonthSpentMarco"
                  name="lastMonthSpentData"
                  type="radio"
                  value="Não sei"
                  onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentMarco"
                >Não sei
                </label>
              </div>

            </div>
          </div>
        </div>
      </SC.ButtonTypeRadio>

      <SC.ButtonTypeText>
        <div className="formQuestion">
          <label htmlFor="name">
            Qual o valor em Reais (R$) desse aporte financeiro?
            <input
              {...register("name")}
              name="name"
              type="text"
              value={state.name}
              onChange={handleNameChange}
              placeholder="Sua resposta"
            />
          </label>
        </div>
      </SC.ButtonTypeText>

      <SC.AllButtons>
        <Link className="buttonBack" to="/">Voltar</Link>
        <button
          className="buttonNext"
          onClick={onSubmit}
        >Próximo
        </button>
      </SC.AllButtons>
    </Theme>
  )
}

