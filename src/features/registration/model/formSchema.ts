import { z } from "zod";

const socialMediaSchema = z.object({
  link: z.url("некорректный URL"),
});

export const groupRegistrationSchema = z
  .object({
    username: z.string().min(1, "Обязательное поле"),
    email: z.email({ message: "Некорректный формат email" }),
    password: z.string().min(6, "Минимум 6 символов"),
    confirmPassword: z.string(),
    links: z.array(socialMediaSchema),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type GroupRegistrationValues = z.infer<typeof groupRegistrationSchema>;

export const defaultValues: GroupRegistrationValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  links: [{ link: "" }],
};
