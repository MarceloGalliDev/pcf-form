import { RoomCode } from "../RoomCode";
import * as SC from "./styles";

export const Header = () => {
  return (
    <SC.Container>
      <div>
        <h1>Programa Criança Feliz</h1>
        <p>Questionário para levantamento de custos das visitas do Programa Criança Feliz (PCF), a ser aplicado junto aos responsáveis pelo programa nos municípios.</p>
      </div>
      <div><RoomCode/></div>
    </SC.Container>
  )
};