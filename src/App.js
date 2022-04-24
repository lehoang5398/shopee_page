import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HOME_PAGE, LOGIN_PAGE } from './configs';
import HomePage from './container/HomePage';
import LoginPage from './container/LoginPage';

function App() {
  const account_current = JSON.parse(localStorage.getItem('USER'))
    ? JSON.parse(localStorage.getItem('USER'))
    : {};
  console.log(account_current);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path={LOGIN_PAGE} element={<LoginPage />} />
          <Route path={HOME_PAGE} element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
