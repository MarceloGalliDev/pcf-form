import * as SC from "./styles";
import { ReactNode } from "react";
import { Header } from "../Header";
import { SidebarItem } from "../SidebarItem";
import { useFormPage } from "../../context/FormContext"
import { useParams } from "react-router";

type Props = {
  children: ReactNode
};

type RoomParams = {
  id: string;
};

export const ThemeA1 = ({ children }: Props) => {
  const { state } = useFormPage();
  const params = useParams<RoomParams>();
  const roomId = params.id;

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
              path={`/${roomId}/formstepA1`}
              active={state.currentStep === routerActivate.routeFormStepA1}
            />

            <SidebarItem
              title="Municípios elegíveis"
              description="Elegíveis mas não adeptos"
              path={`/${roomId}/formstepA2`}
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