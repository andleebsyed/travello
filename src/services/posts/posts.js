import axios from "axios";
import { BASE_URL } from "../url";

export async function PostCreation(newPostContent) {
  try {
    let formData = new FormData();
    formData.append("postImage", newPostContent.image);
    formData.append("postText", newPostContent.text);
    const response = await axios.post(BASE_URL + "/posts/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Couldn't create post ", error);
    return error.response.data;
  }
}

export async function FetchAllPosts() {
  try {
    const response = await axios.post(BASE_URL + "/posts/read");
    return response.data;
  } catch (error) {
    console.error("Error occurred while sending request to api ", error);
    return error.response.data;
  }
}

export async function LikeInteraction(data) {
  try {
    const response = await axios.post(
      BASE_URL + "/posts/likeinteraction",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Like interaction failed ", error);
    return error.response.data;
  }
}

export async function FetchComments({ postId }) {
  try {
    const response = await axios.post(BASE_URL + "/posts/fetchcomments", {
      postId,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch comments ", error?.message);
    return error.response.data;
  }
}

export async function AddComment({ postId, content }) {
  try {
    const response = await axios.post(BASE_URL + "/posts/addcomment", {
      postId,
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred while adding comment ", error?.message);
    return error.response.data;
  }
}

export async function RemoveComment({ postId, commentId }) {
  try {
    const response = await axios.post(BASE_URL + "/posts/removecomment", {
      postId,
      commentId,
    });
    return response.data;
  } catch (error) {
    console.error("Couldn't remove comment from post ", error);
    return error.response.data;
  }
}

export async function GetPost({ postId }) {
  try {
    const response = await axios.post(BASE_URL + "/posts/getpost", { postId });
    return response.data;
  } catch (error) {
    console.error("couldn't fetch post", error?.message);
  }
}

export async function FetchPostsByUser(getUserId) {
  try {
    const response = await axios.post(BASE_URL + "/posts/fetchpostsbyuser", {
      getUserId,
    });

    return response.data;
  } catch (error) {
    console.error("couldn't fetch posts of user", error?.message);
    return error.response.data;
  }
}
