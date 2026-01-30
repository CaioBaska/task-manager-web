import { httpClient } from "./httpClient";

export const taskApi = {
  getAll: () => httpClient.get("/tasks"),
  create: (data: FormData) => httpClient.post("/tasks", data),
  complete: (taskId: string) => httpClient.patch(`/tasks/${taskId}/complete`),
};