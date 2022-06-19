import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormStep1 } from "./pages/FormStep1";
import { FormStep2 } from "./pages/FormStep2";
import { FormStep3 } from "./pages/FormStep3";
import { FormProvider } from './context/FormContext';
import { Router } from "./router";


const App = () => {
  return (
    <FormProvider>
      <Router/>
    </FormProvider>
  )
}

export default App;

//BrowserRouter - container geral, tudo que estiver aqui dentro pode usar as routes
//Todo meu ambiente esta em torno do meu provider