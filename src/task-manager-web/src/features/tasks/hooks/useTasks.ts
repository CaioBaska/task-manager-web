import { useEffect, useState } from "react";
import { taskService } from "../services/taskService";
import type { Task } from "../types/Task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar as tarefas");
    } finally {
      setLoading(false);
    }
  }

  async function createTask(formData: FormData) {
    try {
      await taskService.create(formData);
      await loadTasks();

    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function completeTask(taskId: string) {

    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, status: "Completed" as const }
          : task
      )
    );

    try {
      await taskService.complete(taskId);

    } catch (err) {
      console.error("Falha ao completar tarefa", err);

      setTasks(prev =>
        prev.map(task =>
          task.id === taskId
            ? { ...task, status: "Pending" as const }
            : task
        )
      );

      throw err;

    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    completeTask,
    refresh: loadTasks,
  };
}