import type { TaskStatus } from "../features/tasks/types/Task";

export const taskStatusLabel: Record<TaskStatus, string> = {
  Pending: "Pendente",
  Completed: "Concluída",
  Expired: "SLA Expirado",
};
