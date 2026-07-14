import { TaskCard, type Task } from "entities/task";
import { useCallback } from "react";

type TProps = {
  tasks: Task[];
  removeTask: (id: number) => void;
};

export const TaskList: React.FC<TProps> = ({ tasks, removeTask }) => {
  const handleDelete = useCallback(
    (id: number) => {
      removeTask(id);
    },
    [removeTask],
  );

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
