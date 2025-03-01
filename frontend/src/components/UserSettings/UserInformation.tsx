import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import {
  type ApiError,
  type UserPublic,
  type UserUpdateMe,
  UsersService,
} from "../../client"
import useAuth from "../../hooks/useAuth"
import { emailPattern, handleError } from "../../utils"
import { Button, Grid2 } from "@mui/material"
import { TextField, useNotificationCenter } from "@pautena/react-design-system"

const UserInformation = () => {
  const queryClient = useQueryClient()
  const { user: currentUser } = useAuth()
  const {show} = useNotificationCenter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<UserPublic>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      full_name: currentUser?.full_name,
      email: currentUser?.email,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: UserUpdateMe) =>
      UsersService.updateUserMe({ requestBody: data }),
    onSuccess: () => {
      show({
        severity:"success",
        message:"User updated successfully",
      })
    },
    onError: (err: ApiError) => {
      show({
        severity:"error",
        message:err.message,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries()
    },
  })

  const onSubmit: SubmitHandler<UserUpdateMe> = async (data) => mutation.mutate(data)

  return (
    <Grid2 component="form" container spacing={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid2 size={4}>
        <TextField label="Full Name" {...register("full_name", { maxLength: 30 })} defaultValue={currentUser?.full_name} fullWidth/>
      </Grid2>
      <Grid2 size={4}>
        <TextField label="Email" {...register("email", {
              required: "Email is required",
              pattern: emailPattern,
            })} defaultValue={currentUser?.email}  error={!!errors.email?.message} helperText={errors.email?.message} fullWidth/>
      </Grid2>
      <Grid2 size={12}>
        <Button variant="contained" color="primary" type="submit" disabled={!isDirty || !getValues("email")} loading={isSubmitting} >
          Save
        </Button>
      </Grid2>
    </Grid2>
  )
}

export default UserInformation
