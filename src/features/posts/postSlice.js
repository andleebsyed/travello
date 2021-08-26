import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddComment, FetchAllPosts, GetPost } from "../../services/posts/posts";
const initialState = {
  status: "idle",
  error: null,
  posts: [],
  username: null,
  name: null,
  postComments: [],
  singlePostStatus: "idle",
  postData: null,
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
export const addComment = createAsyncThunk(
  "post/comments",
  async ({ content, postId }, thunkAPI) => {
    try {
      const response = await AddComment({
        content,
        postId,
      });
      if (response.status) {
        return { comments: response.comments, postId };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const fetchSinglePost = createAsyncThunk(
  "posts/post",
  async ({ postId }, thunkAPI) => {
    try {
      const response = await GetPost({
        postId,
      });
      if (response.status) {
        return {
          user: response.post.author,
          post: response.post,
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
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
        // if (type === "likeAdded") {
        const post = state?.posts?.find((post) => post._id === postId);
        post?.likedBy.push(localStorage.getItem("userId"));
        post.liked = true;
        // }
        if (state.postData) {
          const { post } = state.postData;
          post?.likedBy.push(localStorage.getItem("userId"));
          post.liked = true;
        }
      } else if (type === "likeRemoved") {
        const { postId } = action.payload;
        let postFromPosts = state?.posts?.find((post) => post._id === postId);
        postFromPosts.likedBy = postFromPosts.likedBy.filter((authorId) => {
          console.log(JSON.parse(JSON.stringify({ authorId })));
          return authorId !== localStorage.getItem("userId");
        });
        postFromPosts.liked = false;
        if (state.postData) {
          const { post } = state.postData;
          post.likedBy = post.likedBy.filter((authorId) => {
            console.log(JSON.parse(JSON.stringify({ authorId })));
            return authorId !== localStorage.getItem("userId");
          });
          post.liked = false;
        }
      } else if (type === "refreshComments") {
        const { postId, comments } = action.payload;
        let post = state?.posts?.find((post) => post._id === postId);
        post.comments = comments;
        if (state.postData) {
          const { post } = state.postData;
          post.comments = comments;
        }
      }
    },
    refreshUserPosts: (state) => {
      state.status = "idle";
      state.posts = null;
    },
    // singlePostFetched: (state) => {
    //   console.log(JSON.parse(JSON.stringify("status set")));
    //   state.singlePostStatus = "success";
    //   state.singlePost =
    // },
    // startSpinner: (state) => {
    //   state.spinnerStatus = true;
    // },
    // stopSpinner: (state) => {
    //   state.spinnerStatus = false;
    // },
    // startProgressBar: (state) => {
    //   state.progressBarStatus = true;
    // },
    // stopProgressBar: (state) => {
    //   state.progressBarStatus = false;
    // },
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
    [addComment.fulfilled]: (state, action) => {
      const { comments, postId } = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      post.comments = comments;
    },
    [fetchSinglePost.fulfilled]: (state, action) => {
      state.postData = action.payload;
      state.singlePostStatus = "success";
    },
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
  singlePostFetched,
} = postSlice.actions;
export default postSlice.reducer;
