import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormStep1 } from "./pages/FormStep1";
import { FormStep2 } from "./pages/FormStep2";
import { FormStep3 } from "./pages/FormStep3";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormStep1 />} />
        <Route path="/formstep2" element={<FormStep2 />} />
        <Route path="/formstep3" element={<FormStep3 />} />
      </Routes>
    </BrowserRouter>
  )
}