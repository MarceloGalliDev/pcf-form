import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormStep1 } from "./pages/FormStep1";
import { FormStep2 } from "./pages/FormStep2";
import { Home } from "./pages/Home";


function App() {
  return (
    <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forms/step1" element={<FormStep1 />} />
          <Route path="/forms/step2" element={<FormStep2 />} />
        </Routes>

    </BrowserRouter>
  )
}
export default App;
