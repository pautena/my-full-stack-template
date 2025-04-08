import { useMutation } from "@tanstack/react-query";

import { Checkbox, FormControlLabel, Grid2, TextField } from "@mui/material";
import {
	FormDialog,
	useNotificationCenter,
} from "@pautena/react-design-system";
import type { UserPublic, UserUpdate } from "../../client";
import { updateUserMutation } from "../../client/@tanstack/react-query.gen";
import { handleError } from "../../utils";

interface EditUserProps {
	user: UserPublic;
	isOpen: boolean;
	onClose: () => void;
}

const EditUser = ({ user, isOpen, onClose }: EditUserProps) => {
	const { show } = useNotificationCenter();

	const updateUser = useMutation({
		...updateUserMutation(),
		onSuccess: () => {
			show({
				severity: "success",
				message: "User updated",
			});
			onClose();
		},
		onError: (err) => {
			handleError(err, show);
		},
	});

	const handleSubmit = (data: UserUpdate) => {
		if (data.password === "") {
			data.password = undefined;
		}

		updateUser.mutate({ path: { user_id: user.id }, body: data });
	};

	return (
		<FormDialog
			open={isOpen}
			onCancel={onClose}
			title="Edit User"
			onSubmit={handleSubmit}
			loading={updateUser.isPending}
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
