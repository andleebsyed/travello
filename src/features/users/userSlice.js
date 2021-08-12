import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
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
    },
  },
  extraReducers: {},
});
export const { userAuth, setToken, removeToken } = userSlice.actions;
export default userSlice.reducer;
