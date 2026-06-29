import { useTasks, type Filter } from "../model/useTasks";

export const TaskFilters = () => {
  const { filter, setFilter } = useTasks();
  const handleFilterChange = (status: Filter) => {
    setFilter(status);
  };
  return (
    <div>
      фильтры: {filter}
      <button onClick={() => setFilter("all")}>Все задачи</button>
      <button onClick={() => setFilter("completed")}>Завершенные</button>
      <button onClick={() => setFilter("incomplete")}>Незавершенные</button>
    </div>
  );
};
