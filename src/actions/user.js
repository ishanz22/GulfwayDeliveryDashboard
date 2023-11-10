import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserDetails = createAsyncThunk('user/details-all', async ({ rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.get(`/api/user/list`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});

export const editUser = createAsyncThunk('user/edit', async ({ id, data }, { rejectWithValue }) => {
  console.log(id, data);
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post(`/api/user/edit/${id}`, data, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});

export const deleteUser = createAsyncThunk('user/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post(`/api/user/delete/${id}`, {}, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});

export const userById = createAsyncThunk('user/id', async ({ id }, { rejectWithValue }) => {
  try {
    console.log(id);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post(`/api/user/list-user/${id}`, {}, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});
