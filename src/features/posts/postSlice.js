import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddComment,
  FetchAllPosts,
  FetchPostsByUser,
  GetPost,
} from "../../services/posts/posts";
const initialState = {
  status: "idle",
  error: null,
  posts: [],
  username: null,
  name: null,
  postComments: [],
  singlePostStatus: "idle",
  postData: null,
  singleUserPosts: null,
  singleUserPostsStatus: "idle",
};
export const loadPosts = createAsyncThunk("user/posts", async () => {
  const response = await FetchAllPosts();
  if (response.status === 401) {
    console.log("unauthorixed access in thunk");
    return true;
  }
  console.log("response in thunk ", { response });
  return response;
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
export const fetchPostsByUser = createAsyncThunk(
  "/posts/fetchpostsbyuser",
  async ({ getUserId }, thunkAPI) => {
    try {
      console.log(getUserId);
      const response = await FetchPostsByUser(getUserId);
      console.log({ response }, "d=singleUserPosts");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
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
        if (post) {
          post?.likedBy.push(localStorage.getItem("userId"));
          post.liked = true;
        }
        if (state.postData) {
          const { post } = state.postData;
          if (post._id === postId) {
            post?.likedBy.push(localStorage.getItem("userId"));
            post.liked = true;
          }
        }
        if (state.singleUserPosts) {
          let post = state?.singleUserPosts?.find(
            (post) => post._id === postId
          );
          if (post) {
            console.log("post located ", post._id);
            post?.likedBy.push(localStorage.getItem("userId"));
            post = { ...post, liked: true };
          }
        }
      } else if (type === "likeRemoved") {
        const { postId } = action.payload;
        let post = state?.posts?.find((post) => post._id === postId);
        if (post) {
          post.likedBy = post.likedBy.filter((authorId) => {
            console.log(JSON.parse(JSON.stringify({ authorId })));
            return authorId !== localStorage.getItem("userId");
          });
          post.liked = false;
        }

        if (state.postData) {
          const { post } = state.postData;
          if (post._id === postId) {
            post.likedBy = post.likedBy.filter((authorId) => {
              console.log(JSON.parse(JSON.stringify({ authorId })));
              return authorId !== localStorage.getItem("userId");
            });
            post.liked = false;
          }
        }
        if (state.singleUserPosts) {
          let post = state?.singleUserPosts?.find(
            (post) => post._id === postId
          );
          if (post) {
            post.likedBy = post.likedBy.filter((authorId) => {
              console.log(JSON.parse(JSON.stringify({ authorId })));
              return authorId !== localStorage.getItem("userId");
            });
            post.liked = false;
          }
        }
      } else if (type === "refreshComments") {
        const { postId, comments } = action.payload;
        let post = state?.allPosts?.find((post) => post._id === postId);
        post.comments = comments;
        if (state.postData) {
          const { post } = state.postData;
          if (post._id === postId) {
            post.comments = comments;
          }
        }
        if (state.singleUserPosts) {
          let post = state?.singleUserPosts?.find(
            (post) => post._id === postId
          );
          if (post) {
            post.comments = comments;
          }
        }
      }
    },
    refreshUserPosts: (state) => {
      state.status = "idle";
      state.posts = null;
    },
    setSingleUserPosts: (state, action) => {
      state.singleUserPosts = action.payload.fethchedUserProfilePosts;
      state.singleUserPostsStatus = "success";
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
      const { finalUserPosts, username, name } = action.payload.userData;
      const { allPosts } = action.payload;

      state.posts = finalUserPosts;
      state.status = "success";
      state.username = username;
      state.name = name;
      state.allPosts = allPosts;
      // state
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
    [fetchPostsByUser.fulfilled]: (state, action) => {
      state.singleUserPosts = action.payload.posts;
      state.singleUserPostsStatus = "success";
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
  setSingleUserPosts,
} = postSlice.actions;
export default postSlice.reducer;
