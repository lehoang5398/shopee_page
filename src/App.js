import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HOME_PAGE, LOGIN_PAGE } from './configs';
import HomePage from './container/HomePage';
import LoginPage from './container/LoginPage';

function App() {
  const account_current = JSON.parse(localStorage.getItem('USER'))
  ? JSON.parse(localStorage.getItem('USER'))
  : {};
  console.log(account_current)
  // useEffect(() => {
  //   // window.location.reload()
  //   const account_current = JSON.parse(localStorage.getItem('USER'))
  //     ? JSON.parse(localStorage.getItem('USER'))
  //     : {};
  //   console.log(account_current);
  //   if (Object.keys(account_current).length === 0) {
  //     console.log('ban chua dang nhap');
  //   } else {
  //     console.log('ban da dang nhap');
  //   }
  // }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={LOGIN_PAGE} element={<LoginPage />} />
        <Route path={HOME_PAGE} element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
