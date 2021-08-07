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

export async function UserSignUp({ username, password, email }) {
  try {
    const userDetails = { userDetails: { username, password, email } };
    const response = await axios.post(BASE_URL + "users/signup", userDetails);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("errror occured while signining in ", error?.message);
  }
}
