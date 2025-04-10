import { Checkbox, FormControlLabel, Grid2, TextField } from "@mui/material";
import { FormDialog } from "@pautena/react-design-system";
import type { UserCreate, UserUpdate } from "../../client";
import { useAddUserMutation } from "../../features/users/users.client";

interface AddUserProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AddUser = ({ isOpen, onClose }: AddUserProps) => {
	const mutation = useAddUserMutation({
		onSuccess: onClose,
	});

	const handleSubmit = (data: UserCreate) => {
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
					/>
				</Grid2>
				<Grid2 size={12}>
					<TextField
						name="full_name"
						label="Full Name"
						fullWidth
						required
						variant="outlined"
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
