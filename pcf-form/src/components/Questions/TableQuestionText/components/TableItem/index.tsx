import * as SC from './styles';
import { Item } from '../../types/Item';
import { Trash } from 'phosphor-react';
import { FormEvent } from 'react';

type Props = {
  item: Item
};

export const TableItem = ({ item }: Props) => {
  return (
    <SC.TableLine>

      <SC.TableColumn>
        <SC.Value>
          {item.inputOne}
        </SC.Value>
      </SC.TableColumn>

      <SC.TableColumn>
        <SC.Value>
          R$ {item.inputTwo}
        </SC.Value>
      </SC.TableColumn>

      <SC.TableColumn>
        <SC.Value>
          <SC.Button>
            <Trash size={20} color="#d22d2d" weight="light" />
          </SC.Button>
        </SC.Value>
      </SC.TableColumn>

    </SC.TableLine>
  )
};