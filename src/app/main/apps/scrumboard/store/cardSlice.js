import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import { showMessage } from 'app/store/fuse/messageSlice';

export const updateCard = createAsyncThunk(
  'scrumboardApp/card/updateCard',
  async ({ boardId, card }, { dispatch }) => {
    const response = await axios.post('/api/scrumboard-app/card/update', {
      boardId,
      card,
    });

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

export const removeCard = createAsyncThunk(
  'scrumboardApp/card/removeCard',
  async ({ boardId, cardId }, { dispatch }) => {
    const response = await axios.post('/api/scrumboard-app/card/remove', {
      boardId,
      cardId,
    });

    const data = await response.data;

    dispatch(closeCardDialog());
    return data;
  }
);

export const deleteAttachment = createAsyncThunk(
  'scrumboardApp/card/removeAttachment',
  async ({ attachmentId }, { dispatch }) => {
    const response = await axios.post('/api/scrumboard-app/card/remove-attachment', {
      attachmentId,
    });

    const data = await response.data;

    return data;
  }
);

export const attachmentCover = createAsyncThunk(
  'scrumboardApp/card/attachmentCover',
  async ({ attachmentId, cardId }, { dispatch }) => {
    const response = await axios.post('/api/scrumboard-app/card/attachment-cover', {
      attachmentId,
      cardId,
    });

    const data = await response.data;

    return data;
  }
);

export const removeAttachmentCover = createAsyncThunk(
  'scrumboardApp/card/removeAttachmentCover',
  async ({ cardId }, { dispatch }) => {
    const response = await axios.post('/api/scrumboard-app/card/remove/attachment-cover', {
      cardId,
    });

    const data = await response.data;

    return data;
  }
);

const cardSlice = createSlice({
  name: 'scrumboardApp/card',
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
  extraReducers: {
    [updateCard.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [deleteAttachment.fulfilled]: (state, action) => {
      const attachmentId = action.payload;
      state.data.attachments = _.reject(state.data.attachments, { id: attachmentId });
    },
    [attachmentCover.fulfilled]: (state, action) => {
      const idAttachmentCover = action.payload;
      state.data.idAttachmentCover = idAttachmentCover;
      console.log(current(state));
    },
    [removeAttachmentCover.fulfilled]: (state, action) => {
      const idAttachmentCover = '';
      state.data.idAttachmentCover = idAttachmentCover;
    },
  },
});

export const { openCardDialog, closeCardDialog } = cardSlice.actions;

export default cardSlice.reducer;
