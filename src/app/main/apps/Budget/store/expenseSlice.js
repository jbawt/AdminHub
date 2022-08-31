import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getExpenses = createAsyncThunk('budgetApp/expenses/getExpenses', async () => {
  const response = await axios.get('/api/budget/expenses');
  const data = await response.data;

  return data;
});

export const getExpenseMonthList = createAsyncThunk(
  'budgetApp/expenses/getExpenseMonthList',
  async () => {
    const response = await axios.get('api/budget/expenses/expense-month-list');
    const data = await response.data;

    return data;
  }
);

const initialState = {
  loaded: false,
  data: {},
  monthList: [],
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
    [getExpenseMonthList.fulfilled]: (state, action) => {
      state.monthList = action.payload;
    },
  },
});

export default expenseSlice.reducer;
