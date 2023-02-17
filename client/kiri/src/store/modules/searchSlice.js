import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchword: '',
  mode: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchWord: (state, { payload }) => {
      state.searchword = payload;
    },
    setSearchMode: (state, { payload }) => {
      state.mode = payload;
    },
  },
});

export const { setSearchWord, setSearchMode } = searchSlice.actions;

export const selectSearchWord = (state) => state.search.searchword;
export const selectSearchMode = (state) => state.search.mode;

export default searchSlice.reducer;
