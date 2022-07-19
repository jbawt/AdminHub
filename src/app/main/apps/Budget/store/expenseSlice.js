import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
// import axios from 'axios';

const expenseAdapter = createEntityAdapter({});

const expenseSlice = createSlice({
  name: 'budgetApp/expense',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default expenseSlice.reducer;
