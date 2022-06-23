import { ReactNode } from "react";
import * as C from "./styles";
import { Header } from "../Header";
import { SidebarItem } from "../SidebarItem";
import { useFormPage } from "../../context/FormContext"


type Props = {
  children: ReactNode
}

export const Theme = ({ children }: Props) => {
  const { state } = useFormPage();

  return (
    <C.Container>
      <C.Area>
        <Header />

        <C.Steps>
          <C.Sidebar>
            <SidebarItem
              title="Informações gerais"
              description="Identificação"
              path="/"
              active={state.currentStep === 1}
            />

            <SidebarItem
              title="Características do PCF"
              description="Características"
              path="/formstep2"
              active={state.currentStep === 2}
            />

            <SidebarItem
              title="Gestão do PCF"
              description="Gestão e Comitê"
              path="/formstep3"
              active={state.currentStep === 3}
            />

            <SidebarItem
              title="Público atendido pelo PCF em seu município"
              description="Perfil das famílias atendidas"
              path="/formstep4"
              active={state.currentStep === 4}
            />

            <SidebarItem
              title="Equipe do PCF - 1"
              description="Informações sobre os atores/ participantes da equipe do PCF"
              path="/formstep5"
              active={state.currentStep === 5}
            />

            <SidebarItem
              title="Equipe do PCF - 2"
              description="Informações sobre os atores/ participantes da equipe do PCF"
              path="/formstep6"
              active={state.currentStep === 6}
            />

            <SidebarItem
              title="Organizações parceiras"
              description="Informações sobre organizações parceira do PCF"
              path="/formstep7"
              active={state.currentStep === 7}
            />

          </C.Sidebar>
          <C.Page>
            {children}
          </C.Page>
        </C.Steps>
      </C.Area>
    </C.Container>
  )
}