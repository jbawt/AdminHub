import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getTodos } from './todosSlice';

export const getLabels = createAsyncThunk('todoApp/labels/getLabels', async () => {
  const response = await axios.get('/api/todo-app/labels');
  const data = await response.data;

  return data;
});

export const addLabel = createAsyncThunk(
  'todoApp/labels/addLabel',
  async (labelData, { dispatch }) => {
    const response = await axios.post('/api/todo-app/add-label', labelData);
    const data = await response.data;

    dispatch(getLabels());

    return data;
  }
);

export const removeLabel = createAsyncThunk(
  'todoApp/labels/removeLabel',
  async (labelId, { dispatch }) => {
    const response = await axios.post('/api/todo-app/remove-label', { labelId });
    const data = await response.data;

    await dispatch(getTodos());
    await dispatch(getLabels());

    return data;
  }
);

const labelsAdapter = createEntityAdapter({});

export const {
  selectAll: selectLabels,
  selectEntities: selectLabelsEntities,
  selectById: selectLabelById,
} = labelsAdapter.getSelectors((state) => state.todoApp.labels);

const labelsSlice = createSlice({
  name: 'todoApp/labels',
  initialState: labelsAdapter.getInitialState(null),
  reducers: {},
  extraReducers: {
    [getLabels.fulfilled]: labelsAdapter.setAll,
  },
});

export default labelsSlice.reducer;
