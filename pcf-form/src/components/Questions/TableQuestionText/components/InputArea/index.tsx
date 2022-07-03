import * as SC from './styles';
import { FormEvent, useState } from 'react';
import { Item } from '../../types/Item';
import { Plus } from 'phosphor-react';


type Props = {
  onAdd: (item: Item) => void;
};

export const InputArea = ({ onAdd }: Props) => {
  const [inputOneField, setInputOneField] = useState('');
  const [inputTwoField, setInputTwoField] = useState(0);

  const handleAddEvent = (event: FormEvent) => {
    event.preventDefault();

    let errors: string[] = [];

    if(inputOneField == '') {
      errors.push('Insira a resposta!');
    }
    if(inputTwoField <= 0) {
      errors.push('Insira a resposta!');
    }

    if(errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        inputOne: inputOneField,
        inputTwo: inputTwoField,
      });
      clearFields();
    }
  }

  const clearFields = () => {
    setInputOneField('');
    setInputTwoField(0);
  }

  return (
    <SC.Container>

      <SC.InputLabel>
        <SC.InputTitle>Outros Profissionais</SC.InputTitle>
        <SC.Input type="text" value={inputOneField} onChange={event => setInputOneField(event.target.value)} />
      </SC.InputLabel>

      <SC.InputLabel>
        <SC.InputTitle>Remuneração</SC.InputTitle>
        <SC.Input type="number" value={inputTwoField} onChange={event => setInputTwoField(parseFloat(event.target.value))} />
      </SC.InputLabel>

      <SC.InputLabelButton>
        <SC.InputTitle>&nbsp;</SC.InputTitle>
        <SC.Button onClick={handleAddEvent}><Plus size={20} color="#ffffff" weight="bold" /></SC.Button>
      </SC.InputLabelButton>

    </SC.Container>
  )
};