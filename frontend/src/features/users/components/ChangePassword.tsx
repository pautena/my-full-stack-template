import { type SubmitHandler, useForm } from "react-hook-form";

import type { UpdatePassword } from "@/client";
import { useUpdateUserPasswordMeMutation } from "@/features/users/users.client";
import { confirmPasswordRules, passwordRules } from "@/utils";
import { Button, Grid2, TextField, Typography } from "@mui/material";

interface UpdatePasswordForm extends UpdatePassword {
  confirm_password: string;
}

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordForm>({
    mode: "onBlur",
    criteriaMode: "all",
  });

  const mutation = useUpdateUserPasswordMeMutation({ onSuccess: reset });

  const onSubmit: SubmitHandler<UpdatePasswordForm> = (data) => {
    mutation.mutate(data);
  };

  return (
    <Grid2
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid2 size={12}>
        <Typography variant="h4">Change Password</Typography>
      </Grid2>
      <Grid2 size={12}>
        <TextField
          {...register("current_password")}
          label="Current Password"
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
  );
};
export default ChangePassword;
