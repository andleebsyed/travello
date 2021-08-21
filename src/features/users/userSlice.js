import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchProfile, GetUser, LoadUsers } from "../../services/users/users";
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
  },
});
export const { userAuth, setToken, removeToken, updateProfile } =
  userSlice.actions;
export default userSlice.reducer;
