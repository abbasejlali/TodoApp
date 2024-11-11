interface Todo {
  userId: number;
  id: number;
  title: string;
  completed?: boolean;
}

interface TodoInitialState {
  getTodos: {
    loading: boolean;
    todos: Todo[];
    error: string | null;
  };
  postTodos: {
    loading: boolean;
    todo: TodoPost | null;
    error: string | null;
  };
  editTodo: {
    loading: boolean;
    editdata: Todo | {};
    error: string | null;
  };
  deleteTodo: {
    loading: boolean;
    deletedata: { id: number } | undefined;
    error: string | null;
  };
}

interface FetchTodosArgs {
  page: number;
  completed: string | null;
}

interface TaskListArgs {
  setFilter: (newFilter: string) => void;
  todos: Todo[];
  setTodosBySearch: (newFilter: Todo[]) => void;
}

interface DataTodoPost {
  title: string;
  body: string;
  userId: number;
}

interface TodoPost {
  title: string;
  id: number;
  userId: number;
  body: string;
  complated?: string;
}

interface GetNewTodo {
  isLoading: boolean;
  data: TodoPost | null;
}

interface DataTodoEdit {
  title: string;
  id: number;
  userId: number;
  completed?: boolean | undefined;
}

export {
  type Todo,
  type TodoInitialState,
  type FetchTodosArgs,
  type TaskListArgs,
  type DataTodoPost,
  type GetNewTodo,
  type TodoPost,
  type DataTodoEdit,
};
