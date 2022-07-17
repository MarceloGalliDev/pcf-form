import styled from "styled-components"

export const Container = styled.div`
  p {
    font-size: 15px;
    color: #2D7DB0;
  }

  h1 {
    margin: 15px 0;
    padding: 0;
    font-size: 26px;
  }

  hr {
    height: 1px;
    border: 0;
    background-color: #2D7DB0;
    margin: 30px 0;
  }
`;

export const SubSection = styled.div`
  .bgSubSection {
    background-color: #3490C9;
    border: 1px solid #3490C9;
    border-radius: 10px 10px 0px 0px;
    padding: 10px 10px;
    border-bottom: none;
    
    p {
      font-size: 15px;
      font-weight: normal;
      color: #FFFFFF;
    }
  };

  .formQuestionV1 {
    border: 1px solid #3490C9;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 10px;

    p { 
      font-weight: 500;
      margin: 10px 0px 20px 0px;
    }

    .containerTable {
      border: 1px solid #3490C9;
      border-radius: 10px;
      display: flex;
      align-items: center;
    }
  };

  .formQuestionV2 {
    border: 1px solid #3490C9;
    background-color: #2e7eb02e;
    border-radius: 0px 0px 10px 10px;
    padding: 10px 10px;
    margin-bottom: 10px;

    .formQuestionV3 {
      border: 1px solid #3490C9;
      background-color: #2e7eb02e;
      border-radius: 10px;
      padding: 10px 10px;
      margin-bottom: 10px;
    }
  }
`;

export const ButtonTypeRadio = styled.div`
  .formQuestion {
    border: 1px solid #2E7EB0;
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

        input[type="radio"]:invalid {
          appearance: none;
          color: red;
          width: 12px;
          height: 12px;
          border: 1px solid red;
          border-radius: 50%;
        }
      }
      
      .containerTextLabel {
        font-size: 15px;
        font-weight: normal;
      }
    }
  }
`;

export const ButtonTypeRadioV2 = styled.div`
  .formQuestion {
    border: 1px solid #2E7EB0;
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

        input[type="radio"]:invalid {
          appearance: none;
          color: red;
          width: 12px;
          height: 12px;
          border: 1px solid red;
          border-radius: 50%;
        }
      }

      .containerTextLabel {
        font-size: 15px;
        font-weight: normal;
      }
      
      .inputPlaceholderOther {
        width: 100%;
        border-left: none;
        border-right: none;
        border-top: none;
        border-bottom: 1px solid #2E7EB0;
        outline: none;
      }
    }
  }
`;

export const ButtonTypeDate = styled.div`
  .formQuestion {
    border: 1px solid #2E7EB0;
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
        border-bottom: 1px solid #2E7EB0;
        color: #46687D;
        outline: 0;
        font-size: 15px;
        padding: 5px 0;

        :invalid {
          border-bottom: 1px solid red;
        }
      }
    }
  }
`;

export const ButtonTypeSelectOption = styled.div`
  .formQuestion {
    border: 1px solid #2D7DB0;
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
      color: #2D7DB0;

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
        color: #2D7DB0;
        border: 1px solid #2D7DB0;
        border-radius: 5px;
        text-decoration: #2D7DB0;
        outline-color: #46687D;

        :invalid {
          border: 1px solid red;
        }
      }
    }
  }
`;

export const ButtonTypeCheckbox = styled.div`
  .formQuestion {
    border: 1px solid #2E7EB0;
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

        input[type="checkbox"]:invalid {
          appearance: none;
          color: red;
          width: 12px;
          height: 12px;
          border: 1px solid red;
          padding: 5px;
        }

        .containerTextLabel {
          font-size: 15px;
          font-weight: normal;

        }
        .inputPlaceholderOther {
          width: 100%;
          border-left: none;
          border-right: none;
          border-top: none;
          border-bottom: 1px solid #2E7EB0;
          outline: none;

          :invalid {
            border-bottom: 1px solid red;
          }
        }
      }
    }
  }
`;

export const ButtonTypeCheckboxV1 = styled.div`
  .formQuestion {
    border: 1px solid #2E7EB0;
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

        input[type="checkbox"]:invalid {
          appearance: none;
          color: red;
          width: 12px;
          height: 12px;
          border: 1px solid red;
          padding: 5px;
        }

        .containerTextLabel {
          font-size: 15px;
          font-weight: normal;

        }
        .inputPlaceholderOther {
          width: 100%;
          border-left: none;
          border-right: none;
          border-top: none;
          border-bottom: 1px solid #2E7EB0;
          outline: none;

          :invalid {
            border-bottom: 1px solid red;
          }
        }
      }
    }
  }
  .formQuestion {
    border: 1px solid #2E7EB0;
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
        margin: 10px 0;
        align-items: center;
      }

      .containerTextLabel {
        font-size: 15px;
        font-weight: normal;
      }
    }
  }

  .formQuestion {
    border: 1px solid #2E7EB0;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 10px;

    p {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .containerBgLabel {
      background-color: #fff;
      border: 1px solid #2E7EB0;
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 10px;

      .containerTextLabel {
        font-size: 15px;
        font-weight: 500;
      }

      span {
        font-weight: normal;
        color: red;
        margin-left: 10px;
      }

      input {
        background-color: #fff;
        display: block;
        margin-top: 17px;
        width: 100%;
        border: none;
        border-bottom: 1px solid #2E7EB0;
        color: #2E7EB0;
        outline: 0;
        font-size: 15px;
        padding: 5px 0;

        :invalid {
            border-bottom: 1px solid red;
          }
      }
    }
  }
`;

export const ButtonTypeText = styled.div`
  .formQuestion {
    border: 1px solid #2D7DB0;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 10px;

    label {
      font-size: 15px;
      font-weight: bold;
      color: #2D7DB0;

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
        border-bottom: 1px solid #2D7DB0;
        color: #2D7DB0;
        font-size: 15px;
        padding: 5px 0;
        outline: none;

        :invalid {
          border-bottom: 1px solid red;
        }

        ::-webkit-outer-spin-button,
        ::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }
`;

export const ButtonTypeTextV2 = styled.div`
  .formQuestion {
    border: 1px solid #2E7EB0;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 10px;

    p {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .containerBgLabel {
      border: 1px solid #2E7EB0;
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 10px;

      .containerTextLabel {
        font-size: 15px;
        font-weight: 500;
      }

      span {
        font-weight: normal;
        color: red;
        margin-left: 10px;
      }

      input {
        display: block;
        margin-top: 17px;
        width: 10% + 10vw;
        border: none;
        border-bottom: 1px solid #2E7EB0;
        color: #591C21;
        outline: none;
        font-size: 15px;
        padding: 5px 0;

        :invalid {
          border-bottom: 1px solid red;
        }

        ::-webkit-outer-spin-button,
        ::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }
`;

export const ButtonTypeTextV3 = styled.div`
  .formQuestion {
    border: 1px solid #2E7EB0;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 10px;
    
    #containerLabelCheckboxBorder {
      display: 1;
      display: flex;
      flex-direction: column;
      border: 1px solid #2E7EB0;
      border-radius: 10px;
      padding: 10px;
      margin-top: 10px;
    }

    label {
      font-size: 15px;
      font-weight: bold;

      
      #containerTextLabelCheckbox {
        margin-top: 10px;
        display: flex;
        align-items: center;
        text-align: center;
        
        .labelForContainerTextLabelCheckbox {
          font-weight: 500;
        }
        
        .inputForContainerTextLabelCheckbox {
          margin: 0 10px;
          border-left: none;
          border-right: none;
          border-top: none;
          border-bottom: 1px solid #2E7EB0;
          outline: none;

          :invalid {
            border-bottom: 1px solid red;
          }

          ::-webkit-outer-spin-button,
          ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }
      }
    }
  }
`;

export const ButtonTypeFile = styled.div`
  .formQuestion {
    border: 1px solid #2E7EB0;
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
        color: #591C21;
        outline: 0;
        font-size: 15px;
        padding: 5px 0;
      }
    }
  }
`;

export const AllButtons = styled.div`
  margin: 40px 0px;
  border: none;
  display: flex;
  flex-direction: row;
  gap: 20px;
  background-color: #f2f2f2;

  .success {
    display: flex;
    text-align: center;
    align-items: center;
    gap: 2px;
    background-color: #fff;
    border: 1px solid green;
    border-radius: 10px;
    font-weight: bold;
    padding: 0px 6px;
  };
  
  .buttonAll {
    width: 170px;
    background-color: #2D7DB0;
    color: #F2F2F2;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 46.9px;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    text-decoration: none;
    transition: filter 0.2s;
    text-align: center;

    &:hover {
      filter: brightness(0.8);
    }
  }
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

export const ContainerV2 = styled.div`
`;

export const ButtonTypeRadioText = styled.div`
  .formQuestion {
    border: 1px solid #2E7EB0;
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
        margin: 10px 0;
        align-items: center;

        input[type="radio"]:invalid {
          appearance: none;
          color: red;
          width: 12px;
          height: 12px;
          border: 1px solid red;
          border-radius: 50%;
        }
      }

      .containerTextLabel {
        font-size: 15px;
        font-weight: normal;
      }
    }
  }

  .formQuestion {
    border: 1px solid #2E7EB0;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 10px;

    p {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .containerBgLabel {
      background-color: #fff;
      border: 1px solid #2E7EB0;
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 10px;

      .containerTextLabel {
        font-size: 15px;
        font-weight: 500;
      }

      span {
        font-weight: normal;
        color: red;
        margin-left: 10px;
      }

      input {
        background-color: #fff;
        display: block;
        margin-top: 17px;
        width: 100%;
        border: none;
        border-bottom: 1px solid #2E7EB0;
        color: #2E7EB0;
        outline: 0;
        font-size: 15px;
        padding: 5px 0;

        :invalid {
          border-bottom: 1px solid red;
        }
      }
    }
  }
`;

export const QuestionChangeOnOff = styled.div`
  .containerBgLabel {
    background-color: #fff;
    border: 1px solid #2E7EB0;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;

    .containerTextLabel {
      font-size: 15px;
      font-weight: 500;
    }

    span {
      font-weight: normal;
      color: red;
      margin-left: 10px;
    }

    input {
      background-color: #fff;
      display: block;
      margin-top: 17px;
      width: 100%;
      border: none;
      border-bottom: 1px solid #2E7EB0;
      color: #2E7EB0;
      outline: 0;
      font-size: 15px;
      padding: 5px 0;
    }
  }
`;