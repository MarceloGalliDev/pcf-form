import { Trash } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { Item } from '../../types/Item';
import * as SC from '../../styles/styles';

type Props = {
  list: Item[],
};

const removeItem = () => {

};

export const TableArea = ({ list }:Props ) => {

  function removeEvent(event: FormEvent) {
    event.preventDefault();
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
        {list.map((item, index, id) => (
          <SC.TableLine
            key={index}
          >
            <SC.TableColumn>
              <SC.ValueArea>
                <p>
                  {item.inputOne}
                </p>
              </SC.ValueArea>
            </SC.TableColumn>

            <SC.TableColumn>
              <SC.ValueArea>
                <p>
                  R$ {item.inputTwo}
                </p>
              </SC.ValueArea>
            </SC.TableColumn>

            <SC.TableColumn>
              <SC.ValueArea>
                <form onSubmit={removeEvent}>
                  <SC.ButtonArea
                    onClick={() => removeItem()}
                  >
                    <Trash size={20} color="#d22d2d" weight="light" />
                  </SC.ButtonArea>
                </form>
              </SC.ValueArea>
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