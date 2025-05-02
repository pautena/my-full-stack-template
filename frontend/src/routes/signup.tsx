import { createFileRoute, redirect } from "@tanstack/react-router";

import type { UserRegister } from "@/client";
import { useAppForm } from "@/common/forms";
import useAuth, { isLoggedIn } from "@/features/auth/useAuth";
import { Box, Grid2, Link, Typography } from "@mui/material";
import { z } from "zod";

export const Route = createFileRoute("/signup")({
  component: SignUp,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      });
    }
  },
});

interface UserRegisterForm extends UserRegister {
  confirm_password: string;
}

const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    full_name: z.string().min(1, "Full Name is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/(?=.*[0-9])/, "Password must contain at least one number")
      .regex(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter",
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter",
      ),
    confirm_password: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "The passwords do not match",
  });

function SignUp() {
  const { signUpMutation } = useAuth();
  const { AppField, AppForm, handleSubmit, reset, SubmitButton } = useAppForm({
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      confirm_password: "",
    },
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      await signUpMutation.mutateAsync(value);
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
          <AppField
            name="full_name"
            children={(field) => <field.TextField label="Full Name" />}
          />
        </Grid2>
        <Grid2 size={12}>
          <AppField
            name="email"
            children={(field) => <field.TextField type="email" label="Email" />}
          />
        </Grid2>
        <Grid2 size={12}>
          <AppField
            name="password"
            children={(field) => (
              <field.TextField type="password" label="Password" />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <AppField
            name="confirm_password"
            children={(field) => (
              <field.TextField type="password" label="Repeat Password" />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <AppForm>
            <SubmitButton label="ign Up" fullWidth />
          </AppForm>
        </Grid2>
        <Grid2 size={12}>
          <Typography>
            Already have an account?{" "}
            <Link href="/login" color="secondary">
              Log In
            </Link>
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default SignUp;
