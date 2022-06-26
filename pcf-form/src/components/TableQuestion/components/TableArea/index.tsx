import { TableItem } from '../InputArea/TableItem';
import * as S from './styles';

type Item = {
  category: string;
  resource: string;
  value: number;
};

type Props = {
  list: Item[]
}

export const TableArea = ({ list }: Props) => {
  return (
    <S.Table>
      <thead>
        <tr>
          <S.TableHeadColumn width={130}>Categoria</S.TableHeadColumn>
          <S.TableHeadColumn width={130}>Tipo</S.TableHeadColumn>
          <S.TableHeadColumn width={150}>Valor</S.TableHeadColumn>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <TableItem key={index} item={item} />
        ))}
      </tbody>
    </S.Table>
  )
};