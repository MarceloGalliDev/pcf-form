import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes'

function TableTasks() {
  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  )
};

export default TableTasks;