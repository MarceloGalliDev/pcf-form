import * as SC from '../../styles/styles';
import { FormEvent, useState } from 'react';
import { Item } from '../../types/Item';
import { Info } from 'phosphor-react';
import { categories } from '../../data/categories';
import { resources } from '../../data/resources';
import { transports } from '../../data/transports';
import { spending } from '../../data/spending';
import { feedings } from '../../data/feedings';


type Props = {
  onAdd: (item: Item) => void;
};

export const InputArea = ({ onAdd }: Props) => {
  const [inputOneField, setInputOneField] = useState('');
  const [inputTwoField, setInputTwoField] = useState('');
  const [inputThreeField, setInputThreeField] = useState('');
  const [inputFourField, setInputFourField] = useState('');
  const [inputFiveField, setInputFiveField] = useState('');
  const [inputSixField, setInputSixField] = useState('');
  const [countId, setCountId] = useState(1);

  let inputOneKeys: string[] = Object.keys(categories);
  let inputTwoKeys: string[] = Object.keys(resources);
  let inputFourKeys: string[] = Object.keys(spending);
  let inputFiveKeys: string[] = Object.keys(transports);
  let inputSixKeys: string[] = Object.keys(feedings);

  const handleAddEvent = async(event: FormEvent) => {
    event.preventDefault();

    let errors: string[] = [];


    if(!inputOneKeys.includes(inputOneField)) {
      errors.push('Categoria inválida!');
    }
    if(!inputTwoKeys.includes(inputTwoField)) {
      errors.push('Categoria inválida!');
    }
    if (inputThreeField == '') {
      errors.push('Insira a resposta!');
    }
    if(!inputFourKeys.includes(inputFourField)) {
      errors.push('Categoria inválida!');
    }
    if(!inputFiveKeys.includes(inputFiveField)) {
      errors.push('Categoria inválida!');
    }
    if(!inputSixKeys.includes(inputSixField)) {
      errors.push('Categoria inválida!');
    }
    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        a_id: countId,
        b_inputOne: inputOneField,
        c_inputTwo: inputTwoField,
        d_inputThree: inputThreeField,
        e_inputFour: inputFourField,
        f_inputFive: inputFiveField,
        g_inputSix: inputSixField,
      })
    };

    setCountId(countId + 1);
    setInputOneField('');
    setInputTwoField('');
    setInputThreeField('');
    setInputFourField('');
    setInputFiveField('');
  };

  return (
    <>
      <SC.ContainerInputAreaV1>

        <SC.InputLabel>
          <SC.InputTitle>Tipo de despesa</SC.InputTitle>
          <SC.SelectArea value={inputOneField} onChange={event => setInputOneField(event.target.value)}>
            <>
              <option></option>
              {inputOneKeys.map((key, index) => (
                <option key={index} value={key}>{categories[key].type}</option>
              ))}
            </>
          </SC.SelectArea>
        </SC.InputLabel>

        <SC.InputLabel>
          <SC.InputTitle>Tipo do recurso</SC.InputTitle>
          <SC.SelectArea value={inputTwoField} onChange={event => setInputTwoField(event.target.value)}>
            <>
              <option></option>
              {inputTwoKeys.map((key, index) => (
                <option key={index} value={key}>{resources[key].type}</option>
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

      </SC.ContainerInputAreaV1>

      <SC.ContainerInputAreaV2>

        <SC.InputLabel>
          <SC.InputTitle>Tipo de gasto</SC.InputTitle>
          <SC.SelectArea value={inputFourField} onChange={event => setInputFourField(event.target.value)}>
            <>
              <option></option>
              {inputFourKeys.map((key, index) => (
                <option key={index} value={key}>{spending[key].type}</option>
              ))}
            </>
          </SC.SelectArea>
        </SC.InputLabel>

        <SC.InputLabel>
          <SC.InputTitle>Tipo de veículo</SC.InputTitle>
          <SC.SelectArea value={inputFiveField} onChange={event => setInputFiveField(event.target.value)}>
            <>
              <option></option>
              {inputFiveKeys.map((key, index) => (
                <option key={index} value={key}>{transports[key].type}</option>
              ))}
            </>
          </SC.SelectArea>
        </SC.InputLabel>

        <SC.InputLabel>
          <SC.InputTitle>Tipo da alimentação</SC.InputTitle>
          <SC.SelectArea value={inputSixField} onChange={event => setInputSixField(event.target.value)}>
            <>
              <option></option>
              {inputSixKeys.map((key, index) => (
                <option key={index} value={key}>{feedings[key].type}</option>
              ))}
            </>
          </SC.SelectArea>
        </SC.InputLabel>

      </SC.ContainerInputAreaV2>
    </>
  )
};