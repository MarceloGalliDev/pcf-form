import styled from "styled-components"

export const Container = styled.div`
  p {
    font-size: 15px;
    color: #B8B8D4;
  }

  h1 {
    margin: 15px 0;
    padding: 0;
    font-size: 26px;
  }

  hr {
    height: 1px;
    border: 0;
    background-color: #16195C;
    margin: 30px 0;
  }

  label {
    font-size: 15px;

    input {
      box-sizing: border-box;
      display: block;
      margin-top: 7px;
      width: 100%;
      padding: 10px 10px;
      border: 2px solid #25CD89;
      border-radius: 10px;
      color: #FFFFFF;
      outline: 0;
      font-size: 15px;
      background-color: #02044A;
    }
  }

  button {
    background-color: #25CD89;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 40px;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 30px;
  }
`;