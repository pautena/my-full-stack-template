import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

import { useAppForm } from "@/common/forms";
import { useResetPasswordMutation } from "@/features/auth/auth.service";
import { isLoggedIn } from "@/features/auth/useAuth";
import { Box, Grid2, Typography } from "@mui/material";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "The passwords do not match",
    path: ["confirm_password"],
  });

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
  const navigate = useNavigate();

  const { AppField, AppForm, handleSubmit, reset, SubmitButton } = useAppForm({
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      const token =
        new URLSearchParams(window.location.search).get("token") ?? "";
      await mutation.mutateAsync({ ...value, token });
      reset();
    },
  });

  const mutation = useResetPasswordMutation({
    onSuccess: () => {
      reset();
      navigate({ to: "/login" });
    },
  });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
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
          <AppField
            name="new_password"
            children={(field) => (
              <field.TextField type="password" label="Set Password" />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <AppField
            name="confirm_password"
            children={(field) => (
              <field.TextField type="password" label="Confirm Password" />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <AppForm>
            <SubmitButton label="Reset Password" fullWidth />
          </AppForm>
        </Grid2>
      </Grid2>
    </Box>
  );
}
