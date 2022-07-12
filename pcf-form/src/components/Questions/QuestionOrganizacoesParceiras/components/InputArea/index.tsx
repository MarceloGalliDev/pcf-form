import * as SC from '../../styles/styles';
import { FormEvent, useState } from 'react';
import { Item } from '../../types/Item';
import { Info } from 'phosphor-react';
import { contributions } from '../../data/contributions';

type Props = {
  onAdd: (item: Item) => void;
};

export const InputArea = ({ onAdd }: Props) => {
  const [inputOneField, setInputOneField] = useState('');
  const [inputTwoField, setInputTwoField] = useState('');
  const [inputThreeField, setInputThreeField] = useState('');
  const [countId, setCountId] = useState(1);

  let inputTwoKeys: string[] = Object.keys(contributions);

  const handleAddEvent = async(event: FormEvent) => {
    event.preventDefault();

    let errors: string[] = [];

    if (inputOneField == '') {
      errors.push('Insira a resposta!');
    }
    if(!inputTwoKeys.includes(inputTwoField)) {
      errors.push('Categoria inválida!');
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
        <SC.InputTitle>Tipo de organização</SC.InputTitle>
        <div className='informationIcon'>
          <SC.InputArea5
            type="text"
            value={inputOneField}
            onChange={event => setInputOneField(event.target.value)}
            placeholder="Escreva aqui"
          />
          <span
            data-tooltip="Por exemplo: CIEE, Ong's, igreja, empresas(terceiras) ..."
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
        <SC.InputTitle>Possui aporte financeiro?</SC.InputTitle>
        <SC.SelectArea value={inputTwoField} onChange={event => setInputTwoField(event.target.value)}>
          <>
            <option></option>
            {inputTwoKeys.map((key, index) => (
              <option key={index} value={key}>{contributions[key].type}</option>
            ))}
          </>
        </SC.SelectArea>
      </SC.InputLabel>
      
      <SC.InputLabel>
        <SC.InputTitle>Valor</SC.InputTitle>
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