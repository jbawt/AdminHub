/* eslint-disable prefer-destructuring */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateCard } from './cardSlice';

export const getGoals = createAsyncThunk('budgetApp/goals/getGoals', async (info, { dispatch }) => {
  const response = await axios.get('/api/budget/goals');
  const data = await response.data;

  dispatch(getGoal(data[0].id));
  dispatch(getGoalUsers());

  return data;
});

export const getGoal = createAsyncThunk('budgetApp/goals/getGoal', async (goalId) => {
  const response = await axios.get('/api/budget/goal', { params: { goalId } });
  const data = await response.data;

  return data;
});

export const getGoalUsers = createAsyncThunk('budgetApp/goals/getUsers', async () => {
  const response = await axios.get('/api/budget/users');
  const data = await response.data;

  return data;
});

export const addMoneyToGoal = createAsyncThunk(
  'budgetApp/goals/addMoneyToGoal',
  async (insertData) => {
    const response = await axios.post('/api/budget/update/weekly-savings', insertData);
    const data = await response.data;

    return data;
  }
);

const initialState = {};

const goalSlice = createSlice({
  name: 'budgetApp/goals',
  initialState,
  reducers: {},
  extraReducers: {
    [getGoals.fulfilled]: (state, action) => {
      state.goalItems = action.payload;
      state.selectedGoal = action.payload[0].id;
    },
    [getGoal.fulfilled]: (state, action) => {
      state.goal = action.payload;
      state.selectedGoal = action.payload.id;
    },
    [getGoalUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [addMoneyToGoal.fulfilled]: (state, action) => {
      state.goal.savingsData = action.payload;
    },
    [updateCard.fulfilled]: (state, action) => {
      state.goalItems = action.payload;
    },
  },
});

export default goalSlice.reducer;
