import { createSlice } from "@reduxjs/toolkit";

// const storedUser = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : {};

// const storedToken = localStorage.getItem("token")
//   ? localStorage.getItem("token")
//   : "";

const userSlice = createSlice({
  name: "user",
  initialState: "",
  // initialState: null,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     name: storedUser,
//     token: storedToken,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.user.name = action.payload;
//     },
//     setToken: (state, action) => {
//       state.user.token = action.payload;
//     },
//   },
// });

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
