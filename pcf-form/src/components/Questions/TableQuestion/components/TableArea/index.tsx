import { Item } from '../../types/Item';
import { TableItem } from '../TableItem';
import * as SC from './styles';

type Props = {
  list: Item[]
}

export const TableArea = ({list}: Props) => {
  return (
    <SC.Table>
      <thead>
        <tr>
          <SC.TableHeadColumn width={130}>Categoria</SC.TableHeadColumn>
          <SC.TableHeadColumn width={130}>Tipo</SC.TableHeadColumn>
          <SC.TableHeadColumn width={150}>Valor</SC.TableHeadColumn>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <TableItem key={index} item={item} />
        ))}
      </tbody>
    </SC.Table>
  )
}