import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFiles = createAsyncThunk(
  'fileManagerApp/files/getFiles',
  async (params, { dispatch }) => {
    const response = await axios.get('/api/file-manager-app/files');
    const data = await response.data;

    dispatch(setSelectedItem(data[0].id));

    return data;
  }
);

export const getFolderFiles = createAsyncThunk(
  'fileManagerApp/files/getFolderFiles',
  async ({ folderId, folderName }, { dispatch }) => {
    const response = await axios.post('/api/file-manager-app/folder-files', {
      folderId,
      folderName,
    });
    const data = await response.data;

    dispatch(setSelectedItem(data[0].id));

    return data;
  }
);

const filesAdapter = createEntityAdapter({});

export const {
  selectAll: selectFiles,
  selectEntities: selectFilesEntities,
  selectById: selectFileById,
} = filesAdapter.getSelectors((state) => state.fileManagerApp.files);

const filesSlice = createSlice({
  name: 'fileManagerApp/files',
  initialState: filesAdapter.getInitialState({
    selectedItemId: '1',
  }),
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItemId = action.payload;
    },
  },
  extraReducers: {
    [getFiles.fulfilled]: filesAdapter.setAll,
    [getFolderFiles.fulfilled]: filesAdapter.setAll,
  },
});

export const { setSelectedItem } = filesSlice.actions;

export default filesSlice.reducer;
