import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';

export const getIncome = createAsyncThunk('budgetApp/income/getIncome', async () => {
  const response = await axios.get('/api/budget/income');
  const data = await response.data;

  return data;
});

export const updateIncome = createAsyncThunk(
  'budgetApp/income/updateIncome',
  async (newAmount, { dispatch }) => {
    const response = await axios.post('/api/budget/income/update', newAmount);
    const data = await response.data;

    dispatch(getIncome());
    dispatch(
      showMessage({
        message: 'Income Updated',
        autoHideDuration: 2000,
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
      })
    );

    return data;
  }
);

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
    [updateIncome.fulfilled]: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setUserIncome } = incomeSlice.actions;

export default incomeSlice.reducer;
