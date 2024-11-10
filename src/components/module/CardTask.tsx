import { Todo } from "../../typescript/interface";

function CardTask({ todo }: { todo: Todo }) {
  const { title, id, completed, userId } = todo;
  return (
    <div className="bg-white border shadow-md card min-h-60 text-neutral-content w-96">
      <input type="checkbox" className="absolute checkbox top-4 left-3 " />
      <div className="items-center text-center card-body">
        <h2 className="card-title text-slate-900">{title}</h2>
        <h6 className="card-title text-slate-900">id : {id}</h6>
        <h6 className="card-title text-slate-900">userId : {userId}</h6>
        {completed ? (
          <p className="font-medium text-green-700 ">Completed</p>
        ) : (
          <p className="font-medium text-red-700 ">Uncompleted</p>
        )}
        <div className="justify-end mt-8 card-actions">
          <button className="text-white btn btn-warning">edit</button>
          <button className="text-white btn btn-error">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default CardTask;
