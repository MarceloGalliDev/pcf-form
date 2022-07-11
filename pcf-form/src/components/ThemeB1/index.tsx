import * as SC from "./styles";
import { ReactNode } from "react";
import { Header } from "../Header";
import { SidebarItem } from "../SidebarItem";
import { useFormPage } from "../../context/FormContext"

type Props = {
  children: ReactNode
};

export const ThemeB1 = ({ children }: Props) => {
  const { state } = useFormPage();

  const routerActivate = {
    routeFormStepB1: 1,
    routeFormStepB2: 2,
  }
  return (
    <SC.Container>
      <SC.Area>
        <Header />

        <SC.Steps>
          <SC.Sidebar>

          <SidebarItem
              title="Informações Gerais"
              description="Informações do responsável por responder este questionário"
              path="/:id/formstepB1"
              active={state.currentStep === routerActivate.routeFormStepB1}
            />

            <SidebarItem
              title="Municipíos Desistentes"
              description="Municipíos que deixaram de participar do PCF"
              path="/:id/formstepB2"
              active={state.currentStep === routerActivate.routeFormStepB2}
            />

          </SC.Sidebar>
          <SC.Page>
            {children}
          </SC.Page>
        </SC.Steps>
      </SC.Area>
    </SC.Container>
  )
}