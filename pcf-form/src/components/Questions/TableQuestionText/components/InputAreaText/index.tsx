import * as SC from './styles';
import { FormEvent, useState } from 'react';
import { ItemOthers } from '../../types/ItemOthers';
import { UserPlus } from 'phosphor-react';


type Props = {
  onAdd: (itemOthers: ItemOthers) => void;
};

export const InputAreaText = ({ onAdd }: Props) => {
  const [profIndicationField, setProfIndicationField] = useState('');
  const [averagePayOthersField, setAveragePayOthersField] = useState('');

  const handleAddEventText = (event: FormEvent) => {
    event.preventDefault();
    
    let errors: string[] = [];

    if (profIndicationField == '') {
      errors.push('Valor inválido!');
    }

    if (averagePayOthersField == '') {
      errors.push('Valor inválido!');
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        professionalIndication: profIndicationField,
        averagePayOthers: averagePayOthersField,
      });
      clearFields();
    }
  };

  const clearFields = () => {
    setProfIndicationField('');
    setAveragePayOthersField('');
  };

  return (
    <SC.Container>

      <SC.InputLabelText>

        <SC.InputTitle>Outros profissionais remunerados pelo PCF:</SC.InputTitle>
        <SC.Input type="text" value={profIndicationField} onChange={event => setProfIndicationField(event.target.value)} />

        <SC.InputTitle className="secondInputText">Qual a remuneração média em R$ (reais) de outros profissionais:</SC.InputTitle>
        <SC.Input type="text" value={averagePayOthersField} onChange={event => setAveragePayOthersField(event.target.value)} />

      </SC.InputLabelText>

      <SC.InputLabel>
        <SC.InputTitle>&nbsp;</SC.InputTitle>
        <SC.Button onClick={handleAddEventText}>
          <UserPlus size={24} weight="bold" />
        </SC.Button>
      </SC.InputLabel>

    </SC.Container>
  )
};