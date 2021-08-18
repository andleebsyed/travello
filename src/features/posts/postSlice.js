import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchAllPosts } from "../../services/posts/posts";
const initialState = {
  status: "idle",
  error: null,
  posts: null,
  username: null,
  name: null,
  spinnerStatus: false,
  progressBarStatus: false,
  // commentsData: {
  //   comments: [],
  //   postId: null,
  // },
  // commentsStatus: "idle",
  // currentCommentPost: null,
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
// export const loadComments = createAsyncThunk(
//   "post/comments",
//   async ({ postId }, thunkAPI) => {
//     try {
//       const response = await FetchComments({ postId });
//       console.log("response in thunk for comments ", response);
//       return response.commentsData;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    startSpinner: (state) => {
      state.spinnerStatus = true;
    },
    stopSpinner: (state) => {
      state.spinnerStatus = false;
    },
    startProgressBar: (state) => {
      state.progressBarStatus = true;
    },
    stopProgressBar: (state) => {
      state.progressBarStatus = false;
    },
  },
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
    // [loadComments.pending]: (state) => {
    //   state.commentsStatus = "loading";
    // },
    // [loadComments.fulfilled]: (state, action) => {
    //   const commentsData = action.payload;
    //   console.log({ commentsData }, "in reducers");
    //   const { comments, postId } = commentsData;
    //   state.commentsData.comments = comments;
    //   state.commentsData.postId = postId;
    //   state.commentsStatus = "success";
    // },
    // [loadComments.rejected]: (state, action) => {
    //   state.commentsStatus = "error";
    //   state.error = action.payload.message;
    // },
  },
});
export const { startProgressBar, stopProgressBar, startSpinner, stopSpinner } =
  postSlice.actions;
export default postSlice.reducer;
