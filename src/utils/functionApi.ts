// helper
import { callapi } from "../libs/helpers/callapi";

// typescript
import { DataTodoPost, FetchTodosArgs, Todo } from "../typescript/interface";

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
    return res?.data;
  } catch (err: any) {
    return err;
  }
};

const deleteTodoApi = async ({ id }: { id: number }) => {
  try {
    const res = await callapi().delete(`/todos/${id}`);
    return { ...res?.data, id };
  } catch (err: any) {
    return err;
  }
};

export { postTodoApi, fetchTodosApi, editTodoApi, deleteTodoApi };
