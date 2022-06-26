import styled from 'styled-components';


export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  boprder-radius: 10px;
  margin-top: 20px;
`;


export const TableHeadColumn = styled.th<{ width?: number }>`
  width: ${props => props.width ? `${props.width}px` : 'auto'}; 
  padding: 10px 0px;
  text-align: left;
`;
//width está sendo especificado para uso como props