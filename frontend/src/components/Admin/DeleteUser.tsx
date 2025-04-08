import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DialogContentText } from "@mui/material";
import {
	ConfirmDialog,
	useNotificationCenter,
} from "@pautena/react-design-system";
import type { UserPublic } from "../../client";
import { deleteUserMutation } from "../../client/@tanstack/react-query.gen";
import { handleError } from "../../utils";

interface EditItemProps {
	isOpen: boolean;
	user: UserPublic;
	onClose: () => void;
}

export const DeleteUser = ({ isOpen, user, onClose }: EditItemProps) => {
	const { show } = useNotificationCenter();

	const mutation = useMutation({
		...deleteUserMutation(),
		onSuccess: () => {
			show({
				severity: "success",
				message: "User deleted",
			});
			onClose();
		},
		onError: (err) => {
			handleError(err, show);
		},
	});

	return (
		<ConfirmDialog
			open={isOpen}
			onCancel={onClose}
			onConfirm={() => mutation.mutate({ path: { user_id: user.id } })}
			title="Delete User"
			loading={mutation.isPending}
		>
			<DialogContentText>
				Are you sure you want to delete this user?
			</DialogContentText>
		</ConfirmDialog>
	);
};
