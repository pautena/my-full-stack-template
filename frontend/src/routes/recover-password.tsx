import { createFileRoute, redirect } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";

import { useRecoveryPasswordMutation } from "@/features/auth/auth.service";
import { isLoggedIn } from "@/features/auth/useAuth";
import { emailPattern } from "@/utils";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";

interface FormData {
  email: string;
}

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const mutation = useRecoveryPasswordMutation({
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    mutation.mutate({
      email: data.email,
    });
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
            Password Recovery
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <Typography textAlign="center">
            A password recovery email will be sent to the registered account
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: emailPattern,
            })}
            type="email"
            required
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid2>
        <Grid2 size={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            loading={isSubmitting}
          >
            Continue
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
}
