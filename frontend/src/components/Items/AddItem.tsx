import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Grid2 } from "@mui/material";
import { FormDialog, TextField } from "@pautena/react-design-system";
import type { ItemCreate } from "../../client";
import { useAddItemMutation } from "../../features/items/items.client";

interface AddItemProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AddItem = ({ isOpen, onClose }: AddItemProps) => {
	const mutation = useAddItemMutation({ onSuccess: onClose });

	const handleSubmit = (data: ItemCreate) => mutation.mutate(data);

	return (
		<FormDialog
			open={isOpen}
			onCancel={onClose}
			title="Add Item"
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
					/>
				</Grid2>
				<Grid2 size={12}>
					<TextField
						name="description"
						label="Description"
						fullWidth
						required
						variant="outlined"
					/>
				</Grid2>
			</Grid2>
		</FormDialog>
	);
};
