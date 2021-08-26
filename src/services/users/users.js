import axios from "axios";
import { BASE_URL } from "../url";

export async function UserSignIn(userInfo) {
  try {
    const response = await axios.post(BASE_URL + "user/signin", userInfo);
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
  try {
    const response = await axios.post(BASE_URL + "user");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch user profile ", error?.message);
  }
}

export async function UpdateUser({ avatar, coverPic, bio, name }) {
  try {
    let formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("coverPic", coverPic);
    formData.append("bio", bio);
    formData.append("name", name);
    console.log({ formData });
    const response = await axios.post(BASE_URL + "user/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to update the user ", error?.message);
  }
}

export async function LoadUsers() {
  try {
    const response = await axios.post(BASE_URL + "user/allusers");
    return response.data;
  } catch (error) {
    console.log(
      "error occurred while fetching users from server ",
      error?.message
    );
    return error.response;
  }
}

export async function GetUser({ getUserId }) {
  try {
    const response = await axios.post(BASE_URL + "user/getuser", { getUserId });
    return response.data;
  } catch (error) {
    console.log("failed to fetch the user ", error?.message);
  }
}

export async function FollowNewUser(newUserId) {
  try {
    const response = await axios.post(BASE_URL + "user/follow", newUserId);
    return response.data;
  } catch (error) {
    console.log("following user failed ", error?.message);
  }
}
export async function UnFollowUser(userToUnfollowId) {
  try {
    const response = await axios.post(
      BASE_URL + "user/unfollow",
      userToUnfollowId
    );
    return response.data;
  } catch (error) {
    console.log("unfollowing user failed ", error?.message);
  }
}
