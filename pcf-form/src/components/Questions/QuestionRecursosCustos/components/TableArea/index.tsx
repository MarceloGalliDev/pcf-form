import { Trash } from 'phosphor-react';
import { FormEvent } from 'react';
import { Item } from '../../types/Item';
import * as SC from '../../styles/styles';

type Props = {
  list: Item[],
  remover: (index: number) => void;
};

export const TableArea = ({ list, remover }:Props) => {

  const removeDefault = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <SC.TableHead>
      <thead>
        <tr>
          <SC.TableHeadColumn width={100}>Despesa / Custo</SC.TableHeadColumn>
          <SC.TableHeadColumn width={50}>Tipo de Recurso</SC.TableHeadColumn>
          <SC.TableHeadColumn width={50}>Valor</SC.TableHeadColumn>
          <SC.TableHeadColumn width={10}>Excluir</SC.TableHeadColumn>
        </tr>
      </thead>

      <tbody>
        {list.map((item, index,) => (
          <SC.TableLine
            key={index}
          >
            
            {/* <SC.TableColumn>
              <SC.ValueArea>
                <p>
                  {item.a_id}
                </p>
              </SC.ValueArea>
            </SC.TableColumn> */}
            
            <SC.TableColumn>
              <SC.ValueArea>
                <p>
                  {item.b_inputOne}
                  ({item.e_inputFour} {item.f_inputFive}
                  {item.g_inputSix})
                </p>
              </SC.ValueArea>
            </SC.TableColumn>

            <SC.TableColumn>
              <SC.ValueArea>
                <p>
                  {item.c_inputTwo}
                </p>
              </SC.ValueArea>
            </SC.TableColumn>
          
            <SC.TableColumn>
              <SC.ValueArea>
                <p>
                  R$ {item.d_inputThree}
                </p>
              </SC.ValueArea>
            </SC.TableColumn>

            <SC.TableColumn>
              <SC.ValueArea>
                <form onSubmit={removeDefault}>
                  <SC.ButtonArea
                  onClick={() => remover(index)}
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