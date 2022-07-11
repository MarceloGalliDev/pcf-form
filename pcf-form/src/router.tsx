import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { FormStep1 } from "./pages/Aderidos/FormStep1";
import { FormStep2 } from "./pages/Aderidos/FormStep2";
import { FormStep3 } from "./pages/Aderidos/FormStep3";
import { FormStep4 } from "./pages/Aderidos/FormStep4";
import { FormStep5 } from "./pages/Aderidos/FormStep5";
import { FormStep6 } from "./pages/Aderidos/FormStep6";
import { FormStep7 } from "./pages/Aderidos/FormStep7";
import { FormStep8 } from "./pages/Aderidos/FormStep8";
import { FormStep9 } from "./pages/Aderidos/FormStep9";
import { FormStep10 } from "./pages/Aderidos/FormStep10";
import { FormStepA1 } from "./pages/NaoAderidos/FormStepA1";
import { FormStepA2 } from "./pages/NaoAderidos/FormStepA2";
import { FormStepB1 } from "./pages/Desistentes/FormStepB1";
import { FormStepB2 } from "./pages/Desistentes/FormStepB2";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/formstep1" element={<FormStep1 />} />
        <Route path="/:id/formstep2" element={<FormStep2 />} />
        <Route path="/:id/formstep3" element={<FormStep3 />} />
        <Route path="/:id/formstep4" element={<FormStep4 />} />
        <Route path="/:id/formstep5" element={<FormStep5 />} />
        <Route path="/:id/formstep6" element={<FormStep6 />} />
        <Route path="/:id/formstep7" element={<FormStep7 />} />
        <Route path="/:id/formstep8" element={<FormStep8 />} />
        <Route path="/:id/formstep9" element={<FormStep9 />} />
        <Route path="/:id/formstep10" element={<FormStep10 />} />
        <Route path="/:id/formstepA1" element={<FormStepA1 />} />
        <Route path="/:id/formstepA2" element={<FormStepA2 />} />
        <Route path="/:id/formstepB1" element={<FormStepB1 />} />
        <Route path="/:id/formstepB2" element={<FormStepB2 />} />
      </Routes>
    </BrowserRouter>
  )
}