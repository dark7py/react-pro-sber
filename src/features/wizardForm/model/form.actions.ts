import { type FormState, schema } from "./form.types";

export const initialFormState: FormState = {
  status: "idle",
  email: "",
  message: "",
};

export async function submitFormAction(
  _: FormState,
  formData: FormData,
): Promise<FormState> {
  const step = formData.get("step") as string;

  if (step === "email") {
    const result = schema.safeParse(formData.get("email"));
    if (!result.success) {
      return { status: "error", message: result.error.issues[0].message };
    }
    return { status: "idle", message: "", email: result.data };
  }

  if (step === "confirm") {
    await new Promise((r) => setTimeout(r, 1000));
    return { status: "success", message: "Подписка оформлена!" };
  }

  return _;
}
