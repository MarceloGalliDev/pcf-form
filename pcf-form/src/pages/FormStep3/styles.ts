import styled from "styled-components"

export const Container = styled.div`
  p {
    font-size: 15px;
    color: #591C21;
  }

  h1 {
    margin: 15px 0;
    padding: 0;
    font-size: 26px;
  }

  hr {
    height: 1px;
    border: 0;
    background-color: #591C21;
    margin: 30px 0;
  }

  label {
    font-size: 15px;
    display: block;
    margin-bottom: 20px;

    input {
      display: block;
      margin-top: 7px;
      width: 100%;
      padding: 10px 10px;
      border: 2px solid #8C1F28;
      border-radius: 10px;
      color: #591C21;
      outline: 0;
      font-size: 15px;
      background-color: #F2F2F2;
    }
  }

  button {
    background-color: #D92525;
    color: #F2F2F2;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 40px;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 30px;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }

  .backButton {
    background-color: #D92525;
    text-decoration: none;
    color: #F2F2F2;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 40px;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    margin: 30px 15px 0 0;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;