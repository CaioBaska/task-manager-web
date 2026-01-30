import { useState } from "react";
import type { Task, TaskStatus } from "../types/Task";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string, completed: boolean) => void;
}

function formatDate(date: Date) {
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function parseBackendDate(dateString: string) {
  const [date, time] = dateString.split("T");
  if (!time) return new Date(dateString);

  const [hms, rest] = time.split(".");
  const milliseconds = rest?.substring(0, 3) ?? "000";

  return new Date(`${date}T${hms}.${milliseconds}Z`);
}

const statusLabelMap: Record<TaskStatus, string> = {
  Pending: "Pendente",
  Completed: "Concluída",
  Expired: "SLA Expirado",
};

export function TaskList({ tasks, onToggleComplete }: TaskListProps) {
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);

  const filteredTasks = showOnlyCompleted
    ? tasks.filter((t) => t.status === "Completed")
    : tasks.filter((t) => t.status !== "Completed");

  let emptyMessage = "";
  if (tasks.length === 0) {
    emptyMessage = "Nenhuma tarefa cadastrada ainda.";
  } else if (filteredTasks.length === 0) {
    emptyMessage = showOnlyCompleted
      ? "Você ainda não tem tarefas concluídas."
      : "Não há tarefas pendentes no momento.";
  }

  return (
    <div>

      <label
        style={{
          display: "block",
          margin: "0 0 20px 0",
          fontSize: "1rem",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <input
          type="checkbox"
          checked={showOnlyCompleted}
          onChange={() => setShowOnlyCompleted((prev) => !prev)}
          style={{ marginRight: "8px" }}
        />
        Mostrar apenas tarefas concluídas
      </label>

      {emptyMessage ? (
        <p style={{ color: "#666", fontStyle: "italic", margin: "20px 0" }}>
          {emptyMessage}
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {filteredTasks.map((task) => {
            const expiresAt = parseBackendDate(task.slaDeadline);
            const isExpired = task.status === "Expired" || expiresAt < new Date();
            const isCompleted = task.status === "Completed";

            return (
              <li
                key={task.id}
                style={{
                  marginBottom: "16px",
                  padding: "14px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  backgroundColor: isExpired ? "#fff5f5" : "#ffffff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1, paddingRight: "16px" }}>
                    <strong
                      style={{
                        fontSize: "1.1rem",
                        textDecoration: isCompleted ? "line-through" : "none",
                        color: isCompleted ? "#777" : "#222",
                      }}
                    >
                      {task.title}
                    </strong>
                  </div>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      disabled={isExpired || isCompleted}
                      onChange={(e) => {
                        if (e.target.checked && !isCompleted) {
                          if (window.confirm("Deseja marcar esta tarefa como concluída?")) {
                            onToggleComplete(task.id, true);
                          }
                        }
                      }}
                    />
                    <span
                      style={{
                        color: isExpired ? "#d32f2f" : isCompleted ? "#2e7d32" : "#555",
                        fontWeight: isCompleted || isExpired ? 600 : 400,
                      }}
                    >
                      {statusLabelMap[task.status]}
                    </span>
                  </label>
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "0.9rem",
                    color: isExpired ? "#d32f2f" : "#666",
                  }}
                >
                  🕒 Expira em: {formatDate(expiresAt)}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}