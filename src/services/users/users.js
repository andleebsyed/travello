import axios from "axios";
import { refreshUserPosts } from "../../features/posts/postSlice";
import { BASE_URL } from "../url";

export async function UserSignIn(userInfo) {
  try {
    const response = await axios.post(BASE_URL + "/user/signin", userInfo);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("errror occured while signining in ", error?.message);
    return error.response.data;
  }
}

export async function UserSignUp({ name, username, password, email }) {
  try {
    const userDetails = { userDetails: { name, username, password, email } };
    const response = await axios.post(BASE_URL + "/user/signup", userDetails);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("errror occured while signining in ", error?.message);
    return error.response.data;
  }
}

export function setUpAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function setupAuthExceptionHandler(dispatch, removeToken, navigate) {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        localStorage.clear();
        dispatch(removeToken());
        dispatch(refreshUserPosts());
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
}

export async function FetchProfile() {
  try {
    const response = await axios.post(BASE_URL + "/user");
    console.log(response.data, " of getProfile");

    return response.data;
  } catch (error) {
    console.log("Failed to fetch user profile ", error?.message);
    return error.response.data;
  }
}

export async function UpdateUser({ avatar, coverPic, bio, name }) {
  try {
    let formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("coverPic", coverPic);
    formData.append("bio", bio);
    formData.append("name", name);
    const response = await axios.post(BASE_URL + "/user/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to update the user ", error?.message);
    return error.resposne.data;
  }
}

export async function LoadUsers() {
  try {
    const response = await axios.post(BASE_URL + "/user/allusers");
    return response.data;
  } catch (error) {
    console.log(
      "error occurred while fetching users from server ",
      error?.message
    );
    return error.response.data;
  }
}

export async function GetUser({ getUserId }) {
  try {
    const response = await axios.post(BASE_URL + "/user/getuser", {
      getUserId,
    });
    return response.data;
  } catch (error) {
    console.log("failed to fetch the user ", error?.message);
    return error.response.data;
  }
}

export async function FollowNewUser(newUserId) {
  try {
    const response = await axios.post(BASE_URL + "/user/follow", newUserId);
    return response.data;
  } catch (error) {
    console.log("following user failed ", error?.message);
    return error.response.data;
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
    return error.response.data;
  }
}

export async function GuestAccess() {
  try {
    const response = await axios.post(BASE_URL + "/user/guest");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("errror occured while signining in ", error?.message);
    return error.response.data;
  }
}
