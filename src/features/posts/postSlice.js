import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchAllPosts } from "../../services/posts/posts";
const initialState = {
  status: "idle",
  error: null,
  posts: [],
};
export const loadPosts = createAsyncThunk("user/posts", async () => {
  const response = await FetchAllPosts();
  console.log("response in thunk ", { response });
  return response.ourUser.posts;
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
      state.posts = action.payload;
      state.status = "success";
    },
    [loadPosts.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default postSlice.reducer;
