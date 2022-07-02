import { ItemOthers } from '../../types/ItemOthers';
import { TableItemText } from '../TableItemText';
import * as SC from '../TableAreaText/styles';

type Props = {
  listOthers: ItemOthers[]
}

export const TableAreaText = ({listOthers}: Props) => {
  return (
    <SC.Table>
      <thead>
        <tr>
          <SC.TableHeadColumn width={150}>Outros profissionais</SC.TableHeadColumn>
          <SC.TableHeadColumn width={150}>Remuneração média</SC.TableHeadColumn>
        </tr>
      </thead>
      <tbody>
        {listOthers.map((item, index) => (
          <TableItemText key={index} itemOthers={item} />
        ))}
      </tbody>
    </SC.Table>
  )
}