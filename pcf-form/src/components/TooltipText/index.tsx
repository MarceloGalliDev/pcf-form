import { Info } from "phosphor-react";
import * as SC from "./styles";
import Explicacao from "../../assets/Explicacao.gif"

export const TooltipText = () => {
  return (
    <SC.TooltipCard>
      <SC.TooltipText>
        <Info
          size={30}
          color="#097c16"
          weight="light"
        />
        <p>Ajuda aqui</p>
      </SC.TooltipText>
      <SC.TooltipBox>
        <img src={Explicacao} />
      </SC.TooltipBox>
    </SC.TooltipCard>
  );
}