import styled from 'styled-components';

export const Container = styled.div`
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
export const Input = styled.input`
  width: 250px;
  height: 30px;
  padding: 0 5px;
  border: 1px solid #AB6661;
  border-radius: 5px;
`;
export const Select = styled.select`
  width: 100%;
  height: 30px;
  padding: 0 5px;
  border: 1px solid #AB6661;
  border-radius: 5px;
`;

export const InputLabelButton = styled.div`

`;

export const Button = styled.button`
  width: 30px;
  height: 30px;
  padding: 0 5px;
  border: 1px solid #AB6661;
  border-radius: 5px;
  background-color: #AB6661;
  color: #fff;
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    filter: brightness(0.8);
    color: white;
  }
`;

