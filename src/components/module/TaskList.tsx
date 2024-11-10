import { useEffect, useState } from "react";

function TaskList({ setFilter }: { setFilter: (newFilter: string) => void }) {
  const [selectedValue, setSelectedValue] = useState<string>(() => {
    return localStorage.getItem("filter") || "";
  });
  const changeHandeler = (e: any) => {
    setSelectedValue(e.target.value);
    setFilter(e.target.value);
  };

  useEffect(() => {
    setFilter(selectedValue);
  }, [selectedValue]);

  return (
    <div className="flex items-center justify-between w-full gap-3 mb-8 ">
      <input
        type="text"
        placeholder="search..."
        className="w-full input input-bordered"
      />
      <select
        onChange={changeHandeler}
        value={selectedValue}
        className="w-full max-w-xs select select-bordered "
      >
        <option value="">All</option>
        <option value="completed=true">Completed</option>
        <option value="completed=false">Uncompleted</option>
      </select>
    </div>
  );
}

export default TaskList;
