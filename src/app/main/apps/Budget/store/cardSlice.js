import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const cardSlice = createSlice({
  name: 'budgetApp/card',
  initialState: {
    dialogOpen: false,
    data: null,
  },
  reducers: {
    openCardDialog: (state, action) => {
      state.dialogOpen = true;
      state.data = action.payload;
    },
    closeCardDialog: (state, action) => {
      state.dialogOpen = false;
      state.data = null;
    },
  },
  extraReducers: {},
});

export const { openCardDialog, closeCardDialog } = cardSlice.actions;

export default cardSlice.reducer;
