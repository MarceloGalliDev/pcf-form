import { useCallback, useState } from "react";
import * as SC from "../../../styles/styles";


interface SupervisorQualification {
  especializacao: string;
  mestrado: string;
  doutorado: string;
};

export const SupervisorQualification = () => {
  const [optionForm, setOptionForm] = useState<SupervisorQualification>({
    especializacao: '',
    mestrado: '',
    doutorado: '',
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const {especializacao, mestrado, doutorado} = optionForm

      if (!especializacao || !mestrado || !doutorado) {
        window.alert('Preencha todos os campos: \n "Quantos Supervisores da equipe do PCF tem em seu município"')
        return;
      }

  }, [optionForm]);

  const handleChangeInput = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const { value, name } = targetInput;

    setOptionForm({
      ...optionForm,
      [name]: value,
    })

  }, [optionForm]);

  return (
    <SC.ButtonTypeTextV3>
      <div className="formQuestion">
        <label>
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
              name="especializacao"
              type="text"
              value={optionForm.especializacao}
              onChange={handleChangeInput}
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
              name="mestrado"
              type="text"
              value={optionForm.mestrado}
              onChange={handleChangeInput}
              
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
              name="doutorado"
              type="text"
              value={optionForm.doutorado}
              onChange={handleChangeInput}
              placeholder="Sua resposta"
            />
          </div>

        </label>
      </div>
    </SC.ButtonTypeTextV3>
  )
};

//checked={optionForm.nome}
//onChange={(event) => setOptionForm({
//  ...optionForm,
//  nome: !!event.currentTarget?.checked
//})

/* validação
  const [sucessQuestion, setSucessQuestion] = useState(false)

  if(sucessQuestion) {
  return 
    <div>
      <p>Formulario enviado</p>
    </div>
  }

*/