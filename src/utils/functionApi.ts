import { DataTodoPost, FetchTodosArgs } from "../typescript/interface";
import { callapi } from "../libs/helpers/callapi";
import { errorAlert } from "../libs/errorAlert";

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
    console.log(res);
    return { ...res?.data, complated: false };
  } catch (err: any) {
    errorAlert();
    return err;
  }
};

export { postTodoApi, fetchTodosApi };
