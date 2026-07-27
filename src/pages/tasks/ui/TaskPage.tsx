import { LoginWidget } from "widgets/registration";
import { TaskWidget } from "widgets/taskList";

import s from "./TaskPage.module.scss";

export const TaskPage = () => {
  return (
    <div className={s.container}>
      <TaskWidget />
      <LoginWidget />
    </div>
  );
};
