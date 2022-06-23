import styled from "styled-components"

export const ButtonTypeRadio = styled.div`
  .formQuestion {
    border: 1px solid #8C1F28;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 10px;
  
    .textFormRadioButton {
      font-size: 15px;
      font-weight: bold;

      span {
        font-weight: normal;
        color: red;
        margin-left: 10px;
      }
    }

    #containerOption {
      display: flex;
      margin-left: 10px;
      gap: 50px;

      #containerInputLabelRadioButton {
        display: flex;
        gap: 10px;
        margin-top: 10px;
        align-items: center;
      }

      .containerTextLabel {
        font-size: 15px;
        font-weight: normal;
      }
    }
  }
`;

export const ButtonTypeDate = styled.div`
  .formQuestion {
    border: 1px solid #8C1F28;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 10px;

    label {
      font-size: 15px;
      font-weight: bold;

      span {
        font-weight: normal;
        color: red;
        margin-left: 10px;
      }

      input {
        display: block;
        margin-top: 17px;
        width: 50% + 10vw;
        border: none;
        border-bottom: 1px solid #8C1F28;
        color: #591C21;
        outline: 0;
        font-size: 15px;
        padding: 5px 0;
      }
    }
  }
`;

export const ButtonTypeText = styled.div`
  .formQuestion {
    border: 1px solid #8C1F28;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 10px;

    label {
      font-size: 15px;
      font-weight: bold;

      span {
        font-weight: normal;
        color: red;
        margin-left: 10px;
      }

      input {
        display: block;
        margin-top: 17px;
        width: 100%;
        border: none;
        border-bottom: 1px solid #8C1F28;
        color: #591C21;
        outline: 0;
        font-size: 15px;
        padding: 5px 0;
      }
    }
  }
`;

export const ButtonTypeSelectOption = styled.div`
  .formQuestion {
    border: 1px solid #8C1F28;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 10px;

    label {
      display: flex;
      flex-direction: column;
      font-size: 15px;
      font-weight: bold;
      width: 50% + 10vw;

      span {
        font-weight: normal;
        color: red;
        margin-left: 10px;
      }

      select {
        display: flex;
        width: 200px;
        margin-top: 17px;
        padding: 5px;
        color: #591C21;
        border: 1px solid #8C1F28;
        border-radius: 5px;
      }
    }
  }
`;

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
`;

export const AllButtons = styled.div`
  .buttonNext {
    background-color: #D92525;
    color: #F2F2F2;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 40px;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    margin: 30px 0;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }

  .buttonBack {
    background-color: #D92525;
    color: #F2F2F2;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 46.9px;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    margin: 30px 10px 0 0;
    text-decoration: none;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;
