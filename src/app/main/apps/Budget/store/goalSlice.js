import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getGoals = createAsyncThunk('budgetApp/goals/getGoals', async () => {
  const response = await axios.get('/api/budget/goals');
  const data = await response.data;

  return data;
});

const initialState = {};

const goalSlice = createSlice({
  name: 'budgetApp/goals',
  initialState,
  reducers: {},
  extraReducers: {
    [getGoals.fulfilled]: (state, action) => {
      state.goalItems = action.payload;
    },
  },
});

export default goalSlice.reducer;
