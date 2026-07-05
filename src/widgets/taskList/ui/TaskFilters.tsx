import { type Filter } from "../model/useTasks";

type TProps = {
  filter: Filter;
  setFilter: (f: Filter) => void;
};

export const TaskFilters: React.FC<TProps> = ({ filter, setFilter }) => {
  return (
    <div>
      фильтры: {filter}
      <button onClick={() => setFilter("all")}>Все задачи</button>
      <button onClick={() => setFilter("completed")}>Завершенные</button>
      <button onClick={() => setFilter("incomplete")}>Незавершенные</button>
    </div>
  );
};
