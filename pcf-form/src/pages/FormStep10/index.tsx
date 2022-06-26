import * as C from "../../styles/styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { InputArea } from "../../components/TableQuestion/components/InputArea"
import { TableArea } from "../../components/TableQuestion/components/TableArea"
import { items } from "../../components/TableQuestion/data/items"
import { Item } from "../../components/TableQuestion/types/Item"


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
  const [list, setList] = useState<Item[]>(items)
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const { register, handleSubmit, formState: {errors}} = useForm<FormStep1Input>({resolver: yupResolver(schema)})
  const onSubmit = handleSubmit(data => navigate('/formstep3'))

//função de captura de valores

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

  const handleAddItem = (item: Item) => {
    let newList = [...list]
    newList.push(item)
    setList(newList)
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
      payload: 10
    });
  }, []);



  return (
    <Theme>
      <C.Container>
        <p>Etapa {state.currentStep}/8</p>
        <h1>Recursos e Custos</h1>
        <p>Recursos e custos mensais diretos do PCF no município (incluindo recursos humanos, materiais, infraestrutura etc.)</p>
        <hr/>
      </C.Container>

      <C.SubSection>
        <div className="bgSubSection">
          <p>Recursos e custos diretos do PCF</p>
        </div>
        <div className="formQuestionV2">

          <InputArea onAdd={handleAddItem} />

          <TableArea list={list} />
          
        </div>
      </C.SubSection>

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

