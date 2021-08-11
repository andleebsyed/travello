import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import "./App.css";
import { Homepage } from "./common/pages/homepage/homepage";
import { Landing } from "./common/pages/landing/landing";
import { Navbar } from "./common/pages/navbar/navbar";
import { Login } from "./features/users/login/login";
import { Signup } from "./features/users/signup/signup";
import { setUpAuthHeaderForServiceCalls } from "./services/users/users";
function App() {
  useEffect(() => {
    console.log("mainpage useeffect ran");
    setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
  }, []);
  return (
    <div className=" ">
      {/* <div className=""> */}

      {/* </div> */}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
      {/* <div></div> */}
    </div>
  );
}

export default App;
