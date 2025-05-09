import type { UserSchema } from "@/client";
import { useDeleteUserMutation } from "@/features/users/users.client";
import { DialogContentText } from "@mui/material";
import { ConfirmDialog } from "@pautena/react-design-system";

interface EditItemProps {
  isOpen: boolean;
  user: UserSchema;
  onClose: () => void;
}

export const DeleteUser = ({ isOpen, user, onClose }: EditItemProps) => {
  const mutation = useDeleteUserMutation({ id: user.id });

  return (
    <ConfirmDialog
      open={isOpen}
      onCancel={onClose}
      onConfirm={() => mutation.mutate()}
      title="Delete User"
      loading={mutation.isPending}
    >
      <DialogContentText>
        Are you sure you want to delete this user?
      </DialogContentText>
    </ConfirmDialog>
  );
};
