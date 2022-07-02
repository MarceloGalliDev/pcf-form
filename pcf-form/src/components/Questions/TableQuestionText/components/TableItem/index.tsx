import * as SC from './styles';
import { categories } from '../../data/categories';
import { resources } from '../../data/resources';
import { Item } from '../../types/Item';

type Props = {
  item: Item
};

export const TableItem = ({ item }: Props) => {
  return (
    <SC.TableLine>

      <SC.TableColumn>
        <SC.Category>
          {categories[item.category].title}
        </SC.Category>
      </SC.TableColumn>

      <SC.TableColumn>
        <SC.Category>
          {resources[item.type].type}
        </SC.Category>
      </SC.TableColumn>
      
      <SC.TableColumn>
        <SC.Value>
          R${item.value}
        </SC.Value>
      </SC.TableColumn>

    </SC.TableLine>
  )
};