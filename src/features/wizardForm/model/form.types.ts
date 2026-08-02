import z from "zod";

export const schema = z.string().email("Введите корректный email");

export type FormData = z.infer<typeof schema>;

export type FormState = {
  status: "idle" | "error" | "success";
  message?: string;
  email?: string;
};
