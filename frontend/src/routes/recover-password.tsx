import { useMutation } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ApiError, LoginService } from "../client"
import { isLoggedIn } from "../hooks/useAuth"
import { emailPattern, handleError } from "../utils"
import { Grid2, Typography, TextField, Button, Box } from "@mui/material"
import { Show } from "@chakra-ui/react"
import { useNotificationCenter } from "@pautena/react-design-system"

interface FormData {
  email: string
}

export const Route = createFileRoute("/recover-password")({
  component: RecoverPassword,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function RecoverPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()
  const {show} = useNotificationCenter();

  const recoverPassword = async (data: FormData) => {
    await LoginService.recoverPassword({
      email: data.email,
    })
  }

  const mutation = useMutation({
    mutationFn: recoverPassword,
    onSuccess: () => {
      show({
        severity:"success",
        title:"Email sent",
        message:"We sent an email with a link to get back into your account.",
      });

      reset()
    },
    onError: (err: ApiError) => {
      show({
        severity:"error",
        message:err.message
      })
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    mutation.mutate(data)
  }

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
            <Typography variant="h4" textAlign="center">Password Recovery</Typography>
          </Grid2>
          <Grid2 size={12}>
            <Typography textAlign="center">A password recovery email will be sent to the registered account</Typography>
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
            <Button fullWidth variant="contained" color="primary" type="submit" loading={isSubmitting}>
              Continue
            </Button>
          </Grid2>
        </Grid2>
    </Box>
  )
}
