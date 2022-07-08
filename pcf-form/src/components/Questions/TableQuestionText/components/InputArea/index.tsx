import * as SC from '../../styles/styles';
import { FormEvent, useState } from 'react';
import { Item } from '../../types/Item';

type Props = {
  onAdd: (item: Item) => void;
};

export const InputArea = ({ onAdd }: Props) => {
  const [inputOneField, setInputOneField] = useState('');
  const [inputTwoField, setInputTwoField] = useState('');
  const [inputThreeField, setInputThreeField] = useState('');
  const [countId, setCountId] = useState(1);

  const handleAddEvent = async(event: FormEvent) => {
    event.preventDefault();

    let errors: string[] = [];

    if (inputOneField == '') {
      errors.push('Insira a resposta!');
    }
    if (inputTwoField == '') {
      errors.push('Insira a resposta!');
    }
    if (inputThreeField == '') {
      errors.push('Insira a resposta!');
    }
    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        a_id: countId,
        b_inputOne: inputOneField,
        c_inputTwo: inputTwoField,
        d_inputThree: inputThreeField,
      })
    };

    setCountId(countId + 1);
    setInputOneField('');
    setInputTwoField('');
    setInputThreeField('');
  };

  return (
    <SC.ContainerInputArea>

      <SC.InputLabel>
        <SC.InputTitle>Tipo de profissional</SC.InputTitle>
        <SC.InputArea1
          type="text"
          value={inputOneField}
          onChange={event => setInputOneField(event.target.value)}
          placeholder="Escreva aqui"
        />
      </SC.InputLabel>

      <SC.InputLabel>
        <SC.InputTitle>Quantidade</SC.InputTitle>
        <SC.InputArea2
          type="text"
          value={inputTwoField}
          onChange={event => setInputTwoField(event.target.value)}
          placeholder="Quantidade"
        />
      </SC.InputLabel>
      
      <SC.InputLabel>
        <SC.InputTitle>Remuneração</SC.InputTitle>
        <SC.InputArea2
          type="text"
          value={inputThreeField}
          onChange={event => setInputThreeField(event.target.value)}
          placeholder="R$"
        />
      </SC.InputLabel>

      <SC.InputLabelButton>
        <SC.InputTitle>&nbsp;</SC.InputTitle>
        <SC.ButtonInputArea onClick={handleAddEvent}>
          Adicionar
        </SC.ButtonInputArea>
      </SC.InputLabelButton>

    </SC.ContainerInputArea>
  )
};