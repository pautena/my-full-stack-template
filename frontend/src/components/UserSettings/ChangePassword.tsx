import { useMutation } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ApiError, type UpdatePassword, UsersService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { confirmPasswordRules, handleError, passwordRules } from "../../utils"
import { Button, Grid2, TextField, Typography } from "@mui/material"

interface UpdatePasswordForm extends UpdatePassword {
  confirm_password: string
}

const ChangePassword = () => {
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordForm>({
    mode: "onBlur",
    criteriaMode: "all",
  })

  const mutation = useMutation({
    mutationFn: (data: UpdatePassword) =>
      UsersService.updatePasswordMe({ requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Password updated successfully.", "success")
      reset()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
  })

  const onSubmit: SubmitHandler<UpdatePasswordForm> = async (data) => {
    mutation.mutate(data)
  }

  return (
      <Grid2 container spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid2 size={12}>
          <Typography variant="h4">Change Password</Typography>
        </Grid2>
        <Grid2 size={12}>
          <TextField
            {...register("current_password")}
            label="Password"
            type="password"
            fullWidth
            error={!!errors.current_password}
            helperText={errors.current_password?.message}
            />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            {...register("new_password", passwordRules())}
            label="Set Password"
            type="password"
            fullWidth
            error={!!errors.new_password}
            helperText={errors.new_password?.message}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            {...register("confirm_password", confirmPasswordRules(getValues))}
            label="Confirm Password"
            type="password"
            fullWidth
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
          />
        </Grid2>
        <Grid2 size={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            loading={isSubmitting}
          >
            Save
          </Button>
        </Grid2>

      </Grid2>
  )
}
export default ChangePassword
