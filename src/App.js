import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./common/pages/homepage/homepage";
import { Landing } from "./common/pages/landing/landing";
import { Login } from "./features/users/login/login";
import { Signup } from "./features/users/signup/signup";
import { setUpAuthHeaderForServiceCalls } from "./services/users/users";
function App() {
  const { authorized } = useSelector((state) => state.users);
  function PrivateRoute(props) {
    if (authorized) {
      return <Route {...props} />;
    } else {
      return <Route element={<Login />} {...props} />;
    }
  }
  useEffect(() => {
    console.log("mainpage useeffect ran");
    setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
  }, []);
  return (
    <div className=" ">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute path="/home" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
