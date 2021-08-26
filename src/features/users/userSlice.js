import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FetchProfile,
  FollowNewUser,
  GetUser,
  LoadUsers,
  setUpAuthHeaderForServiceCalls,
  UnFollowUser,
} from "../../services/users/users";
export const getUserProfile = createAsyncThunk("user", async (thunkAPI) => {
  try {
    const response = await FetchProfile();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
});
export const loadUsers = createAsyncThunk("/users/all", async (thunkAPI) => {
  try {
    const response = await LoadUsers();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
});
export const getUser = createAsyncThunk(
  "/user/getuser",
  async ({ getUserId }, thunkAPI) => {
    try {
      setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
      const response = await GetUser({ getUserId });
      console.log("thunk is working as expected ", response);
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
      const response = await FollowNewUser(newUserId);
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
      const response = await UnFollowUser(userToUnfollowId);
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
    authSetupStatus: "idle",
  },
  reducers: {
    authSetup: (state) => {
      state.authSetupStatus = "success";
    },
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
      const { followingUser, followerUser } = action.payload.data;
      state.profile.following = [...state.profile.following, followingUser._id];
      if (state.fetchedUserProfile._id === followingUser._id) {
        state.fetchedUserProfile.followers =
          state.fetchedUserProfile.followers = [
            ...state.fetchedUserProfile.followers,
            followerUser,
          ];
      }
      if (state.fetchedUserProfile._id === localStorage.getItem("userId")) {
        state.fetchedUserProfile.following = [
          ...state.fetchedUserProfile.following,
          followingUser,
        ];
      }
    },
    [unFollowUser.fulfilled]: (state, action) => {
      const { updatedUnfollowedUser, updatedLoggedInUser } =
        action.payload.data;
      state.profile.following = state.profile.following.filter(
        (followingUserId) => followingUserId !== updatedUnfollowedUser._id
      );
      if (state.fetchedUserProfile._id === updatedUnfollowedUser._id) {
        state.fetchedUserProfile.followers =
          state.fetchedUserProfile.followers =
            state.fetchedUserProfile.followers.filter(
              (followerUser) => followerUser._id !== updatedLoggedInUser._id
            );
      }
      if (state.fetchedUserProfile._id === localStorage.getItem("userId")) {
        state.fetchedUserProfile.following =
          state.fetchedUserProfile.following.filter(
            (followingUserId) =>
              followingUserId._id !== updatedUnfollowedUser._id
          );
      }
    },
  },
});
export const { userAuth, setToken, removeToken, updateProfile, authSetup } =
  userSlice.actions;
export default userSlice.reducer;
