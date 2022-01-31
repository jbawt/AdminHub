import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { updateNavigationItem } from 'app/store/fuse/navigationSlice';
import axios from 'axios';

let todoBadges;

export const getTodos = createAsyncThunk(
  'todoApp/todos/getTodos',
  async (routeParams, { dispatch, getState }) => {
    routeParams = routeParams || getState().todoApp.todos.routeParams;
    const response = await axios.get('/api/todo-app/todos', {
      params: routeParams,
    });
    const data = await response.data;

    data.forEach((todo) => {
      todo.startDate = new Date(todo.startDate);
      todo.dueDate = new Date(todo.dueDate);
    });

    todoBadges = data.filter((todo) => !todo.completed || !todo.deleted).length;
    dispatch(
      updateNavigationItem('todo', {
        title: 'To-Do',
        badge: {
          title: todoBadges,
          bg: 'rgb(255, 111, 0)',
          fg: '#FFFFFF',
        },
      })
    );

    return { data, routeParams };
  }
);

export const addTodo = createAsyncThunk(
  'todoApp/todos/addTodo',
  async (todo, { dispatch, getState }) => {
    const response = await axios.post('/api/todo-app/new-todo', todo);
    const data = await response.data;

    dispatch(getTodos());

    return data;
  }
);

export const updateTodo = createAsyncThunk(
  'todoApp/todos/updateTodo',
  async (todo, { dispatch, getState }) => {
    const response = await axios.post('/api/todo-app/update-todo', todo);
    const data = await response.data;

    dispatch(getTodos());

    return data;
  }
);

export const removeTodo = createAsyncThunk(
  'todoApp/todos/removeTodo',
  async (todoId, { dispatch, getState }) => {
    const response = await axios.post('/api/todo-app/remove-todo', todoId);
    const data = await response.data;

    dispatch(getTodos());

    return data;
  }
);

const todosAdapter = createEntityAdapter({});

export const { selectAll: selectTodos, selectById: selectTodosById } = todosAdapter.getSelectors(
  (state) => state.todoApp.todos
);

const todosSlice = createSlice({
  name: 'todoApp/todos',
  initialState: todosAdapter.getInitialState({
    searchText: '',
    orderBy: '',
    orderDescending: false,
    routeParams: {},
    todoDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setTodosSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    toggleOrderDescending: (state, action) => {
      state.orderDescending = !state.orderDescending;
    },
    changeOrder: (state, action) => {
      state.orderBy = action.payload;
    },
    openNewTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateTodo.fulfilled]: todosAdapter.upsertOne,
    [addTodo.fulfilled]: todosAdapter.addOne,
    [getTodos.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      todosAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    },
  },
});

export const {
  setTodosSearchText,
  toggleOrderDescending,
  changeOrder,
  openNewTodoDialog,
  closeNewTodoDialog,
  openEditTodoDialog,
  closeEditTodoDialog,
} = todosSlice.actions;

export default todosSlice.reducer;
