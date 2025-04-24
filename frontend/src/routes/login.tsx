import { useAppForm } from "@/common/forms";
import useAuth, { isLoggedIn } from "@/features/auth/useAuth";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Grid2,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginMutation, error, resetError } = useAuth();

  const { AppField, AppForm, handleSubmit, SubmitButton } = useAppForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      resetError();
      try {
        await loginMutation.mutateAsync(value);
      } catch {
        // error is handled by useAuth hook
      }
    },
  });

  return (
    <Box
      component="form"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      display="flex"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Grid2 container spacing={2} maxWidth={400}>
        <Grid2 size={12}>
          <AppField
            name="username"
            children={(field) => <field.TextField label="Email" />}
          />
        </Grid2>
        <Grid2 size={12}>
          <AppField
            name="password"
            children={(field) => (
              <field.TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                error={!!error}
                helperText={error}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={(s) => setShowPassword(!s)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Link href="/recover-password" color="secondary">
            Forgot password?
          </Link>
        </Grid2>
        <Grid2 size={12}>
          <AppForm>
            <SubmitButton label="Log In" fullWidth />
          </AppForm>
        </Grid2>
        <Grid2 size={12}>
          <Typography>
            Don't have an account?{" "}
            <Link href="/signup" color="secondary">
              Sign up
            </Link>
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
}
