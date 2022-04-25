import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HOME_PAGE, LOGIN_PAGE } from './configs';
import HomePage from './container/HomePage';
import LoginPage from './container/LoginPage';
import history from './utils/history';

function App() {
  const [checkPage, setCheckPage] = useState({});
  console.log(checkPage);
  useEffect(() => {
    if(JSON.parse(localStorage.getItem('USER')) != null){
      history.push('/search-products')
    }
  },[JSON.parse(localStorage.getItem('USER'))]); 
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={LOGIN_PAGE} element={<LoginPage />} />
          <Route path={HOME_PAGE} element={<HomePage />} />
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
