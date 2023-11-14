import { createSlice } from '@reduxjs/toolkit';
import { resetPassword, loginUser, logoutUser, resetPasswordToken } from '../actions/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    isAuthenticated: null,
    user: null,
    error: null,
    success: null,
    logout: false,
    data: null,
  },
  reducers: {},
  extraReducers: {
    // login user
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.data;
      state.success = true;
      state.isAuthenticated = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = false;
      state.success = null;
    },

    // logout user
    [logoutUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    [logoutUser.fulfilled]: (state) => {
      state.loading = false;
      state.user = null;
      state.success = true;

      state.isAuthenticated = null;
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = null;
    },

    // reset password
    [resetPassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.success = true;
      state.isAuthenticated = false;
    },
    [resetPassword.rejected]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = payload;
      state.success = null;
      state.isAuthenticated = false;
    },

    // reset password token
    [resetPasswordToken.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    [resetPasswordToken.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.success = true;
      state.isAuthenticated = false;
    },
    [resetPasswordToken.rejected]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = payload;
      state.success = null;
      state.isAuthenticated = false;
    },
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
