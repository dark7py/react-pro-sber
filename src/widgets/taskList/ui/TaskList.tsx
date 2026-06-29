import { TaskCard } from "entities/task";
import { useTasks } from "../model/useTasks";

export const TaskList = () => {
  const { tasks } = useTasks();

  return (
    <div>
      {tasks.map(({ id, title, completed }) => (
        <div key={id}>
          <TaskCard id={id} title={title} completed={completed} />
        </div>
      ))}
    </div>
  );
};
