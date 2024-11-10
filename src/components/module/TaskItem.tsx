import { useEffect, useState } from "react";
import { DataTodoEdit, Todo } from "../../typescript/interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { editTodo } from "../../features/TodosManagement/TodosSlice";

function TaskItem({ todo }: { todo: Todo }) {
  const { id, userId, completed, title } = todo;
  const {
    editTodo: { editdata, loading },
  } = useSelector((state: RootState) => state.todos);
  const daispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);
  const [dataTodoEdit, setDataTodoEdit] = useState<DataTodoEdit>({
    title: "",
    id: 1,
    userId: 1,
    completed: false,
  });

  const editHandeler = (e: any) => {
    const name = e.target.name;
    if (name === "title") {
      setDataTodoEdit({ ...dataTodoEdit, [e.target.name]: e.target.value });
    } else {
      setDataTodoEdit({ ...dataTodoEdit, [e.target.name]: e.target.checked });
    }
  };

  const editTodoHandeler = async (e: any) => {
    e.preventDefault();
    const { title, completed } = dataTodoEdit;
    daispatch(editTodo({ title, completed, id, userId }));
  };
  useEffect(() => {
    setDataTodoEdit({ ...dataTodoEdit, id, title, completed, userId });
  }, [openModal]);

  // useEffect(() => {
  //   console.log(dataTodoEdit);
  // }, [dataTodoEdit]);
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="text-white btn btn-warning"
      >
        edit
      </button>
      <button className="text-white btn btn-error">Delete</button>
      <div
        id="authentication-modal"
        aria-hidden="true"
        className={`${
          openModal ? "flex" : "hidden"
        } overflow-y-auto transition-all  overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full p-4">
          <div className="relative bg-white border rounded-lg shadow-2xl dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Todo {id}
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => setOpenModal(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form
                onSubmit={editTodoHandeler}
                className="space-y-5"
                action="#"
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-lg font-medium text-left text-gray-900 dark:text-white"
                  >
                    title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="abbas"
                    value={dataTodoEdit.title}
                    onChange={editHandeler}
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="form-control">
                      <label className="cursor-pointer label">
                        <input
                          type="checkbox"
                          checked={dataTodoEdit.completed}
                          className="checkbox"
                          name="completed"
                          onChange={editHandeler}
                        />
                        <span className="ml-3 text-base font-medium label-text">
                          Complated
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <button className="w-full text-lg font-medium text-white btn btn-success ">
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      loading
                    </>
                  ) : (
                    "Edit todo"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskItem;
