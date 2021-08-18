import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Homepage } from "./common/pages/homepage/homepage";
import { Landing } from "./common/pages/landing/landing";
import { Navbar } from "./common/pages/navbar/navbar";
import { SinglePost } from "./features/posts/singlePost";
import { Login } from "./features/users/login/login";
import { Signup } from "./features/users/signup/signup";
import {
  setupAuthExceptionHandler,
  setUpAuthHeaderForServiceCalls,
} from "./services/users/users";
import { ProgressBar } from "../src/common/components/Loaders/Progress";
import { removeToken } from "./features/users/userSlice";
function App() {
  const { authorized } = useSelector((state) => state.users);
  const { progressBarStatus } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // dispatch(removeToken())
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
    console.log("do i always run");
    setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
    setupAuthExceptionHandler(dispatch, removeToken, navigate);
  }, [dispatch, navigate]);
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
