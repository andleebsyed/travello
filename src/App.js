import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./common/pages/homepage/homepage";
import { Landing } from "./common/pages/landing/landing";
import { Navbar } from "./common/pages/navbar/navbar";
import { SinglePost } from "./features/posts/singlePost";
import { Login } from "./features/users/login/login";
import { Signup } from "./features/users/signup/signup";
import { setUpAuthHeaderForServiceCalls } from "./services/users/users";
import { ProgressBar } from "../src/common/components/Loaders/Progress";
function App() {
  const { authorized } = useSelector((state) => state.users);
  const { progressBarStatus } = useSelector((state) => state.posts);
  function PrivateRoute(props) {
    if (authorized) {
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
    setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
  }, []);
  return (
    <>
      <div className={authorized ? "flex min-h-screen" : "min-h-screen"}>
        {authorized && <Navbar />}
        {progressBarStatus && <ProgressBar />}

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
          <PrivateRoute path="/post/:postId" element={<SinglePost />} />
        </Routes>
      </div>
      {/* <footer className="h-16"></footer> */}
      {/* <ProgressBar /> */}
    </>
  );
}

export default App;
