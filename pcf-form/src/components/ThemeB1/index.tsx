import * as SC from "./styles";
import { ReactNode } from "react";
import { Header } from "../Header";
import { SidebarItem } from "../SidebarItem";
import { useFormPage } from "../../context/FormContext"

type Props = {
  children: ReactNode
}

export const ThemeB1 = ({ children }: Props) => {
  const { state } = useFormPage();

  const routerActivate = {
    routeDefault: 1,
  }
  return (
    <SC.Container>
      <SC.Area>
        <Header />

        <SC.Steps>
          <SC.Sidebar>

            <SidebarItem
              title="Municipíos Desistentes"
              description="Municipíos que deixaram de participar do PCF"
              path="/:id/formstepB1"
              active={state.currentStep === routerActivate.routeDefault}
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