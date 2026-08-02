import { useActionState, useState } from "react";
import { initialFormState, submitFormAction } from "../model";
import styles from "./WizardForm.module.scss";

export function WizardForm() {
  const [state, action, isPending] = useActionState(
    submitFormAction,
    initialFormState,
  );
  const [step, setStep] = useState(1);

  if (state.email && step === 1) setStep(2);

  if (state.status === "success") {
    return <div className={styles.success}>✅ {state.message}</div>;
  }

  return (
    <form action={action} className={styles.form}>
      {step === 1 ? (
        <>
          <input
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={state.email}
            className={styles.field}
          />
          <input type="hidden" name="step" value="email" />

          {state.status === "error" && (
            <div className={styles.error}>❌ {state.message}</div>
          )}

          <button
            disabled={isPending}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            {isPending ? "Проверяем..." : "Далее"}
          </button>
        </>
      ) : (
        <>
          <div className={styles.confirmText}>
            Подтвердить подписку:
            <strong>{state.email}</strong>
          </div>

          <input type="hidden" name="step" value="confirm" />

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={() => setStep(1)}
              disabled={isPending}
              className={`${styles.btn} ${styles.btnSecondary}`}
            >
              Назад
            </button>
            <button
              disabled={isPending}
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              {isPending ? "Отправка..." : "Подтвердить"}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
