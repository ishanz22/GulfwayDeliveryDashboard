import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`/api/auth/login`, { email, password }, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async ({ rejectWithValue }) => {
  console.log('hi 5');
  try {
    console.log('hi 2');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    console.log('hi 3');
    const response = await axios.post(`/api/auth/logout`, {}, config);
    localStorage.removeItem('token');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('hi 4');
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotpassword', async ({ email }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`/api/auth/reset-password`, { email }, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});
