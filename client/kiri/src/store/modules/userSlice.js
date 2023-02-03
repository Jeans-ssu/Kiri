import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  nickName: '',
  email: '',
  interest: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER: (state, action) => {
      state.isLogin = true;
      state.nickName = action.payload.nickName;
      state.email = action.payload.email;
      state.interest = action.payload.interest;
    },
  },
});

export const { SET_USER } = userSlice.actions;
export const selectIsLogin = (state) => state.user.isLogin;

export default userSlice.reducer;
