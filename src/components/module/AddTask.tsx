import { useState } from "react";

// mocule
import CardTask from "./CardTask";

// typescript
import { DataTodoPost } from "../../typescript/interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { postTodo } from "../../features/TodosManagement/TodosSlice";

function AddTask() {
  const {
    postTodos: { loading, todo },
  } = useSelector((state: RootState) => state.todos);
  const daispatch = useDispatch<AppDispatch>();
  const [dataTodoPost, setDataTodoPost] = useState<DataTodoPost>({
    title: "",
    body: "",
    userId: 1,
  });

  console.log(todo);

  const createTodoHandeler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, body, userId } = dataTodoPost;
    if (title && body) {
      daispatch(postTodo({ title, body, userId }));
    }
  };

  const changeHandeler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataTodoPost({ ...dataTodoPost, [e.target.name]: e.target.value });
  };

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
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
              loading
            </>
          ) : (
            "create"
          )}
        </button>
      </form>
      {todo?.id && <CardTask todo={todo} />}
    </>
  );
}

export default AddTask;
