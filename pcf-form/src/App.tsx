import React from 'react';
import { FormProvider } from './context/FormContext';
import { JoinProvider } from './context/joinContext';
import { Router } from "./router";


const App = () => {
  return (
    <React.StrictMode>
      <FormProvider>
        <JoinProvider>
          <Router/>
        </JoinProvider>
      </FormProvider>
    </React.StrictMode>
  )
}

export default App;

//BrowserRouter - container geral, tudo que estiver aqui dentro pode usar as routes
//Todo meu ambiente esta em torno do meu provider