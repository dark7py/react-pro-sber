import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetTaskListQuery, type Task } from "entities/task";

export type Filter = "all" | "completed" | "incomplete";

export function useTasks(): {
  tasks: Task[];
  filter: Filter;
  setFilter: (f: Filter) => void;
  removeTask: (id: number) => void;
  isError: boolean;
  isLoading: boolean;
} {
  const { isError, isLoading, data = [] } = useGetTaskListQuery();

  const [allTasks, setAllTasks] = useState<Task[]>(data);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    setAllTasks(data);
  }, [data]);

  const removeTask = useCallback((id: number) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  // Фильтрация при изменении задач или фильтра
  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return allTasks.filter((task) => task.completed);
    } else if (filter === "incomplete") {
      return allTasks.filter((task) => !task.completed);
    }

    return allTasks;
  }, [allTasks, filter]);

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    removeTask,
    isError,
    isLoading,
  };
}
