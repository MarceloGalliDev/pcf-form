import { useState } from "react";
import * as SC from "../styles/styles";

export interface FormStep4Input {
  numberOfSupervisors: string;
  averagePay: string;
  workload: "40 horas semanais" | "30 horas semanais" | "20 horas semanais" | "Outro";
  workloadOthers: string;
  // supervisorQualification: string[];

};

export interface supervisorQualification {
  especializacao: string;
  mestrado: string;
  doutorado: string;
};

export const SupervisorQualification = () => {
  const [optionForm, setOptionForm] = useState<supervisorQualification>({
    especializacao: '',
    mestrado: '',
    doutorado: '',
  });

  console.log({optionForm})

  return (
    <SC.ButtonTypeTextV3>
      <div className="formQuestion">
        <label htmlFor="">
          Quantos Supervisores da equipe do PCF tem em seu município:

          <div id="containerTextLabelCheckbox">
            <label
              className="labelForContainerTextLabelCheckbox"
              htmlFor="supervisorSpecialization">
              Especialização:
            </label>
            <input
              className="inputForContainerTextLabelCheckbox"
              id="supervisorSpecialization"
              name="supervisorQualification"
              type="text"
              onChange={(event) => setOptionForm({
                ...optionForm,
                especializacao: event.currentTarget?.value || "",
              })}
              placeholder="Sua resposta"
            />
          </div>

          <div id="containerTextLabelCheckbox">
            <label
              className="labelForContainerTextLabelCheckbox"
              htmlFor="supervisorQualification"
            >Mestrado:
            </label>
            <input
              id="supervisorQualification"
              className="inputForContainerTextLabelCheckbox"
              name="supervisorQualification"
              type="text"
              onChange={(event) => setOptionForm({
                ...optionForm,
                mestrado: event.currentTarget?.value || "",
              })}
              
              placeholder="Sua resposta"
            />
          </div>

          <div id="containerTextLabelCheckbox">
            <label
              className="labelForContainerTextLabelCheckbox"
              htmlFor="supervisorQualification"
            >Doutorado:
            </label>
            <input
              id="supervisorQualification"
              className="inputForContainerTextLabelCheckbox"
              name="name"
              type="text"
              onChange={(event) => setOptionForm({
                ...optionForm,
                doutorado: event.currentTarget?.value || "",
              })}
              placeholder="Sua resposta"
            />
          </div>

        </label>
      </div>
    </SC.ButtonTypeTextV3>
  )
}