import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './container/HomePage';

function App() {
  return (
    <div className="row">
      <div className="col-sm-12">
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Routes>
              <Route path="/search-products" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
