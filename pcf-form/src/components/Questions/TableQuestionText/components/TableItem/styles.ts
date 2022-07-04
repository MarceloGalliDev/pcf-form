import styled from 'styled-components';

export const TableLine = styled.tr`

`;

export const TableColumn = styled.td`
  padding: 10px 0;
`;

export const Category = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  color: #591C21;
  background-color: #fff;
`;

export const Value = styled.div`
  color: #591C21;
`;

export const Button = styled.button`
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