import * as SC from "../../styles/styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Item } from "../../components/Questions/TableQuestion/types/Item"
import { items } from "../../components/Questions/TableQuestion/data/items"
import { InputArea } from "../../components/Questions/TableQuestion/components/InputArea"
import { TableArea } from "../../components/Questions/TableQuestion/components/TableArea"




interface FormStep1Input {
  name: string;
  dateAcquisition: string;
  dateVisition: string;
  lastMonthSpentData: 'janeiro' | 'fevereiro' | 'marco' | 'abril' | 'maio' | 'junho' | 'julho' | 'agosto' | 'setembro' | 'outubro' | 'novembro' | 'dezembro';
};

const schema = yup.object({
  dateAcquisition: yup.string().required(),
  dateVisition: yup.string().required(),
}).required();


export const FormStep10 = () => {
  const [list, setList] = useState<Item[]>(items);//lista geral
  const [filteredList, setFilteredList] = useState<Item[]>([]);;//lista filtrada

  console.log(list);

  
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const { register, handleSubmit, formState: { errors } } = useForm<FormStep1Input>({ resolver: yupResolver(schema) })
  const onSubmit = handleSubmit(data => navigate('/formstep3'))

  const handleAddItem = (item: Item) => {
    let newList = [...list]
    newList.push(item)
    setList(newList)
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setName,
      payload: event.target.value
    });
  };

  const handleLastMonthSpentDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setLastMonthSpentData,
      payload: event.target.value
    });
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 10
    });
  }, []);


  useEffect(() => {
    setFilteredList(list)
  }, [list]);

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Outros Custos</h1>
        <p>Outros custos com transporte, diárias e recursos materiais</p>
        <hr />
      </SC.Container>

      <SC.SubSection>
        <div className="bgSubSection">
          <p>Recursos e custos diretos do PCF</p>
        </div>
        <div className="formQuestionV2">
          <SC.ContainerV2>
            <SC.Body>

              <InputArea onAdd={handleAddItem} />

              <TableArea list={filteredList} />

            </SC.Body>
          </SC.ContainerV2>
        </div>

        <SC.ButtonTypeRadioV2>
          <div className="formQuestion">
            <p className="textFormRadioButton">
              O visitador paga pelo seu próprio transporte?
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
                  >As vezes
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
                  >Outros
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
        </SC.ButtonTypeRadioV2>
        
      </SC.SubSection>

      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Há um registro de despesas mensais de transporte?
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

      <SC.ButtonTypeCheckbox>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Qual o transporte utilizado para as visitas?
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
                >Veículo próprio do Supervisor (com ajuda de custo)
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
                >Veículo próprio do Supervisor (sem ajuda de custo)
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
                >Veículo próprio do Visitador (com ajuda de custo)
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
                >Veículo próprio do Visitador (sem ajuda de custo)
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
                >Moto contratada/alugada
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
                >Taxi ou uber contratado pelo município
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
                >Veículo do município
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
                >Veículo do PCF
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
                >Outros
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

      <SC.ButtonTypeRadioText>
        <div className="formQuestion">
          <p>Há algum outro custo direto pago com recurso do PCF?</p>

          <div className="formQuestion">
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

          <div className="containerBgLabel">
            <label className="containerTextLabel" htmlFor="name">
              Se sim, Quais?
              <span>{errors.name && " ⚠ *Campo obrigatório "}</span>
              <input
                {...register("name")}
                name="name"
                type="text"
                autoFocus
                value={state.name}
                onChange={handleNameChange}
                placeholder="Sua resposta"
              />
            </label>
          </div>

        </div>
      </SC.ButtonTypeRadioText>

      <SC.ButtonTypeRadioText>
        <div className="formQuestion">
          <p>
            Há algum outro custo considerado importante para o PCF não especificado anteriormente?
          </p>

          <div className="formQuestion">
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

          <div className="containerBgLabel">
            <label className="containerTextLabel" htmlFor="name">
              Se sim, Quais?
              <span>{errors.name && " ⚠ *Campo obrigatório "}</span>
              <input
                {...register("name")}
                name="name"
                type="text"
                autoFocus
                value={state.name}
                onChange={handleNameChange}
                placeholder="Sua resposta"
              />
            </label>
          </div>

        </div>
      </SC.ButtonTypeRadioText>

      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Há registros mensais destes custos?
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

      <SC.ButtonTypeFile>
        <div className="formQuestion">
          <label htmlFor="name">
            Há uma planilha com os custos mensais do PCF que poderia ser disponibilizada?
            <input
              {...register("name")}
              name="name"
              type="file"
              accept=".doc,.docx,.xml,.xlsx, xlsm,.xltx,.xls,.txt,.pdf,.ods"
            />
          </label>
        </div>
      </SC.ButtonTypeFile>

      <SC.AllButtons>
          <Link className="buttonAll" to="/:id/formstep9">Voltar</Link>
          <button
            className="buttonAll"
            type="submit"
            >Finalizar
          </button>
        </SC.AllButtons>
    </Theme>
  )
};

