import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// typescripte
import {
  DataTodoPost,
  FetchTodosArgs,
  Todo,
  TodoInitialState,
  TodoPost,
} from "../../typescript/interface";

// function api
import {
  deleteTodoApi,
  editTodoApi,
  fetchTodosApi,
  postTodoApi,
} from "../../utils/functionApi";

const initialState: TodoInitialState = {
  filter: localStorage.getItem("filter") || "",
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
  editTodo: {
    loading: false,
    editdata: {},
    error: null,
  },
  deleteTodo: {
    loading: false,
    deletedata: undefined,
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

const editTodo = createAsyncThunk<Todo, Todo>("Todos/editTodo", editTodoApi);

const deleteTodo = createAsyncThunk<any, { id: number }>(
  "Todos/deleteTodo",
  deleteTodoApi
);

const TodosSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: {
    removeAmount: (state) => {
      state.editTodo.editdata = {
        id: 0,
        userId: 0,
        title: "",
        completed: false,
      };
    },
    filterTodos: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },

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
        state.getTodos.todos = [...state.getTodos.todos, action.payload];
      }
    );

    builder.addCase(postTodo.rejected, (state) => {
      state.postTodos.loading = false;
      state.postTodos.todo = null;
      state.postTodos.error = "sorry ,There is a problem.";
    });

    //edit todo
    builder.addCase(editTodo.pending, (state) => {
      state.editTodo.loading = true;
    });

    builder.addCase(
      editTodo.fulfilled,
      (state, action: PayloadAction<Todo>) => {
        state.editTodo.loading = false;
        state.editTodo.editdata = action.payload;
        state.editTodo.error = "";
        state.getTodos.todos = state.getTodos.todos.map((todo) =>
          todo.id === action.payload?.id ? action.payload : todo
        );
      }
    );

    builder.addCase(editTodo.rejected, (state) => {
      state.editTodo.loading = false;
      state.editTodo.editdata = {};
      state.editTodo.error = "sorry ,There is a problem.";
    });

    //delete todo
    builder.addCase(deleteTodo.pending, (state) => {
      state.deleteTodo.loading = true;
    });

    builder.addCase(
      deleteTodo.fulfilled,
      (state, action: PayloadAction<{ id: number }>) => {
        state.deleteTodo.loading = false;
        state.deleteTodo.deletedata = action.payload;
        state.deleteTodo.error = "";
        state.getTodos.todos = state.getTodos.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
      }
    );

    builder.addCase(deleteTodo.rejected, (state) => {
      state.deleteTodo.loading = false;
      state.deleteTodo.deletedata = undefined;
      state.deleteTodo.error = "sorry ,There is a problem.";
    });
  },
});

export default TodosSlice.reducer;
export { fetchTodos, postTodo, editTodo, deleteTodo };
export const { removeAmount, filterTodos } = TodosSlice.actions;
