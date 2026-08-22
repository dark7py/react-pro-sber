export interface FormState {
  status: "idle" | "success" | "error";
  message: string;
}

export const initialState: FormState = {
  status: "idle",
  message: "",
};

export const saveTargetData = async (
  formData: FormData,
): Promise<FormState> => {
  const textValue = formData.get("textInput");
  console.log("Отправка данных на сервер:", textValue);

  // Имитируем задержку сети в 1.5 секунды
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    status: "success",
    message: "Данные успешно сохранены!",
  };
};
