import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./common/pages/homepage/homepage";
import { Landing } from "./common/pages/landing/landing";
import { Navbar } from "./common/pages/navbar/navbar";
import { Login } from "./features/users/login/login";
import { Signup } from "./features/users/signup/signup";
import { setUpAuthHeaderForServiceCalls } from "./services/users/users";
function App() {
  const { authorized } = useSelector((state) => state.users);
  function PrivateRoute(props) {
    if (authorized) {
      console.log("user is authenticated");
      return <Route {...props} />;
    } else {
      return <Route element={<Login />} {...props} />;
    }
  }
  function Redirector(props) {
    if (authorized) {
      console.log("go to homeoage");
      return <Route element={<Homepage />} {...props} />;
    } else {
      console.log("lets  be in logins");
      return <Route {...props} />;
    }
  }
  useEffect(() => {
    console.log("mainpage useeffect ran");
    setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
  }, []);
  return (
    <>
      <div className={authorized ? "flex" : ""}>
        {authorized && <Navbar />}
        <Routes>
          <Route path="/" element={authorized ? <Homepage /> : <Landing />} />
          <Redirector
            path="/login"
            element={authorized ? <Homepage /> : <Login />}
          />
          <Route
            path="/signup"
            element={authorized ? <Homepage /> : <Signup />}
          />
          <PrivateRoute path="/home" element={<Homepage />} />
        </Routes>
      </div>
      <footer className="h-16"></footer>
    </>
  );
}

export default App;
