import type { Task } from "../model/types";
// import { CheckCircle } from "lucide-react";
import styles from "./TaskCard.module.scss";

type TaskProps = Task;

export const TaskCard: React.FC<TaskProps> = ({ title, id, completed }) => {
  return (
    <div className={`${styles.card} ${completed ? styles.completed : ""}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
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
};
