import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// redux
import { callapi } from "../../libs/helpers/callapi";

// typescripte
import { FetchTodosArgs, Todo, TodoState } from "../../typescript/interface";

const initialState: TodoState = {
  loading: false,
  todos: [],
  error: "",
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

const GetTodosSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchTodos.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
        state.error = "";
      }
    );

    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default GetTodosSlice.reducer;
export { fetchTodos };
