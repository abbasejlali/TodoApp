import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// helper
import { callapi } from "../../libs/helpers/callapi";
import { errorAlert } from "../../libs/errorAlert";

// typescripte
import {
  FetchTodosArgs,
  Todo,
  TodoInitialState,
  TodoPost,
} from "../../typescript/interface";

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
  async ({ page, completed }) => {
    try {
      const res = await callapi().get(
        `/todos?${completed}&_page=${page}&_limit=10`
      );
      return res?.data;
    } catch (err) {
      return err;
    }
  }
);

interface DataTodoPost {
  title: string;
  body: string;
  userId: number;
}

const postTodo = createAsyncThunk<TodoPost, DataTodoPost>(
  "Todos/postTodo",
  async ({ title, body, userId }) => {
    try {
      const res = await callapi().post("/todos", {
        title,
        body,
        userId,
      });
      console.log(res);
      return { ...res?.data, complated: false };
    } catch (err: any) {
      errorAlert();
      return err;
    }
  }
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
