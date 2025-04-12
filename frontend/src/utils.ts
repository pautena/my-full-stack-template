import type { Notification } from "@pautena/react-design-system";
import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormGetValues,
} from "react-hook-form";

export type UseMutationArgs<T = object> = {
  onSuccess?: () => void;
} & T;

export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: "Invalid email address",
};

export const namePattern = {
  value: /^[A-Za-z\s\u00C0-\u017F]{1,30}$/,
  message: "Invalid name",
};

export const passwordRules = <T extends FieldValues, R extends Path<T>>(
  isRequired = true,
): RegisterOptions<T, R> => {
  const rules: RegisterOptions<T, R> = {
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  };

  if (isRequired) {
    rules.required = "Password is required";
  }

  return rules;
};

export const confirmPasswordRules = <T extends FieldValues, R extends Path<T>>(
  getValues: UseFormGetValues<T>,
  isRequired = true,
): RegisterOptions<T, R> => {
  const rules: RegisterOptions<T, R> = {
    validate: (value: string) => {
      const password = getValues().password || getValues().new_password;
      return value === password ? true : "The passwords do not match";
    },
  };

  if (isRequired) {
    rules.required = "Password confirmation is required";
  }

  return rules;
};

export const handleError = (
  err: Error,
  show: (notification: Notification) => void,
) => {
  show({
    severity: "error",
    message: "detail" in err ? (err.detail as string) : err.message,
  });
};
