import { Trash } from 'phosphor-react';
import { FormEvent } from 'react';
import { Item2 } from '../../types/Item2';
import * as SC from '../../styles/styles';

type Props = {
  list2: Item2[],
  remover2: (index2: number) => void;
};

export const TableAreaOutrosCustos2 = ({ list2, remover2 }:Props) => {

  const removeDefault2 = (event: FormEvent) => {
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
        {list2.map((item2, index2,) => (
          <SC.TableLine
            key={index2}
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
                  {item2.b_inputOne}
                </p>
              </SC.ValueArea>
            </SC.TableColumn>

            <SC.TableColumn>
              <SC.ValueArea>
                <p>
                  R$ {item2.c_inputTwo}
                </p>
              </SC.ValueArea>
            </SC.TableColumn>

            <SC.TableColumn>
              <SC.ValueArea>
                <form onSubmit={removeDefault2}>
                  <SC.ButtonArea
                  onClick={() => remover2(index2)}
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
