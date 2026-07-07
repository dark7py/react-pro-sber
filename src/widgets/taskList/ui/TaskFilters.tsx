import type { Filter } from "features/tasksList";
import { FilterButton } from "shared";

type TProps = {
  filter: Filter;
  setFilter: (f: Filter) => void;
};

export const TaskFilters: React.FC<TProps> = ({ filter, setFilter }) => {
  return (
    <div>
      фильтры
      <FilterButton
        text="Все задачи"
        isActive={filter === "all"}
        handleClick={() => setFilter("all")}
      />
      <FilterButton
        text="Завершенные"
        isActive={filter === "completed"}
        handleClick={() => setFilter("completed")}
      />
      <FilterButton
        text="Незавершенные"
        isActive={filter === "incomplete"}
        handleClick={() => setFilter("incomplete")}
      />
    </div>
  );
};
