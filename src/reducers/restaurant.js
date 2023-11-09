import { createSlice } from '@reduxjs/toolkit';
import { getRestaurantDetails, restaurantById } from 'actions/restaurant';

const authSlice = createSlice({
  name: 'restaurant',
  initialState: {
    loading: false,
    error: null,
    restaurant: null,
  },
  reducers: {},
  extraReducers: {
    // get Restaurant Details
    [getRestaurantDetails.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getRestaurantDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.restaurant = payload.data;
    },
    [getRestaurantDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.restaurant = null;
    },

    [restaurantById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [restaurantById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.restaurant = payload.data;
    },
    [restaurantById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.restaurant = null;
    },
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
