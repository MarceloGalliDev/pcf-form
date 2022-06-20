import { ReactNode } from "react";
import * as C from "./styles";
import { Header } from "../Header";
import { SidebarItem } from "../SidebarItem";

type Props = {
  children: ReactNode
}

export const Theme = ({children}: Props) => {
  return (
    <C.Container>
      <C.Area>
        <Header />

        <C.Steps>
          <C.Sidebar>
            <SidebarItem
              title="Pessoal"
              description="Se identifique"
              icon="profile"
              path="/"
            />

            <SidebarItem
              title="Profissional"
              description="Seu nível"
              icon="book"
              path="/formstep2"
            />

            <SidebarItem
              title="Contatos"
              description="Como te achar"
              icon="mail"
              path="/formstep3"
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