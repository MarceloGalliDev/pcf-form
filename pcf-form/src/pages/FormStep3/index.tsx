import * as C from "../../styles/styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


interface FormStep1Input {
  dateAcquisition: string;
  dateVisition: string;
  lastMonthSpentData: 'janeiro' | 'fevereiro' | 'marco' | 'abril' | 'maio' | 'junho' | 'julho' | 'agosto' | 'setembro' | 'outubro' | 'novembro' | 'dezembro';
}

const schema = yup.object({
  dateAcquisition: yup.string().required(),
  dateVisition: yup.string().required(),
}).required();

export const FormStep3 = () => {
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
      payload: 3
    });
  }, []);

  return (
    <Theme>
      <C.Container>
        <p>Etapa {state.currentStep}/8</p>
        <h1>Gestão do PCF</h1>
        <p>Gestão, comitê e equipe do PCF</p>
        <hr/>
      </C.Container>

      <C.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            A equipe do PCF em seu município tem Coordenador?
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
                    id="lastMonthSpentFevereiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Não"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentFevereiro"
                >Não sei
                </label>
              </div>

            </div>
          </div>
        </div>
      </C.ButtonTypeRadio>

      <C.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Você conhece o Coordenador Estadual do PCF?
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

            </div>
          </div>
        </div>
      </C.ButtonTypeRadio>

      <C.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Quantas vezes teve contato com ele(a) nos últimos 12 meses?
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
                >0
                </label>
              </div>

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
                >1
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
                >2
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
                >3
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
                >4 ou mais
                </label>
              </div>

            </div>
          </div>
        </div>
      </C.ButtonTypeRadio>

      <C.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Você conhece o Multiplicador Estadual do PCF?
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

            </div>
          </div>
        </div>
      </C.ButtonTypeRadio>

      <C.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            O município possui Comitê Gestor Municipal do PCF?
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
                    id="lastMonthSpentFevereiro"
                    name="lastMonthSpentData"
                    type="radio"
                    value="Não"
                    onChange={handleLastMonthSpentDataChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="lastMonthSpentFevereiro"
                >Não sei
                </label>
              </div>

            </div>
          </div>
        </div>
      </C.ButtonTypeRadio>

      <C.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Quantas vezes o Comitê Gestor Municipal se reuniu nos últimos 12 meses?
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
                >0
                </label>
              </div>

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
                >1
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
                >2
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
                >3
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
                >4 ou mais
                </label>
              </div>

            </div>
          </div>
        </div>
      </C.ButtonTypeRadio>

      <C.AllButtons>
        <Link className="buttonBack" to="/">Voltar</Link>
        <button
          className="buttonNext"
          onClick={onSubmit}
        >Próximo
        </button>
      </C.AllButtons>
    </Theme>
  )
}

