import axios from "axios";
import { BASE_URL } from "../url";

export async function PostCreation(newPostContent) {
  let formData = new FormData();
  formData.append("postImage", newPostContent.image);
  formData.append("postText", newPostContent.text);
  const response = await axios.post(BASE_URL + "posts/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log({ response });
  return response.data;
}

export async function FetchAllPosts() {
  try {
    const response = await axios.post(BASE_URL + "posts/read");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error occurred while sending request to api ", error);
  }
}

export async function LikeInteraction(data) {
  const response = await axios.post(BASE_URL + "posts/likeinteraction", data);
  console.log({ response });
  return response.data;
}

export async function FetchComments({ postId }) {
  console.log("coming in api call ", postId);
  const response = await axios.post(BASE_URL + "posts/fetchcomments", {
    postId,
  });
  if (response.status === 200) {
    console.log("good response");
    console.log(response.data);
    return response.data;
  }
}

export async function AddComment({ postId, content }) {
  const response = await axios.post(BASE_URL + "posts/addcomment", {
    postId,
    content,
  });
  console.log("comment added or not ", { response });
  return response.data;
}

export async function RemoveComment({ postId, commentId }) {
  const response = await axios.post(BASE_URL + "posts/removecomment", {
    postId,
    commentId,
  });
  console.log("api response ", { response });
  return response.data;
}
