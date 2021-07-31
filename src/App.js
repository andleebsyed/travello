import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import {Landing} from './common/pages/landing/landing'
import { Login } from './features/users/login/login';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes> 
    </div>
    

  );
}

export default App;
