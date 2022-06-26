import { categories } from '../../../data/categories';
import { resources } from '../../../data/resources';

import { Item } from '../../../types/Item';
import * as S from './styles';

type Props = {
  item: Item
}

export const TableItem = ({ item }: Props) => {
  return (
    <S.TableLine>

      <S.TableColumn>
        <S.Category >
          {categories[item.category].title}
        </S.Category>
      </S.TableColumn>

      <S.TableColumn>
        <S.Category >
          {resources[item.resource].resource}
        </S.Category>
      </S.TableColumn>

      <S.TableColumn>
        <S.Value>
          R${item.value}
        </S.Value>
      </S.TableColumn>

    </S.TableLine>
  )
}