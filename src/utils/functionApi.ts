import { callapi } from "../libs/helpers/callapi";
import { errorAlert } from "../libs/errorAlert";

import { DataTodoPost, FetchTodosArgs, Todo } from "../typescript/interface";
import { successAlert } from "../libs/successAlert";
import axios from "axios";

const fetchTodosApi = async ({ page, completed }: FetchTodosArgs) => {
  try {
    const res = await callapi().get(
      `/todos?${completed}&_page=${page}&_limit=10`
    );
    return res?.data;
  } catch (err) {
    return err;
  }
};

const postTodoApi = async ({ title, body, userId }: DataTodoPost) => {
  try {
    const res = await callapi().post("/todos", {
      title,
      body,
      userId,
    });
    return { ...res?.data, complated: false };
  } catch (err: any) {
    errorAlert();
    return err;
  }
};

const editTodoApi = async ({ title, id, userId, completed }: Todo) => {
  try {
    const res = await callapi().put(`/todos/${id}`, {
      title,
      userId,
      id,
      completed,
    });
    successAlert();
    return res?.data;
  } catch (err: any) {
    errorAlert();
    return err;
  }
};

const deleteTodoApi = async ({ id }: { id: number }) => {
  try {
    const res = await axios.delete(
      `https://jsonplaceholder.typicdsadode.com/todos/${id}`
    );
    successAlert();
    return { ...res?.data, id };
  } catch (err: any) {
    errorAlert();
    return err;
  }
};

export { postTodoApi, fetchTodosApi, editTodoApi, deleteTodoApi };
