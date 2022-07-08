import styled from 'styled-components'

export const Container = styled.div`

`;

export const Header = styled.div`
  background-color: darkblue;
  height: 150px;
  text-align: center;
`;

export const HeaderText = styled.div`
  margin: 0;
  padding: 0;
  color: #fff;
  padding-top: 30px;
`;

export const Body = styled.div`
  margin: auto;
  max-width: 980px;
  margin-bottom: 50px;
`;
export const TableHead = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
  margin-top: 20px;
`;

export const TableHeadColumn = styled.th<{ width?: number }>`
  width: ${props => props.width ? `${props.width}px` : 'auto'}; 
  padding: 10px 0px;
  text-align: left;
`;//width está sendo especificado para uso como props

export const TableLine = styled.tr`

`;

export const TableColumn = styled.td`
  padding: 10px 0;
`;

export const Category = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  color: #2E7EB0;
  background-color: #fff;
`;

export const ValueArea = styled.div`
  color: #2E7EB0;
`;

export const ButtonArea = styled.button`
  background-color: #fff;
  border: none;
  border-radius: 50%;
  margin-left: 19px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
    color: white;
  }
`;

export const ContainerInputArea = styled.div`
  background-color: #FFF;
  box-shadow: 0px 0px 5px #CCC;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

export const InputLabel = styled.label`
  margin: 10px;
`;

export const InputTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const InputArea1 = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 5px;
  border: 1px solid #2E7EB0;
  border-radius: 5px;
`;
export const InputArea2 = styled.input`
  width: 120px;
  height: 30px;
  padding: 0 5px;
  border: 1px solid #2E7EB0;
  border-radius: 5px;
`;

export const SelectArea = styled.select`
  width: 100%;
  height: 30px;
  padding: 0 5px;
  border: 1px solid #2E7EB0;
  border-radius: 5px;
`;

export const InputLabelButton = styled.div`

`;

export const ButtonInputArea = styled.button`
  width: 100px;
  height: 30px;
  padding: 0 5px;
  border: 1px solid #2E7EB0;
  border-radius: 5px;
  background-color: #2E7EB0;
  color: #fff;
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    filter: brightness(0.8);
    color: white;
  }
`;

export const ContainerV2 = styled.div`
`;