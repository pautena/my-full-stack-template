import { Button, DialogContentText, Grid2, Typography } from "@mui/material";
import { ConfirmDialog, useDialog } from "@pautena/react-design-system";
import { useDeleteUserMeMutation } from "../../features/users/users.client";
import useAuth from "../../hooks/useAuth";

const DeleteAccount = () => {
	const { isOpen, open, close } = useDialog();
	const { logout } = useAuth();

	const mutation = useDeleteUserMeMutation({
		onSuccess: () => {
			logout();
			close();
		},
	});

	return (
		<>
			<Grid2 container spacing={2}>
				<Grid2 size={12}>
					<Typography>
						Permanently delete your data and everything associated with your
						account.
					</Typography>
				</Grid2>
				<Grid2 size={12}>
					<Button onClick={open} variant="contained" color="error">
						Delete Account
					</Button>
				</Grid2>
			</Grid2>
			<ConfirmDialog
				open={isOpen}
				onCancel={close}
				onConfirm={mutation.mutate}
				loading={mutation.isPending}
				title="Delete Account"
			>
				<DialogContentText>
					Are you sure you want to delete your account?
				</DialogContentText>
			</ConfirmDialog>
		</>
	);
};
export default DeleteAccount;
