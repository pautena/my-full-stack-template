import { useAppForm } from "@/common/forms";
import useAuth from "@/features/auth/useAuth";
import { useUpdateUserMeMutation } from "@/features/users/users.client";
import { Grid2 } from "@mui/material";
import { z } from "zod";

const userInformationSchema = z.object({
  full_name: z.string().max(30, "Full name must be at most 30 characters"),
  email: z.string().email("Invalid email"),
});

const UserInformation = () => {
  const { user: currentUser } = useAuth();
  const mutation = useUpdateUserMeMutation();
  const { AppField, AppForm, handleSubmit, reset, SubmitButton } = useAppForm({
    defaultValues: {
      full_name: currentUser?.full_name,
      email: currentUser?.email,
    },
    validators: {
      onSubmit: userInformationSchema,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
      reset();
    },
  });

  return (
    <Grid2
      component="form"
      container
      spacing={2}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Grid2 size={4}>
        <AppField
          name="full_name"
          children={(field) => (
            <field.TextField type="password" label="Full Name" />
          )}
        />
      </Grid2>
      <Grid2 size={4}>
        <AppField
          name="email"
          children={(field) => <field.TextField type="email" label="Email" />}
        />
      </Grid2>
      <Grid2 size={12}>
        <AppForm>
          <SubmitButton label="Save" />
        </AppForm>
      </Grid2>
    </Grid2>
  );
};

export default UserInformation;
