import { taskApi } from "../../../api/taskApi";

export const taskService = {
  getAll: async () => {

    const response = await taskApi.getAll();

    return response.data;
  },

  create: async (formData: FormData) => {

    const response = await taskApi.create(formData);

    return response.data;
  },

  complete: async (taskId: string): Promise<void> => {
    await taskApi.complete(taskId);
  },

};
