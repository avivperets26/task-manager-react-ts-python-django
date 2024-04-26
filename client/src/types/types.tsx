export interface Task {
  task_id?: number;
  object?: string;
  title: string;
  description: string;
  created_by: string;
  status: number; //(0, 'waiting'),(1, 'processing'),(2, 'finished'),(3, 'error'),
  creation_ts?: string;
  completed_ts?: string;
  verdict: number;
  analyzer: number;
}
export interface Pagination {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface Tasks extends Pagination {
  results: Task[];
}
export interface Pagination {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface TaskState {
  tasks: Tasks;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchTerm: string;
}

export type Color =
  | "white"
  | "black"
  | "purple"
  | "green"
  | "red"
  | "grey"
  | "brown"
  | "blue"
  | "yellow"
  | "orange"
  | "pink"
  | "cyan"
  | "magenta"
  | "teal"
  | "lavender"
  | "maroon"
  | "navy"
  | "olive"
  | "lime"
  | "aqua"
  | "fuchsia"
  | "silver"
  | "gray";
