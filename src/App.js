import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HOME_PAGE, LOGIN_PAGE } from './configs';
import HomePage from './container/HomePage';
import LoginPage from './container/LoginPage';
import history from './utils/history';
import ProtectedRoute from './configs/ProtedRouter';

function App() {
  const isCheckPage = localStorage.getItem('USER') ? JSON.parse(localStorage.getItem('USER')) : {};
  console.log(isCheckPage);
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={LOGIN_PAGE} element={<LoginPage />} />
          <Route path = {HOME_PAGE} element= {<HomePage/>}/>
          {/* <Route path={HOME_PAGE} element={<ProtectedRoute checkPage={isCheckPage} >
            <HomePage/>
          </ProtectedRoute>} /> */}
          {/* {Object.keys(checkPage)?.length > 0 ? (
             <Route path={LOGIN_PAGE} element={<LoginPage />} />
          ) : (
            <Route path={HOME_PAGE} element={<HomePage />} />
           
          )} */}
        </Routes>
    </Suspense>
  );
}

export default App;
