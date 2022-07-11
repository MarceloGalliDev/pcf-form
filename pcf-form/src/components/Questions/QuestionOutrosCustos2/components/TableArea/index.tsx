import { Trash } from 'phosphor-react';
import { FormEvent } from 'react';
import { Item2 } from '../../types/Item2';
import * as SC from '../../styles/styles';

type Props = {
  list: Item2[],
  remover: (index: number) => void;
};

export const TableAreaOutrosCustos2 = ({ list, remover }:Props) => {

  const removeDefault = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <SC.TableHead>
      <thead>
        <tr>
          <SC.TableHeadColumn width={150}>Tipo de organização</SC.TableHeadColumn>
          <SC.TableHeadColumn width={100}>Valor</SC.TableHeadColumn>
          <SC.TableHeadColumn width={30}>Excluir</SC.TableHeadColumn>
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
                </p>
              </SC.ValueArea>
            </SC.TableColumn>

            <SC.TableColumn>
              <SC.ValueArea>
                <p>
                  R$ {item.c_inputTwo}
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
