import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// typescripte
import {
  DataTodoPost,
  FetchTodosArgs,
  Todo,
  TodoInitialState,
  TodoPost,
} from "../../typescript/interface";
import { fetchTodosApi, postTodoApi } from "../../utils/functionApi";

const initialState: TodoInitialState = {
  getTodos: {
    loading: false,
    todos: [],
    error: null,
  },
  postTodos: {
    loading: false,
    todo: null,
    error: null,
  },
};

const fetchTodos = createAsyncThunk<Todo[], FetchTodosArgs>(
  "Todos/fetchTodos",
  fetchTodosApi
);

const postTodo = createAsyncThunk<TodoPost, DataTodoPost>(
  "Todos/postTodo",
  postTodoApi
);

const TodosSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get todos
    builder.addCase(fetchTodos.pending, (state) => {
      state.getTodos.loading = true;
    });

    builder.addCase(
      fetchTodos.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        state.getTodos.loading = false;
        state.getTodos.todos = action.payload;
        state.getTodos.error = "";
      }
    );

    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.getTodos.loading = false;
      state.getTodos.todos = [];
      state.getTodos.error = "sorry , There is a problem.";
    });

    //post todos
    builder.addCase(postTodo.pending, (state) => {
      state.postTodos.loading = true;
    });

    builder.addCase(
      postTodo.fulfilled,
      (state, action: PayloadAction<TodoPost>) => {
        state.postTodos.loading = false;
        state.postTodos.todo = action.payload;
        state.postTodos.error = "";
      }
    );

    builder.addCase(postTodo.rejected, (state) => {
      state.postTodos.loading = false;
      state.postTodos.todo = null;
      state.postTodos.error = "sorry ,There is a problem.";
    });
  },
});

export default TodosSlice.reducer;
export { fetchTodos, postTodo };
