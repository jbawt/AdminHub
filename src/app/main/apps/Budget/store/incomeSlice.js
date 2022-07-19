import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getIncome = createAsyncThunk('budgetApp/income/getIncome', async () => {
  const response = await axios.get('/api/budget/income');
  const data = await response.data;

  return data;
});

const incomeAdapter = createEntityAdapter({});

const incomeSlice = createSlice({
  name: 'budgetApp/income',
  initialState: incomeAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getIncome.fulfilled]: incomeAdapter.setOne,
  },
});

export default incomeSlice.reducer;
