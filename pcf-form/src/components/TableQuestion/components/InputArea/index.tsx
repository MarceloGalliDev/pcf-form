import * as SC from './styles';
import { useState } from 'react';
import { categories } from '../../data/categories';
import { resources } from '../../data/resources';
import { Item } from '../../types/Item';


type Props = {
  onAdd: (item: Item) => void;
};

export const InputArea = ({ onAdd }: Props) => {
  const [resourceField, setResourceField] = useState('');
  const [categoryField, setCategoryField] = useState('');
  const [valueField, setValueField] = useState(0);

  let categoryKeys: string[] = Object.keys(categories);
  let resourceKeys: string[] = Object.keys(resources);

  const handleAddEvent = () => {
    let errors: string[] = [];

    if(!categoryKeys.includes(categoryField)) {
      errors.push('Categoria inválida!');
    }
    if(!resourceKeys.includes(resourceField)) {
      errors.push('Tipo inválido!');
    }

    if(valueField <= 0) {
      errors.push('Valor inválido!');
    }

    if(errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        category: categoryField,
        type: resourceField,
        value: valueField
      });
      clearFields();
    }
  }

  const clearFields = () => {
    setResourceField('');
    setCategoryField('');
    setValueField(0);
  }

  return (
    <SC.Container>

      <SC.InputLabel>
        <SC.InputTitle>Categoria</SC.InputTitle>
        <SC.Select value={categoryField} onChange={event => setCategoryField(event.target.value)}>
          <>
            <option></option>
            {categoryKeys.map((key, index) => (
              <option key={index} value={key}>{categories[key].title}</option>
            ))}
          </>
        </SC.Select>
      </SC.InputLabel>

      <SC.InputLabel>
        <SC.InputTitle>Tipo</SC.InputTitle>
        <SC.Select value={resourceField} onChange={event => setResourceField(event.target.value)}>
          <>
            <option></option>
            {resourceKeys.map((key, index) => (
              <option key={index} value={key}>{resources[key].type}</option>
            ))}
          </>
        </SC.Select>
      </SC.InputLabel>

      <SC.InputLabel>
        <SC.InputTitle>Valor</SC.InputTitle>
        <SC.Input type="number" value={valueField} onChange={event => setValueField(parseFloat(event.target.value))} />
      </SC.InputLabel>

      <SC.InputLabel>
        <SC.InputTitle>&nbsp;</SC.InputTitle>
        <SC.Button onClick={handleAddEvent}>Adicionar</SC.Button>
      </SC.InputLabel>

    </SC.Container>
  )
};