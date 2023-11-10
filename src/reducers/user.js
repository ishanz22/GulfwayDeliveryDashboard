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
  },
  reducers: {},
  extraReducers: {
    // get User Details
    [getUserDetails.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.data;
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.user = null;
    },

    // get User by Id
    [userById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userDetails = payload.data;
    },
    [userById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.userDetails = null;
    },

    // edit user
    [editUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.editUser = payload.data;
    },
    [editUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.editUser = null;
    },
  },
});

const userReducer = authSlice.reducer;
export default userReducer;
