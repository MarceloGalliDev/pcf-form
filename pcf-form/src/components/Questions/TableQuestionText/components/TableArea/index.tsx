import { Trash } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { Item } from '../../types/Item';
import * as SC from '../../styles/styles';
// import { TableInput } from '../TableInput';

type Props = {
  list: Item[],
};

type InputProps = {
  items: Item,
}

export const TableArea = ({ list }:Props ) => {

  const removeDefault = (event: FormEvent) => {
    event.preventDefault();
  };
  
  function removeRow(id: number) {

    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        list.splice(i, 1)
      }
    }
    alert(list)
  };

  console.log(list)

  return (
    <SC.TableHead>
      <thead>
        <tr>
          <SC.TableHeadColumn width={15}>Id</SC.TableHeadColumn>
          <SC.TableHeadColumn width={150}>Outros profissionais</SC.TableHeadColumn>
          <SC.TableHeadColumn width={150}>Remuneração média</SC.TableHeadColumn>
          <SC.TableHeadColumn width={15}>Excluir</SC.TableHeadColumn>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index,) => (
            <SC.TableLine
              key={index}
            >
              <SC.TableColumn>
                <SC.ValueArea>
                  <p>
                    {item.id}
                  </p>
                </SC.ValueArea>
              </SC.TableColumn>

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
                  <form onSubmit={removeDefault}>
                    <SC.ButtonArea
                      onClick={() => removeRow(item.id)}
                    >
                      <Trash size={20} color="#d22d2d" weight="light" />
                    </SC.ButtonArea>
                  </form>
                </SC.ValueArea>
              </SC.TableColumn>

            </SC.TableLine>
          )
        )}
      </tbody>
    </SC.TableHead>
  )
}

{/* <TableItem
item={item}
key={index}
/> */}