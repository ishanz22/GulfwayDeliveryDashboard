import { createSlice } from '@reduxjs/toolkit';
import { editUser, getUserDetails, userById } from 'actions/user';

const authSlice = createSlice({
  name: 'restaurant',
  initialState: {
    loading: false,
    error: null,
    user: null,
    userDetails: null,
    userEdit: null,
    success: null,
  },
  reducers: {},
  extraReducers: {
    // get User Details
    [getUserDetails.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.data;
      state.success = true;
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.user = null;
      state.success = null;
    },

    // get User by Id
    [userById.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    [userById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userDetails = payload.data;
      state.success = true;
    },
    [userById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.userDetails = null;
      state.success = null;
    },

    // edit user
    [editUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.editUser = payload.data;
      state.success = true;
    },
    [editUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.editUser = null;
      state.success = null;
    },
  },
});

const userReducer = authSlice.reducer;
export default userReducer;
