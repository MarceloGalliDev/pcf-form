import { useEffect } from "react";
import * as C from "./styles";

export const DropdownStateCity = () => {

  useEffect(() => { }, []);

  return (
    <C.Container>
      <div className="contentStateUf">
        <select
          className="stateUf"
          name="stateUF"
        >
          <option value="">
            Selecione o Estado
          </option>
        </select>

        <select
          className="stateUf"
          name="stateUF"
        >
          <option value="">
            Selecione o Município
          </option>
        </select>
      </div>
    </C.Container>
  )
};

