import * as SC from '../../styles/styles';
import { Item } from '../../types/Item';
import { Trash } from 'phosphor-react';

type Props = {
  item: Item
};

export const TableInput = ({ item }: Props) => {
  return (
    <SC.TableLine>

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
          <SC.ButtonArea>
            <Trash size={20} color="#d22d2d" weight="light" />
          </SC.ButtonArea>
        </SC.ValueArea>
      </SC.TableColumn>

    </SC.TableLine>
  )
};






         