import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ADD_COMMENT,
  CREATE_POST,
  DELETE_POST,
  FETCH_POSTS_BY_USER,
  LOAD_POSTS,
  SINGLE_POST,
} from "../../services/url";
const initialState = {
  status: "idle",
  error: null,
  posts: null,
  username: null,
  name: null,
  postComments: [],
  singlePostStatus: "idle",
  postData: null,
  singleUserPosts: null,
  singleUserPostsStatus: "idle",
};
export const loadPosts = createAsyncThunk("user/posts", async (thunkAPI) => {
  try {
    const response = await axios.post(LOAD_POSTS);
    return response.data;
  } catch (error) {
    console.log("error of posts is caught");
    return thunkAPI.rejectWithValue(error.response);
  }
});
export const addComment = createAsyncThunk(
  "post/comments",
  async ({ content, postId }, thunkAPI) => {
    try {
      const response = await axios.post(ADD_COMMENT, { content, postId });
      if (response.data.status) {
        return { comments: response.data.comments, postId };
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
      const response = await axios.post(SINGLE_POST, { postId });
      if (response.data.status) {
        return {
          user: response.data.post.author,
          post: response.data.post,
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
      const response = await axios.post(FETCH_POSTS_BY_USER, { getUserId });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const addPost = createAsyncThunk(
  "/post/add",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await axios.post(CREATE_POST, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const deletePost = createAsyncThunk(
  "/post/delete",
  async ({ postId }, thunkAPI) => {
    try {
      const response = await axios.post(DELETE_POST, { postId });
      return { data: response.data, postId };
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
            post?.likedBy.push(localStorage.getItem("userId"));
            post = { ...post, liked: true };
          }
        }
      } else if (type === "likeRemoved") {
        const { postId } = action.payload;
        let post = state?.posts?.find((post) => post._id === postId);
        if (post) {
          post.likedBy = post.likedBy.filter((authorId) => {
            return authorId !== localStorage.getItem("userId");
          });
          post.liked = false;
        }

        if (state.postData) {
          const { post } = state.postData;
          if (post._id === postId) {
            post.likedBy = post.likedBy.filter((authorId) => {
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
              return authorId !== localStorage.getItem("userId");
            });
            post.liked = false;
          }
        }
      } else if (type === "refreshComments") {
        const { postId, comments } = action.payload;
        let post = state?.posts?.find((post) => post._id === postId);
        if (post) {
          post.comments = comments;
        }
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
      state.posts = null;
    },
    resetPosts: (state) => {
      state = initialState;
    },
    setSingleUserPosts: (state, action) => {
      state.singleUserPosts = action.payload.fethchedUserProfilePosts;
      state.singleUserPostsStatus = "success";
    },
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
    },
    [loadPosts.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
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
    [addPost.fulfilled]: (state, action) => {
      state.posts = [...state.posts, action.payload.savedPost];
    },
    [deletePost.fulfilled]: (state, action) => {
      const { data, postId } = action.payload;
      const { status } = data;
      if (status) {
        const filteredPosts = state.posts.filter((post) => post._id !== postId);
        state.posts = filteredPosts;
      }
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
  resetPosts,
} = postSlice.actions;
export default postSlice.reducer;
