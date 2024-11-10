import { useEffect, useState } from "react";

// module
import CardTask from "../module/CardTask";

// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../features/GetAllTodos/GetTodosSlice";

// type
import { AppDispatch, RootState } from "../../app/store";
import TaskList from "../module/TaskList";

function Homepage() {
  const { loading, todos } = useSelector((state: RootState) => state?.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [currentValue, setCurrentValue] = useState<number>(1);
  const totalPages = Math.ceil(200 / 10);
  const [filter, setFilter] = useState<string>(() => {
    return localStorage.getItem("filter") || "";
  });

  useEffect(() => {
    localStorage.setItem("filter", filter);

    if (currentValue >= 1 && currentValue <= totalPages) {
      dispatch(fetchTodos({ page: currentValue, completed: filter }));
    } else if (currentValue < 1) {
      setCurrentValue(1);
    }
  }, [currentValue, filter]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);
  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-full h-full bg-slate-50 ">
          <span className="z-50 loading loading-bars loading-lg "></span>
        </div>
      ) : (
        <div className="container p-10 mx-auto max-w-7xl">
          <TaskList setFilter={setFilter} />
          <div className="flex flex-wrap items-start justify-between w-full gap-5 ">
            {todos.length > 0 ? (
              todos.map((todo) => <CardTask key={todo.id} todo={todo} />)
            ) : (
              <div role="alert" className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 stroke-current shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Error! Task failed successfully.</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center w-full my-5 join ">
            <button
              className="join-item btn"
              onClick={() => setCurrentValue(() => currentValue - 1)}
            >
              «
            </button>
            <button className="join-item btn">Page {currentValue}</button>
            <button
              className="join-item btn"
              onClick={() => setCurrentValue(() => currentValue + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Homepage;
