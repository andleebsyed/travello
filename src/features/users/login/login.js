import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setUpAuthHeaderForServiceCalls,
  UserSignIn,
} from "../../../services/users/users";
import { startProgressBar, stopProgressBar } from "../../posts/postSlice";
import { setToken } from "../userSlice";
import { ProgressBar } from "../../../common/components/Loaders/Progress";
export function Login() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState({ message: "", status: "hidden" });
  const [buttonText, setButtonText] = useState("Login");
  const dispatch = useDispatch();
  const { progressBarStatus } = useSelector((state) => state.posts);
  // const { startProgressBar, stopProgressBar } = useSelector(state => state.posts)
  async function LoginHandler(e) {
    e.preventDefault();

    dispatch(startProgressBar());
    setButtonText("Logging you in...");
    const response = await UserSignIn(userDetails);
    dispatch(stopProgressBar());
    setButtonText("Login");
    if (response.status && response.allowUser) {
      console.log("coming here");
      setUpAuthHeaderForServiceCalls(response.token);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      dispatch(setToken());

      navigate("/home", { replace: true });
    }
    if (!response.allowUser) {
      setError({
        ...error,
        message: "username/password incorrect",
        status: "block",
      });
    }
  }
  return (
    <div className="flex-col">
      {progressBarStatus && <ProgressBar />}
      <div className="flex-col">
        <div className=" flex justify-center ">
          <main className="flex flex-col p-4 justify-between  mt-4 flex-1 max-w-sm ">
            <h1 className="font-extrabold text-2xl text-white">
              Login to Travello
            </h1>
            <form
              className="flex flex-col justify-between  text-blue-light h-80  "
              onSubmit={LoginHandler}
            >
              <div className="flex flex-col mt-4">
                <p className={`${error.status}`}>{error.message}</p>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="input-box"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, username: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="input-box"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                />
              </div>

              <input
                type="submit"
                value={`${buttonText}`}
                className=" btn-primary text-white font-bold "
              />
            </form>
            <section className="flex text-blue-light justify-center mt-4">
              <Link to="#">
                <button>Forgot Password?</button>
              </Link>

              <span className="pl-1 pr-1">.</span>
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
