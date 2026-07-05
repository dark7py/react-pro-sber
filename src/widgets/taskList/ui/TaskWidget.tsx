import { useTasks } from "../model/useTasks";
import { TaskFilters } from "./TaskFilters";
import { TaskList } from "./TaskList";
import styles from "./TaskWidget.module.scss";

export const TaskWidget = () => {
  const { tasks, filter, removeTask, setFilter } = useTasks();

  return (
    <div>
      <h2>Задачи:</h2>
      <TaskFilters filter={filter} setFilter={setFilter} />
      <div className={styles.tasks}>
        <TaskList tasks={tasks} removeTask={removeTask} />
      </div>
    </div>
  );
};
