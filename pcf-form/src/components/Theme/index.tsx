import * as SC from "./styles";
import { ReactNode } from "react";
import { Header } from "../Header";
import { SidebarItem } from "../SidebarItem";
import { useFormPage } from "../../context/FormContext"


type Props = {
  children: ReactNode
}

export const Theme = ({ children }: Props) => {
  const { state } = useFormPage();

  const routerActivate = {
    routeDefault: 1,
    routeFeatures: 2,

  }
  return (
    <SC.Container>
      <SC.Area>
        <Header />

        <SC.Steps>
          <SC.Sidebar>
            
            <SidebarItem
              title="Informações gerais"
              description="Identificação"
              path="/"
              active={state.currentStep === routerActivate.routeDefault}
            />

            <SidebarItem
              title="Características do PCF"
              description="Características"
              path="/formstep2"
              active={state.currentStep === routerActivate.routeFeatures}
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

            <SidebarItem
              title="Outros profissionais"
              description="Informações sobre outros profissionais participantes da equipe do PCF"
              path="/formstep8"
              active={state.currentStep === 8}
            />

            <SidebarItem
              title="Recursos e Custos"
              description="Recursos e custos mensais diretos do PCF no município"
              path="/formstep9"
              active={state.currentStep === 9}
            />

            <SidebarItem
              title="Outros Custos"
              description="Outros custos, com transporte, diárias e recursos materiais "
              path="/formstep10"
              active={state.currentStep === 10}
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