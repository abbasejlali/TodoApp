import { useEffect, useState } from "react";

// helper
import { callapi } from "../../libs/helpers/callapi";
import { toast } from "react-toastify";

// mocule
import CardTask from "./CardTask";

// typescript
import { DataTodoPost, GetNewTodo } from "../../typescript/interface";
import axios from "axios";
import { errorAlert } from "../../libs/errorAlert";

function AddTask() {
  const [getNewTodo, setGetNewTodo] = useState<GetNewTodo>({
    isLoading: false,
    data: null,
  });

  const [dataTodoPost, setDataTodoPost] = useState<DataTodoPost>({
    title: "",
    body: "",
    userId: 1,
  });

  const createTodoHandeler = async (e: any) => {
    e.preventDefault();
    const { title, body } = dataTodoPost;
    if (title && body) {
      setGetNewTodo({ ...getNewTodo, isLoading: true });
      try {
        const res = await callapi().post("/todos", dataTodoPost);
        setGetNewTodo({
          ...getNewTodo,
          isLoading: false,
          data: { ...res?.data, complated: false },
        });
      } catch (err) {
        setGetNewTodo({ ...getNewTodo, isLoading: false });
        errorAlert();
      }
    }
  };

  const changeHandeler = (e: any) => {
    setDataTodoPost({ ...dataTodoPost, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(getNewTodo);
  }, [getNewTodo]);
  return (
    <>
      <form
        onSubmit={createTodoHandeler}
        className="flex flex-col items-center justify-start w-full gap-5 my-20 "
      >
        <h2 className="text-2xl font-bold">create a new todo</h2>
        <input
          type="text"
          placeholder="title"
          className="w-full max-w-xs input input-bordered"
          value={dataTodoPost.title}
          onChange={changeHandeler}
          name="title"
        />
        <textarea
          className="w-full max-w-xs textarea textarea-bordered"
          placeholder="body"
          value={dataTodoPost.body}
          onChange={changeHandeler}
          name="body"
        ></textarea>
        <button className="w-full max-w-xs text-lg font-medium text-white btn btn-success ">
          {getNewTodo.isLoading ? (
            <>
              <span className="loading loading-spinner"></span>
              loading
            </>
          ) : (
            "create"
          )}
        </button>
      </form>
      {getNewTodo.data?.id && <CardTask todo={getNewTodo.data} />}
    </>
  );
}

export default AddTask;
