export type TaskStatus = "Pending" | "Completed" | "Expired";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
  slaDeadline: string;
}

