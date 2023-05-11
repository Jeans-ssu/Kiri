import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ocrResult: '',
  mode: false,
};

export const ocrSlice = createSlice({
  name: 'ocr',
  initialState,
  reducers: {
    setOcrResult: (state, { payload }) => {
      state.ocrResult = payload;
    },
    setOcrMode: (state, { payload }) => {
      state.mode = payload;
    },
  },
});

export const { setOcrResult, setOcrMode } = ocrSlice.actions;

export const selectOcrResult = (state) => state.ocr.ocrResult;
export const selectOcrMode = (state) => state.ocr.mode;

export default ocrSlice.reducer;
