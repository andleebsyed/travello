import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchAllPosts } from "../../services/posts/posts";
const initialState = {
  status: "idle",
  error: null,
  posts: [],
  username: null,
  name: null,
};
export const loadPosts = createAsyncThunk("user/posts", async () => {
  const response = await FetchAllPosts();
  if (response.status === 401) {
    console.log("unauthorixed access in thunk");
    return true;
  }
  console.log("response in thunk ", { response });
  return response.userData;
});
export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [loadPosts.pending]: (state) => {
      state.status = "loading";
    },
    [loadPosts.fulfilled]: (state, action) => {
      const { updatedPosts, username, name } = action.payload;

      state.posts = updatedPosts;
      state.status = "success";
      state.username = username;
      state.name = name;
    },
    [loadPosts.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default postSlice.reducer;
