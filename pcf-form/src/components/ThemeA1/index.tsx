import * as SC from "./styles";
import { ReactNode } from "react";
import { Header } from "../Header";
import { SidebarItem } from "../SidebarItem";
import { useFormPage } from "../../context/FormContext"

type Props = {
  children: ReactNode
}

export const ThemeA1 = ({ children }: Props) => {
  const { state } = useFormPage();

  const routerActivate = {
    routeFormStepA1: 1,
    routeFormStepA2: 2,
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
              path="/:id/formstepA1"
              active={state.currentStep === routerActivate.routeFormStepA1}
            />

            <SidebarItem
              title="Municípios elegíveis"
              description="Elegíveis mas não adeptos"
              path="/:id/formstepA2"
              active={state.currentStep === routerActivate.routeFormStepA2}
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