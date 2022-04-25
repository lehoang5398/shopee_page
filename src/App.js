import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HOME_PAGE, LOGIN_PAGE } from './configs';
import HomePage from './container/HomePage';
import LoginPage from './container/LoginPage';
import history from './utils/history';
import ProtectedRoute from './configs/ProtedRouter';

import { useNavigate } from 'react-router-dom';


const user = localStorage.getItem('USER') ? JSON.parse(localStorage.getItem('USER')) : {};



function App() {
   const [isLogin,setIsLogin] = useState(false)
  const navigate = useNavigate();
  useEffect(()=>{
    if(Object.keys(user)?.length > 0){
      navigate(HOME_PAGE)
    }
    
  },[user])
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={LOGIN_PAGE} element={<LoginPage/>}/>
          <Route path={HOME_PAGE} element={<HomePage/>}/>
        </Routes>
    </Suspense>
  );
}

export default App;
