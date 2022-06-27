import * as SC from "../../styles/styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FormStep4Input } from "../../types/FormStep4"


const schema = yup.object({
  numberOfSupervisors: yup.string().required(),

}).required();

export const FormStep4 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const { register, handleSubmit, formState: {errors}} = useForm<FormStep4Input>({resolver: yupResolver(schema)})
  const onSubmit = handleSubmit(data => navigate('/formstep3'))

//função de captura de valores
  const handleNumberOfSupervisors = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setNumberOfSupervisors,
      payload: event.target.value
    });
  };

  const handleAveragePayChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setAveragePay,
      payload: event.target.value
    });
  };

  const handleWorkloadChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setWorkload,
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
      payload: 4
    });
  }, []);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Equipe do PCF</h1>
        <p>Informações sobre os atores/ participantes da equipe do PCF</p>
        <hr />
      </SC.Container>

      <SC.SubSection>
        <div className="bgSubSection">
          <p>Subseção Supervisores</p>
        </div>
        <div className="formQuestionV2">

          <SC.ButtonTypeText>
            <div className="formQuestion">
              <label htmlFor="numberOfSupervisors">
                Quantos Supervisores existem na equipe do PCF no seu município?
                <span>{errors.numberOfSupervisors && " ⚠ *Campo obrigatório "}</span>
                <input
                  {...register("numberOfSupervisors")}
                  id="numberOfSupervisors"
                  name="numberOfSupervisors"
                  type="text"
                  value={state.numberOfSupervisors}
                  onChange={handleNumberOfSupervisors}
                  placeholder="Quantidade"
                />
              </label>
            </div>
          </SC.ButtonTypeText>

          <SC.ButtonTypeText>
            <div className="formQuestion">
              <label htmlFor="averagePay">
                Qual a remuneração média em R$ (reais) dos Supervisores?
                <span>{errors.averagePay && " ⚠ *Campo obrigatório "}</span>
                <input
                  {...register("averagePay")}
                  id="averagePay"
                  name="averagePay"
                  type="text"
                  value={state.averagePay}
                  onChange={handleAveragePayChange}
                  placeholder="Valor em R$"
                />
              </label>
            </div>
          </SC.ButtonTypeText>

          <SC.ButtonTypeCheckbox>
            <div className="formQuestion">
              <p className="textFormRadioButton">
                Qual a carga horária dos Supervisores?
                <span>{errors.workload && " ⚠ *Campo obrigatório "}</span>
              </p>
              <div id="containerOption">
                <div>
                
                  <div id="containerInputLabelRadioButton">
                    <input
                      {...register("workload")}
                      id="workloadForty"
                      name="workload"
                      type="checkbox"
                      value="40 horas semanais"
                      onChange={handleWorkloadChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="workloadForty"
                    >40 horas semanais
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      {...register("workload")}
                      id="workloadThirty"
                      name="workload"
                      type="checkbox"
                      value="30 horas semanais"
                      onChange={handleWorkloadChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="workloadThirty"
                    >30 horas semanais
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      {...register("workload")}
                      id="workloadTwenty"
                      name="workload"
                      type="checkbox"
                      value="20 horas semanais"
                      onChange={handleWorkloadChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="workloadTwenty"
                    >20 horas semanais
                    </label>
                  </div>
                
                  <div id="containerInputLabelRadioButton">
                    <input
                      {...register("workload")}
                      id="workload"
                      name="workload"
                      type="checkbox"
                      value="Outro"
                      onChange={handleWorkloadChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="workload"
                    >Outro:
                    </label>
                    <input
                      {...register("workload")}
                      className="inputPlaceholderOther"
                      name="workload"
                      type="text"
                      value=""
                      onChange={handleWorkloadChange}
                      placeholder="Escreva aqui"
                    />
                  </div>

                </div>
              </div>
            </div>
          </SC.ButtonTypeCheckbox>

          {/* <SC.ButtonTypeTextV3>
            <div className="formQuestion">
              <label htmlFor="name">
                Quantos Supervisores da equipe do PCF tem em seu município:

                <div id="containerTextLabelCheckbox">
                  <label
                    className="labelForContainerTextLabelCheckbox"
                    htmlFor="">Especialização:</label>
                  <input
                    className="inputForContainerTextLabelCheckbox"
                    name="name"
                    type="text"
                    value={state.name}
                    onChange={handleNameChange}
                    placeholder="Sua resposta"
                  />
                </div>

                <div id="containerTextLabelCheckbox">
                  <label
                    className="labelForContainerTextLabelCheckbox"
                    htmlFor="">Mestrado:</label>
                  <input
                    className="inputForContainerTextLabelCheckbox"
                    name="name"
                    type="text"
                    value={state.name}
                    onChange={handleNameChange}
                    placeholder="Sua resposta"
                  />
                </div>

                <div id="containerTextLabelCheckbox">
                  <label
                    className="labelForContainerTextLabelCheckbox"
                    htmlFor=""
                  >Doutorado:
                  </label>
                  <input
                    className="inputForContainerTextLabelCheckbox"
                    name="name"
                    type="text"
                    value={state.name}
                    onChange={handleNameChange}
                    placeholder="Sua resposta"
                  />
                </div>

              </label>
            </div>
          </SC.ButtonTypeTextV3>

          <SC.ButtonTypeTextV3>
            <div className="formQuestion">
              <label htmlFor="name">
                Quantos Supervisores da equipe do PCF são contratados nas seguintes categorias em seu município:

                <div id="containerLabelCheckboxBorder">
                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor=""
                    >Servidor(a) efetivo(a):
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      name="name"
                      type="text"
                      value={state.name}
                      onChange={handleNameChange}
                      placeholder="Sua resposta"
                    />
                  </div>

                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="">Média Remuneração:</label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      name="name"
                      type="text"
                      value={state.name}
                      onChange={handleNameChange}
                      placeholder="Sua resposta"
                    />
                  </div>
                </div>

                <div id="containerLabelCheckboxBorder">
                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor=""
                    >Cargo comissionado:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      name="name"
                      type="text"
                      value={state.name}
                      onChange={handleNameChange}
                      placeholder="Sua resposta"
                    />
                  </div>
                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="">Média Remuneração:</label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      name="name"
                      type="text"
                      value={state.name}
                      onChange={handleNameChange}
                      placeholder="Sua resposta"
                    />
                  </div>
                </div>

                <div id="containerLabelCheckboxBorder">
                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor=""
                    >Servidor temporário:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      name="name"
                      type="text"
                      value={state.name}
                      onChange={handleNameChange}
                      placeholder="Sua resposta"
                    />
                  </div>
                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="">Média Remuneração:</label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      name="name"
                      type="text"
                      value={state.name}
                      onChange={handleNameChange}
                      placeholder="Sua resposta"
                    />
                  </div>
                </div>

                <div id="containerLabelCheckboxBorder">
                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor=""
                    >Bolsista:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      name="name"
                      type="text"
                      value={state.name}
                      onChange={handleNameChange}
                      placeholder="Sua resposta"
                    />
                  </div>
                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="">Média Remuneração:</label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      name="name"
                      type="text"
                      value={state.name}
                      onChange={handleNameChange}
                      placeholder="Sua resposta"
                    />
                  </div>
                </div>

                <div id="containerLabelCheckboxBorder">
                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor=""
                    >Outros:
                    </label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      name="name"
                      type="text"
                      value={state.name}
                      onChange={handleNameChange}
                      placeholder="Sua resposta"
                    />
                  </div>
                  <div id="containerTextLabelCheckbox">
                    <label
                      className="labelForContainerTextLabelCheckbox"
                      htmlFor="">Média Remuneração:</label>
                    <input
                      className="inputForContainerTextLabelCheckbox"
                      name="name"
                      type="text"
                      value={state.name}
                      onChange={handleNameChange}
                      placeholder="Sua resposta"
                    />
                  </div>
                </div>

              </label>
            </div>
          </SC.ButtonTypeTextV3> */}

        </div>
      </SC.SubSection>

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

