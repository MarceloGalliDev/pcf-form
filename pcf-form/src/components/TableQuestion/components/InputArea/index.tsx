import { useState } from 'react';
import { categories } from '../../data/categories';
import { resources } from '../../data/resources';
import { Item } from '../../types/Item';
import * as S from './styles'

type Props = {
  onAdd: (item: Item) => void
}

export const InputArea = ({ onAdd }: Props) => {
  const [categoryField, setCategoryField] = useState('');
  const [resourceField, setResourceField] = useState('');
  const [valueField, setValueField] = useState(0);

  let categoryKeys: string[] = Object.keys(categories);
  let resourceKeys: string[] = Object.keys(resources);

  const handleAddEvent = () => {
    let errors: string[] = [];

    if(!categoryKeys.includes(categoryField)) {
      errors.push('Categoria inválida!');
    }
    if(!resourceKeys.includes(resourceField)) {
      errors.push('Recurso inválida!');
    }
    if(valueField <= 0) {
      errors.push('Valor inválido!');
    }

    if(errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        category: categoryField,
        coming: resourceField,
        value: valueField
      });
      clearFields();
    }
  }

  const clearFields = () => {
    setCategoryField('');
    setResourceField('');
    setValueField(0);
  }

  return (
    <S.Container>

      <S.InputLabel>
        <S.InputTitle>Categoria</S.InputTitle>
        <S.Select value={categoryField} onChange={event => setCategoryField(event.target.value)}>
          <>
            <option></option>
            {categoryKeys.map((key, index) => (
              <option key={index} value={key}>{categories[key].title}</option>
            ))}
          </>
        </S.Select>
      </S.InputLabel>

      <S.InputLabel>
        <S.InputTitle>Recurso</S.InputTitle>
        <S.Select value={resourceField} onChange={event => setResourceField(event.target.value)}>
          <>
            <option></option>
            {resourceKeys.map((key, index) => (
              <option key={index} value={key}>{resources[key].title}</option>
            ))}
          </>
        </S.Select>
      </S.InputLabel>

      <S.InputLabel>
        <S.InputTitle>Valor</S.InputTitle>
        <S.Input type="number" value={valueField} onChange={event => setValueField(parseFloat(event.target.value))} />
      </S.InputLabel>

      <S.InputLabel>
        <S.InputTitle>&nbsp;</S.InputTitle>
        <S.Button onClick={handleAddEvent}>Adicionar</S.Button>
      </S.InputLabel>
    </S.Container>
  )
}