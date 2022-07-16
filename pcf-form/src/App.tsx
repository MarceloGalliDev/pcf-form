import React from 'react';
import { FormProvider } from './context/FormContext';
import { Router } from "./router";


const App = () => {
  return (
    <React.StrictMode>
      <FormProvider>
        <Router/>
      </FormProvider>
    </React.StrictMode>
  )
}

export default App;

//BrowserRouter - container geral, tudo que estiver aqui dentro pode usar as routes
//Todo meu ambiente esta em torno do meu provider