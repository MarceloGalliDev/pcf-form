import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 10px;
  background-color: #FFF;
  box-shadow: 0px 0px 5px #CCC;
  border-radius: 10px;
  margin-top: 10px;
  padding: 20px;
`;

export const InputLabelText = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  flex: 1;
  margin-right: 20px;

  .secondInputText {
    margin-top: 15px;
  }
`;

export const InputLabel = styled.label`
  display: flex;
  align-items: center;
`;
export const InputTitle = styled.div`
  font-weight: bold;
`;
export const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 5px;
  border: 1px solid #AB6661;
  border-radius: 5px;
`;


export const Button = styled.button`
  width: 50px;
  height: 50px;
  border: 1px solid #AB6661;
  border-radius: 5px;
  background-color: #AB6661;
  color: #fff;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
    color: white;
  }
`;