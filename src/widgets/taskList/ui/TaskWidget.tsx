import { TaskFilters } from "./TaskFilters";
import { TaskList, useTasks } from "features/tasksList";
import styles from "./TaskWidget.module.scss";

export const TaskWidget = () => {
  // const { isError, isLoading, data } = useGetTaskListQuery();

  const { tasks, filter, removeTask, setFilter, isError, isLoading } =
    useTasks();

  return (
    <div>
      <h2>Задачи:</h2>
      <TaskFilters filter={filter} setFilter={setFilter} />
      <div className={styles.tasks}>
        {isError && <p>Произошла ошибка</p>}
        {isLoading && <p>Загрузка...</p>}
        <TaskList tasks={tasks} removeTask={removeTask} />
      </div>
    </div>
  );
};
