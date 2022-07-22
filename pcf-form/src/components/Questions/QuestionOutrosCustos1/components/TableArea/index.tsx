import { Trash } from 'phosphor-react';
import { FormEvent } from 'react';
import { Item1 } from '../../types/Item1';
import * as SC from '../../styles/styles';

type Props = {
  list1: Item1[],
  remover1: (index1: number) => void;
};

export const TableAreaOutrosCustos1 = ({ list1, remover1 }:Props) => {

  const removeDefault1 = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <SC.TableHead>
      <thead>
        <tr>
          <SC.TableHeadColumn width={150}>Outros custos</SC.TableHeadColumn>
          <SC.TableHeadColumn width={100}>Valor</SC.TableHeadColumn>
          <SC.TableHeadColumn width={30}>Excluir</SC.TableHeadColumn>
        </tr>
      </thead>

      <tbody>
        {list1.map((item1, index1,) => (
          <SC.TableLine
            key={index1}
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
                  {item1.b_inputOne}
                </p>
              </SC.ValueArea>
            </SC.TableColumn>

            <SC.TableColumn>
              <SC.ValueArea>
                <p>
                  R$ {item1.c_inputTwo}
                </p>
              </SC.ValueArea>
            </SC.TableColumn>

            <SC.TableColumn>
              <SC.ValueArea>
                <form onSubmit={removeDefault1}>
                  <SC.ButtonArea
                  onClick={() => remover1(index1)}
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
