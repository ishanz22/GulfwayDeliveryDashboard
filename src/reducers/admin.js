import { createSlice } from '@reduxjs/toolkit';
import { getCities, getGroceryCategories, getRestaurantCategories } from 'actions/admin';

const authSlice = createSlice({
  name: 'restaurant',
  initialState: {
    loading: false,
    error: null,
    cities: null,
    groceryCategories: null,
    restaurantCategories: null,
  },
  reducers: {},
  extraReducers: {
    // get city
    [getCities.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCities.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cities = payload.data;
    },
    [getCities.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.cities = null;
    },

    // get restaurant categories
    [getRestaurantCategories.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getRestaurantCategories.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.restaurantCategories = payload.data;
    },
    [getRestaurantCategories.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.restaurantCategories = null;
    },

    // get grocery categories
    [getGroceryCategories.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getGroceryCategories.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.groceryCategories = payload.data;
    },
    [getGroceryCategories.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.groceryCategories = null;
    },
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
