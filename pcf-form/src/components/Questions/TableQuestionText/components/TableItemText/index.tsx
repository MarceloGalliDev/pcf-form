import * as SC from './styles';
import { ItemOthers } from '../../types/ItemOthers';

type Props = {
  itemOthers: ItemOthers
};

export const TableItemText = ({ itemOthers }: Props) => {
  return (
    <SC.TableLine>

      <SC.TableColumn>
        <SC.Value>
          {itemOthers.professionalIndication}
        </SC.Value>
      </SC.TableColumn>

      <SC.TableColumn>
        <SC.Value>
          {itemOthers.averagePayOthers}
        </SC.Value>
      </SC.TableColumn>

    </SC.TableLine>
  )
};