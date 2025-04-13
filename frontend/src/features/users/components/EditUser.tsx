import type { UserPublic, UserUpdate } from "@/client";
import { useUpdateUserMutation } from "@/features/users/users.client";
import { Checkbox, FormControlLabel, Grid2, TextField } from "@mui/material";
import { FormDialog } from "@pautena/react-design-system";

interface EditUserProps {
  user: UserPublic;
  isOpen: boolean;
  onClose: () => void;
}

const EditUser = ({ user, isOpen, onClose }: EditUserProps) => {
  const mutation = useUpdateUserMutation({
    id: user.id,
    onSuccess: onClose,
  });

  const handleSubmit = (data: UserUpdate) => {
    if (data.password === "") {
      data.password = undefined;
    }

    mutation.mutate(data);
  };

  return (
    <FormDialog
      open={isOpen}
      onCancel={onClose}
      title="Edit User"
      onSubmit={handleSubmit}
      loading={mutation.isPending}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <TextField
            name="email"
            label="Email"
            fullWidth
            required
            variant="outlined"
            defaultValue={user.email}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            name="full_name"
            label="Full Name"
            fullWidth
            required
            variant="outlined"
            defaultValue={user.full_name}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            name="password"
            label="Set Password"
            fullWidth
            type="password"
            variant="outlined"
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            name="confirm_password"
            label="Confirm Password"
            fullWidth
            type="password"
            variant="outlined"
          />
        </Grid2>
        <Grid2 size={6}>
          <FormControlLabel
            control={<Checkbox />}
            label="Is superuser?"
            name="is_superuser"
          />
        </Grid2>
        <Grid2 size={6}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Is active?"
            name="is_active"
          />
        </Grid2>
      </Grid2>
    </FormDialog>
  );
};

export default EditUser;
