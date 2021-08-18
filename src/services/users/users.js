import axios from "axios";
import { BASE_URL } from "../url";

export async function UserSignIn(userInfo) {
  try {
    const response = await axios.post(BASE_URL + "user/signin", userInfo);
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log("errror occured while signining in ", error?.message);
  }
}

export async function UserSignUp({ name, username, password, email }) {
  try {
    const userDetails = { userDetails: { name, username, password, email } };
    console.log({ userDetails });
    const response = await axios.post(BASE_URL + "user/signup", userDetails);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("errror occured while signining in ", error?.message);
  }
}

export function setUpAuthHeaderForServiceCalls(token) {
  if (token) {
    console.log("token attached");
    return (axios.defaults.headers.common["Authorization"] = token);
  } else {
    console.log("token was not recieved");
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function setupAuthExceptionHandler(dispatch, removeToken, navigate) {
  console.log("exception handler");
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        console.log("unauth in auth");
        localStorage.clear();
        dispatch(removeToken());
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
}

export async function FetchProfile() {
  const response = await axios.post(BASE_URL + "user");
  console.log({ response });
  return response.data;
}
