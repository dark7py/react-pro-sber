import { TaskFilters } from "./TaskFilters";
import { TaskList, useTasks } from "features/tasksList";
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
