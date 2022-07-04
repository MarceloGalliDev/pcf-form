import { remove } from 'firebase/database';
import { Trash } from 'phosphor-react';
import { FormEvent } from 'react';
import { Item } from '../../types/Item';
import { TableItem } from '../TableItem';
import * as SC from './styles';

type Props = {
  list: Item[]
};

export const TableArea = ({ list }: Props) => {

  function removeEvent(event: FormEvent) {
    event.preventDefault();
  };

  const removeItem = (index: Number[]) => {
    alert('deletar: ' + index)
    
    for (let i = 0; i < index.length; i++) {
      if (index === index)
    }
  };


  return (
    <SC.TableHead>
      <thead>
        <tr>
          <SC.TableHeadColumn width={150}>Outros profissionais</SC.TableHeadColumn>
          <SC.TableHeadColumn width={150}>Remuneração média</SC.TableHeadColumn>
          <SC.TableHeadColumn width={15}>Excluir</SC.TableHeadColumn>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <SC.TableLine
            key={index}
          >
            <SC.TableColumn>
              <SC.Value>
                <p>
                  {item.inputOne}
                </p>
              </SC.Value>
            </SC.TableColumn>

            <SC.TableColumn>
              <SC.Value>
                <p>
                  R$ {item.inputTwo}
                </p>
              </SC.Value>
            </SC.TableColumn>

            <SC.TableColumn>
              <SC.Value>
                <form onSubmit={removeEvent}>
                  <SC.Button
                    onClick={() => removeItem([index + 1])}
                  >
                    <Trash size={20} color="#d22d2d" weight="light" />
                  </SC.Button>
                </form>
              </SC.Value>
            </SC.TableColumn>
      
          </SC.TableLine>
        ))}
      </tbody>
    </SC.TableHead>
  )
}

{/* <TableItem
item={item}
key={index}
/> */}