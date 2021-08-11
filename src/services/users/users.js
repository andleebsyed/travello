import axios from "axios";
import { BASE_URL } from "../url";

export async function UserSignIn(userInfo) {
  try {
    const response = await axios.post(BASE_URL + "users/signin", userInfo);
    if (response.status === 200) {
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
    const response = await axios.post(BASE_URL + "users/signup", userDetails);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("errror occured while signining in ", error?.message);
  }
}

export function setUpAuthHeaderForServiceCalls(token) {
  console.log("function called");
  if (token) {
    console.log("token attached");
    return (axios.defaults.headers.common["Authorization"] = token);
  } else {
    console.log("token was not recieved");
    delete axios.defaults.headers.common["Authorization"];
  }
}
