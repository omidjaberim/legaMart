import React , {useState} from "react";
import "./App.css";
import {
BrowserRouter
} from "react-router-dom"

import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from 'contexts/userContext';
import Routes from "routes";

const App = ()=>{

  return (
    <UserProvider >
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </UserProvider>
    )
}

export default App;
