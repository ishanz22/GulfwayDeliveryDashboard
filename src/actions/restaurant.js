import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getRestaurantDetails = createAsyncThunk('restaurant/details-all', async ({ rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.get(`/api/admin/get-restraunt-details`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});

export const editRestaurant = createAsyncThunk('restaurant/edit', async ({ id }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post(`/api/restaurant/edit/${id}`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});

export const deleteRestaurant = createAsyncThunk('restaurant/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post(`/api/restaurant/delete/${id}`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});

export const restaurantById = createAsyncThunk('restaurant/id', async ({ id }, { rejectWithValue }) => {
  try {
    console.log(id);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post(`/api/restaurant/list-restraunt/${id}`, {}, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});

export const newRestaurant = createAsyncThunk('restaurant/new', async (data, { rejectWithValue }) => {
  try {
    console.log(data);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post(`/api/restaurant/create`, data, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});
