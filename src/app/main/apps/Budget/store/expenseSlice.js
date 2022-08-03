import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getExpenses = createAsyncThunk('budgetApp/expenses/getExpenses', async () => {
  const response = await axios.get('/api/budget/expenses');
  const data = await response.data;

  return data;
});

const initialState = {
  loaded: false,
  data: {},
};

const expenseSlice = createSlice({
  name: 'budgetApp/expense',
  initialState,
  reducers: {},
  extraReducers: {
    [getExpenses.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loaded = true;
    },
  },
});

export default expenseSlice.reducer;
