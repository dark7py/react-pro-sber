import { LoginWidget } from "widgets/registration";
import { TaskWidget } from "widgets/taskList";

import s from "./TaskPage.module.scss";
import { WizardForm } from "features/wizardForm";

export const TaskPage = () => {
  return (
    <div className={s.container}>
      <TaskWidget />
      <LoginWidget />
      <WizardForm />
    </div>
  );
};
