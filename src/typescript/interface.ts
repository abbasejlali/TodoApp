interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  loading: boolean;
  todos: Todo[];
  error: string;
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

export { type Todo, type TodoState, type FetchTodosArgs, type TaskListArgs };
