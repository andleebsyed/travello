import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    status: "idle",
    error: null,
    authorized: localStorage.getItem("token") ? true : false,
  },
  reducers: {},
  extraReducers: {},
});
export const { userAuth } = userSlice.actions;
export default userSlice.reducer;
