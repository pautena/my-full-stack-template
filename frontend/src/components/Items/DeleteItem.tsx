import { useMutation } from "@tanstack/react-query";

import { DialogContentText } from "@mui/material";
import {
	ConfirmDialog,
	useNotificationCenter,
} from "@pautena/react-design-system";
import type { ItemPublic } from "../../client";
import { deleteItemMutation } from "../../client/@tanstack/react-query.gen";
import { handleError } from "../../utils";

interface EditItemProps {
	isOpen: boolean;
	item: ItemPublic;
	onClose: () => void;
}

export const DeleteItem = ({ isOpen, item, onClose }: EditItemProps) => {
	const { show } = useNotificationCenter();

	const deleteItem = useMutation({
		...deleteItemMutation(),
		onSuccess: () => {
			show({
				severity: "success",
				message: "Item deleted",
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
			onConfirm={() => deleteItem.mutate({ path: { id: item.id } })}
			title="Delete Item"
			loading={deleteItem.isPending}
		>
			<DialogContentText>
				Are you sure you want to delete this item?
			</DialogContentText>
		</ConfirmDialog>
	);
};
