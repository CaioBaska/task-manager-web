import { useTasks } from "../features/tasks/hooks/useTasks";
import { TaskForm } from "../features/tasks/components/TaskForm";
import { TaskList } from "../features/tasks/components/TaskList";

export function TasksPage() {
  const { tasks, createTask, completeTask } = useTasks();

  return (
    <div className="page">
      <div className="container">
        <h1>Gerenciador de Tarefas</h1>

        <div className="card">
          <TaskForm onCreate={createTask} />
        </div>

        <div className="card">
          <TaskList
            tasks={tasks}
            onToggleComplete={(taskId, checked) => {
              if (checked) {
                completeTask(taskId);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
