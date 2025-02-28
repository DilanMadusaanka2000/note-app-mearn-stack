

import React from 'react'
import Signup from './pages/signup/Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import {ToastContainer} from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<Home />}></Route>
       <Route path='/register' element={<Signup />}></Route>
       <Route path='/login' element={<Login />}></Route>
     </Routes>

     
     <ToastContainer />
     

    </BrowserRouter>
  )
}

export default App