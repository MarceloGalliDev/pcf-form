import * as SC from '../../styles/styles';
import { FormEvent, useState } from 'react';
import { Item1 } from '../../types/Item1';
import { Info } from 'phosphor-react';

type Props = {
  onAdd1: (item: Item1) => void;
};

export const InputAreaOutrosCustos1 = ({ onAdd1 }: Props) => {
  const [countId, setCountId] = useState(1);
  const [inputOneField, setInputOneField] = useState('');
  const [inputTwoField, setInputTwoField] = useState('');

  const handleAddEvent1 = async(event: FormEvent) => {
    event.preventDefault();

    let errors: string[] = [];

    if (inputOneField == '') {
      errors.push('Insira a resposta!');
    }
    if (inputTwoField == '') {
      errors.push('Insira a resposta!');
    }
    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd1({
        a_id: countId,
        b_inputOne: inputOneField,
        c_inputTwo: inputTwoField,
      })
    };

    setCountId(countId + 1);
    setInputOneField('');
    setInputTwoField('');
  };

  return (
    <SC.ContainerInputArea>

      <SC.InputLabel>
        <SC.InputTitle>Tipo de Outros Custos</SC.InputTitle>
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
        <SC.InputTitle>Valor</SC.InputTitle>
        <div className='informationIcon'>
          <SC.InputArea4
            type="text"
            value={inputTwoField}
            onChange={event => setInputTwoField(event.target.value)}
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
        <SC.ButtonInputArea onClick={handleAddEvent1}>
          Adicionar
        </SC.ButtonInputArea>
      </SC.InputLabelButton>

    </SC.ContainerInputArea>
  )
};