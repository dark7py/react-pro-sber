import { TaskCard, type Task } from "entities/task";
import { useTasks, type Filter } from "../model/useTasks";
import { useCallback } from "react";

type TProps = {
  tasks: Task[];
  filter: Filter;
  removeTask: (id: string) => void;
};

export const TaskList: React.FC<TProps> = ({ tasks, filter, removeTask }) => {
  console.log("Отфильтрованные задачи:", tasks);
  console.log("Текущий фильтр:", filter);

  const handleDelete = useCallback((id: string) => {
    removeTask(id);
  }, []);

  const renderTasks = tasks.map(({ id, title, completed }) => (
    <TaskCard
      key={id}
      id={id}
      title={title}
      completed={completed}
      handleDelete={handleDelete}
    />
  ));

  return <div>{renderTasks}</div>;
};
