import { Trash } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { Item } from '../../types/Item';
import * as SC from './styles';

type Props = {
  list: Item[],
};

export const TableArea = ({ list }:Props ) => {
  const [countItem, setCountItem] = useState([])
  const [filterCountItem, setFilterCountItem] = useState([])

  function removeEvent(event: FormEvent) {
    event.preventDefault();
  };
  
  const removeItem = (index: number) => {
    console.log(index)

  };

  useEffect(() => {
    setCountItem(countItem)
  }, [countItem])

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
                    onClick={() => removeItem(item.id)}
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