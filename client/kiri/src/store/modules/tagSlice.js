import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tagword: '',
  mode: false,
};

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setTagWord: (state, { payload }) => {
      state.tagword = payload;
    },
    setTagMode: (state, { payload }) => {
      state.mode = payload;
    },
  },
});

export const { setTagWord, setTagMode } = tagSlice.actions;

export const selectTagWord = (state) => state.tag.tagword;
export const selectTagMode = (state) => state.tag.mode;

export default tagSlice.reducer;
