import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: { list: [], searchTerm: "" },
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});
export const { setMovies, setSearchTerm } = moviesSlice.actions;

// export const store = configureStore({ reducer: { movies: moviesReducer } });
export default moviesSlice.reducer;
