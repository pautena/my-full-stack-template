import {
  type BodyLoginLoginAccessToken,
  LoginService,
  type NewPassword,
} from "@/client";
import { type UseMutationArgs, handleError } from "@/utils";
import { useNotificationCenter } from "@pautena/react-design-system";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useResetPasswordMutation = ({
  onSuccess = () => {},
}: UseMutationArgs) => {
  const { show } = useNotificationCenter();

  return useMutation({
    mutationFn: (data: NewPassword) => {
      const response = LoginService.resetPassword({ body: data });
      return response;
    },
    onSuccess: () => {
      show({
        severity: "success",
        message: "Password updated successfully",
      });
      onSuccess();
    },
    onError: (err) => {
      handleError(err, show);
    },
  });
};

export const useLoginMutation = ({
  onSuccess = () => {},
}: UseMutationArgs = {}) => {
  const { show } = useNotificationCenter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BodyLoginLoginAccessToken) => {
      const response = await LoginService.loginAccessToken({
        body: data,
      });
      if (response.data?.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
      }
    },
    onSuccess: () => {
      show({
        severity: "success",
        message: "Login successful",
      });
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (err) => {
      handleError(err, show);
    },
  });
};

export const useRecoveryPasswordMutation = ({
  onSuccess = () => {},
}: UseMutationArgs) => {
  const { show } = useNotificationCenter();

  return useMutation({
    mutationFn: async (data: { email: string }) => {
      await LoginService.recoverPassword({
        path: {
          email: data.email,
        },
      });
    },
    onSuccess: () => {
      show({
        severity: "success",
        title: "Email sent",
        message: "We sent an email with a link to get back into your account.",
      });

      onSuccess();
    },
    onError: (err) => {
      handleError(err, show);
    },
  });
};
