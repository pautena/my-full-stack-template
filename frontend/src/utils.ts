import type { Notification } from "@pautena/react-design-system";

export type UseMutationArgs<T = object> = {
  onSuccess?: () => void;
} & T;

export const namePattern = {
  value: /^[A-Za-z\s\u00C0-\u017F]{1,30}$/,
  message: "Invalid name",
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
