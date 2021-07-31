import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import {Landing} from './common/pages/landing/landing'
function App() {
  return (
    <div className="bg-blue">
      <Routes>
        <Route path="/" element={<Landing />} />  
      </Routes> 
    </div>
    

  );
}

export default App;
