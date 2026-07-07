import { useEffect, useState } from "react";
import { type Task } from "entities/task";

export type Filter = "all" | "completed" | "incomplete";

const mockTasks: Task[] = [
  { id: "1", title: "Task 1", completed: false },
  { id: "2", title: "Task 2", completed: true },
  { id: "3", title: "Task 3", completed: false },
  { id: "4", title: "Task 4", completed: true },
];

export function useTasks(initial?: Task[]): {
  tasks: Task[];
  filter: Filter;
  setFilter: (f: Filter) => void;
  removeTask: (id: string) => void;
} {
  const [allTasks, setAllTasks] = useState<Task[]>(initial || mockTasks);
  const [filter, setFilter] = useState<Filter>("all");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(allTasks);

  const removeTask = (id: string) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Фильтрация при изменении задач или фильтра
  useEffect(() => {
    let result = allTasks;

    if (filter === "completed") {
      result = allTasks.filter((task) => task.completed);
    } else if (filter === "incomplete") {
      result = allTasks.filter((task) => !task.completed);
    }

    setFilteredTasks(result);
  }, [allTasks, filter]);

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    removeTask,
  };
}
