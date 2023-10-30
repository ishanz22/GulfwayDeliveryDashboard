import { createSlice } from '@reduxjs/toolkit';
import { forgotPassword, loginUser, logoutUser } from '../actions/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    isAuthenticated: null,
    user: null,
    error: null,
    signup: false,
    logout: false,
    data: null,
  },
  reducers: {},
  extraReducers: {
    // login user
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.data;
      state.isAuthenticated = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = false;
    },

    // logout user
    [logoutUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [logoutUser.fulfilled]: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = null;
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // forgot password
    [forgotPassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [forgotPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isAuthenticated = false;
    },
    [forgotPassword.rejected]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = false;
    },
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
