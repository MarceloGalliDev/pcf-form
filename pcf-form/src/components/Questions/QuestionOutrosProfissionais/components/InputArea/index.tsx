import * as SC from '../../styles/styles';
import { FormEvent, useState } from 'react';
import { Item } from '../../types/Item';
import { Info } from 'phosphor-react';

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
        <div className='informationIcon'>
          <SC.InputArea3
            type="text"
            value={inputOneField}
            onChange={event => setInputOneField(event.target.value)}
            placeholder="Escreva aqui"
          />
          <span
            data-tooltip="Por exemplo: motorista, secretário, técnico administrativo ..."
          >
            <Info
              size={20}
              color="#2d56d2"
              weight="light"
            />
          </span>
        </div>
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
        <div className='informationIcon'>
          <SC.InputArea4
            type="text"
            value={inputThreeField}
            onChange={event => setInputThreeField(event.target.value)}
            placeholder="R$"
          />
            <span
            data-tooltip="Inserir com casas decimais (Exemplo: 106,38)"
          >
            <Info
              size={20}
              color="#2d56d2"
              weight="light"
            />
          </span>
        </div>
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