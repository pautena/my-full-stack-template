import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import type { NewPassword } from "../client";
import { useResetPasswordMutation } from "../features/auth/auth.service";
import { isLoggedIn } from "../hooks/useAuth";
import { confirmPasswordRules, passwordRules } from "../utils";

interface NewPasswordForm extends NewPassword {
  confirm_password: string;
}

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function ResetPassword() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<NewPasswordForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      new_password: "",
    },
  });
  const navigate = useNavigate();

  const resetPassword = async (data: NewPassword) => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) return;
    await resetPassword({ new_password: data.new_password, token: token });
  };

  const mutation = useResetPasswordMutation({
    onSuccess: () => {
      reset();
      navigate({ to: "/login" });
    },
  });

  const onSubmit: SubmitHandler<NewPasswordForm> = async (data) => {
    const token =
      new URLSearchParams(window.location.search).get("token") ?? "";
    mutation.mutate({ ...data, token });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      height="100vh"
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      <Grid2 container spacing={2} maxWidth={400}>
        <Grid2 size={12}>
          <Typography variant="h4" textAlign="center">
            Reset Password
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <Typography textAlign="center">
            Please enter your new password and confirm it to reset your password
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="Set Password"
            {...register("new_password", passwordRules())}
            type="password"
            required
            fullWidth
            error={!!errors.new_password}
            helperText={errors.new_password?.message}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="Confirm Password"
            {...register("confirm_password", confirmPasswordRules(getValues))}
            type="password"
            required
            fullWidth
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
          />
        </Grid2>
        <Grid2 size={12}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Reset Password
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
}
