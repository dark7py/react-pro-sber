import { TaskFilters } from "./TaskFilters";
import { TaskList } from "./TaskList";
import styles from "./TaskWidget.module.scss";

export const TaskWidget = () => {
  return (
    <div>
      <h2>Задачи:</h2>
      <TaskFilters />
      <div className={styles.tasks}>
        <TaskList />
      </div>
    </div>
  );
};
