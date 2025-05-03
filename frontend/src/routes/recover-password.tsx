import { createFileRoute, redirect } from "@tanstack/react-router";

import { useAppForm } from "@/common/forms";
import { useRecoveryPasswordMutation } from "@/features/auth/auth.service";
import { isLoggedIn } from "@/features/auth/useAuth";
import { Box, Grid2, Typography } from "@mui/material";
import { z } from "zod";

const recoverPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
});

export const Route = createFileRoute("/recover-password")({
  component: RecoverPassword,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RecoverPassword() {
  const mutation = useRecoveryPasswordMutation({
    onSuccess: () => {
      reset();
    },
  });

  const { AppField, AppForm, handleSubmit, reset, SubmitButton } = useAppForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: recoverPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
      reset();
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
            Password Recovery
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <Typography textAlign="center">
            A password recovery email will be sent to the registered account
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <AppField
            name="email"
            children={(field) => (
              <field.TextField type="password" label="Email" />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <AppForm>
            <SubmitButton label="Continue" fullWidth />
          </AppForm>
        </Grid2>
      </Grid2>
    </Box>
  );
}
