import { useMutation } from "@tanstack/react-query";

import { Checkbox, FormControlLabel, Grid2, TextField } from "@mui/material";
import {
	FormDialog,
	useNotificationCenter,
} from "@pautena/react-design-system";
import type { UserCreate, UserUpdate, UsersCreateUserData } from "../../client";
import { createUserMutation } from "../../client/@tanstack/react-query.gen";
import { handleError } from "../../utils";

interface AddUserProps {
	isOpen: boolean;
	onClose: () => void;
}

interface UserUpdateForm extends UserUpdate {
	confirm_password: string;
}

export const AddUser = ({ isOpen, onClose }: AddUserProps) => {
	const { show } = useNotificationCenter();

	const addUser = useMutation({
		...createUserMutation(),
		onSuccess: () => {
			show({
				severity: "success",
				message: "User added",
			});
			onClose();
		},
		onError: (err) => {
			handleError(err, show);
		},
	});

	const handleSubmit = (
		data: Omit<UserCreate, "password"> & { password?: string },
	) => {
		if (data.password === "") {
			data.password = undefined;
		}

		addUser.mutate({ body: data as UserCreate });
	};

	return (
		<FormDialog
			open={isOpen}
			onCancel={onClose}
			title="Edit User"
			onSubmit={handleSubmit}
			loading={addUser.isPending}
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
