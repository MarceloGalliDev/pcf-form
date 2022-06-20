import { BrowserRouter, Routes, Route } from "react-router-dom";
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