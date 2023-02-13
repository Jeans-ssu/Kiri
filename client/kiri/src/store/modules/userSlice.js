import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  nickName: '',
  email: '',
  region: '',
  univ: '',
  status: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER: (state, action) => {
      state.isLogin = true;
      state.nickName = action.payload.nickName;
      state.email = action.payload.email;
      state.region = action.payload.region;
      state.univ = action.payload.univ;
      state.status = action.payload.status;
    },
    DELETE_USER: (state) => {
      state.isLogin = false;
      state.nickName = '';
      state.email = '';
      state.region = '';
      state.univ = '';
      state.status = '';
    },
  },
});

export const { SET_USER, DELETE_USER } = userSlice.actions;
export const selectIsLogin = (state) => state.user.isLogin;
export const selectUserInfo = (state) => state.user;

export default userSlice.reducer;
