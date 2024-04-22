export interface Task {
  id?: number;
  title: string;
  description: string;
  createdAt?: string;
  createdBy: string;
  type: number;
}

export interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchTerm: string;
  currentPage: number;
  totalTasks: number;
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
