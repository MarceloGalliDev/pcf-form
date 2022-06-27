import * as SC from "../../styles/styles"
import { Theme } from "../../components/Theme"
import { Link, useNavigate } from "react-router-dom"
import { useFormPage, FormActions } from "../../context/FormContext"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FormStep3Input } from "../../types/FormStep3"


const schema = yup.object({
  teamCoordinator: yup.string().required(),
  meetTheCoordinator: yup.string().required(),
  contactCoordinator: yup.string().required(),
  knowTheMultiplier: yup.string().required(),
  steeringCommittee: yup.string().required(),
  steeringCommitteeMeeting: yup.string().required(),

}).required();

export const FormStep3 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFormPage();

  const { register, handleSubmit, formState: { errors } } = useForm<FormStep3Input>({ resolver: yupResolver(schema) })
  const onSubmit = handleSubmit(data => navigate('/formstep3'))

  //função de captura de valores
  const handleTeamCoordinatorChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setTeamCoordinator,
      payload: event.target.value
    });
  };

  const handleMeetTheCoordinatorChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setMeetTheCoordinator,
      payload: event.target.value
    });
  };
  
  const handleContactCoordinatorChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setContactCoordinator,
      payload: event.target.value
    });
  };

  const handleKnowTheMultiplierChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setKnowTheMultiplier,
      payload: event.target.value
    });
  };

  const handleSteeringCommitteeChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setSteeringCommittee,
      payload: event.target.value
    });
  };

  const handleSteeringCommitteeMeetingChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setSteeringCommitteeMeeting,
      payload: event.target.value
    });
  };

  // useEffect(() => {
  //   if (state.name === '' ||
  //     state.phoneNumber === '' ||
  //     state.email === '' ||
  //     state.functionPCF === '' ||
  //     state.uf === '' ||
  //     state.city === '') {
  //     navigate('/')
  //   } else {
  //     dispatch({
  //       type: FormActions.setCurrentStep,
  //       payload: 2
  //     });
  //   }
  // }, []);

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 3
    });
  }, []);

  console.log(state)

  return (
    <Theme>
      <SC.Container>
        <p>Etapa {state.currentStep}/10</p>
        <h1>Gestão do PCF</h1>
        <p>Gestão, comitê e equipe do PCF</p>
        <hr />
      </SC.Container>

      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            A equipe do PCF em seu município tem Coordenador?
            <span>{errors.teamCoordinator && " ⚠ *Campo obrigatório "}</span>
          </p>
          <div id="containerOption">
            <div id="containerOptionSixOption">

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("teamCoordinator")}
                  id="teamCoordinatorYes"
                  name="teamCoordinator"
                  type="radio"
                  value="sim"
                  onChange={handleTeamCoordinatorChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="teamCoordinatorYes"
                >Sim
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("teamCoordinator")}
                  id="teamCoordinatorNo"
                  name="teamCoordinator"
                  type="radio"
                  value="Não"
                  onChange={handleTeamCoordinatorChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="teamCoordinatorNo"
                >Não
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("teamCoordinator")}
                  id="teamCoordinatorDontKnow"
                  name="teamCoordinator"
                  type="radio"
                  value="Não"
                  onChange={handleTeamCoordinatorChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="teamCoordinatorDontKnow"
                >Não sei
                </label>
              </div>

            </div>
          </div>
        </div>
      </SC.ButtonTypeRadio>

      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Você conhece o Coordenador Estadual do PCF?
            <span>{errors.meetTheCoordinator && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                  {...register("meetTheCoordinator")}
                  id="meetTheCoordinatorYes"
                  name="meetTheCoordinator"
                  type="radio"
                  value="sim"
                  onChange={handleMeetTheCoordinatorChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="meetTheCoordinatorYes"
                >Sim
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("meetTheCoordinator")}
                  id="meetTheCoordinatorNo"
                  name="meetTheCoordinator"
                  type="radio"
                  value="Não"
                  onChange={handleMeetTheCoordinatorChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="meetTheCoordinatorNo"
                >Não
                </label>
              </div>

            </div>
          </div>
        </div>
      </SC.ButtonTypeRadio>

      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Quantas vezes teve contato com ele(a) nos últimos 12 meses?
            <span>{errors.contactCoordinator && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                  {...register("contactCoordinator")}
                  id="contactCoordinatorZero"
                  name="contactCoordinator"
                  type="radio"
                  value="0"
                  onChange={handleContactCoordinatorChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="contactCoordinatorZero"
                >0
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("contactCoordinator")}
                  id="contactCoordinatorOne"
                  name="contactCoordinator"
                  type="radio"
                  value="1"
                  onChange={handleContactCoordinatorChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="contactCoordinatorOne"
                >1
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("contactCoordinator")}
                  id="contactCoordinatorTwo"
                  name="contactCoordinator"
                  type="radio"
                  value="2"
                  onChange={handleContactCoordinatorChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="contactCoordinatorTwo"
                >2
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("contactCoordinator")}
                  id="contactCoordinatorThree"
                  name="contactCoordinator"
                  type="radio"
                  value="3"
                  onChange={handleContactCoordinatorChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="contactCoordinatorThree"
                >3
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("contactCoordinator")}
                  id="contactCoordinatorFour"
                  name="contactCoordinator"
                  type="radio"
                  value="4 ou mais"
                  onChange={handleContactCoordinatorChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="contactCoordinatorFour"
                >4 ou mais
                </label>
              </div>

            </div>
          </div>
        </div>
      </SC.ButtonTypeRadio>

      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Você conhece o Multiplicador Estadual do PCF?
            <span>{errors.knowTheMultiplier && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                  {...register("knowTheMultiplier")}
                  id="knowTheMultiplierYes"
                  name="knowTheMultiplier"
                  type="radio"
                  value="sim"
                  onChange={handleKnowTheMultiplierChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="knowTheMultiplierYes"
                >Sim
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("knowTheMultiplier")}
                  id="knowTheMultiplierNo"
                  name="knowTheMultiplier"
                  type="radio"
                  value="Não"
                  onChange={handleKnowTheMultiplierChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="knowTheMultiplierNo"
                >Não
                </label>
              </div>

            </div>
          </div>
        </div>
      </SC.ButtonTypeRadio>

      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            O município possui Comitê Gestor Municipal do PCF?
            <span>{errors.steeringCommittee && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                  {...register("steeringCommittee")}
                  id="steeringCommitteeYes"
                  name="steeringCommittee"
                  type="radio"
                  value="sim"
                  onChange={handleSteeringCommitteeChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="steeringCommitteeYes"
                >Sim
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("steeringCommittee")}
                  id="steeringCommitteeNo"
                  name="steeringCommittee"
                  type="radio"
                  value="Não"
                  onChange={handleSteeringCommitteeChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="steeringCommitteeNo"
                >Não
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("steeringCommittee")}
                  id="steeringCommitteeDontKnow"
                  name="steeringCommittee"
                  type="radio"
                  value="Não sei"
                  onChange={handleSteeringCommitteeChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="steeringCommitteeDontKnow"
                >Não sei
                </label>
              </div>

            </div>
          </div>
        </div>
      </SC.ButtonTypeRadio>

      <SC.ButtonTypeRadio>
        <div className="formQuestion">
          <p className="textFormRadioButton">
            Quantas vezes o Comitê Gestor Municipal se reuniu nos últimos 12 meses?
            <span>{errors.steeringCommitteeMeeting && " ⚠ *Campo obrigatório "}</span>
          </p>

          <div id="containerOption">
            <div id="containerOptionSixOption">
              
              <div id="containerInputLabelRadioButton">
                <input
                  {...register("steeringCommitteeMeeting")}
                  id="steeringCommitteeMeetingZero"
                  name="steeringCommitteeMeeting"
                  type="radio"
                  value="0"
                  onChange={handleSteeringCommitteeMeetingChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="steeringCommitteeMeetingZero"
                >0
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("steeringCommitteeMeeting")}
                  id="steeringCommitteeMeetingOne"
                  name="steeringCommitteeMeeting"
                  type="radio"
                  value="1"
                  onChange={handleSteeringCommitteeMeetingChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="steeringCommitteeMeetingOne"
                >1
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("steeringCommitteeMeeting")}
                  id="steeringCommitteeMeetingTwo"
                  name="steeringCommitteeMeeting"
                  type="radio"
                  value="2"
                  onChange={handleSteeringCommitteeMeetingChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="steeringCommitteeMeetingTwo"
                >2
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("steeringCommitteeMeeting")}
                  id="steeringCommitteeMeetingThree"
                  name="steeringCommitteeMeeting"
                  type="radio"
                  value="3"
                  onChange={handleSteeringCommitteeMeetingChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="steeringCommitteeMeetingThree"
                >3
                </label>
              </div>

              <div id="containerInputLabelRadioButton">
                <input
                  {...register("steeringCommitteeMeeting")}
                  id="steeringCommitteeMeetingFour"
                  name="steeringCommitteeMeeting"
                  type="radio"
                  value="4 ou mais"
                  onChange={handleSteeringCommitteeMeetingChange}
                />
                <label
                  className="containerTextLabel"
                  htmlFor="steeringCommitteeMeetingFour"
                >4 ou mais
                </label>
              </div>

            </div>
          </div>
        </div>
      </SC.ButtonTypeRadio>

      <SC.AllButtons>
        <Link className="buttonBack" to="/formstep2">Voltar</Link>
        <button
          className="buttonNext"
          onClick={onSubmit}
        >Próximo
        </button>
      </SC.AllButtons>
    </Theme>
  )
};

