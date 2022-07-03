import * as SC from './styles';
import { Item } from '../../types/Item';

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

    </SC.TableLine>
  )
};