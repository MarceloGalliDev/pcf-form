import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import TasksHome from './pages/TasksHome'
import Tasks from './pages/Tasks'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/:id/formstep6/tarefas1" element={<TasksHome/>} />
      <Route path="/:id/formstep6/tarefas2" element={<Tasks/>} />
    </BrowserRouter>
  )
}

export default Routes;