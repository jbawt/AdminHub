import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import history from '@history';
import _ from '@lodash';
import { showMessage } from 'app/store/fuse/messageSlice';
import CardModel from '../model/CardModel';
import ListModel from '../model/ListModel';
import reorder, { reorderQuoteMap } from './reorder';
import { newBoard } from './boardsSlice';
import { removeCard, updateCard, subscribeToCard } from './cardSlice';

export const getBoard = createAsyncThunk(
  'scrumboardApp/board/getBoard',
  async (params, { dispatch }) => {
    try {
      const response = await axios.get('/api/scrumboard-app/board', { params });
      const data = await response.data;

      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data,
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      history.push({
        pathname: '/apps/scrumboard/boards',
      });
      return null;
    }
  }
);

export const reorderList = createAsyncThunk(
  'scrumboardApp/board/reorderList',
  async (result, { dispatch, getState }) => {
    const { board } = getState().scrumboardApp;
    const { lists } = board;

    const ordered = reorder(_.merge([], lists), result.source.index, result.destination.index);

    const response = await axios.post('/api/scrumboard-app/list/order', {
      boardId: board.id,
      lists: ordered,
    });

    const data = await response.data;

    dispatch(
      showMessage({
        message: 'List Order Saved',
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

export const reorderCard = createAsyncThunk(
  'scrumboardApp/board/reorderCard',
  async ({ source, destination }, { dispatch, getState }) => {
    const { board } = getState().scrumboardApp;
    const { lists } = board;

    const ordered = reorderQuoteMap(_.merge([], lists), source, destination);

    const response = await axios.post('/api/scrumboard-app/card/order', {
      boardId: board.id,
      lists: ordered,
    });

    const data = await response.data;

    dispatch(
      showMessage({
        message: 'Card Order Saved',
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

export const newLabel = createAsyncThunk(
  'scrumboardApp/board/newLabel',
  async (labelInfo, { dispatch }) => {
    const response = await axios.post('/api/scrumboard-app/new-label', labelInfo);
    const data = await response.data;

    return data;
  }
);

export const removeLabel = createAsyncThunk(
  'scrumboardApp/board/removeLabel',
  async (labelInfo, { dispatch }) => {
    const response = await axios.post('/api/scrumboard-app/remove-label', labelInfo);
    const data = await response.data;

    return data;
  }
);

export const newCard = createAsyncThunk(
  'scrumboardApp/board/newCard',
  async ({ boardId, listId, cardTitle }, { dispatch, getState }) => {
    const response = await axios.post('/api/scrumboard-app/card/new', {
      boardId,
      listId,
      data: CardModel({ name: cardTitle }),
    });

    const data = await response.data;

    return data;
  }
);

export const newList = createAsyncThunk(
  'scrumboardApp/board/newList',
  async ({ boardId, listTitle }, { dispatch, getState }) => {
    const response = await axios.post('/api/scrumboard-app/list/new', {
      boardId,
      data: ListModel({ name: listTitle }),
    });

    const data = await response.data;

    return data;
  }
);

export const renameList = createAsyncThunk(
  'scrumboardApp/board/renameList',
  async ({ boardId, listId, listTitle }, { dispatch, getState }) => {
    const response = await axios.post('/api/scrumboard-app/list/rename', {
      boardId,
      listId,
      listTitle,
    });

    const data = await response.data;

    return data;
  }
);

export const removeList = createAsyncThunk(
  'scrumboardApp/board/removeList',
  async ({ boardId, listId }, { dispatch, getState }) => {
    const response = await axios.post('/api/scrumboard-app/list/remove', {
      boardId,
      listId,
    });

    const data = await response.data;

    return data;
  }
);

export const changeBoardSettings = createAsyncThunk(
  'scrumboardApp/board/changeBoardSettings',
  async (newSettings, { dispatch, getState }) => {
    const { board } = getState().scrumboardApp;
    const settings = _.merge({}, board.settings, newSettings);

    const response = await axios.post('/api/scrumboard-app/board/settings/update', {
      boardId: board.id,
      settings,
    });

    const data = await response.data;

    return data;
  }
);

export const deleteBoard = createAsyncThunk(
  'scrumboardApp/board/deleteBoard',
  async (boardId, { dispatch, getState }) => {
    const response = await axios.post('/api/scrumboard-app/board/delete', {
      boardId,
    });

    history.push({
      pathname: '/apps/scrumboard/boards',
    });

    const data = await response.data;

    return data;
  }
);

export const copyBoard = createAsyncThunk(
  'scrumboardApp/board/copyBoard',
  async (board, { dispatch, getState }) => {
    const newBoardData = _.merge({}, board, {
      id: FuseUtils.generateGUID(),
      name: `${board.name} (Copied)`,
      uri: `${board.uri}-copied`,
    });

    dispatch(newBoard(newBoardData));

    return newBoardData;
  }
);

export const renameBoard = createAsyncThunk(
  'scrumboardApp/board/renameBoard',
  async ({ boardId, boardTitle }, { dispatch, getState }) => {
    const response = await axios.post('/api/scrumboard-app/board/rename', {
      boardId,
      boardTitle,
    });

    const data = await response.data;

    return data;
  }
);

export const updateMembers = createAsyncThunk(
  'scrumboardApp/board/updateMembers',
  async ({ newMembers, boardId }) => {
    const response = await axios.post('/api/scrumboard-app/board/update-members', {
      newMembers,
      boardId,
    });

    const data = await response.data;

    return data;
  }
);

const boardsSlice = createSlice({
  name: 'scrumboardApp/boards',
  initialState: null,
  reducers: {
    resetBoard: (state, action) => null,
    addLabel: (state, action) => {
      state.labels = [...state.labels, action.payload];
    },
  },
  extraReducers: {
    [getBoard.fulfilled]: (state, action) => action.payload,
    [reorderList.fulfilled]: (state, action) => {
      state.lists = action.payload;
    },
    [reorderCard.fulfilled]: (state, action) => {
      state.lists = action.payload;
    },
    [newList.fulfilled]: (state, action) => {
      state.lists = action.payload;
    },
    [newCard.fulfilled]: (state, action) => action.payload,
    [renameList.fulfilled]: (state, action) => {
      const { listId, listTitle } = action.payload;
      state.lists = state.lists.map((list) => {
        if (list.id === listId) {
          list.name = listTitle;
        }
        return list;
      });
    },
    [removeList.fulfilled]: (state, action) => {
      state.lists = _.reject(state.lists, { id: action.payload });
    },
    [newLabel.fulfilled]: (state, action) => {
      state.labels = action.payload;
    },
    [removeLabel.fulfilled]: (state, action) => {
      const { labelId } = action.payload;
      state.labels = _.reject(state.labels, { id: labelId });
      state.cards = state.cards.map((card) => {
        card.idLabels = card.idLabels.filter((id) => id !== labelId);
        return card;
      });
    },
    [changeBoardSettings.fulfilled]: (state, action) => {
      state.settings = action.payload;
    },
    [deleteBoard.fulfilled]: (state, action) => {
      state = {};
    },
    [renameBoard.fulfilled]: (state, action) => {
      state.name = action.payload;
    },
    [updateCard.fulfilled.type]: (state, action) => {
      state.cards = state.cards.map((_card) => {
        if (_card.id === action.payload.id) {
          return action.payload;
        }
        return _card;
      });
    },
    [removeCard.fulfilled]: (state, action) => {
      const { cardId, draggableId } = action.payload;
      state.cards = _.reject(state.cards, { id: cardId });
      state.lists = state.lists.map((list) => {
        _.set(
          list,
          'idCards',
          _.reject(list.idCards, (id) => id === cardId)
        );
        _.set(
          list,
          'draggableCardIds',
          _.reject(list.draggableCardIds, (id) => id === draggableId)
        );
        return list;
      });
    },
    [updateMembers.fulfilled]: (state, action) => {
      const memberIds = action.payload.map((member) => member.id);
      state.members = action.payload;
      state.cards = state.cards.map((card) => {
        const newMemberIds = card.idMembers
          .map((id) => {
            if (memberIds.includes(id)) {
              return id;
            }
            return null;
          })
          .filter((memberId) => memberId !== null);
        card.idMembers = newMemberIds;
        return card;
      });
    },
    [subscribeToCard.fulfilled]: (state, action) => {
      const { cardId, subscribed } = action.payload;
      state.cards = state.cards.map((_card) => {
        if (_card.id === cardId) {
          _card.subscribed = subscribed;
          return _card;
        }
        return _card;
      });
    },
  },
});

export const { resetBoard, addLabel } = boardsSlice.actions;

export default boardsSlice.reducer;
