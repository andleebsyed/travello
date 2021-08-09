import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: "idle",
  error: null,
  posts: [],
};
export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default postSlice.reducer;
