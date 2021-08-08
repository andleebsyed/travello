import axios from "axios";
import { BASE_URL } from "../url";

export async function PostCreation(newPostContent) {
  let formData = new FormData();
  formData.append("postImage", newPostContent.image);
  formData.append("postText", newPostContent.text);
  console.log({ newPostContent });
  const response = await axios.post(BASE_URL + "posts/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log({ response });
}
