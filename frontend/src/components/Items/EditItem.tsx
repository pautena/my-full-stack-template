import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Grid2 } from "@mui/material";
import { FormDialog, TextField } from "@pautena/react-design-system";
import type { ItemPublic, ItemUpdate } from "../../client";
import { useUpdateItemMutation } from "../../features/items/items.client";

interface EditItemProps {
	isOpen: boolean;
	item: ItemPublic;
	onClose: () => void;
}

export const EditItem = ({ isOpen, item, onClose }: EditItemProps) => {
	const mutation = useUpdateItemMutation({ id: item.id, onSuccess: onClose });

	const handleSubmit = (data: ItemUpdate) => mutation.mutate(data);

	return (
		<FormDialog
			open={isOpen}
			onCancel={onClose}
			title="Edit Item"
			onSubmit={handleSubmit}
			loading={mutation.isPending}
		>
			<Grid2 container spacing={2}>
				<Grid2 size={12}>
					<TextField
						name="title"
						label="Title"
						fullWidth
						required
						variant="outlined"
						defaultValue={item.title}
					/>
				</Grid2>
				<Grid2 size={12}>
					<TextField
						name="description"
						label="Description"
						fullWidth
						required
						variant="outlined"
						defaultValue={item.description}
					/>
				</Grid2>
			</Grid2>
		</FormDialog>
	);
};
