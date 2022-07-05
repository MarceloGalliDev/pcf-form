import * as SC from '../../styles/styles';
import { FormEvent, useEffect, useState } from 'react';
import { push, ref, remove, set } from "firebase/database";
import { database } from '../../../../../services/firebase';
import { useParams } from 'react-router-dom';
import { Plus } from 'phosphor-react';
import { Item } from '../../types/Item';

type RoomParams = {
  id: string;
};

type Props = {
  onAdd: (item: Item) => void;
};

export const InputArea = ({ onAdd }: Props) => {
  const params = useParams<RoomParams>()
  const roomId = params.id

  const [idCount, setIdCount] = useState(1)
  const [inputOneField, setInputOneField] = useState('');
  const [inputTwoField, setInputTwoField] = useState(0);

  const handleAddEvent = async(event: FormEvent) => {
    event.preventDefault();

    let errors: string[] = [];

    if (inputOneField == '') {
      errors.push('Insira a resposta!');
    }
    if (inputTwoField <= 0) {
      errors.push('Insira a resposta!');
    }
    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        id: idCount,
        inputOne: inputOneField,
        inputTwo: inputTwoField,
      })
    };

    setIdCount(idCount + 1);
    setInputOneField('');
    setInputTwoField(0);
  };

  return (
    <SC.ContainerInputArea>

      <SC.InputLabel>
        <SC.InputTitle>Outros Profissionais</SC.InputTitle>
        <SC.InputArea type="text" value={inputOneField} onChange={event => setInputOneField(event.target.value)} />
      </SC.InputLabel>

      <SC.InputLabel>
        <SC.InputTitle>Remuneração</SC.InputTitle>
        <SC.InputArea type="number" value={inputTwoField} onChange={event => setInputTwoField(parseFloat(event.target.value))} />
      </SC.InputLabel>

      <SC.InputLabelButton>
        <SC.InputTitle>&nbsp;</SC.InputTitle>
        <SC.ButtonInputArea onClick={handleAddEvent}>
          <Plus size={20} color="#ffffff" weight="bold" /></SC.ButtonInputArea>
      </SC.InputLabelButton>

    </SC.ContainerInputArea>
  )
};