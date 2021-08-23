import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FetchProfile,
  FollowNewUser,
  GetUser,
  LoadUsers,
  UnFollowUser,
} from "../../services/users/users";
export const getUserProfile = createAsyncThunk("user", async (thunkAPI) => {
  try {
    const response = await FetchProfile();
    console.log("thunk resposne", { response });
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
});
export const loadUsers = createAsyncThunk("/users/all", async (thunkAPI) => {
  try {
    const response = await LoadUsers();
    console.log("thunk with all users ", { response });
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
});
export const getUser = createAsyncThunk(
  "/user/getuser",
  async ({ getUserId }, thunkAPI) => {
    try {
      const response = await GetUser({ getUserId });
      console.log({ response }, "user in thunk");
      return response.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const followNewUser = createAsyncThunk(
  "user/follow",
  async (newUserId, thunkAPI) => {
    try {
      console.log("step 2:: came in thunk to make api request");
      const response = await FollowNewUser(newUserId);
      console.log("step 3 :: came from api with response ", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "user/unfollow",
  async (userToUnfollowId, thunkAPI) => {
    try {
      console.log(
        "step 2:: came in thunk to make api request to unfollow user",
        userToUnfollowId
      );
      const response = await UnFollowUser(userToUnfollowId);
      console.log("after unfollow data ", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    fetchedUserProfile: null,
    fetchUserProfileStatus: "idle",
    profileStatus: "idle",
    profile: null,
    status: "idle",
    error: null,
    usersStatus: "idle",
    users: null,
    authorized: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    setToken: (state) => {
      state.authorized = true;
    },
    removeToken: (state) => {
      state.authorized = false;
      state.profileStatus = "idle";
      state.profile = null;
    },
    updateProfile: (state, action) => {
      const { profile } = action.payload;
      state.profile = profile;
    },
  },
  extraReducers: {
    [getUserProfile.pending]: (state) => {
      state.profileStatus = "pending";
    },
    [getUserProfile.fulfilled]: (state, action) => {
      const profile = action.payload.user;
      state.profile = profile;
      state.profileStatus = "success";
    },
    [getUserProfile.rejected]: (state, action) => {
      state.profileStatus = "error";
      state.error = action.payload;
    },
    [loadUsers.fulfilled]: (state, action) => {
      const { users } = action.payload;
      state.users = users;
      state.usersStatus = "success";
    },
    [loadUsers.pending]: (state) => {
      state.usersStatus = "pending";
    },
    [loadUsers.rejected]: (state, action) => {
      state.error = action.payload;
      state.usersStatus = "error";
    },
    [getUser.fulfilled]: (state, action) => {
      state.fetchedUserProfile = action.payload;
      state.fetchUserProfileStatus = "success";
    },
    [followNewUser.fulfilled]: (state, action) => {
      const { followerUser, followingUser } = action.payload.data;
      console.log(
        "step 4:: request got fulfilled and data is updated",
        JSON.parse(JSON.stringify(followerUser, followingUser))
      );
      const loggedInUserIndex = state.users.findIndex(
        (user) => user._id === followerUser._id
      );
      const updatedUserIndex = state.users.findIndex(
        (user) => user._id === followingUser._id
      );
      state.users[loggedInUserIndex] = followerUser;
      state.users[updatedUserIndex] = followingUser;
      state.profile.following = [...state.profile.following, followingUser._id];
    },
    [unFollowUser.fulfilled]: (state, action) => {
      const { updatedLoggedInUser, updatedUnfollowedUser } =
        action.payload.data;
      console.log(
        "hello posts",
        JSON.parse(JSON.stringify(updatedLoggedInUser))
      );
      // const loggedInUserIndex = state.users.findIndex(
      //   (user) => user._id === updatedLoggedInUser._id
      // );
      // const updatedUserIndex = state.users.findIndex(
      //   (user) => user._id === updatedUnfollowedUser._id
      // );
      // state.users[loggedInUserIndex] = followerUser;
      // state.users[updatedUserIndex] = followingUser;
      state.profile.following = state.profile.following.filter(
        (followingUserId) => followingUserId !== updatedUnfollowedUser._id
      );
    },
  },
});
export const { userAuth, setToken, removeToken, updateProfile } =
  userSlice.actions;
export default userSlice.reducer;
