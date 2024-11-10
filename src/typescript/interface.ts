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

export { type Todo, type TodoState, type FetchTodosArgs };
