import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  groupRegistrationSchema,
  defaultValues,
  type GroupRegistrationValues,
} from "../model";

import styles from "./RegistrationForm.module.scss";

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupRegistrationValues>({
    mode: "onTouched",
    resolver: zodResolver(groupRegistrationSchema),
    defaultValues,
  });

  const onSubmit = (values: GroupRegistrationValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
      <div className={styles.field}>
        <label className={styles.label}>Имя пользователя</label>
        <input
          type="name"
          {...register("username")}
          className={styles.input}
          placeholder="Введите имя"
        />
        {errors.username && (
          <p className={styles.errorMsg}>{errors.username.message}</p>
        )}
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          {...register("email")}
          className={styles.input}
          placeholder="Введите email"
        />
        {errors.email && (
          <p className={styles.errorMsg}>{errors.email.message}</p>
        )}
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Пароль</label>
        <input
          type="password"
          {...register("password")}
          className={styles.input}
          placeholder="Введите пароль"
        />
        {errors.password && (
          <p className={styles.errorMsg}>{errors.password.message}</p>
        )}
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Подтверждение пароля</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className={styles.input}
          placeholder="Подтвердите пароль"
        />
        {errors.confirmPassword && (
          <p className={styles.errorMsg}>{errors.confirmPassword.message}</p>
        )}
      </div>
    </form>
  );
};
