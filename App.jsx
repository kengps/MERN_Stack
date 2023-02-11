import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
////import {BrowserRouter} from 'react-router-dom'

function App() {
  return(
  <BrowserRouter basename="mms-fontend/">
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/updateProfile' element={<UpdateProfilePage/>}/>
     
    </Routes>
  </BrowserRouter>
  )
  }
export default App;
