import { useAppForm } from "@/common/forms";
import { useUpdateUserPasswordMeMutation } from "@/features/users/users.client";
import { Grid2, Typography } from "@mui/material";
import { z } from "zod";

const updatePasswordSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "The passwords do not match",
    path: ["confirm_password"],
  });

const ChangePassword = () => {
  const mutation = useUpdateUserPasswordMeMutation();

  const { AppField, AppForm, handleSubmit, reset, SubmitButton } = useAppForm({
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validators: {
      onSubmit: updatePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
      reset();
    },
  });

  return (
    <Grid2
      container
      spacing={2}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Grid2 size={12}>
        <Typography variant="h4">Change Password</Typography>
      </Grid2>
      <Grid2 size={12}>
        <AppField
          name="current_password"
          children={(field) => (
            <field.TextField type="password" label="Current Password" />
          )}
        />
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
          <SubmitButton label="Save" fullWidth />
        </AppForm>
      </Grid2>
    </Grid2>
  );
};
export default ChangePassword;
