/* oxlint-disable react/only-export-components */
import { createContext, useState, useEffect } from "react";
import { createTask, getInitialTasks } from "../Services/taskService";

export const TaskContext = createContext();

const STORAGE_KEY = "todoflow_tasks";

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback on error
    }
    return getInitialTasks();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Ignore write errors (e.g. storage quota)
    }
  }, [tasks]);

  function addTask(titleOrTask, description = "", dueDate = "") {
    let newTask;
    if (typeof titleOrTask === "object" && titleOrTask !== null) {
      newTask = createTask(
        titleOrTask.title,
        titleOrTask.description || "",
        titleOrTask.dueDate || ""
      );
    } else {
      newTask = createTask(titleOrTask, description, dueDate);
    }

    setTasks((previousTasks) => [newTask, ...previousTasks]);
    return newTask;
  }

  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
