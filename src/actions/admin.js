import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCities = createAsyncThunk('city/all', async ({ rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.get(`/api/admin/get-city`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});

export const getRestaurantCategories = createAsyncThunk('restaurant-category/all', async ({ rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.get(`/api/admin/get-restaurant-category`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});

export const getGroceryCategories = createAsyncThunk('grocery-category/all', async ({ rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.get(`/api/admin/get-grocery-category`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});
