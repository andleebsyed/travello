import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchProfile } from "../../services/users/users";
export const getUserProfile = createAsyncThunk("user", async (thunkAPI) => {
  try {
    const response = await FetchProfile();
    console.log("thunk resposne", { response });
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
});
export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    profileStatus: "idle",
    profile: null,
    status: "idle",
    error: null,
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
  },
});
export const { userAuth, setToken, removeToken } = userSlice.actions;
export default userSlice.reducer;
