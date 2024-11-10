import { configureStore } from "@reduxjs/toolkit";

import GetTodosReducer from "../features/GetAllTodos/GetTodosSlice";

const store = configureStore({
  reducer: {
    todos: GetTodosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
