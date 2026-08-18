import { LoginWidget } from "widgets/registration";
import { TaskWidget } from "widgets/taskList";
import { WizardForm } from "features/wizardForm";
import { RefExamples } from "widgets/refExample";

import s from "./TaskPage.module.scss";
import { PortalTooltip } from "widgets/portalExamples";

export const TaskPage = () => {
  return (
    <div className={s.container}>
      <PortalTooltip />

      {/* <TaskWidget />
      <RefExamples />
      <LoginWidget />
      <WizardForm /> */}
    </div>
  );
};
