import { memo } from "react";
import type { Task } from "../model/types";
import styles from "./TaskCard.module.scss";

type TaskProps = Task & {
  handleDelete: (id: string) => void;
};

export const TaskCard: React.FC<TaskProps> = memo(function TaskCard({
  title,
  id,
  completed,
  handleDelete,
}) {
  return (
    <div className={`${styles.card} ${completed ? styles.completed : ""}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.delete} onClick={() => handleDelete(id)}>
            удалить
          </button>
        </div>
        <div className={styles.footer}>
          <span className={styles.id}>ID: {id}</span>
          <span
            className={`${styles.status} ${completed ? styles.done : styles.pending}`}
          >
            {completed ? "Выполнено" : "В ожидании"}
          </span>
        </div>
      </div>
    </div>
  );
});
