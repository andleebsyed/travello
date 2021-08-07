import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Homepage } from "./common/pages/homepage/homepage";
import { Landing } from "./common/pages/landing/landing";
import { Login } from "./features/users/login/login";
import { Signup } from "./features/users/signup/signup";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
