import { Todo } from "../../typescript/interface";

function CardTask({ todo }: { todo: Todo }) {
  const { title, completed } = todo;
  return (
    <div className="card min-h-60 bg-white border shadow-md text-neutral-content w-96">
      <input type="checkbox" className="checkbox absolute top-4 left-3 " />
      <div className="card-body items-center text-center">
        <h2 className="card-title text-slate-900">{title}</h2>
        {completed ? (
          <p className=" text-green-700 font-medium  ">Completed</p>
        ) : (
          <p className=" text-red-700 font-medium  ">Uncompleted</p>
        )}
        <div className="card-actions justify-end mt-8">
          <button className="btn btn-warning text-white">edit</button>
          <button className="btn btn-error text-white">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default CardTask;
