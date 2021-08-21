import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Homepage } from "./common/pages/homepage/homepage";
import { Landing } from "./common/pages/landing/landing";
import { Navbar } from "./common/pages/navbar/navbar";
import { SinglePost } from "./features/posts/singlePost";
import { Login } from "./features/users/login";
import { Signup } from "./features/users/signup";
import {
  setupAuthExceptionHandler,
  setUpAuthHeaderForServiceCalls,
} from "./services/users/users";
import { ProgressBar } from "../src/common/components/Loaders/Progress";
import { getUserProfile, removeToken } from "./features/users/userSlice";
import { Profile } from "./features/users/Profile";
import { loadPosts } from "./features/posts/postSlice";
import { Search } from "./features/users/searchUser";
function App() {
  const { authorized } = useSelector((state) => state.users);
  const { progressBarStatus } = useSelector((state) => state.posts);
  const { profile } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function PrivateRoute(props) {
    if (authorized) {
      return <Route {...props} />;
    } else {
      return <Route element={<Login />} {...props} />;
    }
  }
  function Redirector(props) {
    if (authorized) {
      return <Route element={<Homepage />} {...props} />;
    } else {
      return <Route {...props} />;
    }
  }
  useEffect(() => {
    console.log("do i always run");
    setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
    setupAuthExceptionHandler(dispatch, removeToken, navigate);
  }, [dispatch, navigate]);
  useEffect(() => {
    if (authorized || profile === null) {
      dispatch(loadPosts());
      console.log("in pursuit of data ");
      dispatch(getUserProfile());
    }
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
          <PrivateRoute path="/profile" element={<Profile />} />
          <PrivateRoute path="/search" element={<Search />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
