import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLogin: false,
  nickName: '',
  email: '',
  interest: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
