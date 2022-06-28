import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { FormStep1 } from "./pages/FormStep1";
import { FormStep2 } from "./pages/FormStep2";
import { FormStep3 } from "./pages/FormStep3";
import { FormStep4 } from "./pages/FormStep4";
import { FormStep5 } from "./pages/FormStep5";
import { FormStep6 } from "./pages/FormStep6";
import { FormStep7 } from "./pages/FormStep7";
import { FormStep8 } from "./pages/FormStep8";
import { FormStep9 } from "./pages/FormStep9";
import { FormStep10 } from "./pages/FormStep10";



export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/formstep1" element={<FormStep1 />} />
        <Route path="/formstep2" element={<FormStep2 />} />
        <Route path="/formstep3" element={<FormStep3 />} />
        <Route path="/formstep4" element={<FormStep4 />} />
        <Route path="/formstep5" element={<FormStep5 />} />
        <Route path="/formstep6" element={<FormStep6 />} />
        <Route path="/formstep7" element={<FormStep7 />} />
        <Route path="/formstep8" element={<FormStep8 />} />
        <Route path="/formstep9" element={<FormStep9 />} />
        <Route path="/formstep10" element={<FormStep10 />} />
      </Routes>
    </BrowserRouter>
  )
}