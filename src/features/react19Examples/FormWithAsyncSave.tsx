import React, { useActionState } from "react";
import styles from "./styles.module.scss";
import { type FormState, initialState, saveTargetData } from "./model/saveData";

export const FormWithAsyncSave: React.FC = () => {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prevState, formData) => {
      try {
        return await saveTargetData(formData);
      } catch (error) {
        console.error(error);
        return { status: "error", message: "Ошибка при сохранении" };
      }
    },
    initialState,
  );

  const getButtonText = () => {
    if (isPending) return "Сохранение..";
    if (state.status === "success") return "Сохранено!";
    return "Сохранить";
  };

  return (
    <div className={styles.container}>
      <form action={formAction} className={styles.form}>
        <label htmlFor="textInput" className={styles.label}>
          Введите текст:
        </label>
        <input
          id="textInput"
          name="textInput"
          type="text"
          required
          disabled={isPending}
          className={styles.input}
          placeholder="Начните писать здесь..."
        />

        <button
          type="submit"
          disabled={isPending}
          className={`${styles.button} ${isPending ? styles.buttonSaving : ""} ${state.status === "success" && !isPending ? styles.buttonSaved : ""}`}
        >
          {getButtonText()}
        </button>
      </form>

      {state.message && (
        <p
          className={`${styles.message} ${state.status === "success" ? styles.success : styles.error}`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
};
