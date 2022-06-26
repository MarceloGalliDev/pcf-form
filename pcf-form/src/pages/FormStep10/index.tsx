import * as C from "../../styles/styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Item } from "../../components/TableQuestion/types/Item"
import { items } from "../../components/TableQuestion/data/items"
import { categories } from "../../components/TableQuestion/data/categories"
import { getCurrentMonth, FilterListByMonth } from "../../components/TableQuestion/helpers/dateFilter"
import { TableArea } from "../../components/TableQuestion/components/TableArea"
import { InputArea } from "../../components/TableQuestion/components/InputArea"



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
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());//pega o mês atual e joga em currentMonth
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const { register, handleSubmit, formState: {errors}} = useForm<FormStep1Input>({resolver: yupResolver(schema)})
  const onSubmit = handleSubmit(data => navigate('/formstep3'))

  const handleAddItem = (item: Item) => {
    let newList = [...list]
    newList.push(item)
    setList(newList)
  };

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 10
    });
  }, []);


  useEffect(() => {
    setFilteredList(FilterListByMonth(list, currentMonth))
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value
      } else {
        incomeCount += filteredList[i].value
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);

  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  }

  return (
    <Theme>
      <C.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Outros Custos</h1>
        <p>Outros custos com transporte, diárias e recursos materiais</p>
        <hr/>
      </C.Container>

      <C.SubSection>
        <div className="bgSubSection">
          <p>Recursos e custos diretos do PCF</p>
        </div>
        <div className="formQuestionV2">
          <C.ContainerV2>
            <C.Body>

              <InputArea onAdd={handleAddItem}/>

              <TableArea list={filteredList} />

            </C.Body>
          </C.ContainerV2>
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

