import React, { useEffect, useState } from "react";

// typescript
import { TaskListArgs, Todo } from "../../typescript/interface";

function TaskList({ setFilter, todos, setTodosBySearch }: TaskListArgs) {
  const [search, setSearch] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>(() => {
    return localStorage.getItem("filter") || "";
  });

  const filterHandeler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    setFilter(e.target.value);
  };

  useEffect(() => {
    setFilter(selectedValue);
  }, [selectedValue]);

  const searchHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const searchBykeyword: Todo[] = todos?.filter((todo) =>
      todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    setTodosBySearch(searchBykeyword);
  }, [search]);
  return (
    <div className="flex items-center justify-between w-full gap-3 mb-8 ">
      <input
        type="text"
        placeholder="search..."
        className="w-full input input-bordered"
        value={search}
        onChange={searchHandeler}
      />
      <select
        onChange={filterHandeler}
        value={selectedValue}
        className="w-full max-w-xs select select-bordered"
      >
        <option value="">All</option>
        <option value="completed=true">Completed</option>
        <option value="completed=false">Uncompleted</option>
      </select>
    </div>
  );
}

export default TaskList;
