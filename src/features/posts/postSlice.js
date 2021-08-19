import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchAllPosts } from "../../services/posts/posts";
const initialState = {
  status: "idle",
  error: null,
  posts: [],
  username: null,
  name: null,
  spinnerStatus: false,
  progressBarStatus: false,
  postComments: [],
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
    reactionAdded: (state, action) => {
      const { type } = action.payload;
      console.log(JSON.parse(JSON.stringify({ type })));
      if (type === "likeAdded") {
        const { postId } = action.payload;
        const post = state?.posts?.find((post) => post._id === postId);
        post?.likedBy.push(localStorage.getItem("userId"));
        post.liked = true;
      } else if (type === "likeRemoved") {
        const { postId } = action.payload;
        let post = state?.posts?.find((post) => post._id === postId);
        post.likedBy = post.likedBy.filter((authorId) => {
          console.log(JSON.parse(JSON.stringify({ authorId })));
          return authorId !== localStorage.getItem("userId");
        });
        post.liked = false;
      } else if (type === "refreshComments") {
        const { postId, comments } = action.payload;
        let post = state?.posts?.find((post) => post._id === postId);
        // post.comments.push(content);
        post.comments = comments;
      }
    },
    refreshUserPosts: (state) => {
      state.status = "idle";
      state.posts = null;
    },
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
      const { finalUserPosts, username, name } = action.payload;

      state.posts = finalUserPosts;
      state.status = "success";
      state.username = username;
      state.name = name;
    },
    [loadPosts.rejected]: (state, action) => {
      action.payload === true
        ? (state.status = "401 error")
        : (state.status = "error");
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
export const {
  startProgressBar,
  stopProgressBar,
  startSpinner,
  stopSpinner,
  refreshUserPosts,
  incrementLikes,
  decrementLikes,
  reactionAdded,
} = postSlice.actions;
export default postSlice.reducer;
