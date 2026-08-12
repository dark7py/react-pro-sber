import { z } from "zod";

export function hasOwnProperty<X extends object, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// From https://github.com/sindresorhus/is/blob/master/source/index.ts
export function isPlainObject(
  value: unknown,
): value is Record<PropertyKey, unknown> {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);

  return prototype === null || prototype === Object.getPrototypeOf({});
}

export const getMessageFromError = (
  error: unknown,
  defaultErrorMessage: string = "unknown error",
) => {
  const message =
    isPlainObject(error) && hasOwnProperty(error, "message") && error.message;

  return typeof message === "string" ? message : defaultErrorMessage;
};

const ErrorMessageSchema = z.looseObject({
  message: z.string(),
});

export const parseErrorWithZod = (
  error: unknown,
  defaultErrorMessage: string = "unknown error",
) => {
  const result = ErrorMessageSchema.safeParse(error);

  if (result.success) {
    return result.data;
  }

  return {
    message: defaultErrorMessage,
  };
};
