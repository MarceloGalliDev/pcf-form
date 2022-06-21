import { ChangeEvent, useEffect, useState } from "react";
import { fetchCitiesForState, fetchStates } from "../../helpers/ibge";
import * as C from "./styles";

export const DropdownStateCity = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formValues, setFormValues] = useState({});

  useEffect(() => { 
    fetchStates().then((states) => {
      setStates(states);
    })
  }, []);
  
  useEffect(() => {
    fetchCitiesForState('MG').then((cities) => {
      setCities(cities);
    })
  }, [])

  const handleInputChange = (event: any) => {
    event.preventDefault();
    const { value, name } = event.target;
    setFormValues({...formValues, [name]:value})
  }

  console.log('formValues',formValues)

  return (
    <C.Container>
      <div className="contentStateUf">
        <select
          className="stateUf"
          name="state"
          onChange={handleInputChange}
        >
          <option value="">
            Selecione o Estado
          </option>
          {states.map((state) => {
            const {sigla, nome} = state
            return (<option key={sigla} value={sigla}>{nome}</option>)
          })}
        </select>

        <select
          className="stateUf"
          name="city"
          >
          <option value="">
            Selecione o Município
          </option>
          {cities.map((city) => {
            const {id, nome} = city
            return (<option key={id} value={id}>{nome}</option>)
          })}
        </select>
      </div>
    </C.Container>
  )
};

