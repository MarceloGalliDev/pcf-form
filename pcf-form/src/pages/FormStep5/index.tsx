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

export const FormStep5 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const { register, handleSubmit, formState: { errors } } = useForm<FormStep1Input>({ resolver: yupResolver(schema) })
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
      payload: 5
    });
  }, []);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/8</p>
        <h1>Equipe do PCF</h1>
        <p>Informações sobre os atores/ participantes da equipe do PCF</p>
        <hr />
      </SC.Container>

      <SC.SubSection>
        <div className="bgSubSection">
          <p>Subseção Visitadores</p>
        </div>
        <div className="formQuestionV2">

          <SC.ButtonTypeText>
            <div className="formQuestion">
              <label htmlFor="name">
                Quantos Visitadores existem na equipe do PCF no seu município?
                <input
                  {...register("name")}
                  name="name"
                  type="text"
                  value={state.name}
                  onChange={handleNameChange}
                  placeholder="Quantidade"
                />
              </label>
            </div>
          </SC.ButtonTypeText>

          <SC.ButtonTypeText>
            <div className="formQuestion">
              <label htmlFor="name">
                Qual a remuneração média em R$ (reais) dos Visitadores?
                <input
                  {...register("name")}
                  name="name"
                  type="text"
                  value={state.name}
                  onChange={handleNameChange}
                  placeholder="Valor em R$"
                />
              </label>
            </div>
          </SC.ButtonTypeText>

          <SC.ButtonTypeCheckbox>
            <div className="formQuestion">
              <p className="textFormRadioButton">
                Qual a carga horária dos Visitadores?
              </p>

              <div id="containerOption">
                <div id="containerOptionSixOption">

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentJaneiro"
                      name="lastMonthSpentData"
                      type="checkbox"
                      value="sim"
                      onChange={handleLastMonthSpentDataChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentJaneiro"
                    >40 horas semanais
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentFevereiro"
                      name="lastMonthSpentData"
                      type="checkbox"
                      value="Não"
                      onChange={handleLastMonthSpentDataChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >30 horas semanais
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentFevereiro"
                      name="lastMonthSpentData"
                      type="checkbox"
                      value="Não"
                      onChange={handleLastMonthSpentDataChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >20 horas semanais
                    </label>
                  </div>
                
                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentFevereiro"
                      name="lastMonthSpentData"
                      type="checkbox"
                      value="Não"
                      onChange={handleLastMonthSpentDataChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >Outro:
                    </label>
                    <input
                      className="inputPlaceholderOther"
                      name="name"
                      type="text"
                      value={state.name}
                      onChange={handleNameChange}
                      placeholder="Escreva aqui"
                    />
                  </div>

                </div>
              </div>
            </div>
          </SC.ButtonTypeCheckbox>


          <SC.ButtonTypeTextV3>
            <div className="formQuestion">
              <label htmlFor="name">
                Quantos Visitadores da equipe do PCF tem em seu município:

                <div id="containerTextLabelCheckbox">
                  <label
                    className="labelForContainerTextLabelCheckbox"
                    htmlFor="">Superior Incompleto:</label>
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
                    htmlFor="">Superior Completo:</label>
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
                Quantos Visitadores da equipe do PCF são contratados nas seguintes categorias em seu município:

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
                    >Estagiário de nivel superior:
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
          </SC.ButtonTypeTextV3>

          <SC.ButtonTypeCheckbox>
            <div className="formQuestion">
              <p className="textFormRadioButton">
                Como são realizadas as contratações dos Visitadores e/ou Supervisores em seu município?
              </p>
              
              <div id="containerOption">
                <div id="containerOptionSixOption">

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentJaneiro"
                      name="lastMonthSpentData"
                      type="checkbox"
                      value="sim"
                      onChange={handleLastMonthSpentDataChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentJaneiro"
                    >Edital
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentFevereiro"
                      name="lastMonthSpentData"
                      type="checkbox"
                      value="Não"
                      onChange={handleLastMonthSpentDataChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >Equipe própria
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentFevereiro"
                      name="lastMonthSpentData"
                      type="checkbox"
                      value="Não"
                      onChange={handleLastMonthSpentDataChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >Contratação direta
                    </label>
                  </div>

                  <div id="containerInputLabelRadioButton">
                    <input
                      id="lastMonthSpentFevereiro"
                      name="lastMonthSpentData"
                      type="checkbox"
                      value="Não"
                      onChange={handleLastMonthSpentDataChange}
                    />
                    <label
                      className="containerTextLabel"
                      htmlFor="lastMonthSpentFevereiro"
                    >Outro:
                    </label>
                    <input
                      className="inputPlaceholderOther"
                      name="name"
                      type="text"
                      value={state.name}
                      onChange={handleNameChange}
                      placeholder="Escreva aqui"
                    />
                  </div>

                </div>
              </div>
            </div>
          </SC.ButtonTypeCheckbox>
          
          <SC.ButtonTypeRadio>
            <div className="formQuestion">
              <p className="textFormRadioButton">
                O município tem parcerias com organizações da sociedade civil para contratação de equipe?
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
          </SC.ButtonTypeRadio>

        </div>
      </SC.SubSection>

      <SC.AllButtons>
        <Link className="buttonAll" to="/:id/formstep4">Voltar</Link>
        <Link className="buttonAll" to="/:id/formstep6">Próximo</Link>
        {/* <button
          className="buttonAll"
          type="submit"
        >Próximo
        </button> */}
      </SC.AllButtons>
    </Theme>
  );
};

