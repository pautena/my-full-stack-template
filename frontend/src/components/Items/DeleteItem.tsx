import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DialogContentText } from "@mui/material";
import { ConfirmDialog } from "@pautena/react-design-system";
import type { ItemPublic } from "../../client";
import { useDeleteItemMutation } from "../../features/items/items.client";

interface EditItemProps {
	isOpen: boolean;
	item: ItemPublic;
	onClose: () => void;
}

export const DeleteItem = ({ isOpen, item, onClose }: EditItemProps) => {
	const mutation = useDeleteItemMutation({ id: item.id, onSuccess: onClose });

	return (
		<ConfirmDialog
			open={isOpen}
			onCancel={onClose}
			onConfirm={() => mutation.mutate()}
			title="Delete Item"
			loading={mutation.isPending}
		>
			<DialogContentText>
				Are you sure you want to delete this item?
			</DialogContentText>
		</ConfirmDialog>
	);
};
