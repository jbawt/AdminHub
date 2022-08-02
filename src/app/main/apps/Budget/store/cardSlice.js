import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';

export const updateCard = createAsyncThunk(
  'budgetApp/card/updateCard',
  async (card, { dispatch }) => {
    const response = await axios.post('/api/budget/card/update', card);

    const data = await response.data;

    dispatch(
      showMessage({
        message: 'Card Saved',
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
    );

    return data;
  }
);

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
