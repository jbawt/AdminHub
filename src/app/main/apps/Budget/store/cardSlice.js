import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const cardSlice = createSlice({
  name: 'budgetApp/card',
  initialState: {
    dialogOpen: false,
    data: null,
    type: 'new',
  },
  reducers: {
    openNewCardDialog: (state, action) => {
      state.dialogOpen = true;
      state.data = action.payload;
      state.type = 'new';
    },
    closeNewCardDialog: (state, action) => {
      state.dialogOpen = false;
      state.data = null;
      state.type = 'new';
    },
    openEditDialog: (state, action) => {
      state.dialogOpen = true;
      state.data = action.payload;
      state.type = 'edit';
    },
    closeEditDialog: (state, action) => {
      state.dialogOpen = false;
      state.data = null;
      state.type = 'edit';
    },
  },
  extraReducers: {},
});

export const { openNewCardDialog, closeNewCardDialog, openEditDialog, closeEditDialog } =
  cardSlice.actions;

export default cardSlice.reducer;
