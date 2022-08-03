import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getIncome = createAsyncThunk('budgetApp/income/getIncome', async () => {
  const response = await axios.get('/api/budget/income');
  const data = await response.data;
  return data;
});

const initialState = {
  total: 0,
};

const incomeSlice = createSlice({
  name: 'budgetApp/income',
  initialState,
  reducers: {},
  extraReducers: {
    [getIncome.fulfilled]: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setUserIncome } = incomeSlice.actions;

export default incomeSlice.reducer;
